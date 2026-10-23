import React, { useState, useEffect } from "react";

export default function CarBlogDashboard() {
  // --- STATE MANAGEMENT ---
  const [manufacturers, setManufacturers] = useState([]);
  const [carList, setCarList] = useState([]);
  const [lastServerResponse, setLastServerResponse] = useState(null);

  // Form Fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2026);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  // Edit Mode State
  const [editingId, setEditingId] = useState(null);

  // --- FETCH REFRESH FUNCTION ---
  const fetchCars = () => {
    fetch("http://localhost:5000/api/v1/car")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) setCarList(resData.data);
      })
      .catch((err) => console.error("Error loading cars:", err));
  };

  useEffect(() => {
    // Fetch Manufacturers for dropdown setup
    fetch("http://localhost:5000/api/v1/manufacturer?limit=9")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) setManufacturers(resData.data);
      })
      .catch((err) => console.error("Error loading manufacturers:", err));

    fetchCars();
  }, []);

  // --- ACTIONS ---
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

  // --- SUBMIT (CREATE / UPDATE) ---

  const handleCarSubmission = (e) => {
    e.preventDefault();

    const isEditing = editingId !== null;
    const url = isEditing
      ? `http://localhost:5000/api/v1/car/${editingId}`
      : "http://localhost:5000/api/v1/car";

    // 1. Put the form fields together into an individual object
    const carData = {
      make,
      model,
      year,
      manufacturer: selectedManufacturer,
    };

    // 2. Wrap it inside a "car" key for POST requests so your backend can read it
    const payload = isEditing ? carData : { car: carData };

    fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // Send the wrapped payload here
    })
      .then((res) => res.json())
      .then((result) => {
        setLastServerResponse(result);
        if (result.success) {
          fetchCars();
          resetFormState();
        }
      })
      .catch((err) => console.error("Submission error:", err));
  };

  // --- BASE LAYOUT CSS-IN-JS OBJECTS (Replace these with your CSS classes) ---
  const styles = {
    container: {
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "sans",
    },
    layoutGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    formWrapper: {
      border: "4px solid #transparent",
      boxShadow: "6px 3px 13px rgba(55, 91, 235, 0.57)",
      padding: "20px",
      borderRadius: "8px",
      background: "#f9f1f1ff",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column",
    },
    label: { marginBottom: "5px", fontWeight: "bold", fontSize: "20px" },
    input: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #2a070780",
    },
    button: {
      padding: "10px",
      background: "#184170ff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    cancelBtn: {
      padding: "4px 8px",
      background: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    card: {
      border: "2px solid #transparent",
      boxShadow: "6px 3px 13px rgba(55, 91, 235, 0.57)",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "15px",
      background: "#f9f1f1ff",
      position: "relative",
    },
    cardEditing: { border: "2px solid #ff9800" },
    dossier: {
      background: "#eaeaea",
      padding: "10px",
      borderRadius: "4px",
      marginTop: "10px",
      fontSize: "13px",
    },
    actionRow: { marginTop: "10px", display: "flex", gap: "10px" },
    logWrapper: {
      marginTop: "20px",
      padding: "15px",
      background: "#222",
      color: "#00ff00",
      borderRadius: "6px",
      overflowX: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center" }}>🏎️ Custom Styled Car Dashboard</h1>

      <div style={styles.layoutGrid}>
        {/* LEFT COLUMN: RAW HTML INPUT FORM */}
        <div>
          <div style={styles.formWrapper}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2>{editingId ? "Edit Car Post" : "Add Car Post"}</h2>
              {editingId && (
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={resetFormState}
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleCarSubmission}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Make / Brand</label>
                <input
                  type="text"
                  style={styles.input}
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Model</label>
                <input
                  type="text"
                  style={styles.input}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Year</label>
                <input
                  type="number"
                  style={styles.input}
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || 2026)}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Manufacturer Data Profile</label>
                <select
                  style={styles.input}
                  value={selectedManufacturer}
                  onChange={(e) => setSelectedManufacturer(e.target.value)}
                  required
                >
                  <option value="">Select a Manufacturer...</option>
                  {manufacturers.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} ({m.location})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  background: editingId ? "#ff9800" : "#007bff",
                }}
              >
                {editingId ? "Save Changes" : "Publish Post"}
              </button>
            </form>
          </div>

          {/* SERVER LOG MONITOR */}
          <div style={styles.logWrapper}>
            <h4 style={{ margin: "0 0 10px 0", color: "#aaa" }}>
              Live Server Logger:
            </h4>
            {lastServerResponse ? (
              <pre style={{ margin: 0 }}>
                {JSON.stringify(lastServerResponse, null, 2)}
              </pre>
            ) : (
              <span style={{ fontStyle: "italic", color: "#888" }}>
                No API activity tracked yet.
              </span>
            )}
          </div>
        </div>

        <div>
          <h2>Latest Showroom Entries ({carList.length})</h2>
          {carList.length === 0 ? (
            <p>No cars available in the feed.</p>
          ) : (
            carList.map((car) => {
              const isEditingThis = editingId === car._id;
              const cardCombinedStyle = isEditingThis
                ? { ...styles.card, ...styles.cardEditing }
                : styles.card;

              return (
                <div key={car._id} style={cardCombinedStyle}>
                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>
                  <small style={{ color: "#666" }}>
                    Database ID: {car._id}
                  </small>

                  {/* ACTION CONTROLLERS */}
                  <div style={styles.actionRow}>
                    <button
                      type="button"
                      style={{
                        ...styles.button,
                        background: "#28a745",
                        padding: "5px 10px",
                        fontSize: "12px",
                      }}
                      onClick={() => startEditing(car)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
