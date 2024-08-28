const loginServices = {
    // Función para el login

    // http://localhost:10000/users/login - https://proyect01-back-end-8ujk.onrender.com/users/login
    async login(name, password) {
      try {
        const response = await fetch('http://localhost:10000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return data; // Devuelve el token o cualquier otra información necesaria
        } else {
          throw new Error(data.error || 'Login failed');
        }
      } catch (error) {
        //console.error('Error during login:', error);
        throw error;
      }
    },
  
    // Función para el ping
    async getUsers() {
      try {
        const response = await fetch('http://localhost:10000/users/allUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return data; // Devuelve la respuesta del ping
        } else {
          throw new Error(data.error || 'Ping failed');
        }
      } catch (error) {
        console.error('Error during get all users:', error);
        throw error;
      }
    },

    
    
  
    // Puedes agregar más funciones aquí para manejar otras peticiones
  };

  
  
  export default loginServices;
  