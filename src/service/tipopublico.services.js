const tipopublicoServices = {
    // Función para el login

   
  
    // Funcio para tomar todos los
    async getTipoPublico() {
      try {
        const token = localStorage.getItem('token'); 
        console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/tipozapato/getData', {
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
     async addTipoPublico(estilo, tipopublico, descripcion) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/tipozapato/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ estilo, tipopublico, descripcion }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error desconocido');
            }
            return data;
        } catch (error) {
            console.error('Error añadiendo tipo publico:', error);
            throw error;
        }
    },

    async updateTipoPublico(nombreusuario, newName, newPassword, newType, newActive) {
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

  export default tipopublicoServices;