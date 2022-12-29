
import { Heading, Spinner } from "native-base";
import React from "react";
import { APIReport, APISymptom } from "../../api/reports";
import { SymptomConf } from "../../conf/types";
import useSymptoms from "../../hooks/useSymptoms";
import useEditedReportStore from "../../store/useEditedReport";
import Report, { ReportStateProps, Symptoms } from "../../types";
import SymptomArrayInput from "./Array";
import SymptomBooleanInput from "./Boolean";
import SymptomNumberInput from "./Number";
import SymptomStringInput from "./String";
import { SymptomInputTypeProps } from "./types";

type SymptomInputTypeComponent = React.FC<SymptomInputTypeProps>
type SymptomInputTypeMap = {
  [key: string]: SymptomInputTypeComponent
}
const inputTypeMap: SymptomInputTypeMap = {
  'int': SymptomNumberInput,
  'string': SymptomStringInput,
  // 'boolean': SymptomBooleanInput,
  // 'object': SymptomArrayInput // currently only used for medications, which is an input of an array of string
  //                             // in Javascript, an array has a type of 'object'
}

function SymptomInput({ symptomId } : { symptomId: number }) {
  const report = useEditedReportStore((state) => state.report)
  const editReport = useEditedReportStore((state) => state.editSymptom)
  const { data } = useSymptoms()
  const symptoms = data?.data

  if (!symptoms) {
    return (
      <Spinner accessibilityLabel="Chargement des symptômes"/>
    )
  }
  const symptom = symptoms.find(symptom => symptom.id === symptomId)
  if (symptom === undefined) {
    return (
      <Heading>
        Couldn't find symptom
      </Heading>
    )
  }
  const SymptomInputComponent = inputTypeMap[symptom.unit_measure]
  if (!SymptomInputComponent) {
    return null
  }
  console.log(report)
  return (
    <SymptomInputComponent
      title={symptom.name}
      value={report.symptoms.find(symptom => symptom.id === symptomId)?.value}
      onValueChange={newValue => editReport({
        id: symptom.id,
        value: newValue,
        symptom_type_name: symptom.name,
        symptom_type_unit_measure: symptom.unit_measure
      })}
    />
  )
}

export default SymptomInput