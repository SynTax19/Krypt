import React from "react";
// import { Spin } from "antd";
// import Stack from "@mui/material/Stack";
// import CircularProgress from "@mui/material/CircularProgress";
import loading from "./loading.gif";

const Loader = () => {
  return (
    // <Stack
    //   sx={{ color: "grey.500" }}
    //   spacing={3}
    //   direction="row"
    //   style={{ display: "flex", justifyContent: "center" }}
    // >
    //   <CircularProgress color="secondary" />
    //   <CircularProgress color="success" />
    //   <CircularProgress color="inherit" />
    // </Stack>
    <div
      className="text-center"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <img className="my-3" src={loading} alt="loading" />
    </div>
  );
};

export default Loader;
