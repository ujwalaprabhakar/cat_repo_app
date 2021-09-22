import axiosClient from "../utils/axiosClient";
import { CatSummaryList } from "../types";
import { deepCamelCaseKeys, deepSnakeCaseKeys } from "../utils/utils";

const getAllCats = async (
  pageNumber: number,
  pageSize: number,
  sortBy: string
): Promise<CatSummaryList> => {
  const params = deepSnakeCaseKeys({
    pageSize,
    pageNumber,
    sortBy,
  });

  const { data } = await axiosClient.get("/cats", { params });

  return deepCamelCaseKeys(data);
};

const addNewCat = async (name: String) => {
  const params = deepSnakeCaseKeys({
    name,
  });

  const { data } = await axiosClient.post("/cats", params);

  return deepCamelCaseKeys(data);
};

const deleteCat = async (catId: String) => {
  const { data } = await axiosClient.delete(`/cats/${catId}`);

  return deepCamelCaseKeys(data);
};

export default {
  getAllCats,
  addNewCat,
  deleteCat,
};
