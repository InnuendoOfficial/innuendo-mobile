import { VStack } from "native-base";
import React from "react";
import { SymptomConf } from "../../conf/types";
import Report, { ReportStateProps, Symptoms } from "../../types";
import SymptomArrayInput from "./Array";
import SymptomBooleanInput from "./Boolean";
import SymptomNumberInput from "./Number";
import { SymptomInputProps } from "./types";

type SymptomInputComponent = React.FC<SymptomInputProps>
type SymptomInputTypeMap = {
  [key: string]: SymptomInputComponent
}

type SymptomInputInterfaceProps = {
  report: Report,
  onValueChange: <InputType,>(newValue: InputType, symptom: SymptomConf) => void,
  field: keyof Symptoms,
  symptom: SymptomConf
}

function SymptomInputInterface({ report, onValueChange, field, symptom } : SymptomInputInterfaceProps) {
  const inputTypeMap: SymptomInputTypeMap = {
    'number': SymptomNumberInput,
    'boolean': SymptomBooleanInput,
    'object': SymptomArrayInput // currently only used for medications, which is an input of an array of string
                                // in Javascript, an array has a type of 'object'
  }
  const value: any = (report.symptoms[field])[symptom.reportKey]
  const SymptomInputComponent = inputTypeMap[typeof value]

  if (!SymptomInputComponent) {
    return null
  }
  return (
    <SymptomInputComponent
      title={symptom.input.title}
      description={symptom.input.indicator || ""}
      value={value}
      onValueChange={newValue => onValueChange(newValue, symptom)}
    />
  )
}

type SymptomsInputProps = ReportStateProps & { field: keyof Symptoms, symptoms : SymptomConf[] }

function SymptomsInputs({ report, setReport, field, symptoms } : SymptomsInputProps ) {
  function onValueChange<InputType>(newValue: InputType, symptom: SymptomConf) {
    setReport({
      ...report,
      symptoms: {
        ...report.symptoms,
        [field]: {
          ...report.symptoms[field],
          [symptom.reportKey]: newValue
        }
      }
    })
  }

  return (
    <VStack space="md">
      {
        symptoms.map(symptom =>
          <SymptomInputInterface
            key={symptom.reportKey}
            report={report}
            onValueChange={onValueChange}
            field={field}
            symptom={symptom}
          />
        )
      }
    </VStack>
  );
}

export default SymptomsInputs