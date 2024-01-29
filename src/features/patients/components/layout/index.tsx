import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { pxToRem } from "common/helpers";
import { fetchPatients } from "features/patients/patientsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "store";
import EditModal from "../edit-modal";
import PatientCard from "../patient-card";

const PatientsLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { patients, status, error } = useSelector(
    (state: AppState) => state.patients
  );

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{ background: "gray.50", minHeight: "100vh", padding: pxToRem(80) }}
      >
        <InputGroup
          sx={{
            width: "25%",
            marginBottom: pxToRem(32),
          }}
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="teal.500" />
          </InputLeftElement>
          <Input
            placeholder="Search patients by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {status === "loading" && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={pxToRem(200)}
          >
            <Spinner color="teal.500" />
          </Box>
        )}
        {status === "failed" && (
          <Text color="red.500" textAlign="center">
            Failed to load patients: {error}
          </Text>
        )}
        {status === "succeeded" && (
          <SimpleGrid columns={[1, null, 3]} spacing={pxToRem(50)}>
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <EditModal />
    </>
  );
};

export default PatientsLayout;
