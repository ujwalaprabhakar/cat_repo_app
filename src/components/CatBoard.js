import React, { useState, useRef, useMemo, useCallback } from "react";
import CustomTable from "./CustomTable";
import CatService from "../services/CatServices";
function CatBoard() {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Cat Name",
        accessor: "name",
      },
    ],
    []
  );

  // Let's simulate a large dataset on the server (outside of our component)

  // console.log("serverData:", serverData);
  // We'll start our table without any data
  const [data, setData] = useState([]);
  const [catName, setCatName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const fetchIdRef = useRef(0);

  const getCats = (pageIndex, pageSize) => {
    CatService.getAllCats(pageIndex, pageSize).then((response) => {
      console.log("response:", response);
      const cats = response.results;
      if (cats.length === 0) {
        return;
      }
      console.log("cats:", cats);
      setData(cats);
      setPageCount(3);
      setHasNextPage(response.metadata.hasNextPage);
    });
  };

  const addCat = () => {
    CatService.addNewCat(catName).then((response) => {
      if (response.ctime != undefined) {
        setResponseMessage("Cat added!");
      } else {
        setResponseMessage("Error while adding Cat.");
      }
    });
  };
  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;
    console.log("fetchId:", fetchId);
    console.log("fetchIdRef.current:", fetchIdRef.current);
    // Set the loading state
    setLoading(true);

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        // const startRow = pageSize * pageIndex;
        // const endRow = startRow + pageSize;
        // setData(serverData.slice(startRow, endRow));
        getCats(pageIndex, pageSize);
        // Your server could send back total page count.
        // For now we'll just fake it, too

        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div id="container">
      <div class="padBottom">
        <span class="padRight10">
          <input
            type="text"
            id="catName"
            onChange={(e) => {
              setCatName(e.target.value);
            }}
          ></input>
        </span>
        <span class="padRight10">
          <button class="padRight10" onClick={addCat}>
            Add Cat
          </button>
        </span>
        <span class="padRight10">{responseMessage}</span>
      </div>
      <hr></hr>
      <CustomTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        canNextPage={hasNextPage}
      />
    </div>
  );
}

export default CatBoard;
