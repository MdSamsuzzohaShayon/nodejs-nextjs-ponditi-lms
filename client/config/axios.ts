import axios from 'axios';
import { BACKEND_URL } from './keys';

export default axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true
});
