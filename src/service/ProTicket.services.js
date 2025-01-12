const ProTicketServices = {

  
    async getData() {
      try {
          const response = await fetch('https://api.sheetbest.com/sheets/ee283ff8-8cb6-4f0f-8a31-3e03886c8980');
          const data = await response.json();
            console.log(data);
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
    async addData(nombre, cedula, telefono, correo) {
      try {
        const token = localStorage.getItem('token'); 
        //console.log(token);
        const response = await fetch('https://proyect01-back-end-8ujk.onrender.com/clientes/addData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
          },
          body: JSON.stringify({ nombre, cedula, telefono, correo }),
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

    
    
    
    
  };

  
  

  
  
  export default ProTicketServices;