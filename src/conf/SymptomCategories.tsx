import { SymptomCategory } from "./types";
import Report, { blankReport } from "../types";

const isCompleted = (
  report: Report,
  reportField: keyof Report
): boolean => JSON.stringify(report[reportField])
          !== JSON.stringify(blankReport[reportField])

const SymptomCategories: SymptomCategory[] = [
  {
    name: "Menstruations",
    icon: require("../assets/icons/menstruationIcon.png"),
    image: require("../assets/illustrations/Menstrual.png"),
    inputIndicator: "Graduation",
    isCompleted: (report) => isCompleted(report, 'period'),
    field: "period",
    symptoms: [
      {
        reportKey: "pain",
        input: {
          title: "Douleurs de vos mentruations",
          indicator: "Douleurs sur 10"
        },
        display: (report) => `Douleurs : ${report.period.pain} sur 10`
      },
      {
        reportKey: "flow",
        input: {
          title: "Flux de sang",
          indicator: "Flux sur 10"
        },
        display: (report) => `Flux : ${report.period.flow} sur 10`
      }
    ]
  },
  {
    name: "Fatigue",
    icon: require("../assets/icons/tiredIcon.png"),
    image: require("../assets/illustrations/Tired.png"),
    inputIndicator: "Cochez vos symptômes",
    isCompleted: (report) => isCompleted(report, 'fatigue'),
    field: "fatigue",
    symptoms: [
      {
        reportKey: "pelvicPain",
        input: {
          title: "Douleurs pelviennes"
        },
        display: "Douleurs pelviennes"
      },
      {
        reportKey: "lowerBackPain",
        input: {
          title: "Douleurs lombaires"
        },
        display: "Douleurs lombaires"
      },
      {
        reportKey: "fatigue",
        input: {
          title: "Fatigue générale"
        },
        display: "Fatigue générale"
      }
    ]
  },
  {
    name: "Médications",
    icon: require("../assets/icons/medicIcon.png"),
    image: require("../assets/illustrations/Medic.png"),
    inputIndicator: "Médicaments pris aujourd'hui",
    isCompleted: (report) => isCompleted(report, 'medicines'),
    field: "medicines",
    symptoms: [
      {
        input: {
          title: "Nom du médicament",
          indicator: "Douleurs sur 10"
        },
        display: "Médicaments"
      }
    ]
  },
  {
    name: "Troubles urinaires",
    icon: require("../assets/icons/stomacPainIcon.png"),
    image: require("../assets/illustrations/Eyes.png"),
    inputIndicator: "Cochez vos symptômes",
    isCompleted: (report) => isCompleted(report, 'urinaryDisorders'),
    field: "urinaryDisorders",
    symptoms: [
      {
        reportKey: "pain",
        input: {
          title: "Douleurs de vos troubles urinaires",
          indicator: "Douleurs sur 10"
        },
        display: (report) => `Douleurs : ${report.urinaryDisorders.pain} / 10`
      },
      {
        reportKey: "burn",
        input: {
          title: "Brûlure"
        },
        display: "Brûlure",
      },
      {
        reportKey: "frequentUrges",
        input: {
          title: "Envie fréquente d'uriner"
        },
        display: "Envie fréquente d'uriner"
      },
      {
        reportKey: "troubleEmptyingBladder",
        input: {
          title: "Difficultés pour vider la vessie"
        },
        display: "Difficultés pour vider la vessie"
      },
      {
        reportKey: "presenceOfBlood",
        input: {
          title: "Présence de sang"
        },
        display: "Présence de sang"
      }
    ]
  },
  {
    name: "Troubles digestifs",
    icon: require("../assets/icons/digestiveIcon.png"),
    image: require("../assets/illustrations/Stomachache.png"),
    inputIndicator: "Cochez vos symptômes",
    isCompleted: (report) => isCompleted(report, 'digestiveDisorders'),
    field: "digestiveDisorders",
    symptoms: [
      {
        reportKey: "pain",
        input: {
          title: "Douleurs digestives",
          indicator: "Douleurs sur 10"
        },
        display: (report) => `Douleurs : ${report.digestiveDisorders.pain} / 10`
      },
      {
        reportKey: "constipation",
        input: {
          title: "Constipation"
        },
        display: "Constipation"
      },
      {
        reportKey: "diarrhea",
        input: {
          title: "Diarhée"
        },
        display: "Diarhée"
      },
      {
        reportKey: "presenceOfBlood",
        input: {
          title: "Présence de sang"
        },
        display: "Présence de sang"
      }
    ]
  },
  {
    name: "Relations sexuelles",
    icon: require("../assets/icons/sexIcon.png"),
    image: require("../assets/illustrations/Love.png"),
    inputIndicator: "Evaluez vos symptômes",
    isCompleted: (report) => isCompleted(report, 'painDuringSex'),
    field: "painDuringSex",
    symptoms: [
      {
        input: {
          title: "Douleurs pendant rapports sexuelles"
        },
        display: "Douleurs pendant rapports sexuelles"
      }
    ]
  }
]

export default SymptomCategories