import {__IS_DEV__} from './Environment';

export const BASE_URL = __IS_DEV__
  ? 'http://localhost:8000/api/v1'
  : 'https://qiuz-backend-9ca6853878da.herokuapp.com/api/v1';