<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="https://img.freepik.com/vector-premium/concepto-diseno-logotipo-tienda-libros-linea_556845-463.jpg" alt="BookStore">
        <h1>N A M</h1>
      </div>

      <!-- Navegación centrada -->
      <nav class="nav-links">
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/products">Books</router-link>
        <router-link to="/contact">Contact Us</router-link>
        <router-link v-if="isLoggedIn" to="/urList">Cart</router-link>
      </nav>

      <!-- Login o nombre de usuario a la derecha -->
      <div class="login-section">
        <div v-if="!isLoggedIn" class="login-form">
          <input type="email" v-model="email" placeholder="Email" required>
          <input type="password" v-model="password" placeholder="Password" required>
          <button type="button" @click="login">Log In</button>
        </div>
        <div v-else>
          <p>Welcome, {{ email }}</p>
          <button @click="logout">Log Out</button>
        </div>
      </div>
    </header>

    <router-view></router-view>

    <footer>
      <div class="contacto-info">
        <p>Teléfono: 555-555-555</p>
        <p>Email: info@BookStoreNAM.com</p>
      </div>
      <p>&copy; 2024 Exiting books.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoggedIn: false,
      users: ['test@example.com', 'user@bookstore.com'], // Lista ficticia de usuarios
    };
  },
  methods: {
    login() {
      if (this.users.includes(this.email)) {
        this.isLoggedIn = true;
        console.log('Login successful');
      } else {
        alert('Invalid email. Please try again.');
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.email = '';
      this.password = '';
      console.log('Logged out');
    },
  },
};
</script>

<style>
/* General */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 24px;
  color: #333;
}

/* Navegación centrada */
.nav-links {
  display: flex;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.nav-links a:hover {
  color: #007bff;
}

/* Login y estado del usuario */
.login-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-form {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.login-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}

footer {
  background-color: #ccc;
  text-align: center;
  padding: 20px 0;
}

footer .contacto-info p {
  margin: 5px 0;
}
</style>
