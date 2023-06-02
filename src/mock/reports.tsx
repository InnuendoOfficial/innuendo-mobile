// reports.tsx
/**
 * Store the mock reports.
 */

import Report from "../types";

const mockReports: Report[] = [
  {
    date: "2022-11-08",
    symptoms: {
      period: {
        pain: 8,
        flow: 6,
      },
      digestiveDisorders: {
        pain: 7,
        presenceOfBlood: true,
        diarrhea: true,
        constipation: false,
      },
      urinaryDisorders: {
        pain: 2,
        burn: false,
        presenceOfBlood: false,
        troubleEmptyingBladder: true,
        frequentUrges: true,
      },
      fatigue: {
        fatigue: true,
        lowerBackPain: true,
        pelvicPain: false,
      },
      pain: {
        painDuringSex: true,
      },
      medicines: {
        medicines: [""],
      },
    },
  },
  {
    date: "2022-11-03",
    symptoms: {
      period: {
        pain: 4,
        flow: 2,
      },
      digestiveDisorders: {
        pain: 3,
        presenceOfBlood: false,
        diarrhea: true,
        constipation: false,
      },
      urinaryDisorders: {
        pain: 1,
        burn: false,
        presenceOfBlood: false,
        troubleEmptyingBladder: true,
        frequentUrges: false,
      },
      fatigue: {
        fatigue: true,
        lowerBackPain: true,
        pelvicPain: false,
      },
      pain: {
        painDuringSex: true,
      },
      medicines: {
        medicines: [""],
      },
    },
  },
  {
    date: "2022-11-15",
    symptoms: {
      period: {
        pain: 0,
        flow: 0,
      },
      digestiveDisorders: {
        pain: 6,
        presenceOfBlood: true,
        diarrhea: false,
        constipation: true,
      },
      urinaryDisorders: {
        pain: 6,
        burn: false,
        presenceOfBlood: true,
        troubleEmptyingBladder: true,
        frequentUrges: true,
      },
      fatigue: {
        fatigue: true,
        lowerBackPain: true,
        pelvicPain: false,
      },
      pain: {
        painDuringSex: false,
      },
      medicines: {
        medicines: [""],
      },
    },
  },
  {
    date: "2022-12-01",
    symptoms: {
      period: {
        pain: 10,
        flow: 10,
      },
      digestiveDisorders: {
        pain: 10,
        presenceOfBlood: true,
        diarrhea: false,
        constipation: true,
      },
      urinaryDisorders: {
        pain: 10,
        burn: true,
        presenceOfBlood: true,
        troubleEmptyingBladder: true,
        frequentUrges: true,
      },
      fatigue: {
        fatigue: true,
        lowerBackPain: true,
        pelvicPain: true,
      },
      pain: {
        painDuringSex: false,
      },
      medicines: {
        medicines: [""],
      },
    },
  },
];

export default mockReports;
