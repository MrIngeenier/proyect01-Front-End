const TipoIngresoServices = {

    // http://localhost:10000/users/login - https://proyect01-back-end-8ujk.onrender.com/users/login
  
    async getTipoIngreso() {
      try {
          const token = localStorage.getItem('token');
          const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/tipoingreso/getData', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
              },
          });
  
          const data = await response.json();
  
          if (response.ok) {
              return data.response; // Devuelve la respuesta correcta
          } else {
              throw new Error(data.error || 'Error fetching users');
          }
      } catch (error) {
          console.error('Error during get all users:', error);
          throw error;
      }
  },
  

    //
    async addTipoIngreso(descripcion, valor) {
      try {
        const token = localStorage.getItem('token'); 
        console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/tipoingreso/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ descripcion, valor }),
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

    async updateTipoIngreso(nombreusuario, newName, newPassword, newType, newActive) {
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

  
  

  
  
  export default TipoIngresoServices;