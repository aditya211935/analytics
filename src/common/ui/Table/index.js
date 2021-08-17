import React, { useMemo, useState } from "react";
import Skeleton from "../Skeleton";

import { StyledTable } from "./styles";

import { ReactComponent as IconCaretUp } from "common/icons/caret-up.svg";
import { ReactComponent as IconCaretDown } from "common/icons/caret-down.svg";

// initialSortDirection: 0 for no sort,
// 1 for up, 2 for down
const Table = ({
  dataSource,
  columns,
  keyProp,
  initialSortColumn,
  initialSortDirection,
  loading,
  loadingRows,
}) => {
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const processedDataSource = useMemo(() => {
    var filteredDataSource = dataSource.filter((record) => {
      return columns.reduce((acc, column) => {
        if ("onFilter" in column && typeof column["onFilter"] === "function") {
          return acc && column["onFilter"](record);
        } else {
          return acc;
        }
      }, true);
    });

    const sortFunction = columns.find((column) => column.key === sortColumn)?.sorter;
    if (sortColumn != null && sortDirection !== 0 && typeof sortFunction === "function") {
      const sortedDataSource = filteredDataSource.sort(sortFunction);
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
          {columns.map((column) => {
            const { key } = column;
            const containsSorter = column.sorter != null;
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
                    <IconCaretUp key="caret-up" />
                    <IconCaretDown key="caret-down" />
                  </div>
                );
              } else if (sortDirection == 1) {
                sortIcon = (
                  <div className="sort-icon-container">
                    <IconCaretUp className="active" key="caret-up" />
                    <IconCaretDown key="caret-down" />
                  </div>
                );
              } else if (sortDirection == 2) {
                sortIcon = (
                  <div className="sort-icon-container">
                    <IconCaretUp key="caret-up" />
                    <IconCaretDown className="active" key="caret-down" />
                  </div>
                );
              }
            }
            return (
              <th key={key} {...headerProps}>
                {column.renderHeader(processedDataSource, dataSource)}
                {containsSorter && sortIcon}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="table-body">
        {loading
          ? Array.from(new Array(loadingRows)).map((item, index) => {
              return (
                <tr key={`loading-row-${index}`} className="table-row">
                  {columns.map((column) => {
                    return (
                      <td key={column.key} className="table-cell">
                        <Skeleton width="100%" height="16px" />
                      </td>
                    );
                  })}
                </tr>
              );
            })
          : processedDataSource.map((record, index) => {
              return (
                <tr key={record[keyProp]} className="table-row">
                  {columns.map((column) => {
                    return (
                      <td key={column.key} className="table-cell">
                        {column.renderCell(record, index)}
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
  loading: false,
  keyProp: "id",
  initialSortColumn: null,
  initialSortDirection: 0,
  loading: false,
  loadingRows: 3,
};

export default Table;
