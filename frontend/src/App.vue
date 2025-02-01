<template>
  <div id="app-container">
    <header class="app-header">
      <div class="app-logo">
        <router-link to="/home">
          <img src="../img/logo (1)-Photoroom.png" alt="BookStore">
        </router-link>
      </div>

      <nav class="app-nav-links">
        <router-link to="/products">Books</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/contact">Contact Us</router-link>
        <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
        <router-link v-if="isLoggedIn" to="/urList"> 
          <img src="https://cdn-icons-png.flaticon.com/512/5585/5585503.png" alt="BookStore">
        </router-link>
        <router-link v-if="isLoggedIn" to="/userconfig">Config</router-link>
        <router-link v-if="userEmail === 'admin@gmail.com'" to="/add">Add Book</router-link>

      </nav>

      <div class="app-login-section">
        <div v-if="!isLoggedIn" class="app-login-form">
          <input type="email" v-model="email" placeholder="Email" required>
          <input type="password" v-model="password" placeholder="Password" required>
          <button type="button" @click="handleLogin">Log In</button>
        </div>
        <div v-else class="app-logged-in-section">
          <p>Welcome, {{ userEmail }}</p>
          <button class="app-btn-logout" @click="logout">Log Out</button>
        </div>
      </div>
    </header>

    <main class="app-content">
      <router-view></router-view>
    </main>

    <footer class="app-footer">
      <div class="app-contacto-info">
        <p>Teléfono: 555-555-555</p>
        <p>Email: info@BookStoreNAM.com</p>
      </div>
      <p>&copy; 2024 Exiting books.</p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      userEmail: ''
    }
  },

  created() {
    const userToken = localStorage.getItem("userToken");
    this.syncUserEmail();

    if (userToken) {
      this.isLoggedIn = true;
    }

    window.addEventListener('email-updated', (event) => {
      this.syncUserEmail(event.detail);
    });
  },

  methods: {
    syncUserEmail(newEmail = null) {
      this.userEmail = newEmail || localStorage.getItem("userEmail") || '';
    },

    logout() {
      this.isLoggedIn = false;
      this.userEmail = '';
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
      this.$router.push({ path: '/home' }).then(() => {
        window.location.reload();
      });
    },

    async handleLogin() {
      try {
        const response = await fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userId', data.user.id);

          this.errorMessage = '';
          this.$router.push('/products').then(() => {
            window.location.reload();
          });
        } else {
          this.errorMessage = data.message || 'Invalid email or password';
          alert(this.errorMessage);
        }
      } catch (error) {
        console.error('Login Error:', error);
        this.errorMessage = 'Unable to connect to the server';
        alert(this.errorMessage);
      }
    }
  },
}
</script>

<style>
/* General */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #b3b8bd;
  padding: 0;
  background-color: #c9c9b6; /* Asegúrate de mantener el fondo si es necesario */
  padding: 0 !important;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #c9c9b6;
}

.app-content {
  flex: 1;
  padding-top: 100px;
  background-color: #c9c9b6; /* Mismo color que el fondo para evitar líneas */
}

.app-footer {
  background-color: #1F2937;
  color: #c0bcbc;
  text-align: center;
  padding: 20px 0;
  width: 100%;
}

.app-footer .app-contacto-info p {
  margin: 5px 0;
}

/* Header */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #1F2937;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.app-logo img {
  width: 100px;
  height: 100px;
}

.app-nav-links {
  display: flex;
  gap: 30px;
}

.app-nav-links img {
  width: 50px;
  height: 50px;
}

.app-nav-links a {
  text-decoration: none;
  color: #c0bcbc;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.app-nav-links a:hover {
  background-color: #0056b3;
  color: white;
}

.app-logged-in-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.app-logged-in-section p {
  color: white;
  font-size: 1.2em;
  margin: 0;
}

.app-login-form {
  display: flex;
  gap: 10px;
}

.app-login-form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: black; /* El texto escrito será negro */
  background-color: #ffffff; /* Asegúrate de que el fondo sea claro */
}

.app-login-form button {
  background-color: #010a14;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
}

.app-login-form button:hover {
  background-color: #0056b3;
}

.app-btn-logout {
  background-color: #e74c3c;
  color: white;
  border: 2px solid #c0392b;
  padding: 10px 25px;
  border-radius: 5px;
  font-size: 1em;
  width: auto;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.app-btn-logout:hover {
  background-color: #c0392b;
}
</style>
