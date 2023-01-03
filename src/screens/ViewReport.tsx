import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Heading, Icon, Image, VStack } from 'native-base';
import moment from 'moment';
import { EditReportProps } from './types'
import useEditedReportStore from '../store/useEditedReport';
import ScrollScreenView from '../components/ScrollScreenView';

import { useNavigation } from '@react-navigation/native';
import { StackNavProp } from '../navigation/types';
import ReportIllustration from "../assets/illustrations/Report.png"
import SymptomsSummary from '../components/SymptomsSummary';
import Ionicons from 'react-native-vector-icons/Ionicons';

function EditReportButton() {
  const navigation = useNavigation<StackNavProp>()
  const goToEditReport = () => navigation.navigate("EditReport")

  return (
    <TouchableOpacity onPress={goToEditReport}>
      <Icon as={Ionicons} name="create-outline" size={7} color="white" />
    </TouchableOpacity>
  )
}

function ViewReportScreen({ navigation }: EditReportProps) {
  const report = useEditedReportStore((state) => state.report)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <EditReportButton  />
    });
  }, [navigation, report]);

  return (
    <ScrollScreenView>
      <VStack space="2" alignItems="center">
        <Heading color="black" textAlign="center">
          Rapport du { "\n" + moment(report.date).format('dddd DD MMMM Y') }
        </Heading>
        <Image
          style={{ width: 250, height: 250 }}
          source={ReportIllustration}
          alt="Femme remplissant son rapport journalier"
        />
        <SymptomsSummary />
      </VStack>
    </ScrollScreenView>
  )
}

export default ViewReportScreen