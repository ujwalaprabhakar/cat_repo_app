import axios from "axios";
import { CatList } from "../types";
import { deepCamelCaseKeys } from "../utils/utils";

const getAllCats = async (
  pageNumber: Number,
  pageSize: Number
): Promise<any> => {
  let url = "http://localhost:10000/v1/cats?sort_by=id";
  url = url + "&page_number=" + pageNumber;
  url = url + "&page_size=" + pageSize;

  const { data } = await axios.get(url);

  // const { data } = await axios.get(
  //   `http://localhost:10000/v1/cats?sort_by=id&page_number=2&page_size=10`
  // );

  const result = deepCamelCaseKeys(data);
  // console.log(listCats);
  // return listCats.results;
  return result;
};

export default {
  getAllCats,
};
