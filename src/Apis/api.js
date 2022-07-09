import axios from "axios";
const apiBaseUrl = "http://127.0.0.1:8080/shifts";

// GET api calls
export const getShifts = () => {
  const getUrl = apiBaseUrl;
  return axios.get(getUrl);
};

export const getSingleShift = (data) => {
  const getUrl = apiBaseUrl + "/" + data.id;
  return axios.get(getUrl);
};

// POST api calls
export const bookShift = (id) => {
  const postUrl = apiBaseUrl + "/" + id + "/book";
  return axios.post(postUrl);
};

export const cancelShift = (id) => {
  const postUrl = apiBaseUrl + "/" + id + "/cancel";
  return axios.post(postUrl);
};
