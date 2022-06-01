import React, { useEffect, useMemo, useState } from "react";
import TablePagination from "./TablePagination";
import axios from "axios";
import { useTable } from "react-table/dist/react-table.development";
import TableContentData from "./TableContentData";
import { ContentClasses, TitleClasses } from "./TableClassServices";

export default function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("", { params: { _page: 1, _limit: 7 } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Configure Date", accessor: "configuredAt" },
      { Header: "Created By", accessor: "createdBy" },
      { Header: "Satellite Dishes", accessor: "satelliteDishes" },
      { Header: "Address", accessor: "address" },
      { Header: "Status", accessor: "status" },
      { Header: "City", accessor: "city" },
    ],
    []
  );
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div>
      <table className="mt-6 w-full border-separate" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  className={`text-base font-normal bg-customtableheading1 border border-semiBlack first:rounded-tl-lg last:rounded-tr-lg 
                  ${TitleClasses(column.id)} 
                  ${idx === 0 ? "" : "border-l-0"}
                  `}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, idx) => {
                  return (
                    <td
                      className={`p-3 align-top border border-t-0 text-base font-normal border-semiBlack 
                      ${ContentClasses(cell.column.id)} 
                      ${
                        index === data.length - 1
                          ? "first:rounded-bl-lg last:rounded-br-lg"
                          : ""
                      } 
                      ${idx === 0 ? "" : "border-l-0"}
                    `}
                      {...cell.getCellProps()}
                    >
                      {TableContentData(cell)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <TablePagination />
    </div>
  );
}