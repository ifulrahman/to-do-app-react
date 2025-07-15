import API from "./axios";

// LOGIN
export const loginUser = async (username, password) => {
  const response = await API.post("/login", { username, password });
  return response.data;
};

// REGISTER
export const registerUser = async (username, email, password) => {
  const response = await API.post("/register", { username, email, password });
  return response.data;
};
