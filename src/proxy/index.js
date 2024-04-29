import axios from "axios";

const host = process.env.VUE_APP_HOST_BACKEND;

const login = async (email, password) => {
  return await axios.post(host + "/login", null, {
    params: { email, password },
  });
};

const logout = async () => {};

const getUserById = async (id) => {};

const getJobById = async (id) => {};

const storeJob = async () => {};

const deleteJob = async (id) => {};

export default {
  login,
  logout,
  getUserById,
  getJobById,
  storeJob,
  deleteJob,
};
