import "react";
import "./App.css";
import API from "./API";
import SearchBar from "./components/SearchBar";

function App() {
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("Search button clicked!", event.target.search.value);
    const response = await API.fetchCars();
    console.log(response);
  };
  return (
    <>
      <h1>Carlot Search</h1>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}

export default App;
