import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");
  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    setTerm(event.target.value);
  };
  return (
    <>
      <h3> Search Bar</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={term}
          onChange={handleChange}
        />
        {term.length < 3 && <p>Search term must be at least 3 characters</p>}
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default SearchBar;
