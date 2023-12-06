import React from "react";

import { Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PaginationSection = ({
  items,
  itemsPerPage,
  currentPage,
  handlePageChange,
}) => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      mt={3}
      color="red"
    >
      <Pagination
        count={Math.ceil(items.length / itemsPerPage)}
        page={currentPage}
        color="secondary"
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component="button"
            onClick={() => handlePageChange(null, item.page)}
            {...item}
            slots={{
              previous: ArrowBackIosNewIcon,
              next: ArrowForwardIosIcon,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationSection;
