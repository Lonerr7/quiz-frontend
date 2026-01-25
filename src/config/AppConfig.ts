import {__IS_DEV__} from './Environment';

export const BASE_URL = __IS_DEV__ ? 'http://localhost:8000/api/v1' : '';