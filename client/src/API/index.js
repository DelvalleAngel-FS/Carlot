import axios from "axios";

const API = Object.create(null);

API.fetchCars = async () => {
  const response = await axios.get("http://localhost:5000/api/v1/car");
  console.log(response.data);
  return response.data;
};
export default API;
