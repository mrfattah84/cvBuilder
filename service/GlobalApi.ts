import axios from 'axios';
import { useEffect } from 'react';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewCV = (data) => {
  return axiosClient.post('/user-cvs', data);
};

const GetUserCV = (userEmail) => {
  return axiosClient.get('/user-cvs?filters[userEmail][$eq]=' + userEmail);
};

const GetCV = (id) => {
  return axiosClient.get('/user-cvs/' + id);
};

const UpdateCVDetail = (id, data) => {
  return axiosClient.put('/user-cvs/' + id, data);
};

export default {
  CreateNewCV,
  GetUserCV,
  UpdateCVDetail,
  GetCV
};
