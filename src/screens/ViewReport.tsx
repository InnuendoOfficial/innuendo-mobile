import React, { useState, useRef, useLayoutEffect } from 'react';
import { useQueryClient } from 'react-query';
import { TouchableOpacity } from 'react-native';
import { AlertDialog, Button, Heading, HStack, Icon, Image, VStack } from 'native-base';
import moment from 'moment';
import { EditReportProps } from './types'
import useEditedReportStore from '../store/useEditedReport';
import ScrollScreenView from '../components/ScrollScreenView';
import { useNavigation } from '@react-navigation/native';
import { StackNavProp } from '../navigation/types';
import ReportIllustration from "../assets/illustrations/Report.png"
import SymptomsSummary from '../components/SymptomsSummary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useReportMutation from '../hooks/useReportsMutation';


function DeleteReportButton({ setIsDeleteDialogOpen } : { setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const toggleDeleteDialog = () => setIsDeleteDialogOpen(isOpen => !isOpen)

  return (
    <TouchableOpacity onPress={toggleDeleteDialog}>
      <Icon as={MaterialCommunityIcons} name="delete" size={7} color="white" />
    </TouchableOpacity>
  )
}

function DeleteReportDialog({ isOpen, setIsOpen } : { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const cancelRef = useRef(null);
  const navigation = useNavigation<StackNavProp>()
  const report = useEditedReportStore((state) => state.report)
  const editReport = useEditedReportStore((state) => state.editReport)
  const queryClient = useQueryClient()
  const deleteReportMutation = useReportMutation('delete', queryClient)
  const [isDeleting, setIsDeleting] = useState(false)

  const onClose = () => setIsOpen(!isOpen)

  const onDelete = async () => {
    setIsDeleting(true)
    const { error } = await deleteReportMutation.mutateAsync(report)
    setIsDeleting(false)
    if (error) {
      console.error(error)
      return
    }
    editReport({
      id: 0,
      date: "",
      user_id: 0,
      symptoms: []
    })
    navigation.goBack()
  }


  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          Supprimer le rapport
        </AlertDialog.Header>
        <AlertDialog.Body>
          Voulez-vous vraiment supprimez ce rapport ?
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              Annuler
            </Button>
            <Button
              colorScheme="danger"
              isLoading={isDeleting}
              onPress={onDelete}
            >
              Supprimer
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

function EditReportButton() {
  const navigation = useNavigation<StackNavProp>()
  const goToEditReport = () => navigation.navigate("EditReport")

  return (
    <TouchableOpacity onPress={goToEditReport}>
      <Icon as={Ionicons} name="create-outline" size={7} color="white" />
    </TouchableOpacity>
  )
}

function ViewReportScreen({ navigation }: EditReportProps) {
  const report = useEditedReportStore((state) => state.report)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <HStack space="2">
        <EditReportButton />
        <DeleteReportButton setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
      </HStack>
      )
    });
  }, [navigation, report]);

  return (
    <ScrollScreenView>
      <VStack space="2" alignItems="center">
        <Heading color="black" textAlign="center">
          Rapport du { "\n" + moment(report.date).format('dddd DD MMMM Y') }
        </Heading>
        <Image
          style={{ width: 250, height: 250 }}
          source={ReportIllustration}
          alt="Femme remplissant son rapport journalier"
        />
        <SymptomsSummary />
      </VStack>
      <DeleteReportDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </ScrollScreenView>
  )
}

export default ViewReportScreen