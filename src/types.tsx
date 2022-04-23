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

type Report = {
  date: string, // format: "YYYY-MM-DD", ex: "2021-12-14"
  period: Period,
  digestiveDisorders: DigestiveDisorders,
  urinaryDisorders: UrinaryDisorders,
  fatigue: Fatigue,
  painDuringSex: boolean,
  medicines: string[]
}

type ReportStateProps = {
  report: Report,
  setReport: React.Dispatch<React.SetStateAction<Report>>
}

const blankReport: Report = {
  date: "",
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
  painDuringSex: false,
  medicines: [""]
}

export { blankReport }
export type { ReportStateProps }
export default Report