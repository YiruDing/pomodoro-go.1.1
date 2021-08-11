import axios from 'axios';
import getToken from '../getToken';
const customAxios = axios.create({
  baseURL: `${process.env.API_URL}/api/`,
  headers: { authorization: localStorage.getItem('token') },
});

export default customAxios;
