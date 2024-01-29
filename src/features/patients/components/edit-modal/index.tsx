import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { API_ENDPOINT } from "common/constants";
import { pxToRem } from "common/helpers";
import {
  setIdOfPatientToEdit,
  updatePatientLocally,
} from "features/patients/patientsSlice";
import { IPatient } from "features/patients/types";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";

interface IFormData
  extends Pick<IPatient, "name" | "description" | "website"> {}

const EditModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { patients, idOfPatientToEdit } = useSelector(
    (state: AppState) => state.patients
  );

  const dispatch = useDispatch();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>({
    defaultValues: {
      name: "",
      description: "",
      website: "",
    },
  });

  useEffect(() => {
    if (idOfPatientToEdit) {
      setIsLoading(true);

      (async () => {
        try {
          const response = await fetch(
            `${API_ENDPOINT}/users/${idOfPatientToEdit}`
          );

          const data = await response.json();
          console.log("data", data);
          setValue("name", data.name);
          setValue("description", data.description);
          setValue("website", data.website);
        } catch (error) {
          //This error can be tested by editing the fetch url to something invalid.
          console.error(error);
          toast({
            title: "Error",
            description: "Failed to fetch patient data.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          dispatch(setIdOfPatientToEdit(""));
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [dispatch, idOfPatientToEdit, setValue, toast]);

  const onSubmit = ({ name, description, website }: IFormData) => {
    let foundPatientById = patients.find(
      (patient) => patient.id === idOfPatientToEdit
    ) as IPatient;

    foundPatientById = {
      ...foundPatientById,
      name,
      description,
      website,
    };

    dispatch(updatePatientLocally(foundPatientById));
    dispatch(setIdOfPatientToEdit(""));

    toast({
      title: "Success",
      description: "Patient updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const onClose = () => {
    dispatch(setIdOfPatientToEdit(""));
  };

  return (
    <>
      {idOfPatientToEdit && (
        <Modal isOpen={!!idOfPatientToEdit} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Patient</ModalHeader>
            <ModalCloseButton />
            {isLoading ? (
              <ModalBody
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={pxToRem(120)}
              >
                <Spinner color="teal.500" />
              </ModalBody>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.description} mt={4}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.website}>
                    <FormLabel htmlFor="website">Website</FormLabel>
                    <Controller
                      name="website"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => <Input {...field} />}
                    />
                    <FormErrorMessage>
                      {errors.website && errors.website.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EditModal;
