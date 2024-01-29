import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { pxToRem } from "common/helpers";
import { setIdOfPatientToEdit } from "features/patients/patientsSlice";
import { IPatient } from "features/patients/types";
import React from "react";
import { useDispatch } from "react-redux";

interface IPatientCardProps {
  patient: IPatient;
}

const headerHeight = 75;
const PatientCard = ({ patient }: IPatientCardProps) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setIdOfPatientToEdit(patient.id));
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderWidth: pxToRem(1.5),
        borderRadius: "lg",
        overflow: "hidden",
        boxShadow: "sm",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "lg",
          transform: `translateY(${pxToRem(2)})`,
        },
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          bg: "teal.700",
          position: "relative",
          textAlign: "center",
          height: pxToRem(headerHeight),
          paddingTop: pxToRem(4),
          paddingBottom: pxToRem(4),
        }}
      >
        <Image
          src={patient.avatar}
          alt={`Avatar of ${patient.name}`}
          sx={{
            borderRadius: "full",
            boxSize: headerHeight,
            border: "2px",
            borderColor: "white",
            position: "absolute",
            top: pxToRem(headerHeight / 2),
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Box>
      <VStack
        sx={{
          padding: 6,
          align: "stretch",
          gap: 4,
          marginTop: pxToRem(28),
          textAlign: "center",
        }}
      >
        <Heading sx={{ fontWeight: 600, fontSize: "lg" }}>
          {patient.name}
        </Heading>
        <Text sx={{ fontSize: "sm", color: "gray.500", noOfLines: 2 }}>
          {patient.description.length > 50
            ? `${patient.description.substring(0, 50)}...`
            : patient.description}
        </Text>
        <Button sx={{ size: "sm" }} onClick={handleEdit}>
          Edit Patient
        </Button>
      </VStack>
    </Box>
  );
};

export default PatientCard;
