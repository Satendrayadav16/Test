import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import ItemCard from "./component/ItemCard";
import PaginationSection from "./component/PaginationSection";
import "./App.css";

// const API_URL = "https://api.example.com/items";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      // Choose either API endpoint or local JSON file based on a condition
      const apiUrl =
        process.env.REACT_APP_USE_API === "true"
          ? "https://api.example.com/items"
          : "/data/items.json";

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(items);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      await fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mb-2">Item List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className="item-container">
            <Grid container spacing={2}>
              {currentItems.map((item) => (
                <Grid
                  key={item.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ height: "100%" }}
                >
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>

            <PaginationSection
              items={items}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />

            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemList;
