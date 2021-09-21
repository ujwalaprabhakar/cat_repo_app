import axios from "axios";
import { CatList } from "../types";
import { deepCamelCaseKeys, deepSnakeCaseKeys } from "../utils/utils";

const getAllCats = async (
  pageNumber: Number,
  pageSize: Number
): Promise<any> => {
  let url = "http://localhost:10000/v1/cats?sort_by=id";
  url = url + "&page_number=" + pageNumber;
  url = url + "&page_size=" + pageSize;

  const { data } = await axios.get(url);

  const result = deepCamelCaseKeys(data);
  return result;
};

const addNewCat = async (catName: String) => {
  const payload = { name: catName };

  const url = "http://localhost:10000/v1/cats";

  const { data } = await axios.post(url, payload);

  const result = deepCamelCaseKeys(data);

  return result;
};

const deleteCat = async (catId: String) => {
  const url = `http://localhost:10000/v1/cats/${catId}`;

  const { data } = await axios.delete(url);

  const result = deepCamelCaseKeys(data);

  return result;
};

export default {
  getAllCats,
  addNewCat,
  deleteCat,
};
