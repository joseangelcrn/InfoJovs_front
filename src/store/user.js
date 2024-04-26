const user = {
    namespaced:true,
    state: () => ({ 
        user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) :  null
     }),
    mutations: { 
        setUser: function(state,user){
            console.log('vuex user - setUser');
            state.user = user;
            localStorage.setItem('user',JSON.stringify(user))
        }
     },
    actions: { 

     }
  }

  export default user;