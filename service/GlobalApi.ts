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

const CreateNewCV = async (data: any) => {
  try {
    const response = await axiosClient.post('/user-cvs', data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const GetUserCV = async (userEmail: any) => {
  try {
    const response = await axiosClient.get('/user-cvs?filters[userEmail][$eq]='+userEmail);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default {
  CreateNewCV,
  GetUserCV,
};
