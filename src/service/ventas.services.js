const VentasServices = {
   
  
    // Funcio para tomar todos los
    async getVentas() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/ventas/getFullData', {
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
    async addVentas(fk_referencia,fk_idusuarios,estado) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/ventas/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({fk_referencia,fk_idusuarios,estado}),
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

    async GetReferenciaID(color,serial,tipopublico) {
        try {
          const token = localStorage.getItem('token'); 
          //console.log(token);
          const response = await fetch('http://localhost:10000/referencias/getDataID', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token,
            },
            body: JSON.stringify({color,serial,tipopublico}),
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

    async updateVentas(idventas, fk_referencia,fk_idusuarios,estado) {
      try {
        const token = localStorage.getItem('token');
        console.log("Venta Actualizada :"+idventas, fk_referencia,fk_idusuarios,estado);
    
        const response = await fetch('http://localhost:10000/ventas/updateData', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ idventas, fk_referencia,fk_idusuarios,estado }),
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
    async deleteVentas(idventas) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('http://localhost:10000/ventas/DeleteData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({idventas}),
        });

        const data = await response.json(); 
        console.log("Data:", JSON.stringify(data, null, 2));  // Formato legible con 2 espacios de indentación
        console.log("Response"+response.status);
        console.log("Response Headers:", response.headers);  // Los encabezados de la respuesta

        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error registrando usuario:', error);
      }
    }
    
    

    
  };

  
  

  
  
  export default VentasServices;
  