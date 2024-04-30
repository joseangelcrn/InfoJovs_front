import axios from "axios";

const host = process.env.VUE_APP_HOST_BACKEND;

//Common config for auth endpoints
const defaultConfig = ()=>{
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

const login = async (email, password) => {
  return await axios.post(host + "/login", null, {
    params: { email, password },
  });
};

const userInfo = async () => {
  return await axios.get(host + "/user/info",   defaultConfig());
};

const logout = async () => {};

const searchJobs = async (filters) =>{
  const config = defaultConfig();
  config.params = filters;

  return await axios.get(host+"/job/search",config)

};

const getUserById = async (id) => {};

const getJobById = async (id) => {};

const storeJob = async () => {};

const deleteJob = async (id) => {};

export default {
  login,
  userInfo,
  logout,
  searchJobs,
  getUserById,
  getJobById,
  storeJob,
  deleteJob,
};
