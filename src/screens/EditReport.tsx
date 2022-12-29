import React, { useLayoutEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useQueryClient } from 'react-query';
import { AlertDialog, Button, Heading, Icon, VStack } from 'native-base';
import moment from 'moment';
import { EditReportProps } from './types'
import useEditedReportStore from '../store/useEditedReport';
import SymptomsPanel from '../components/SymptomsPanel';
import ScrollScreenView from '../components/ScrollScreenView';
import useReportMutation from '../hooks/useReportsMutation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavProp } from '../navigation/types';

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
  const queryClient = useQueryClient()
  const deleteReportMutation = useReportMutation('delete', queryClient)
  const [isDeleting, setIsDeleting] = useState(false)

  const onClose = () => setIsOpen(!isOpen)

  const onDelete = async () => {
    setIsDeleting(true)
    const { error } = await deleteReportMutation.mutateAsync(report)
    setIsDeleting(false)
    console.log(error)
    if (!error) {
      navigation.goBack()
    }
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

function EditReportScreen({ navigation }: EditReportProps) {
  const report = useEditedReportStore((state) => state.report)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const queryClient = useQueryClient()
  const createReportMutation = useReportMutation('create', queryClient)
  const editReportMutation = useReportMutation('edit', queryClient)

  const saveReport = async () => {
    const isNewReport = (report.id === 0)
    setIsSaving(true)
    const { error } = (isNewReport)
      ? await createReportMutation.mutateAsync(report)
      : await editReportMutation.mutateAsync(report)
    setIsSaving(false)
    if (!error) {
      navigation.goBack()
    }
  }

  useLayoutEffect(() => {
    const isNewReport = (report.id === 0)

    navigation.setOptions({
      headerRight: isNewReport ? undefined : () =>
        <DeleteReportButton setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
    });
  }, [navigation, report]);

  return (
    <ScrollScreenView>
      <VStack space="lg">
        <Heading color="black" textAlign="center">
          Rapport du { "\n" + moment(report.date).format('dddd DD MMMM Y') }
        </Heading>
        <SymptomsPanel />
        <Button size="lg" isLoading={isSaving} onPress={saveReport}>
          Confirmer le rapport
        </Button>
      </VStack>
      <DeleteReportDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </ScrollScreenView>
  )
}

export default EditReportScreen