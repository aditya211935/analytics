import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Heading } from "./styles";
import Header from "./components/header";

const Analytics = (props) => {
  return (
    <div>
      <Heading>Analytics</Heading>
      <Header />
    </div>
  );
};

export default Analytics;
