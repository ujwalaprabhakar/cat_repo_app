import React, { useState, useEffect } from "react";

import CatService from "../services/CatServices";
import { CatList } from "../types";
import MaterialTable from "material-table";
// import "material-icons/iconfont/material-icons.scss";
// const TABLE_COLUMNS = [
//   { title: "ID", field: "id", editable: "false", hidden: true },
//   {
//     title: "Cat Name",
//     field: "name",
//     // render: (rowData: { name: String }) => {
//     //   return <span>{rowData.name} </span>;
//     // },
//   },
// ];

function Home() {
  const [catdata, setData] = useState([]);

  const getCats = () => {
    CatService.getAllCats().then((cats) => {
      if (cats.length === 0) {
        return;
      }

      setData([
        ...catdata,
        {
          id: cats.id,
          name: cats.name,
        },
      ]);

      // console.log("cats:", cats);
      // setData(cats);
      console.log("catdata:", catdata);
    });
  };

  return (
    <div>
      <button onClick={getCats}>Get Cats</button>

      <div>
        <MaterialTable
          columns={[
            { title: "id", field: "id" },
            { title: "name", field: "name" },
          ]}
          data={[catdata]}
          title="Demo Title"
        />
      </div>

      <div>
        <ul>
          {catdata.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
