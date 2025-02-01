<template>
  <div class="account-container">
    <h2>Account Options</h2>
    <div class="account-options-list">
      <!-- Change Email -->
      <div class="account-option-item">
        <button @click="toggleOption('changeEmail')">Change Email</button>
        <div v-if="selectedOption === 'changeEmail'" class="account-option-form">
          <h3>Change Email</h3>
          <input type="email" v-model="newEmail" placeholder="New Email" class="account-input-field" />
          <div class="account-buttons">
            <button @click="updateEmail" class="account-btn-success">Save</button>
            <button @click="cancelOption" class="account-btn-secondary">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <div class="account-option-item">
        <button @click="toggleOption('changePassword')">Change Password</button>
        <div v-if="selectedOption === 'changePassword'" class="account-option-form">
          <h3>Change Password</h3>
          <input type="password" v-model="newPassword" placeholder="New Password" class="account-input-field" />
          <input type="password" v-model="confirmPassword" placeholder="Confirm New Password" class="account-input-field" />
          <div class="account-buttons">
            <button @click="updatePassword" class="account-btn-success">Save</button>
            <button @click="cancelOption" class="account-btn-secondary">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Delete Account -->
      <div class="account-option-item">
        <button @click="toggleOption('deleteAccount')" class="account-btn-danger">Delete Account</button>
        <div v-if="selectedOption === 'deleteAccount'" class="account-option-form">
          <h3>Are you sure you want to delete your account?</h3>
          <p>This action cannot be undone.</p>
          <div class="account-buttons">
            <button @click="deleteAccount" class="account-btn-danger">Delete</button>
            <button @click="cancelOption" class="account-btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedOption: null,
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  methods: {
    toggleOption(option) {
      this.selectedOption = this.selectedOption === option ? null : option;
    },
    cancelOption() {
      this.selectedOption = null;
      this.newEmail = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },

    async updateEmail() {
      const userId = localStorage.getItem('userId');
      if (!this.newEmail) {
        alert("Por favor, ingresa un nuevo correo electrónico.");
        return;
      }
      try {
        await axios.put('http://localhost:8081/update-email', { user_id: userId, email: this.newEmail });
        alert("Correo electrónico actualizado con éxito.");
        localStorage.setItem('userEmail', this.newEmail);
        window.dispatchEvent(new CustomEvent('email-updated', { detail: this.newEmail }));
      } catch (error) {
        console.error("Error al actualizar el correo:", error);
        alert("Hubo un error al actualizar el correo.");
      }
    },

    async updatePassword() {
      const userId = localStorage.getItem('userId');
      if (!this.newPassword || this.newPassword !== this.confirmPassword) {
        alert("Las contraseñas no coinciden o están vacías.");
        return;
      }
      try {
        await axios.put('http://localhost:8081/update-password', { user_id: userId, password: this.newPassword });
        alert("Contraseña actualizada con éxito.");
        localStorage.clear();
        window.location.href = '/';
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        alert("Hubo un error al actualizar la contraseña.");
      }
    },

    async deleteAccount() {
      const userId = localStorage.getItem('userId');
      if (confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
        try {
          await axios.delete('http://localhost:8081/delete-account', { data: { user_id: userId } });
          alert("Cuenta eliminada con éxito.");
          localStorage.clear();
          window.location.href = '/';
        } catch (error) {
          console.error("Error al eliminar la cuenta:", error);
          alert("Hubo un error al eliminar la cuenta.");
        }
      }
    },
  },
};
</script>

<style>
body {
  font-family: 'Arial, sans-serif';
  background-color: #1E3A8A;
  margin: 0;
  padding: 0;
}

.account-container {
  background-color: #1b2735;
  padding: 40px;
  border-radius: 12px;
  max-width: 800px;
  margin: 50px auto;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
}

h2 {
  color: #ffda44;
  font-size: 2rem;
  margin-bottom: 30px;
}

.account-options-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.account-option-item {
  background: #243447;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.account-option-item:hover {
  transform: scale(1.02);
}

.account-option-item button {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  background-color: #445466;
}

.account-option-item button.account-btn-danger {
  background-color: #b22222;
}

.account-option-item button:hover {
  filter: brightness(1.2);
}

.account-option-form {
  margin-top: 15px;
  text-align: left;
}

.account-input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1rem;
}

.account-input-field::placeholder {
  color: #aaaaaa;
  font-style: italic;
}

.account-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.account-buttons button {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  margin-right: 10px;
  border-radius: 8px;
}

.account-btn-success {
  background-color: #28a745;
  color: white;
}

.account-btn-secondary {
  background-color: #6c757d;
  color: white;
}

.account-btn-danger {
  background-color: #dc3545;
  color: white;
}

.account-btn-success:hover {
  background-color: #218838;
}

.account-btn-secondary:hover {
  background-color: #5a6268;
}

.account-btn-danger:hover {
  background-color: #a71d2a;
}
</style>
