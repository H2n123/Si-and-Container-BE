//container.service.js
import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080';  

const getContainerList = () => {
  return axios.get(API_URL + `/api/container/all`, { headers: authHeader() });
};

const getContainerBySi = (data) => {
  return axios.get(API_URL + '/api/container', data, { headers : authHeader(), method: 'GET'});
}

const addContainer = (data) => {
  return axios.post(API_URL +'/api/container/create', data, { headers: authHeader(), method: 'POST' });
};

const updateContainer = (data) => {
  return axios.put(API_URL +'/api/container/update', data, { headers: authHeader() , method: 'PUT'});
};

const deleteContainer = (data) => {
  return axios.delete(API_URL +'/api/container/delete', data, { headers: authHeader() , method: 'DELETE'});
};

export default {
    addContainer,
    getContainerList,
    getContainerBySi, //  pakai map filter di componen SiList.js
    updateContainer,
    deleteContainer,
};
