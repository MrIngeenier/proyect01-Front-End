const EmpresaServices = {

    // http://localhost:10000/users/login - https://proyect01-back-end-8ujk.onrender.com/users/login
  
    async getEmpresas() {
      try {
          const token = localStorage.getItem('token');
          const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/empresas/data', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
              },
          });
  
          const data = await response.json();
          //console.log(data)
          if (response.ok) {
              return data; // Devuelve la respuesta correcta
          } else {
              throw new Error(data.error || 'Error fetching users');
          }
      } catch (error) {
          console.error('Error during get all users:', error);
          throw error;
      }
  },
  

    //
    async addEmpresa(nombre, nit) {
      try {
        const token = localStorage.getItem('token'); 
        console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/empresas/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ nombre, nit }),
        });

        const data = await response.json(); 
        //console.log(data);
        //console.log(response);
        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error registrando usuario:', error);
      }
    },

    async updateEmpresa(id, nombre, nit) {
      try {
        const token = localStorage.getItem('token');
        console.log(id, nombre, nit);
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/empresas/updateData', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ id, nombre, nit }),
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
    
    async deleteEmpresa(empresaNombre, referenciaColor, referenciaSerial) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/empresas/deleteData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ empresaNombre, referenciaColor, referenciaSerial }),
        });
    
        const data = await response.json();
        //console.log("Response :" + data);
    
        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error actualizando usuario:', error);
      }
    },
    
    
  };

  
  

  
  
  export default EmpresaServices;