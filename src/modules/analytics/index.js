import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Heading } from "./styles";

import Header from "./components/header";
import ReportsTable from "./components/reports-table";
import { fetchAllApps, fetchReports } from "./actions";

const Analytics = (props) => {
  const dispatch = useDispatch();
  const { fromDate, toDate } = useSelector((state) => ({
    fromDate: state.analytics.dateRange.fromDate,
    toDate: state.analytics.dateRange.toDate,
  }));

  useEffect(() => {
    dispatch(fetchAllApps());
  }, []);

  useEffect(() => {
    dispatch(fetchReports({ fromDate, toDate }));
  }, [fromDate, toDate]);

  return (
    <div>
      <Heading>Analytics</Heading>
      <Header />
      <ReportsTable />
    </div>
  );
};

export default Analytics;
