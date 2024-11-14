const loginServices = {
    // Función para el login

    // http://localhost:10000/users/login - https://proyect01-back-end-8ujk.onrender.com/users/login
    async login(nombreusuario, password) {
      try {
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombreusuario, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          return data; // Devuelve el token o cualquier otra información necesaria
        } else {
          throw new Error(data.error || 'Login failed');
        }
      } catch (error) {
        // console.error('Error during login:', error);
        throw error;
      }
    },
    
  
    // Funcio para tomar todos los
    async getUsers() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/users/login', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token, 
          },
        });
        
        const data = await response.json();

        //console.log(data.body);
  
        if (response.ok) {
          return data.body; // Devuelve la respuesta del ping
        } else {
          throw new Error(data.error || 'Error fetching users');
        }
      } catch (error) {
        console.error('Error during get all users:', error);
        throw error;
      }
    },

    

    //
    async addUsers(nombreusuario, password, fk_idrol) {
      try {
        const token = localStorage.getItem('token'); 
        console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/users/newUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ nombreusuario, password, fk_idrol }),
        });

        const data = await response.json(); 
        console.log(data);
        console.log(response);
        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error registrando usuario:', error);
      }
    },

    async deleteUsers(idusuarios, nombreusuario) {
      try {
          const token = localStorage.getItem('token'); 
          const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/users/deleteUser', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({ idusuarios, nombreusuario })  // Usamos `idusuarios` como en el backend
          });
  
          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.message || 'Error desconocido');
          }
          return data;
      } catch (error) {
          console.error('Error eliminando usuario:', error);
          throw error;  // Para que el error se propague
      }
  },
  

    async updateUser(nombreusuario, newName, newPassword, newType, newActive) {
      try {
        const token = localStorage.getItem('token');
        console.log(nombreusuario, newName, newPassword, newType, newActive);
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/users/updateUser', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ nombreusuario, newName, newPassword, newType, newActive }),
        });
    
        const data = await response.json();
        console.log("Response :" + data);
    
        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error actualizando usuario:', error);
      }
    }
    
    

    
  };

  
  

  
  
  export default loginServices;
  