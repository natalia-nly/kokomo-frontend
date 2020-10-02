import React from "react";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const LoaderScreen = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <LoaderScreen>
      <PuffLoader color={"#3294bb"} />
    </LoaderScreen>
  );
};

export default Loader;
