import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import Moment from "react-moment";
import PaginationComponent from "./Pagination";
import Search from "./Search";

function TableData() {
  const url = "/api/list";
  const [data, setData] = useState([]);

  //const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Route From", field: "routefrom", sortable: false },
    { name: "Route To", field: "routeto", sortable: false },
    { name: "Altitude", field: "altitude", sortable: false },
    { name: "Date Reported", field: "reportedAt", sortable: true },
  ];

  useEffect(() => {
    const getData = () => {
      Axios.get(url).then((json) => setData(json.data));
    };
    getData();
  }, []);

  const turbData = useMemo(() => {
    let computedData = data;
    if (search) {
      computedData = computedData.filter(
        (turbulence) =>
          turbulence.routefrom.toLowerCase().includes(search.toLowerCase()) ||
          turbulence.routeto.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedData.length);

    //Sorting data
    if (sorting.field) {
      const reversed = sorting.order === "desc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [data, currentPage, search, sorting]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-row-reverse">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <Table striped bordered hover>
          <tr></tr>
          <thead
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          >
            <tr>
              <th>#</th>
              <th>Route From</th>
              <th>Route To</th>
              <th>Altitude</th>
              <th>
                <button type="button" onClick={() => setSorting("reportedAt")}>
                  Date Reported
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {turbData.map((turbulence) => (
              <tr>
                <th scope="row" key={turbulence._id}></th>
                <td>{turbulence.routefrom}</td>
                <td>{turbulence.routeto}</td>
                <td>{turbulence.altitude}</td>
                <td>
                  <Moment format="YYYY/MM/DD HH:mm">
                    {turbulence.reportedAt}
                  </Moment>
                </td>
              </tr>
            ))}
            ;
          </tbody>
        </Table>
        <div className="col-md-6">
          <PaginationComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      {/* {loader} */}
    </>
  );
}

export default TableData;
