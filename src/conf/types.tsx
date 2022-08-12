import { ImageSourcePropType } from "react-native"
import Report, { DigestiveDisorders, Fatigue, Medicines, Pain, Period, Symptoms, UrinaryDisorders } from '../types';

type SymptomConf = {
  reportKey: string,
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
  field: keyof Symptoms,
  symptoms: SymptomConf[]
}

export type { SymptomConf, SymptomCategory }