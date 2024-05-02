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

const signUp = async (data) => {
  console.log('url = '+host+'/signup');
  return await axios.post(host + "/signup", null, {
    params: { ...data },
  });
};


const userInfo = async () => {
  return await axios.get(host + "/user/info",   defaultConfig());
};

const logout = async () => {
  return await axios.post(host + "/user/logout", null,defaultConfig());
};

const searchJobs = async (filters) =>{
  const config = defaultConfig();
  config.params = filters;

  return await axios.get(host+"/job/search",config)

};

const myCandidatures = async(filters)=>{
  const config = defaultConfig();
  config.params = filters;

  return await axios.get(host + "/candidature/my_candidatures",   config);
}


export default {
  login,
  signUp,
  userInfo,
  logout,
  searchJobs,
  myCandidatures
};
