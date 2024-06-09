import router from "@/router";
import store from "@/store";

const setTitle = (paramTitle = null) => {
  const title = router.history.current.meta.title ?? null;
  store.commit("general/setTitle", title);
  if (title){
    document.title = process.env.VUE_APP_NAME + " - " + title;
  }
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

const prepareQuestions = (data)=>{

  let questions = data;

  questions.map((item)=>{
    if (item.type === 'options' && typeof item.value !== 'undefined'){
        item.value = parseInt(item.value);
    }
  })

  return questions;
}


const dateAsHuman = (y,m,d)=>{

  let textYear =  `${y} `+ (y > 1 ? 'Years' : 'Year');
  let textMonth =` ${m} `+ (m > 1 ? 'Months' : 'Month');
  let textDay =` ${m} `+(d > 1 ? 'Days' : 'Day');

  if (y == 0){
    textYear = '';
  }

  if (m == 0){
    textMonth = '';
  }

  if (d == 0){
    textDay = '';
  }

  return textYear + textMonth + textDay;

}
const calculateDiffDates = (start_date, finish_date = null,humanFormat = false)=> {
  // Si finish_date es null, usamos la fecha actual
  const endDate = finish_date ? new Date(finish_date) : new Date();
  const startDate = new Date(start_date);

  // Validar que las fechas sean válidas
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Fecha inválida");
  }

  // Calcular las diferencias
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  // Ajustar los valores si es necesario
  if (days < 0) {
    months -= 1;
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let data = {
    y: years,
    m: months,
    d: days
  };

  if (humanFormat){

    return dateAsHuman(data.y,data.m,data.d);
  }
  return data;
}


export default {
  setTitle,
  capitalizeFirstLetter,
  pluck,
  ucfirst,
  hasRole,
  getStatusColor,
  deepClone,
  prepareQuestions,
  calculateDiffDates,
  dateAsHuman
};
