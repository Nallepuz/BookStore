<template>
  <div class="cart-container">
    <h3 class="cart-title">List of Products in the Cart</h3>
    <table class="cart-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }} €</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price * item.quantity }} €</td>
          <td>
            <button @click="removeItem(item.id)" class="btn btn-danger">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="cart-total">
      <h4>Cart Total: {{ cart.total }} €</h4>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'UrList',
  data() {
    return {
      cart: { items: [], total: 0 },
    };
  },
  methods: {
    loadCart() {
      const userId = localStorage.getItem('userId');
      axios
        .get(`http://localhost:8081/cart/${userId}`)
        .then((response) => {
          this.cart = response.data;
        })
        .catch((error) => {
          console.error('Error al cargar el carrito:', error);
        });
    },
    removeItem(itemId) {
      const userId = localStorage.getItem('userId');
      axios
        .delete(`http://localhost:8081/cart/${userId}/item/${itemId}`)
        .then(() => {
          this.loadCart();
          alert('Producto eliminado del carrito.');
        })
        .catch((error) => {
          console.error('Error al eliminar producto del carrito:', error);
          alert('Error al eliminar producto del carrito.');
        });
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style>
.cart-container {
  background-color: #2e3b4e;
  padding: 40px;
  border-radius: 10px;
  color: white;
  max-width: 900px;
  margin: 40px auto;
}

.cart-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table thead {
  background-color: #1b2735;
  color: #f4c724;
}

.cart-table th,
.cart-table td {
  padding: 12px;
  text-align: left;
}

.cart-table tbody tr {
  background-color: #3c4a5c;
}

.cart-table tbody tr:nth-child(even) {
  background-color: #465668;
}

.cart-table td {
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 85px;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.cart-total {
  background-color: #1b2735;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  border-radius: 5px;
  font-size: 1.5em;
  color: #f4c724;
}
</style>
