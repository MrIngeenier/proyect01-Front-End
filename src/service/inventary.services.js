const inventaryServices = {

    async getPlaces() {
      try {
        const token = localStorage.getItem('token'); 
        console.log(token);
        const response = await fetch('http://localhost:10000/place/users', {
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

    async addPlaces(nombreusuario, password, fk_idrol) {
      try {
        const token = localStorage.getItem('token'); 
        console.log(token);
        const response = await fetch('http://localhost:10000/place/NewUsers', {
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

    async updatePlaces(nombreusuario, newName, newPassword, newType, newActive) {
      try {
        const token = localStorage.getItem('token');
        console.log(nombreusuario, newName, newPassword, newType, newActive);
    
        const response = await fetch('http://localhost:10000/place/updatePlace', {
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
    },

    async getPublico() {
        try {
          const token = localStorage.getItem('token'); 
          console.log(token);
          const response = await fetch('http://localhost:10000/tipozapato/getData', {
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
      }
    
    

    
  };

  
  

  
  
  export default inventaryServices;
  