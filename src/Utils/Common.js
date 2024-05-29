import router from "@/router";
import store from "@/store";

const setTitle = (paramTitle = null) => {
  let text = "";

  if (!paramTitle) {
    let routes = router.options.routes;
    let currentPath = window.location.pathname;

    let matchedRoute = routes.filter((item) => {
      return item.path === currentPath;
    })[0];

    if (typeof matchedRoute !== "undefined") {
      text = capitalizeFirstLetter(matchedRoute.name);
    }
  } else {
    text = paramTitle;
  }

  store.commit("general/setTitle", text);
  document.title = process.env.VUE_APP_NAME + " - " + text;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const pluck = (arr, key) => {
if (!Array.isArray(arr)) {
  const  json = arr;
  arr =[]
  arr.push(json); 
}
  return  arr.map((i) => i[key])
};

const ucfirst = (string) => {
  return capitalizeFirstLetter(string);
};

const hasRole = (needed) => {
  let userRoles = store.getters["user/getRoles"];
  userRoles = userRoles.map(function (role) {
    return role.toLowerCase();
  });
  return !needed || userRoles.includes(needed.toLowerCase());
};

const getStatusColor = (statusId, vuetifyClasses = true) => {
  switch (statusId) {
    case 1:
      return vuetifyClasses ? "blue-grey" : "#607D8B";
    case 2:
      return vuetifyClasses ? "primary" : "#03A9F4";
    case 3:
      return vuetifyClasses ? "green" : "#4CAF50";
    case 4:
      return vuetifyClasses ? "red" : "#F44336";
    default:
      return vuetifyClasses ? "black" : "#000000";
  }
};

const deepClone = (data)=>{
  return JSON.parse(JSON.stringify(data))
}
export default {
  setTitle,
  capitalizeFirstLetter,
  pluck,
  ucfirst,
  hasRole,
  getStatusColor,
  deepClone
};
