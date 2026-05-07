import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";

import { useDebouncedCallback } from "@/shared/lib/hooks";

type SearchInputProps = {
  onChange: (value: string) => void;
};

export default function SearchInput(props: SearchInputProps) {
  const { onChange } = props;

  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange(value);
  });

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: theme.spacing(7),
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Search…"
        sx={{
          color: "inherit",
          "& .MuiInputBase-input": (theme) => ({
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
              width: 200,
              "&:focus": {
                width: 350,
              },
            },
          }),
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => debouncedOnChange(event.target.value)}
      />
    </Box>
  );
}
