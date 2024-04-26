const user = {
    namespaced:true,
    state: () => ({ 
        data:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) :  null
     }),
    mutations: { 
        setUser: function(state,user){
            console.log('vuex user - setUser');
            state.data = user;
            localStorage.setItem('user',JSON.stringify(user))
        },
        removeUser: function(state){
            console.log('vuex user - removeUser');
            state.data = null;
            localStorage.removeItem('user');
        }
     },
    actions: { 

     }
  }

  export default user;