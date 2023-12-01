//si.service.js
import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/si';  

const updateDataSi = (data) => {
  return axios.put(API_URL + '/update', data, { headers: authHeader(),method: 'PUT' });
};

const createDataSi = (data) => {
  return axios.post(API_URL + '/create', data, { headers: authHeader(), method: 'POST'});
};

const getSiList = () => {
  return axios.get(API_URL + '/all', { headers: authHeader(), method: 'GET'});
};

export default {
  createDataSi,
  updateDataSi,  
  getSiList,
};
