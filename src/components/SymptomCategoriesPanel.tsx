import * as React from 'react';
import { Text, Button, Center, Image, FlatList, VStack } from "native-base";
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
    <Button
      borderRadius={10}
      margin={2}
      flex={1}
      onPress={() => navigation.push('EditReportCategory', {
        reportDate: reportDate,
        categoryName: symptomCategory.name,
      })}
    >
      <VStack alignItems="center" space="sm">
        <Text bold fontSize={15} color="white" textAlign="center">
          { symptomCategory.name }
        </Text>
        <Image
          source={symptomCategory.icon}
          width={12}
          height={12}
          alt={symptomCategory.name}
        />
      </VStack>
    </Button>
  )
}

function SymptomCategoriesPanel({ reportDate } : { reportDate: string }) {
  return (
    <Center style={{ width: '100%' }}>
      <FlatList
        style={{ width: '100%' }}
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
    </Center>
  )
}

export default SymptomCategoriesPanel