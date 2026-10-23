import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import CarForm from "./CarForm";

export default function CarBlogDashboard() {
  const [manufacturers, setManufacturers] = useState([]);
  const [carList, setCarList] = useState([]);
  const [lastServerResponse, setLastServerResponse] = useState(null);

  // Form Fields State
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2026);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCars = () => {
    api
      .getCars()
      .then((resData) => {
        if (resData.success) setCarList(resData.data);
      })
      .catch((err) => console.error("Error loading cars:", err));
  };

  useEffect(() => {
    api
      .getManufacturers(9)
      .then((resData) => {
        if (resData.success) setManufacturers(resData.data);
      })
      .catch((err) => console.error("Error loading manufacturers:", err));

    fetchCars();
  }, []);

  const startEditing = (car) => {
    setEditingId(car._id);
    setMake(car.make);
    setModel(car.model);
    setYear(car.year);
    setSelectedManufacturer(car.manufacturer?._id || car.manufacturer || "");
  };

  const resetFormState = () => {
    setEditingId(null);
    setMake("");
    setModel("");
    setYear(2026);
    setSelectedManufacturer("");
  };

  const handleCarSubmission = (e) => {
    e.preventDefault();
    const carData = { make, model, year, manufacturer: selectedManufacturer };

    api
      .submitCar(carData, editingId)
      .then((resData) => {
        setLastServerResponse(resData);
        if (resData.success) {
          fetchCars();
          resetFormState();
        }
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setLastServerResponse({ success: false, message: err.message });
      });
  };

  const handleCarDeletion = (id) => {
    api
      .deleteCar(id)
      .then((resData) => {
        setLastServerResponse(resData);
        if (resData.success) {
          fetchCars();
          if (editingId === id) resetFormState();
        }
      })
      .catch((err) => console.error("Deletion error:", err));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Car Blog Dashboard</h1>

      {/* Extracted Form Sub-Component */}
      <CarForm
        manufacturers={manufacturers}
        editingId={editingId}
        make={make}
        setMake={setMake}
        model={model}
        setModel={setModel}
        year={year}
        setYear={setYear}
        selectedManufacturer={selectedManufacturer}
        setSelectedManufacturer={setSelectedManufacturer}
        onSubmit={handleCarSubmission}
        onCancel={resetFormState}
      />

      {lastServerResponse && (
        <div
          style={{
            marginBottom: "30px",
            padding: "10px",
            backgroundColor: lastServerResponse.success ? "#d4edda" : "#f8d7da",
            border: "1px solid",
            borderRadius: "4px",
          }}
        >
          <strong>Last Server Response:</strong>
          <pre style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
            {JSON.stringify(lastServerResponse, null, 2)}
          </pre>
        </div>
      )}

      <h3>Current Inventory Catalog</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Year
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Make
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Model
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {carList.map((car) => (
            <tr key={car._id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {car.year}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {car.make}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {car.model}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                <button
                  onClick={() => startEditing(car)}
                  style={{ marginRight: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCarDeletion(car._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
