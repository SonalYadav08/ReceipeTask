import axios, {AxiosResponse} from 'axios';

let baseURL = 'https://dummyjson.com';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface LoginError {
  message: string;
  status: number;
}

export const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${baseURL}/auth/login`,
      {username, password, expiresInMins: 1},
      {headers},
    );
    return response.data;
  } catch (error: any) {
    const errorMessage: LoginError = {
      message: error.response?.data?.message || 'An unknown error occurred.',
      status: error.response?.status || 500,
    };
    throw errorMessage;
  }
};

export const getRecipes = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${baseURL}/recipes`);
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    const errorMessage: LoginError = {
      message: error.response?.data?.message || 'An unknown error occurred.',
      status: error.response?.status || 500,
    };
    throw errorMessage;
  }
};

export const authCurrentUser = async (accessToken: string): Promise<any> => {
  console.log('access token in API:', accessToken);

  try {
    const response = await fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
      },
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage: LoginError = {
        message: errorData.message || 'An unknown error occurred.',
        status: response.status,
      };
      throw errorMessage;
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error: any) {
    console.error('Error:', error);

    throw error;
  }
};

export const refreshToken = async (refreshToken: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      'https://dummyjson.com/auth/refresh',
      {
        refreshToken, // Optional,
        expiresInMins: 30, // Optional (for access token), defaults to 60
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error('Error refreshing token:', error);
    const errorMessage = {
      message: error.response?.data?.message || 'An unknown error occurred.',
      status: error.response?.status || 500,
    };
    throw errorMessage;
  }
};

//Search Functionality

export const searchRecipes = async (query: string): Promise<any> => {
  console.log('query', query);

  try {
    const response: AxiosResponse<any> = await axios.get(
      `${baseURL}/recipes/search?q=${query}`,
    );
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    const errorMessage: LoginError = {
      message: error.response?.data?.message || 'An unknown error occurred.',
      status: error.response?.status || 500,
    };
    throw errorMessage;
  }
};
