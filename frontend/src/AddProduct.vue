<template>
  <div class="add-product-main-container">
    <div class="add-product-card-container">
      <div class="add-product-card">
        <h3 class="add-product-card-title">Add Product</h3>
        <form @submit.prevent="addProduct" class="add-product-form">
          <div class="add-product-form-group">
            <label class="add-product-label" for="add-product-image">Image URL</label>
            <input type="text" id="add-product-image" v-model="product.image" placeholder="Enter image URL" required class="add-product-input">
          </div>
          <div class="add-product-form-group">
            <label class="add-product-label" for="add-product-name">Product Name</label>
            <input type="text" id="add-product-name" v-model="product.name" placeholder="Enter product name" required class="add-product-input">
          </div>
          <div class="add-product-form-group">
            <label class="add-product-label" for="add-product-price">Price</label>
            <input type="number" id="add-product-price" v-model="product.price" placeholder="Enter price" required class="add-product-input">
          </div>
          <button type="submit" class="add-product-submit-btn">Add Product</button>
        </form>
        <p v-if="successMessage" class="add-product-success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="add-product-error-message">{{ errorMessage }}</p>
      </div>
    </div>
    <div class="add-product-background-image"></div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        image: '',
        name: '',
        price: ''
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    isValidUrl(url) {
      const pattern = new RegExp('^(https?:\\/\\/)' +
        '(([a-zA-Z\\d-]+\\.)+[a-zA-Z]{2,})' +
        '(\\:[0-9]{1,5})?' +
        '(\\/.*)?$', 'i');
      return pattern.test(url);
    },

    async addProduct() {
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.isValidUrl(this.product.image)) {
        this.errorMessage = 'Please enter a valid URL.';
        return;
      }

      try {
        const response = await fetch('http://localhost:8081/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.product)
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error adding the product.');
        }

        this.successMessage = data.message;
        this.product.image = '';
        this.product.name = '';
        this.product.price = '';
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #1E293B;
}

.add-product-main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.add-product-card-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-product-card {
  width: 100%;
  max-width: 500px;
  background-color: #0d1117;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
}

.add-product-card-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 25px;
  color: #ffffff;
}

.add-product-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.add-product-form-group {
  display: flex;
  flex-direction: column;
}

.add-product-label {
  font-weight: bold;
  color: #f1f1f1;
  margin-bottom: 5px;
}

.add-product-input {
  padding: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  font-size: 18px;
  background-color: #1c1f26;
  color: #ffffff;
}

.add-product-input::placeholder {
  color: #aab4be;
}

.add-product-submit-btn {
  padding: 12px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.add-product-submit-btn:hover {
  background-color: #0056b3;
}

.add-product-success-message {
  color: #4caf50;
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
}

.add-product-error-message {
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
}

.add-product-background-image {
  flex: 1;
  width: 300px;
  height: 700px;
  background-image: url('https://www.adazing.com/wp-content/uploads/2025/01/how-to-build-a-book.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-left: 20px;
}
</style>
