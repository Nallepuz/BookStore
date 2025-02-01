<template>
  <div id="app">
    <div class="product-admin-container">
      <div class="product-admin-card" v-for="item in products" :key="item.name">
        <h5 class="product-admin-title">{{ item.name }}</h5>
        <img :src="item.image" class="product-admin-image" alt="Product image">
        <p class="product-admin-price">{{ item.price }} €</p>

        <div class="product-admin-buttons">
          <button v-if="isLoggedIn" class="product-admin-btn-add" @click="addToCart(item)">+</button>
          <template v-if="isAdmin">
            <button class="product-admin-btn-edit" @click="startEditing(item)">✎</button>
            <button class="product-admin-btn-delete" @click="deleteProduct(item.id)">✖</button>
          </template>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingProduct" class="product-admin-edit-modal">
      <div class="product-admin-modal-content">
        <h3>Editing: {{ editingProduct.name }}</h3>
        <input v-model="editingProduct.name" type="text" placeholder="New book name">
        <input v-model="editingProduct.image" type="text" placeholder="New image URL">
        <input v-model.number="editingProduct.price" type="number" placeholder="New book price">

        <div class="product-admin-modal-buttons">
          <button @click="saveEdit" class="product-admin-btn-save">Save</button>
          <button @click="cancelEdit" class="product-admin-btn-cancel">Cancel</button>
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
      products: [],
      isAdmin: false,
      isLoggedIn: false,
      editingProduct: null,
    };
  },
  mounted() {
    this.readProducts();
    this.checkAdminStatus();
    this.checkUserLoginStatus();
  },
  methods: {
    readProducts() {
      axios
        .get('http://localhost:8081/products')
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    startEditing(product) {
      this.editingProduct = { ...product };
    },
    cancelEdit() {
      this.editingProduct = null;
    },
    saveEdit() {
      const { id, name, image, price } = this.editingProduct;
      if (!name || !image || price <= 0) {
        alert('Todos los campos deben ser válidos.');
        return;
      }
      axios
        .put(`http://localhost:8081/products/${id}`, { name, image, price })
        .then(() => {
          alert('Producto actualizado.');
          this.editingProduct = null;
          this.readProducts();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    deleteProduct(productId) {
      if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
      }

      axios
        .delete(`http://localhost:8081/products/${productId}`)
        .then(() => {
          this.products = this.products.filter((product) => product.id !== productId);
          alert('Producto eliminado exitosamente.');
        })
        .catch((error) => {
          console.error('Error al eliminar el producto:', error);
        });
    },

    checkAdminStatus() {
      const userEmail = localStorage.getItem('userEmail');
      this.isAdmin = userEmail === 'admin@gmail.com';
    },

    checkUserLoginStatus() {
      const userToken = localStorage.getItem('userToken');
      this.isLoggedIn = !!userToken;
    },

    addToCart(product) {
      const userId = localStorage.getItem('userId');
      axios
        .post('http://localhost:8081/cart', { user_id: userId, product_id: product.id })
        .then(() => {
          alert('Producto añadido al carrito.');
          this.loadCart();
        })
        .catch((error) => {
          console.error('Error al añadir el producto al carrito:', error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #b3b8bd;
  padding: 100px 20px;
}

.product-admin-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.product-admin-card {
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  width: 250px;
  text-align: center;
}

.product-admin-title {
  font-size: 1.3em;
  color: #333;
  min-height: 50px;
  margin-bottom: 10px;
}

.product-admin-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 4px;
}

.product-admin-price {
  font-size: 1.1em;
  color: #b19114;
  margin: 10px 0;
}

.product-admin-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
}

.product-admin-btn-add {
  width: 50px;
  height: 50px;
  background-color: #0b3f7a;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-admin-btn-edit {
  width: 50px;
  height: 50px;
  background-color: #076e0c;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-admin-btn-delete {
  width: 50px;
  height: 50px;
  background-color: #85110d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-admin-btn-add:hover,
.product-admin-btn-edit:hover,
.product-admin-btn-delete:hover {
  filter: brightness(1.2);
}

/* Ventana emergente de edición */
.product-admin-edit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.product-admin-modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-admin-modal-content input {
  background-color: #1b1b1b;
  color: #ffffff;
  border: 1px solid #444;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
}

.product-admin-modal-content input::placeholder {
  color: #aaaaaa;
  font-style: italic;
}

.product-admin-modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.product-admin-btn-save,
.product-admin-btn-cancel {
  background-color: white;
  color: black;
  padding: 12px 20px;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  font-weight: bold;
  width: 100px;
  text-align: center;
}

.product-admin-btn-save:hover {
  background-color: #4CAF50;
  color: white;
}

.product-admin-btn-cancel:hover {
  background-color: #f44336;
  color: white;
}
</style>
