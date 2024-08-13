import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/otp/send-otp`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Contains the token
  } catch (error) {
    throw error.response.data;
  }
};
