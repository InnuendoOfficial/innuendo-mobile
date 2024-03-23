import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { APIReport } from "../../api/reports";
import { useColorMode } from "native-base";

LocaleConfig.locales.fr = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

const Theme = {
  purple: "#776CCB",
  lightPurple: "#AFACC6",
  grey: "#67647D",
  lightGrey: "#AFACC6",
};

type Props = {
  reports: APIReport[];
  selectedDate: DateData;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateData>>;
};

function EndoCalendar({ reports, selectedDate, setSelectedDate }: Props) {
  const { colorMode } = useColorMode();
  let markedDates = {};
  reports.forEach((report) => {
    markedDates[report.date.substring(0, 10)] = {
      // No way to do it without Typescript error
      marked: true,
    };
  });

  return (
    <Calendar
      current={selectedDate.dateString}
      onDayPress={(day) => {
        setSelectedDate(day);
      }}
      markedDates={{
        ...markedDates,
        [selectedDate.dateString]: {
          selected: true,
        },
      }}
      maxDate={new Date().toISOString().substring(0, 10)}
      firstDay={1} // Start week from monday
      style={{
        borderRadius: 12,
        padding: 20,
        shadowColor: "black",
        elevation: 3,
      }}
      theme={{
        calendarBackground: colorMode === "dark" ? "#252526" : "#ffffff",
        textSectionTitleColor: Theme.lightGrey,
        textSectionTitleDisabledColor: Theme.grey,
        todayTextColor: Theme.purple,
        dayTextColor: colorMode === "dark" ? "white" : "black",
        textDisabledColor: "grey",
        dotColor: Theme.purple,
        selectedDayBackgroundColor: Theme.purple,
        selectedDayTextColor: "white",
        selectedDotColor: Theme.purple,
        arrowColor: Theme.purple,
        disabledArrowColor: Theme.lightPurple,
        monthTextColor: colorMode === "dark" ? "white" : Theme.grey,
        textDayFontFamily: "roboto",
        textMonthFontFamily: "roboto",
        textDayHeaderFontFamily: "roboto",
        textMonthFontWeight: "bold",
      }}
    />
  );
}

export default EndoCalendar;
