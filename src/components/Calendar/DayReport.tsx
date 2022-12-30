import React from 'react';
import { Text, Box, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';
import moment from 'moment';
import { StackNavProp} from '../../navigation/types';

type Props = {
    date: DateData,
    reportExists: boolean
}

const Theme = {
    purple: "#776CCB",
    lightPurple: "#AFACC6",
    grey: "#67647D",
    lightGrey: "#AFACC6",
}

function DayReport({ date, reportExists }: Props) {
    const navigation = useNavigation<StackNavProp>()
    const today = new Date()
    const dayInFuture: boolean = date.timestamp > today.getTime()

    // const onPress = () => {
    //     navigation.push(reportExists ? 'ViewReport' : 'EditReport', {
    //     reportDate: date.dateString
    //     })
    // }

    const onPress = () => navigation.push("EditReport", {reportDate: date.dateString})

    return (
        <Box bgColor={'white'} width="90%" borderRadius={12} padding="10" shadow="1" >
            <Text fontFamily={"roboto"} color={"grey"} marginBottom="50" marginLeft="10">
                { moment(date.dateString).format('dddd DD MMMM Y') }
            </Text>
            {
                !dayInFuture &&
                <Button size="sm" borderRadius={12} bgColor={Theme.purple} padding={"5"} onPress={onPress}>
                    <Text fontFamily={"roboto"} color={"white"} >
                        { reportExists ? "Consulter le rapport" : "Créer un nouveau rapport" }
                    </Text>
                </Button>
            }
        </Box>
    )
}

export default DayReport