import { Button, Heading, Text, VStack } from "native-base";
import React, { useState } from "react";
import api from "../api";
import ScreenView from "../components/ScreenView";
import { DeleteAccountScreenProps } from "./types";

function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    
    const deleteAccountAndData = async () => {
        setIsSendingFeedback(true);
        const { error } = await api.sendFeedback("blabla");
        setIsSendingFeedback(false);
        if (!error) {
            navigation.goBack();
        }
    };

    const deleteAccountWithoutData = async () => {
        setIsSendingFeedback(true);
        const { error } = await api.sendFeedback("blabla");
        setIsSendingFeedback(false);
        if (!error) {
            navigation.goBack();
        }
    };

    return (
        <ScreenView>
        <VStack space={5} alignItems="center">
            <Heading>Suppression du compte</Heading>
            <Text textAlign="center">
            Vous êtes sur le point d'entamer le processus de désactivation de votre compte. Cela signifie que vous ne serez plus en mesure de vous connecter à Innuendo de manière permanente.
            Deux options s'offrent à vous.
            </Text>
            <Text textAlign="center" fontWeight="bold">
            Option 1: La suppression du compte et les données associées :
            </Text>
            <Text textAlign="center">
            En choisissant cette option, vous supprimerez définitivement votre compte ainsi que toutes les données qui y sont associées. Cela signifie que nous n'aurons plus accès à vos rapports personnelles.
            </Text>
            <Text textAlign="center" fontWeight="bold">
            Option 2: La suppression du compte tout en conservant les données pour la recherche sur l'endométriose :
            </Text>
            <Text textAlign="center">
            Si vous sélectionnez cette option, votre compte sera supprimé, mais nous conserverons vos données de manière anonyme pour nos recherches sur l'endométriose. Ces données seront utilisées à des fins de recherche médicale uniquement et ne seront pas associées à votre identité.
            </Text>

            <Button rounded="lg" size="lg" w="100%" bgColor="danger.600" marginTop="9" fontWeight="bold" onPress={deleteAccountWithoutData} >
                <Text bold style={{ color: 'white', fontSize: 15}}>Supprimer le compte tout en conservant les données pour la recherche sur l'endométriose</Text>
            </Button>

            <Button rounded="lg" size="lg" w="100%" bgColor="danger.600" fontWeight="bold" onPress={deleteAccountAndData} >
                <Text bold style={{ color: 'white', fontSize: 15 }}>Supprimer le compte et les données</Text>
            </Button>

            {/* <Button size="lg" isLoading={isSendingFeedback} onPress={sendFeedback}>
            Envoyer un retour
            </Button> */}
        </VStack>
        </ScreenView>
    );
}

export default DeleteAccountScreen;