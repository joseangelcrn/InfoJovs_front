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

//Auth... (+)
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

const logout = async () => {
  return await axios.post(host + "/user/logout", null,defaultConfig());
};

//Auth... (-)

//User Info (+)
const userInfo = async () => {
  return await axios.get(host + "/user/info",   defaultConfig());
};
//User Info (-)

//Jobs (+)
const searchJobs = async (filters) =>{
  const config = defaultConfig();
  config.params = filters;

  return await axios.get(host+"/job/search",config)

};

const createJob = async(data)=>{
  const config = defaultConfig();
  config.params = data;
  console.log('params backend ',config);
  return await axios.post(host + "/job", null,  config);
}

const updateJob = async(data)=>{
  const config = defaultConfig();
  config.params = data;
  console.log('params backend ',config);
  return await axios.put(host + "/job", null,  config);
}

const getJobById = async (id) => {
  return await axios.get(host + "/job/"+id,  defaultConfig());
}
//Jobs (-)

//Candidatures (+)

const myCandidatures = async(filters)=>{
  const config = defaultConfig();
  config.params = filters;

  return await axios.get(host + "/candidature/my_candidatures",   config);
}

const createCandidature = async(data)=>{
  const config = defaultConfig();
  config.params = data;

  return await axios.post(host + "/candidature",null,   config);
}

const infoCandidature = async(jobId)=>{
  return await axios.get(host + "/candidature/info/"+jobId,   defaultConfig());
}
//Candidatures (-)



export default {

  login,
  signUp,
  logout,

  userInfo,

  searchJobs,
  getJobById,
  createJob,
  updateJob,

  myCandidatures,
  createCandidature,
  infoCandidature
};
