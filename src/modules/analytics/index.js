import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Heading } from "./styles";

import Header from "./components/header";
import ReportsTable from "./components/reports-table";

const Analytics = (props) => {
  return (
    <div>
      <Heading>Analytics</Heading>
      <Header />
      <ReportsTable />
    </div>
  );
};

export default Analytics;
