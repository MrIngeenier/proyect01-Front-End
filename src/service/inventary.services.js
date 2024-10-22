const inventaryServices = {

    async getPlaces() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
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
        //console.log(token);
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
        //console.log(nombreusuario, newName, newPassword, newType, newActive);
    
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
          //console.log(token);
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
      },

      async getTipoIngreso() {
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch('http://localhost:10000/tipoingreso/getData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            
            const data = await response.json();
            if (response.ok) {
                return data.response; // Devuelve la respuesta del ping
            } else {
                throw new Error(data.error || 'Error fetching users');
            }
    
        } catch (error) {
            console.error('Error during getTipoIngreso:', error);
            throw error;
        }
    }
    
    ,
    
    
    
    async getEmpresa() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/empresas/data', {
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

    async getReferencia() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/referencias/getDataRefZapato', {
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

    async addReferences(color, serial,descripcion,tipozapatoid) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/referencias/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ color, serial,descripcion,tipozapatoid }),
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

    async addInventary(tipoingresoid,referenciaid, ubicacionesproductoid,usuarioid,cantidad,talla) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/inventario/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ tipoingresoid,referenciaid, ubicacionesproductoid,usuarioid,cantidad,talla }),
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
    async addEmpresaRef(empresaid, referenciaid) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/empresas/addData/empresaReferencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ empresaid, referenciaid }),
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

    async getInventary() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/inventario/AllData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token, 
          },
        });
          
        const data = await response.json();
    
        if (response.ok) {
          return data.body; // Devuelve la respuesta del ping
        } else {
          throw new Error(data.error || 'Error Get all Data shoes');
        }
      } catch (error) {
        console.error('Error during get all users:', error);
        throw error;
      }
    },
    
    //nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla
    async updateDataQR(nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch('http://localhost:10000/inventario/updateDataQR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla }),
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
  };

  
  

  
  
  export default inventaryServices;
  