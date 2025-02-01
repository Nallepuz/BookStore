<template>
  <div id="app">
    <div class="products-container">
      <div class="product-card" v-for="item in products" :key="item.name">
        <img :src="item.image" class="product-image" alt="Product image">
        <h5 class="product-title">{{ item.name }}</h5>
        <p class="product-price">{{ item.price }} €</p>
        <template v-if="isLoggedIn">
          <div class="buttons-container">
            <button class="btn btn-warning" @click="addToCart(item)">Add to cart</button>
            <button class="btn btn-primary" @click="startEditing(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteProduct(item.name)">Delete</button>
          </div>
        </template>

        <div v-if="editingProduct?.id === item.id" class="edit-modal">
          <h5>Editando: {{ editingProduct.name }}</h5>
          <input type="text" v-model="editingProduct.name" placeholder="Nuevo nombre">
          <input type="text" v-model="editingProduct.image" placeholder="Nueva URL de la imagen">
          <input type="number" v-model="editingProduct.price" placeholder="Nuevo precio">
          <div class="modal-buttons">
            <button class="btn btn-success" @click="saveEdit">Guardar</button>
            <button class="btn btn-secondary" @click="cancelEdit">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'UserProducts',     // Componente para mostrar los productos
  data() {

    // Inicializar los datos
    return {
      products: [],
      urlist: [], // Lista de productos añadidos al carrito
      isLoggedIn: false,
      editingProduct: null, // Producto en edición
    };
  },
  mounted() {
    this.readProducts();     // Leer los productos
    this.checkLoginStatus(); // Comprobar estado de sesión
  },
  methods: {

    // Método para leer los productos
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

    // Método para eliminar un producto
    deleteProduct(productName) {
      if (!confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}"?`)) {
        return;
      }
      axios
        .delete(`http://localhost:8081/products/${productName}`)
        .then(() => {
          this.products = this.products.filter((product) => product.name !== productName);
          alert('Producto eliminado exitosamente.');
        })
        .catch((error) => {
          console.error('Error al eliminar el producto:', error);
          alert('Error al eliminar el producto. Por favor, inténtalo de nuevo.');
        });
    },

    // Método para iniciar la edición de un producto
    startEditing(product) {
      console.log('Iniciando edición para:', product); // Log del producto seleccionado
      this.editingProduct = { ...product }; // Clona los datos del producto en edición
    },

    saveEdit() {
      const { id, name, price, image } = this.editingProduct;

      if (!name || !image || price == null || price <= 0) {
        alert('Todos los campos deben ser válidos y completos.');
        return;
      }

      axios
        .put(`http://localhost:8081/products/${id}`, { name, price, image }) // Usa el ID
        .then(() => {
          this.editingProduct = null;
          this.readProducts(); // Recargar productos actualizados
        })
        .catch((error) => {
          console.error('Error al guardar edición:', error);
          alert('Error al actualizar el producto. Inténtalo nuevamente.');
        });
    },

    cancelEdit() {
      this.editingProduct = null; // Cancelar la edición
    },
    checkLoginStatus() {
      const userToken = localStorage.getItem('userToken');
      this.isLoggedIn = !!userToken; // Si hay un token, está logueado
    },

    // Método para añadir un producto al carrito
    addToCart(product) {
      const userId = localStorage.getItem('userId');

      axios
        .post('http://localhost:8081/cart', {
          user_id: userId,
          product_id: product.id,
        })
        .then((response) => {
          console.log('Producto añadido:', response.data.cart); // Muestra el carrito actualizado
          alert('Producto añadido al carrito.');
          this.loadCart(); // Cargar el carrito actualizado
        })
        .catch((error) => {
          console.error('Error al añadir producto al carrito:', error.response?.data || error.message);
          alert('Error al añadir producto al carrito.');
        });
    },

    loadCart() {
      const userId = localStorage.getItem('userId'); // Obtén el ID del usuario logueado

      axios
        .get(`http://localhost:8081/cart/${userId}`)
        .then((response) => {
          this.cart = response.data; // Actualiza los productos en el carrito
          console.log('Carrito cargado:', this.cart); // Verifica los datos en la consola
        })
        .catch((error) => {
          console.error('Error al cargar el carrito:', error);
          alert('Error al cargar el carrito.');
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #b3b8bd;
  background-color: #272727;
  padding: 20px;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product-card {
  background-color: #3e3f41;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  width: 300px;
  text-align: center;
}

.product-image {
  width: 60%;
  height: 230px;
  object-fit: cover;
  border-radius: 8px;
}

.product-title {
  font-size: 1.5em;
  margin: 10px 0;
  color: #fff;
}

.product-price {
  font-size: 1.2em;
  color: #ffcc00;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-warning {
  background-color: #4ed8f0;
  color: #fff;
}

.btn-primary {
  background-color: #0275d8;
  color: #fff;
}

.btn-danger {
  background-color: #b42621;
  color: #fff;
}

.edit-modal {
  margin-top: 20px;
  padding: 20px;
  background-color: #444;
  border-radius: 8px;
  color: #fff;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
