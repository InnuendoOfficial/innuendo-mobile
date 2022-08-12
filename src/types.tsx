// types.tsx
/**
 * Store the main types of the app.
 */

import React from 'react'

type Period = {
  pain: number,
  flow: number
}

type DigestiveDisorders = {
  pain: number, // from 1 to 10
  presenceOfBlood: boolean,
  diarrhea: boolean,
  constipation: boolean
}

type UrinaryDisorders = {
  pain: number,
  burn: boolean,
  presenceOfBlood: boolean,
  troubleEmptyingBladder: boolean,
  frequentUrges: boolean
}

type Fatigue = {
  fatigue: boolean,
  lowerBackPain: boolean,
  pelvicPain: boolean,
}

type Pain = {
  painDuringSex: boolean
}

type Medicines = {
  medicines: string[]
}

type Symptoms = {
  period: Period,
  digestiveDisorders: DigestiveDisorders,
  urinaryDisorders: UrinaryDisorders,
  fatigue: Fatigue,
  pain: Pain,
  medicines: Medicines
}

type Report = {
  date: string, // format: "YYYY-MM-DD", ex: "2021-12-14"
  symptoms: Symptoms
}

type ReportStateProps = {
  report: Report,
  setReport: React.Dispatch<React.SetStateAction<Report>>
}

const blankReport: Report = {
  date: "",
  symptoms: {
    period: {
      pain: 0,
      flow: 0
    },
    digestiveDisorders: {
      pain: 0,
      presenceOfBlood: false,
      diarrhea: false,
      constipation: false
    },
    urinaryDisorders: {
      pain: 0,
      burn: false,
      presenceOfBlood: false,
      troubleEmptyingBladder: false,
      frequentUrges: false
    },
    fatigue: {
      fatigue: false,
      lowerBackPain: false,
      pelvicPain: false,
    },
    pain: {
      painDuringSex: false,
    },
    medicines: {
      medicines: [""]
    }
  }
}

export { blankReport }
export type {
  Period,
  DigestiveDisorders,
  UrinaryDisorders,
  Fatigue,
  Pain,
  Medicines,
  Symptoms,
  ReportStateProps
}
export default Report