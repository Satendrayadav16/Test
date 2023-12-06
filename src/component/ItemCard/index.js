import React from "react";
import { Card, CardContent } from "@mui/material";

const ItemCard = ({ item }) => {
  return (
    <Card sx={{ height: "100%", color: "#FF0080" }}>
      <CardContent>
        <h3> {item.name} </h3>
        <p> {item.description} </p>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
