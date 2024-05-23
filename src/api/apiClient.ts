import axios from 'axios';
import {useEffect, useRef} from 'react';

const baseURL = 'http://localhost:3000/api';

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useApiClient() {
  const apiClient = useRef(client);

  useEffect(() => {
    // Add a request interceptor
    // Things llke setting the token, or other headers can be done here
  }, []);

  return apiClient.current;
}
