import React, { useState } from "react";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform search operation with the searchQuery state
    console.log("Performing search for:", searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Enter your search query..."
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #007bff",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
