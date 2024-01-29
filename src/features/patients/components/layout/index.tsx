import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const dispatch: AppDispatch = useDispatch();

  const { patients, status, error } = useSelector(
    (state: AppState) => state.patients
  );

  useEffect(() => {
    dispatch(fetchPatients({ page, limit }));
  }, [dispatch, page, limit]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const isAllSelected = limit === Number.MAX_SAFE_INTEGER;

  return (
    <>
      <Box
        sx={{ background: "gray.50", minHeight: "100vh", padding: pxToRem(80) }}
      >
        {status !== "loading" && (
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
        )}
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
        {status !== "loading" && (
          <Flex
            sx={{
              gap: pxToRem(16),
              align: "center",
              justifyContent: "center",
              marginTop: pxToRem(32),
            }}
          >
            {!isAllSelected && (
              <>
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  sx={{ backgroundColor: "gray.200" }}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  sx={{ backgroundColor: "gray.200" }}
                >
                  Next
                </Button>
              </>
            )}
            <Select
              width="auto"
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={Number.MAX_SAFE_INTEGER}>All</option>
            </Select>
          </Flex>
        )}
      </Box>
      <EditModal />
    </>
  );
};

export default PatientsLayout;
