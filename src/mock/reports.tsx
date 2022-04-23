import Report from "../types";

const mockReports: Report[] = [
{
    date: '2022-01-08',
    period: {
        pain: 8,
        flow: 6
    },
    digestiveDisorders: {
        pain: 7,
        presenceOfBlood: true,
        diarrhea: true,
        constipation: false
    },
    urinaryDisorders: {
        pain: 2,
        burn: false,
        presenceOfBlood: false,
        troubleEmptyingBladder: true,
        frequentUrges: true
    },
    fatigue: {
      fatigue: true,
      lowerBackPain: true,
      pelvicPain: false,
    },
    painDuringSex: true,
    medicines: [""]
},
{
    date: '2022-01-10',
    period: {
        pain: 4,
        flow: 2
    },
    digestiveDisorders: {
        pain: 3,
        presenceOfBlood: false,
        diarrhea: true,
        constipation: false
    },
    urinaryDisorders: {
        pain: 1,
        burn: false,
        presenceOfBlood: false,
        troubleEmptyingBladder: true,
        frequentUrges: false
    },
    fatigue: {
      fatigue: true,
      lowerBackPain: true,
      pelvicPain: false,
    },
    painDuringSex: false,
    medicines: [""]
},
{
  date: '2022-01-13',
  period: {
    pain: 0,
    flow: 0
  },
  digestiveDisorders: {
    pain: 6,
    presenceOfBlood: true,
    diarrhea: false,
    constipation: true
  },
  urinaryDisorders: {
    pain: 6,
    burn: false,
    presenceOfBlood: true,
    troubleEmptyingBladder: true,
    frequentUrges: true
  },
  fatigue: {
    fatigue: true,
    lowerBackPain: true,
    pelvicPain: false,
  },
  painDuringSex: false,
  medicines: [""]
},
{
  date: '2022-01-16',
  period: {
    pain: 10,
    flow: 10
  },
  digestiveDisorders: {
    pain: 10,
    presenceOfBlood: true,
    diarrhea: false,
    constipation: true
  },
  urinaryDisorders: {
    pain: 10,
    burn: true,
    presenceOfBlood: true,
    troubleEmptyingBladder: true,
    frequentUrges: true
  },
  fatigue: {
    fatigue: true,
    lowerBackPain: true,
    pelvicPain: true
  },
  painDuringSex: true,
  medicines: [""]
}
]

export default mockReports