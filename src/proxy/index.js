import axios from "axios";

const host = process.env.VUE_APP_HOST_BACKEND;

const login = async (email, password) => {
  return await axios.post(host + "/login", null, {
    params: { email, password },
  });
};

const userInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(host + "/user/info", config);
};

const logout = async () => {};

const getUserById = async (id) => {};

const getJobById = async (id) => {};

const storeJob = async () => {};

const deleteJob = async (id) => {};

export default {
  login,
  userInfo,
  logout,
  getUserById,
  getJobById,
  storeJob,
  deleteJob,
};
