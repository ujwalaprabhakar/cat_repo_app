import React, { useState, useEffect } from "react";

import CatService from "../services/CatServices";

import MaterialTable from "material-table";

const TABLE_COLUMNS = [
  { title: "ID", field: "id" },
  {
    title: "Cat Name",
    field: "name",
  },
];

function Home() {
  const [data, setData] = useState([]);

  const getCats = () => {
    CatService.getAllCats().then((cats) => {
      if (cats.length === 0) {
        return;
      }

      setData(cats);
      console.log("catdata:", cats);
    });
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div>
      <div>
        <MaterialTable
          columns={TABLE_COLUMNS}
          data={data}
          title="Demo Title"
          options={{
            pageSize: 5,
            pageSizeOptions: [5, 10, 15, 20],
            toolbar: true,
            paging: true,
            showTitle: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              fontWeight: "bold",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Home;
