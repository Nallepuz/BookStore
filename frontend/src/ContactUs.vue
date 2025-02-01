<template>
    <div class="container vh-100 d-flex justify-content-center align-items-center"
      style="background-image: url('https://guias.donweb.com/wp-content/uploads/2024/05/Registro-de-usuarios-en-WordPress-16.png'); background-size: contain; background-repeat: no-repeat; background-position: center;">
      <div class="card" style="width: 100%; max-width: 400px;">
        <h2>Contact Us</h2>
        <form class="contact-form" @submit.prevent="handleSignUp">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="username" placeholder="Your Name" required>
  
          <label for="contact-email">Email:</label>
          <input type="email" id="contact-email" v-model="email" placeholder="Your Email" required>
  
          <label for="message">Message:</label>
          <textarea id="message" v-model="password" placeholder="Your Message" rows="5" required></textarea>
  
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactUs", // Nombre del componente
    data() {
  
      // Se inicializan las variables de email y password
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
        successMessage: 'Usuario registrado con éxito',
      };
    },
    methods: {
  
      // Se utiliza async handleSignUp() para enviar la solicitud POST al servidor
      async handleSignUp() {
        console.log('Datos enviados:', this.email, this.password); // Verifica los valores enviados
        try {
          const response = await fetch('http://localhost:8081/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });
  
          const data = await response.json();
  
          // Se muestra el mensaje de éxito o error según la respuesta del servidor
          if (data.success) {
            alert('¡Registrado con éxito!');
            this.$router.push('/login');
          } else {
            alert(data.message || 'Error durante el registro.');
          }
        } catch (error) {
          console.error('Error al registrarse:', error);
          alert('Error en el servidor.');
        }
      }
  
    },
  };
  </script>
  
  <style>
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto;
}

.contact-form label {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
}

.contact-form input,
.contact-form textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.contact-form textarea {
    resize: vertical; /* Permite redimensionar verticalmente */
}

.contact-form button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
}

.contact-form button:hover {
    background-color: #0056b3;
}

</style>
  