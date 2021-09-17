import axios from "axios";
import { Cat, CatList } from "../types";
import { deepCamelCaseKeys, deepSnakeCaseKeys } from "../utils/utils";

const getAllCats = async (): Promise<CatList> => {
  const { data } = await axios.get("http://localhost:10000/v1/cats");
  const listCats = deepCamelCaseKeys(data);
  console.log(listCats.results);
  return listCats.results;
};

export default {
  getAllCats,
};
