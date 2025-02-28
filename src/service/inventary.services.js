const inventaryServices = {

    async getPlaces() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/place/users', {
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
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/place/NewUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ nombreusuario, password, fk_idrol }),
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

    async updatePlaces(nombreusuario, newName, newPassword, newType, newActive) {
      try {
        const token = localStorage.getItem('token');
        //console.log(nombreusuario, newName, newPassword, newType, newActive);
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/place/updatePlace', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ nombreusuario, newName, newPassword, newType, newActive }),
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

    async getPublico() {
        try {
          const token = localStorage.getItem('token'); 
          //console.log(token);
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
                return data.response; // Devuelve la respuesta del ping
            } else {
                throw new Error(data.error || 'Error fetching users');
            }
    
        } catch (error) {
            console.error('Error during getTipoIngreso:', error);
            throw error;
        }
    },
    
    async searchQR(empresa, serial, color, lugar, publico) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/searchQR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ empresa, serial, color, lugar, publico }),
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
    
    async getEmpresa() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/empresas/data', {
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
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/referencias/getDataRefZapato', {
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
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/referencias/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ color, serial,descripcion,tipozapatoid }),
        });

        const data = await response.json(); 
       // console.log(data);
       // console.log(response);
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
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ tipoingresoid,referenciaid, ubicacionesproductoid,usuarioid,cantidad,talla }),
        });

        const data = await response.json(); 
       // console.log(data);
       // console.log(response);
        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error registrando usuario:', error);
      }
    },

    // http://localhost:10000/users/login - https://proyect01-back-end-8ujk.onrender.com/users/login


    async addInventaryPro(tipoingresoid, referenciaid, ubicacionesproductoid, usuarioid, cantidad, talla, empresaid ) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/addDataPro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ tipoingresoid, referenciaid, ubicacionesproductoid, usuarioid, cantidad, talla, empresaid }),
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
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/empresas/addData/empresaReferencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ empresaid, referenciaid }),
        });

        const data = await response.json(); 
      //  console.log(data);
      //  console.log(response);
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
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/AllData', {
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
          throw new Error(data.error || 'Error Get all Data shoes');
        }
      } catch (error) {
        console.error('Error during get all users:', error);
        throw error;
      }
    },

    async getInventaryCasher() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/Data14', {
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

    async getInventaryCasher2() {
      try {
        const token = localStorage.getItem('token');
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/DataCenter', {
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
        // https://proyect01-back-end-8ujk.onrender.com/inventario/updateDataQR
        const response = await fetch('http://localhost:10000/inventario/updateDataQR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla }),
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

    async updateDataQRADD(nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/updateDataQRsum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, talla }),
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

    async DeleteInventary(nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, tipoZapato) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/inventario/DeleteInvetary', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ nombreEmpresa, referenciaSerial, color, ubicacionDescripcion, tipoZapato }),
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

  
  // 

  
  
  export default inventaryServices;
  