const BASE_URL = "http://localhost:5000/api/v1";

export const api = {
  // Fetch lists
  getCars: () => fetch(`${BASE_URL}/car`).then((res) => res.json()),

  getManufacturers: (limit = 9) =>
    fetch(`${BASE_URL}/manufacturer?limit=${limit}`).then((res) => res.json()),

  // Create or Update
  submitCar: (carData, editingId = null) => {
    const isEditing = editingId !== null;
    const url = isEditing ? `${BASE_URL}/car/${editingId}` : `${BASE_URL}/car`;

    return fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car: carData }),
    }).then((res) => res.json());
  },

  // Delete entry
  deleteCar: (id) =>
    fetch(`${BASE_URL}/car/${id}`, { method: "DELETE" }).then((res) =>
      res.json(),
    ),
};
