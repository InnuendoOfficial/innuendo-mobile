import * as React from 'react';
import { Text, FlatList, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavProp } from '../navigation/types';
import SymptomCategories from '../conf/SymptomCategories';
import { SymptomCategory } from '../conf/types'

type CategoryButtonProps = {
  symptomCategory: SymptomCategory,
  reportDate: string
}

function CategoryButton({ symptomCategory, reportDate }: CategoryButtonProps) {
  const navigation = useNavigation<StackNavProp>()

  return (
    <TouchableOpacity
      style={styles.dailyReportContainer}
      onPress={() => { navigation.push('EditReportCategory', {
        reportDate: reportDate,
        categoryName: symptomCategory.name,
      })}}
    >
      <Text style={styles.dailyReportText}>
        { symptomCategory.name }
      </Text>
      <Image
        style={styles.dailyReportIcons}
        source={symptomCategory.icon}
      />
    </TouchableOpacity>
  )
}

function SymptomCategoriesPanel({ reportDate } : { reportDate: string }) {
  return (
    <View style={{width: '95%', alignItems: 'center'}}>
      <FlatList
        style={{ width: '95%' }}
        keyExtractor={reportItem => reportItem.name}
        numColumns={3}
        data={SymptomCategories}
        renderItem={item =>
          <CategoryButton
            symptomCategory={item.item}
            reportDate={reportDate}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dailyReportContainer: {
    borderRadius: 10,
    backgroundColor: "#776CCB",
    paddingVertical: 20,
    marginHorizontal: 2,
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dailyReportText: {
    fontWeight: "bold",
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  },
  dailyReportIcons: {
    width: 52,
    height: 52,
    marginTop: 10
  }
})

export default SymptomCategoriesPanel