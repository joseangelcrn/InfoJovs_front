import router from "@/router";
import store from "@/store";

const setTitle = (paramTitle = null) => {
  console.log("setTitle");
  console.log("router", router);
  let text = "";

  if (!paramTitle) {
    let routes = router.options.routes;
    let currentPath = window.location.pathname;

    let matchedRoute = routes.filter((item) => {
      return item.path === currentPath;
    })[0];

    if (typeof matchedRoute !== "undefined") {
      text =  capitalizeFirstLetter(matchedRoute.name);
    }
  } else {
    text = paramTitle;
  }

  store.commit('general/setTitle',text);
  document.title = process.env.VUE_APP_NAME+" - " + text;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default {
  setTitle,
  capitalizeFirstLetter,
};