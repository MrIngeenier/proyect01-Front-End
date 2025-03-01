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
        //console.log(response);
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

    async getVentas14() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);http://localhost:10000/ventas/getFullData14
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/ventas/getFullData14', {
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

    async getVentasCentro() {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);http://localhost:10000/ventas/getFullData14
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/ventas/getFullDataCenter', {
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

    

    //// http://localhost:10000/users/login
    async addVentas(fk_referencia,fk_idusuarios,estado,lugar,fk_clientes,pago,valor) {
      try {
        var typopago = String(pago);
        const token = localStorage.getItem('token'); 
        console.log("Services addVenta : "+fk_referencia+" "+fk_idusuarios+" "+estado+" "+lugar+" "+fk_clientes,typopago+" "+valor );
        //console.log(token);
        const response = await fetch('http://localhost:10000/ventas/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({fk_referencia,fk_idusuarios,estado,lugar,fk_clientes,typopago,valor}),
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
          //console.log("GETreference Data : "+color+" "+serial+" "+tipopublico)
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
          console.error('Error obteniendo referenceID:', error);
        }
      },

    async updateVentas(idventas, fk_referencia,fk_idusuarios,estado) {
      try {
        const token = localStorage.getItem('token');
        console.log("Venta Actualizada :"+idventas, fk_referencia,fk_idusuarios,estado);
    
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/ventas/updateData', {
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
    async deleteVentas(id) {
      try {
        const idventas = parseInt(id, 10);
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/ventas/DeleteData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({idventas}),
        });

        const data = await response.json(); 
       // console.log("Data:", JSON.stringify(data, null, 2));  // Formato legible con 2 espacios de indentación
        //console.log("Response"+response.status);
        //console.log("Response Headers:", response.headers);  // Los encabezados de la respuesta

        if (!response.ok) {
          throw new Error(data.message || 'Error desconocido');
        }
        return data;
      } catch (error) {
        console.error('Error borrando [VENTA]:', error);
      }
    }
    
    

    
  };

  
  

  
  
  export default VentasServices;
  