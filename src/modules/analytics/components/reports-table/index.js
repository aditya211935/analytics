import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Table } from "common/ui";
import { TABLE_KEYS, TABLE_KEY_TO_LABEL } from "modules/analytics/constants";
import {
  addDaysToDate,
  differenceInDays,
  formatDate,
  formatNumber,
  getDistinctElements,
  isDateAfter,
  isDateBefore,
  isLess,
  isValueWithinRange,
  shortenNumber,
} from "common/utils";
import { HeaderContainer } from "./styles";
import { setTableFilters } from "modules/analytics/actions";
import FilterTooltip from "./components/filter-tooltip";
import FilterAppTooltip from "./components/filter-app-tooltip";

const ReportsTable = (props) => {
  const dispatch = useDispatch();
  const { tableFilters, tablePositionProps, reportsList, allAppsList } = useSelector((state) => ({
    tableFilters: state.analytics.tableFilters,
    tablePositionProps: state.analytics.tablePositionProps,
    reportsList: state.analytics.reportsList,
    allAppsList: state.analytics.allAppsList,
  }));

  const columns = useMemo(() => {
    const getAppName = (appId) => {
      return allAppsList.filter((app) => app.app_id === appId)[0]?.app_name || "";
    };
    const getPercentage = (num, den) => {
      return (parseFloat(num) / parseFloat(den)) * 100.0;
    };
    return {
      [TABLE_KEYS.DATE]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.DATE] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.DATE];
          return isValueWithinRange(min, max, record[TABLE_KEYS.DATE], "date");
        },
        sorter: (record1, record2) =>
          isLess(record1[TABLE_KEYS.DATE], record2[TABLE_KEYS.DATE], "date"),
        renderCell: (record, index) => formatDate(record[TABLE_KEYS.DATE]),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = getDistinctElements(
            filteredRecords.map((record) =>
              new Date(record[TABLE_KEYS.DATE]).setHours(0, 0, 0, 0).toString()
            )
          ).length;
          var minDate = records.reduce((acc, curr) =>
            isDateBefore(acc[TABLE_KEYS.DATE], curr[TABLE_KEYS.DATE]) ? acc : curr
          )[TABLE_KEYS.DATE];
          var maxDate = records.reduce((acc, curr) =>
            isDateAfter(acc[TABLE_KEYS.DATE], curr[TABLE_KEYS.DATE]) ? acc : curr
          )[TABLE_KEYS.DATE];

          var minValue = 0;
          var maxValue = differenceInDays(maxDate, minDate);

          var currentMaxValue = maxValue,
            currentMinValue = minValue;
          if (tableFilters?.[TABLE_KEYS.DATE] != null) {
            var { min, max } = tableFilters[TABLE_KEYS.DATE];
            currentMinValue = differenceInDays(min, minDate);
            currentMaxValue = differenceInDays(max, minDate);
          }

          const renderMinValue = (value) => {
            return formatDate(addDaysToDate(minDate, value));
          };

          const renderMaxValue = (value) => formatDate(addDaysToDate(minDate, value));

          const saveFilter = (min, max) => {
            var newMinDate = addDaysToDate(minDate, min);
            var newMaxDate = addDaysToDate(minDate, max);
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.DATE]: { min: newMinDate, max: newMaxDate },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.DATE]: null,
              })
            );
          };
          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={minValue}
                maxValue={maxValue}
                currentMinValue={currentMinValue}
                currentMaxValue={currentMaxValue}
                step={1}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
                renderMaxValue={renderMaxValue}
                renderMinValue={renderMinValue}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.DATE]}</h4>
              <h1>{shortenNumber(aggregatedValue)}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.APP_ID]: {
        onFilter: (record, index) => {
          if (!tableFilters?.[TABLE_KEYS.APP_ID]?.length) return true;
          var appIdsList = tableFilters[TABLE_KEYS.APP_ID] || [];
          if (appIdsList.includes(record[TABLE_KEYS.APP_ID])) return true;
          else return false;
        },
        sorter: (record1, record2) => {
          var appName1 = getAppName(record1[TABLE_KEYS.APP_ID]);
          var appName2 = getAppName(record2[TABLE_KEYS.APP_ID]);
          return appName1.localeCompare(appName2);
        },
        renderCell: (record, index) => getAppName(record[TABLE_KEYS.APP_ID]),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = getDistinctElements(
            filteredRecords.map((record) => record[TABLE_KEYS.APP_ID])
          ).length;
          var selectedAppIdsList = tableFilters?.[TABLE_KEYS.APP_ID] || [];
          var allAppsObject = Object.fromEntries(
            allAppsList.map((app) => [app.app_id, app.app_name])
          );
          var appsList = getDistinctElements(
            records.map((record) => record[TABLE_KEYS.APP_ID])
          ).map((appId) => ({
            appId,
            appName: allAppsObject[appId],
          }));

          const saveFilter = (newselectedAppIdsList) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.APP_ID]: newselectedAppIdsList,
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.APP_ID]: undefined,
              })
            );
          };
          return (
            <HeaderContainer>
              <FilterAppTooltip
                appsList={appsList}
                selectedAppIdsList={selectedAppIdsList}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.APP_ID]}</h4>
              <h1>{shortenNumber(aggregatedValue)}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.REQUESTS]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.REQUESTS] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.REQUESTS];
          return isValueWithinRange(min, max, record[TABLE_KEYS.REQUESTS], "integer");
        },
        sorter: (record1, record2) =>
          isLess(record1[TABLE_KEYS.REQUESTS], record2[TABLE_KEYS.REQUESTS], "integer"),
        renderCell: (record, index) => formatNumber(record[TABLE_KEYS.REQUESTS], "integer"),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords.reduce(
            (acc, curr) => acc + parseInt(curr[TABLE_KEYS.REQUESTS]),
            0
          );
          var minValue = records.reduce(
            (acc, curr) => Math.min(acc, parseInt(curr[TABLE_KEYS.REQUESTS])),
            Infinity
          );
          var maxValue = records.reduce(
            (acc, curr) => Math.max(acc, parseInt(curr[TABLE_KEYS.REQUESTS])),
            0
          );
          var currentMinValue = tableFilters?.[TABLE_KEYS.REQUESTS]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.REQUESTS]?.max ?? maxValue;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.REQUESTS]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.REQUESTS]: null,
              })
            );
          };
          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={minValue}
                maxValue={maxValue}
                currentMinValue={currentMinValue}
                currentMaxValue={currentMaxValue}
                step={1}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.REQUESTS]}</h4>
              <h1>{shortenNumber(aggregatedValue)}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.RESPONSES]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.RESPONSES] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.RESPONSES];
          return isValueWithinRange(min, max, record[TABLE_KEYS.RESPONSES], "integer");
        },
        sorter: (record1, record2) =>
          isLess(record1[TABLE_KEYS.RESPONSES], record2[TABLE_KEYS.RESPONSES], "integer"),
        renderCell: (record, index) => formatNumber(record[TABLE_KEYS.RESPONSES], "integer"),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords.reduce(
            (acc, curr) => acc + parseInt(curr[TABLE_KEYS.RESPONSES]),
            0
          );
          var minValue = records.reduce(
            (acc, curr) => Math.min(acc, parseInt(curr[TABLE_KEYS.RESPONSES])),
            Infinity
          );
          var maxValue = records.reduce(
            (acc, curr) => Math.max(acc, parseInt(curr[TABLE_KEYS.RESPONSES])),
            0
          );
          var currentMinValue = tableFilters?.[TABLE_KEYS.RESPONSES]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.RESPONSES]?.max ?? maxValue;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.RESPONSES]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.RESPONSES]: null,
              })
            );
          };
          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={minValue}
                maxValue={maxValue}
                currentMinValue={currentMinValue}
                currentMaxValue={currentMaxValue}
                step={1}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.RESPONSES]}</h4>
              <h1>{shortenNumber(aggregatedValue)}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.IMPRESSION]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.IMPRESSION] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.IMPRESSION];
          return isValueWithinRange(min, max, record[TABLE_KEYS.IMPRESSION], "integer");
        },
        sorter: (record1, record2) =>
          isLess(record1[TABLE_KEYS.IMPRESSION], record2[TABLE_KEYS.IMPRESSION], "integer"),
        renderCell: (record, index) => formatNumber(record[TABLE_KEYS.IMPRESSION]),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords.reduce(
            (acc, curr) => acc + parseInt(curr[TABLE_KEYS.IMPRESSION]),
            0
          );
          var minValue = records.reduce(
            (acc, curr) => Math.min(acc, parseInt(curr[TABLE_KEYS.IMPRESSION])),
            Infinity
          );
          var maxValue = records.reduce(
            (acc, curr) => Math.max(acc, parseInt(curr[TABLE_KEYS.IMPRESSION])),
            0
          );
          var currentMinValue = tableFilters?.[TABLE_KEYS.IMPRESSION]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.IMPRESSION]?.max ?? maxValue;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.IMPRESSION]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.IMPRESSION]: null,
              })
            );
          };
          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={minValue}
                maxValue={maxValue}
                currentMinValue={currentMinValue}
                currentMaxValue={currentMaxValue}
                step={1}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.IMPRESSION]}</h4>
              <h1>{shortenNumber(aggregatedValue)}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.CLICKS]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.CLICKS] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.CLICKS];
          return isValueWithinRange(min, max, record[TABLE_KEYS.CLICKS], "integer");
        },
        sorter: (record1, record2) =>
          isLess(record1[TABLE_KEYS.CLICKS], record2[TABLE_KEYS.CLICKS], "integer"),
        renderCell: (record, index) => formatNumber(record[TABLE_KEYS.CLICKS], "integer"),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords.reduce(
            (acc, curr) => acc + parseInt(curr[TABLE_KEYS.CLICKS]),
            0
          );
          var minValue = records.reduce(
            (acc, curr) => Math.min(acc, parseInt(curr[TABLE_KEYS.CLICKS])),
            Infinity
          );
          var maxValue = records.reduce(
            (acc, curr) => Math.max(acc, parseInt(curr[TABLE_KEYS.CLICKS])),
            0
          );
          var currentMinValue = tableFilters?.[TABLE_KEYS.CLICKS]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.CLICKS]?.max ?? maxValue;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.CLICKS]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.CLICKS]: null,
              })
            );
          };
          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={minValue}
                maxValue={maxValue}
                currentMinValue={currentMinValue}
                currentMaxValue={currentMaxValue}
                step={1}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.CLICKS]}</h4>
              <h1>{shortenNumber(aggregatedValue)}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.REVENUE]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.REVENUE] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.REVENUE];
          return isValueWithinRange(
            min,
            max,
            parseFloat(record[TABLE_KEYS.REVENUE]).toFixed(2),
            "float"
          );
        },
        sorter: (record1, record2) =>
          isLess(record1[TABLE_KEYS.REVENUE], record2[TABLE_KEYS.REVENUE], "float"),
        renderCell: (record, index) =>
          "$" + formatNumber(parseFloat(record[TABLE_KEYS.REVENUE]), "float"),
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords.reduce(
            (acc, curr) => acc + parseFloat(curr[TABLE_KEYS.REVENUE]),
            0
          );
          var minValue = records
            .reduce((acc, curr) => Math.min(acc, parseFloat(curr[TABLE_KEYS.REVENUE])), Infinity)
            .toFixed(2);
          var maxValue = records
            .reduce((acc, curr) => Math.max(acc, parseFloat(curr[TABLE_KEYS.REVENUE])), 0)
            .toFixed(2);
          var currentMinValue = tableFilters?.[TABLE_KEYS.REVENUE]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.REVENUE]?.max ?? maxValue;
          var step = Math.min(1, (maxValue - minValue) / 10);
          if (step < 1e-2) step = 1e-2;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.REVENUE]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.REVENUE]: null,
              })
            );
          };

          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={parseFloat(minValue)}
                maxValue={parseFloat(maxValue)}
                currentMinValue={parseFloat(currentMinValue)}
                currentMaxValue={parseFloat(currentMaxValue)}
                step={step}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.REVENUE]}</h4>
              <h1>${formatNumber(aggregatedValue, "float")}</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.FILL_RATE]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.FILL_RATE] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.FILL_RATE];
          var fillRate = getPercentage(record[TABLE_KEYS.REQUESTS], record[TABLE_KEYS.RESPONSES]);
          return isValueWithinRange(min, max, parseFloat(fillRate).toFixed(2), "float");
        },
        sorter: (record1, record2) =>
          isLess(
            getPercentage(record1[TABLE_KEYS.REQUESTS], record1[TABLE_KEYS.RESPONSES]),
            getPercentage(record2[TABLE_KEYS.REQUESTS], record2[TABLE_KEYS.RESPONSES]),
            "float"
          ),
        renderCell: (record, index) =>
          formatNumber(
            getPercentage(record[TABLE_KEYS.REQUESTS], record[TABLE_KEYS.RESPONSES]),
            "float"
          ) + "%",
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords
            .map((record) =>
              getPercentage(record[TABLE_KEYS.REQUESTS], record[TABLE_KEYS.RESPONSES])
            )
            .reduce((acc, curr) => acc + curr, 0);
          var minValue = records
            .map((record) =>
              getPercentage(record[TABLE_KEYS.REQUESTS], record[TABLE_KEYS.RESPONSES])
            )
            .reduce((acc, curr) => Math.min(acc, curr), Infinity)
            .toFixed(2);
          var maxValue = records
            .map((record) =>
              getPercentage(record[TABLE_KEYS.REQUESTS], record[TABLE_KEYS.RESPONSES])
            )
            .reduce((acc, curr) => Math.max(acc, curr), 0)
            .toFixed(2);
          var currentMinValue = tableFilters?.[TABLE_KEYS.FILL_RATE]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.FILL_RATE]?.max ?? maxValue;
          var step = Math.min(1, (maxValue - minValue) / 10);
          if (step < 1e-2) step = 1e-2;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.FILL_RATE]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.FILL_RATE]: null,
              })
            );
          };

          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={parseFloat(minValue)}
                maxValue={parseFloat(maxValue)}
                currentMinValue={parseFloat(currentMinValue)}
                currentMaxValue={parseFloat(currentMaxValue)}
                step={step}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.FILL_RATE]}</h4>
              <h1>{formatNumber(aggregatedValue, "float")}%</h1>
            </HeaderContainer>
          );
        },
      },
      [TABLE_KEYS.CTR]: {
        onFilter: (record, index) => {
          if (tableFilters?.[TABLE_KEYS.CTR] == null) return true;
          var { min, max } = tableFilters[TABLE_KEYS.CTR];
          var ctr = getPercentage(record[TABLE_KEYS.CLICKS], record[TABLE_KEYS.IMPRESSION]);
          return isValueWithinRange(min, max, parseFloat(ctr).toFixed(2), "float");
        },
        sorter: (record1, record2) =>
          isLess(
            getPercentage(record1[TABLE_KEYS.CLICKS], record1[TABLE_KEYS.IMPRESSION]),
            getPercentage(record2[TABLE_KEYS.CLICKS], record2[TABLE_KEYS.IMPRESSION]),
            "float"
          ),
        renderCell: (record, index) =>
          formatNumber(
            getPercentage(record[TABLE_KEYS.CLICKS], record[TABLE_KEYS.IMPRESSION]),
            "float"
          ) + "%",
        renderHeader: (filteredRecords, records) => {
          var aggregatedValue = filteredRecords
            .map((record) =>
              getPercentage(record[TABLE_KEYS.CLICKS], record[TABLE_KEYS.IMPRESSION])
            )
            .reduce((acc, curr) => acc + curr, 0);
          var minValue = records
            .map((record) =>
              getPercentage(record[TABLE_KEYS.CLICKS], record[TABLE_KEYS.IMPRESSION])
            )
            .reduce((acc, curr) => Math.min(acc, curr), Infinity)
            .toFixed(2);
          var maxValue = records
            .map((record) =>
              getPercentage(record[TABLE_KEYS.CLICKS], record[TABLE_KEYS.IMPRESSION])
            )
            .reduce((acc, curr) => Math.max(acc, curr), 0)
            .toFixed(2);
          var currentMinValue = tableFilters?.[TABLE_KEYS.CTR]?.min ?? minValue;
          var currentMaxValue = tableFilters?.[TABLE_KEYS.CTR]?.max ?? maxValue;
          var step = Math.min(1, (maxValue - minValue) / 10);
          if (step < 1e-2) step = 1e-2;
          const saveFilter = (min, max) => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.CTR]: { min, max },
              })
            );
          };
          const resetFilter = () => {
            dispatch(
              setTableFilters({
                ...tableFilters,
                [TABLE_KEYS.CTR]: null,
              })
            );
          };

          return (
            <HeaderContainer>
              <FilterTooltip
                minValue={parseFloat(minValue)}
                maxValue={parseFloat(maxValue)}
                currentMinValue={parseFloat(currentMinValue)}
                currentMaxValue={parseFloat(currentMaxValue)}
                step={step}
                saveFilter={saveFilter}
                resetFilter={resetFilter}
              />
              <h4>{TABLE_KEY_TO_LABEL[TABLE_KEYS.CTR]}</h4>
              <h1>{formatNumber(aggregatedValue, "float")}%</h1>
            </HeaderContainer>
          );
        },
      },
    };
  }, [tableFilters, allAppsList]);

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minHeight: 450 }}>
        <Table
          dataSource={reportsList}
          columns={columns}
          columnPosition={tablePositionProps}
          loading={false}
        />
      </div>
    </div>
  );
};

export default ReportsTable;
