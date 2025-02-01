<template>
  <div class="contact-book-container">
    <div class="contact-book">
      <!-- Página izquierda (FAQs) -->
      <div class="contact-left-page">
        <h3>FAQs</h3>
        <ul>
          <li>How can I create an account?</li>
          <li>How do I reset my password?</li>
          <li>How do I contact support?</li>
          <li>How do I check my orders?</li>
          <li>Is my data secure?</li>
        </ul>
      </div>

      <!-- Página derecha (Formulario) -->
      <div class="contact-right-page">
        <h3>Contact Us</h3>
        <form @submit.prevent="handleSignUp">
          <div class="contact-form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="username" placeholder="Enter your name" required>
          </div>

          <div class="contact-form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
          </div>

          <div class="contact-form-group">
            <label for="message">Message</label>
            <textarea id="message" placeholder="Enter your message"></textarea>
          </div>

          <button type="submit" class="contact-submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
};
</script>

<style>
body {
  font-family: 'Georgia, serif';
  background-color: #eae4d3;
  margin: 0;
  padding: 0;
}

.contact-book-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

/* Contenedor del libro */
.contact-book {
  display: flex;
  width: 1200px;
  height: 700px;
  background-color: #5a3921;
  border: 15px solid #3e2413;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

/* Páginas del libro */
.contact-left-page,
.contact-right-page {
  flex: 1;
  padding: 40px;
  background-color: #f8f0dc;
  border-radius: 5px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.2);
}

.contact-left-page {
  border-right: 5px solid #d3b38c;
}

h3 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #0c0500;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 15px;
  font-size: 20px;
  color: #4a4a4a;
}

/* Formulario de contacto */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 20px;
  margin-bottom: 5px;
  color: #3e2413;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #a37e5c;
  border-radius: 5px;
  font-size: 18px;
  background-color: #f2e8d4;
}

textarea {
  resize: none;
  height: 120px;
}

/* Botón de envío */
.contact-submit-btn {
  padding: 14px;
  font-size: 20px;
  color: white;
  background-color: #6e3e23;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-submit-btn:hover {
  background-color: #4e2b17;
}

input::placeholder,
textarea::placeholder {
  color: #333333;
  font-style: italic;
}
</style>
