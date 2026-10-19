import { useState, useEffect } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Paper,
  Title,
  Stack,
  Text,
  Box,
  Select,
} from "@mantine/core";

export default function CarSubmitForm() {
  // 1. Core State Variables
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [manufacturerId, setManufacturerId] = useState(null); // Holds selected dropdown ID

  // 2. Dropdown Data & UI States
  const [manufacturers, setManufacturers] = useState([]);
  const [manufacturersLoading, setManufacturersLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // 3. Fetch Manufacturers list on Component Load
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/manufacturer",
        );
        if (!response.ok) throw new Error("Failed to load manufacturers");

        const result = await response.json();

        // Map the backend documents array into Mantine's Select structure: { value, label }
        // Adjust 'item._id' and 'item.name' based on your actual schema keys
        const formattedData = result.data.map((item) => ({
          value: item._id,
          label: item.name,
        }));

        setManufacturers(formattedData);
      } catch (err) {
        console.error("Error loading dropdown data:", err);
      } finally {
        setManufacturersLoading(false);
      }
    };

    fetchManufacturers();
  }, []);

  // 4. Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setLoading(true);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Structured with your exact Postman nested object layout
      const raw = JSON.stringify({
        car: {
          make: make,
          model: model,
          year: year ? parseInt(year) : null,
          manufacturer: manufacturerId, // Dynamically assigned from dropdown state
        },
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:5000/api/v1/car",
        requestOptions,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      setResponseMessage(`Success! Car successfully added.`);

      // Reset input fields
      setMake("");
      setModel("");
      setYear("");
      setManufacturerId(null);
    } catch (err) {
      setResponseMessage(`Error submitting data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isError = responseMessage.startsWith("Error");

  return (
    <Box
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(45deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-indigo-6) 100%)",
        padding: "20px",
      }}
    >
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        withBorder
        style={{
          maxWidth: 420,
          width: "100%",
          backgroundColor: "var(--mantine-color-body)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Title order={2} mb="xs" ta="center" style={{ fontWeight: 700 }}>
          Add a New Car
        </Title>

        <Text size="sm" c="dimmed" ta="center" mb="xl">
          Enter vehicle details below to update the collection database.
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Make"
              placeholder="e.g., Tesla"
              value={make}
              onChange={(e) => setMake(e.currentTarget.value)}
              required
              variant="filled"
              radius="md"
            />

            <TextInput
              label="Model"
              placeholder="e.g., Model 3"
              value={model}
              onChange={(e) => setModel(e.currentTarget.value)}
              required
              variant="filled"
              radius="md"
            />

            <NumberInput
              label="Year"
              placeholder="e.g., 2016"
              value={year}
              onChange={setYear}
              min={1900}
              max={2027}
              required
              variant="filled"
              radius="md"
            />

            {/* Dynamic Mantine v7 Select Component */}
            <Select
              label="Manufacturer"
              placeholder={
                manufacturersLoading ? "Loading list..." : "Select manufacturer"
              }
              data={manufacturers}
              value={manufacturerId}
              onChange={setManufacturerId} // Directly updates state with selected value (ID string)
              disabled={manufacturersLoading}
              required
              variant="filled"
              radius="md"
              searchable // Allows the user to type and filter long lists dynamically
              nothingFoundMessage="No manufacturers found"
            />

            <Button
              type="submit"
              loading={loading}
              disabled={manufacturersLoading}
              fullWidth
              mt="lg"
              size="md"
              radius="md"
              color="indigo"
            >
              Add Car
            </Button>
          </Stack>
        </form>

        {responseMessage && (
          <Text
            mt="lg"
            fw={600}
            size="sm"
            ta="center"
            c={isError ? "red.9" : "teal.9"}
            style={{
              backgroundColor: isError
                ? "var(--mantine-color-red-1)"
                : "var(--mantine-color-teal-1)",
              padding: "10px",
              borderRadius: "8px",
              border: `1px solid ${isError ? "var(--mantine-color-red-3)" : "var(--mantine-color-teal-3)"}`,
            }}
          >
            {responseMessage}
          </Text>
        )}
      </Paper>
    </Box>
  );
}
