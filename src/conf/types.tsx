import { ImageSourcePropType } from "react-native"
import Report from '../types';

type Symptom = {
  reportKey?: string,
  input: {
    title: string,
    indicator?: string,
  },
  display: string | ((report: Report) => string),
}

type SymptomCategory = {
  name: string,
  icon: ImageSourcePropType,
  image: ImageSourcePropType,
  inputIndicator: string,
  isCompleted: (report: Report) => boolean,
  field: keyof Report,
  symptoms: Symptom[]
}

export type { Symptom, SymptomCategory }