import React from "react";

export default function CarForm({
  manufacturers,
  editingId,
  make,
  setMake,
  model,
  setModel,
  year,
  setYear,
  selectedManufacturer,
  setSelectedManufacturer,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h3>{editingId ? "Edit Car Details" : "Add a New Car"}</h3>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block" }}>Make:</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block" }}>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block" }}>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || 2026)}
          required
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block" }}>Manufacturer:</label>
        <select
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
          required
          style={{ width: "100%", padding: "5px" }}
        >
          <option value="">-- Select a Manufacturer --</option>
          {manufacturers.map((man) => (
            <option key={man._id} value={man._id}>
              {man.name || man.make || "Unknown Manufacturer"}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        style={{
          marginRight: "10px",
          padding: "5px 15px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "3px",
        }}
      >
        {editingId ? "Update Car" : "Submit Car"}
      </button>

      {editingId && (
        <button
          type="button"
          onClick={onCancel}
          style={{ padding: "5px 15px" }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}
