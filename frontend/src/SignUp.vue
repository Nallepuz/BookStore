<template>
  <div class="signup-container">
    <!-- Sección izquierda: Imagen y título -->
    <div class="signup-left-section">
      <h2 class="signup-image-title">Join the Reading!</h2>
      <img src="https://d33y0z4ooepzrm.cloudfront.net/images/a0b0ba9cf121d9f24d51ef247e7b762e2d5d513a/fullscreen/a0b0ba9cf121d9f24d51ef247e7b762e2d5d513a.jpg" alt="Reading Image" class="signup-image" />
    </div>

    <!-- Sección derecha: Tarjeta del formulario -->
    <div class="signup-card">
      <h3 class="signup-card-title">Sign Up</h3>
      <form @submit.prevent="handleSignUp" class="signup-form">
        <div class="signup-form-group">
          <label for="signup-email">Email address</label>
          <input type="email" id="signup-email" v-model="email" placeholder="Enter your email" required class="signup-input">
        </div>

        <div class="signup-form-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" v-model="password" placeholder="Enter your password" required class="signup-input">
        </div>

        <button type="submit" class="signup-submit-btn">Submit</button>
      </form>

      <!-- Mostrar mensaje de error si existe -->
      <p v-if="errorMessage" class="signup-error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSignUp() {
      try {
        const response = await fetch('http://localhost:8081/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();
        if (data.success) {
          alert('Successfully registered!');
          this.$router.push('/home');
        } else {
          this.errorMessage = data.message || 'An error occurred during registration.';
        }
      } catch (error) {
        console.error('Sign Up Error:', error);
        this.errorMessage = 'Unable to connect to the server.';
      }
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #1e1e1e;
  margin: 0;
  padding: 0;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 50px;
  padding: 20px;
}

/* Sección izquierda: Imagen */
.signup-left-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signup-image-title {
  font-size: 48px;
  color: #000000;
  margin-bottom: 15px;
}

.signup-image {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
}

/* Sección derecha: Formulario */
.signup-card {
  background-color: #222;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 500px;
}

.signup-card-title {
  font-size: 32px;
  margin-bottom: 25px;
  text-align: center;
  color: #ffffff;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.signup-form-group {
  display: flex;
  flex-direction: column;
}

.signup-form-group label {
  font-size: 18px;
  color: #cccccc;
  margin-bottom: 5px;
}

.signup-input {
  padding: 15px;
  border: 1px solid #555;
  border-radius: 8px;
  font-size: 18px;
  background-color: #333;
  color: #ffffff;
}

.signup-input::placeholder {
  color: #aaaaaa;
  font-style: italic;
}

.signup-submit-btn {
  padding: 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
}

.signup-submit-btn:hover {
  background-color: #004494;
}

.signup-error-message {
  color: #ff4d4d;
  text-align: center;
  margin-top: 15px;
}
</style>
