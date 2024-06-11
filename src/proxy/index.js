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

const getProfessionalProfiles = async (filters) =>{
  const config = defaultConfig();
  config.params = filters;
  
  return await axios.get(host + "/professional_profiles/search",   config);
}

//User Info (-)

//Jobs (+)
const searchJobs = async (filters) =>{
  const config = defaultConfig();
  config.params = filters;

  return await axios.get(host+"/job/search",config)

};

const createJob = async(data = {})=>{
  const config = defaultConfig();
  config.params = data;
  return await axios.post(host + "/job", null,  config);
}

const updateJob = async(data)=>{
  const config = defaultConfig();
  config.params = data;
  return await axios.put(host + "/job", null,  config);
}

const getJobById = async (id) => {
  return await axios.get(host + "/job/"+id,  defaultConfig());
}

const getJobAdditionalInfo = async (id,scope = null)=>{
  let url = host+"/job/additional_info/"+id+(scope ? "/"+scope : '');
  return await axios.get(url,defaultConfig())
}

const updateJobActiveValue = async (data)=>{
  const config = defaultConfig();
  config.params = data;
  return await axios.post(host+"/job/update_active",null,config)
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

const getAllCandidatureStatuses = async()=>{
  return await axios.get(host + "/candidature/status",   defaultConfig());
}

const updateCandidature = async(newStatusId,candIds)=>{
  const config = defaultConfig();
  config.params = {
    status_id:newStatusId,
    candidature_ids:candIds
  }
  return await axios.post(host + "/candidature/status",  null,config);
}

const getCandidatureHistory = async(candidatureId)=>{
  return await axios.get(host+'/candidature/history/'+candidatureId,defaultConfig())
}
//Candidatures (-)

//Roles (+)
const getAllRoles = async ()=>{
  return await axios.get(host+"/roles")
}
//Roles (-)

//CV (+)
const getCvInfo = async(userId = null)=>{
  let url = host+"/cv/info";
  console.log('get cv info = ');
  console.log('user Id = '+userId)
  if (userId){
    url+="/"+userId;
  }
  console.log('url = '+url)
  return await axios.get(url,defaultConfig());
}
const saveCv = async(params)=>{
  let url = host+"/cv";
  let config = defaultConfig();
  config.params = params;
  return await axios.post(url,null,config)
};
//CV (-)

export default {

  login,
  signUp,
  logout,

  userInfo,
  getProfessionalProfiles,

  searchJobs,
  getJobById,
  createJob,
  updateJob,
  getJobAdditionalInfo,
  updateJobActiveValue,

  myCandidatures,
  createCandidature,
  infoCandidature,
  getAllCandidatureStatuses,
  updateCandidature,
  getCandidatureHistory,

  getAllRoles,

  getCvInfo,
  saveCv
};
