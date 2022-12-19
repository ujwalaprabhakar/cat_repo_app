import React, { useState, useEffect } from "react";

import CatService from "../services/CatServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const PAGE_SIZE = 10;

function CatCatalogue() {
  const [cats, setCats] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [catName, setCatName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const getCats = (pageIndex) => {
    CatService.getAllCats({
      pageNumber: pageIndex,
      pageSize: PAGE_SIZE,
      sortBy: "id",
    }).then((response) => {
      const cats = response.results;

      setCats(cats);
      setPageIndex(pageIndex);
      setHasNextPage(response.metadata.hasNextPage);
    });
  };

  useEffect(() => {
    const pageIndex = 1;
    getCats(pageIndex);
  }, []);

  const moveToNextPage = () => {
    getCats(pageIndex + 1);
  };

  const moveToPrevPage = () => {
    getCats(pageIndex - 1);
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

  const deleteSelectedCat = (catId) => {
    CatService.deleteCat(catId).then((response) => {
      if (response) {
        alert("Cat deleted!!!");
      }
      getCats(pageIndex);
    });
  };

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
      <div>
        {!cats ? (
          "No Data"
        ) : (
          <table>
            <thead>
              <tr>
                <th>Cat Id</th>
                <th>Cat Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {cats.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => deleteSelectedCat(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <nav className="pagination">
            <button
              type="button"
              class="btn btn-primary padRight10"
              onClick={moveToPrevPage}
              disabled={pageIndex === 1}
            >
              Previous
            </button>

            <button
              class="btn btn-primary"
              onClick={moveToNextPage}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default CatCatalogue;
