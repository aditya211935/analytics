import React, { useMemo, useState } from "react";

import { StyledTable, StyledIconCaretDown, StyledIconCaretUp } from "./styles";

// initialSortDirection: 0 for no sort,
// 1 for up, 2 for down
const Table = ({ dataSource, columns, columnPosition, loading, keyProp, initialSortColumn, initialSortDirection }) => {
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  if (!columnPosition) {
    columnPosition = Object.keys(columns).map((columnKey) => ({
      key: columnKey,
      visible: true,
    }));
  }

  const processedDataSource = useMemo(() => {
    var filteredDataSource = dataSource.filter((record) => {
      return Object.keys(columns).reduce((acc, columnKey) => {
        var column = columns[columnKey];
        if ("onFilter" in column && typeof column["onFilter"] === "function") {
          return acc && column["onFilter"](record);
        } else {
          return acc;
        }
      }, true);
    });

    if (sortColumn != null && sortDirection !== 0 && typeof columns?.[sortColumn]?.sorter === "function") {
      const sortedDataSource = filteredDataSource.sort(columns[sortColumn].sorter);
      if (sortDirection == 1) return sortedDataSource;
      else return sortedDataSource.reverse();
    } else {
      return filteredDataSource;
    }
    /**
     * For optimization, we can put sortDirection and sortColumn
     * in a separate useEffect, as changin sort property of a column
     * shouldn't cause us to filter again.
     */
  }, [dataSource, columns, sortColumn, sortDirection]);

  return (
    <StyledTable>
      <thead className="table-header">
        <tr className="table-header-row">
          {columnPosition.map(({ key, visible }) => {
            if (!visible) return;
            const containsSorter = columns[key].sorter != null;
            var headerProps = { className: "table-header-cell" };
            var sortIcon = null;
            if (containsSorter) {
              headerProps["className"] += " sort";
              headerProps["onClick"] = () => {
                if (sortColumn === key) {
                  setSortDirection((sortDirection + 1) % 3);
                } else {
                  setSortColumn(key);
                  setSortDirection(1);
                }
              };
              if (sortDirection == 0 || sortColumn != key) {
                sortIcon = (
                  <div className="sort-icon-container">
                    <StyledIconCaretUp key="caret-up" />
                    <StyledIconCaretDown key="caret-down" />
                  </div>
                );
              } else if (sortDirection == 1) {
                sortIcon = (
                  <div className="sort-icon-container">
                    <StyledIconCaretUp isActive={true} key="caret-up" />
                    <StyledIconCaretDown key="caret-down" />
                  </div>
                );
              } else if (sortDirection == 2) {
                sortIcon = (
                  <div className="sort-icon-container">
                    <StyledIconCaretUp key="caret-up" />
                    <StyledIconCaretDown isActive={true} key="caret-down" />
                  </div>
                );
              }
            }
            return (
              <th key={key} {...headerProps}>
                {columns[key].renderHeader(processedDataSource, dataSource)}
                {containsSorter && sortIcon}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="table-body">
        {processedDataSource.map((record, index) => {
          return (
            <tr key={record[keyProp]} className="table-row">
              {columnPosition.map(({ key, visible }) => {
                if (!visible) return;
                return (
                  <td key={key} className="table-cell">
                    {columns[key].renderCell(record, index)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

Table.defaultProps = {
  dataSource: [],
  columns: null,
  columnPosition: null,
  loading: false,
  keyProp: "id",
  initialSortColumn: null,
  initialSortDirection: 0,
};

export default Table;
