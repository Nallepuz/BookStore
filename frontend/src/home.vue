<template>
    <div id="carousel-app">
      <div class="carousel-content-wrapper">
        <!-- Essential Books Section -->
        <div class="carousel-container">
          <h1>Essential Books</h1>
          <div class="carousel-book-gallery">
            <div class="carousel-book">
              <img src="https://m.media-amazon.com/images/I/71O2UtxM9wL._AC_UF894,1000_QL80_.jpg" alt="Book 1" />
            </div>
            <div class="carousel-book">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0-7ByEqKUL3czChfTeb_NQwLoEDBan07b82BqV4EYCHNEe3xvkP98CkyvuWIPvnt68Xwg4QXwGXnY8Cb1XRr5lbbXl-Fnq5yxyIgJJyLeYRzR7jcYEbBYidHeQtS2sYbqc-EZoPdNPtQ/s1600/19556g.JPG"
                alt="Book 2"
              />
            </div>
            <div class="carousel-book">
              <img
                src="https://m.media-amazon.com/images/I/71FitA91O+L._AC_UF1000,1000_QL80_.jpg"
                alt="Book 3"
              />
            </div>
            <div class="carousel-book">
              <img src="https://www.libreriaalberti.com/media/img/portadas/_visd_0000JPG029E6.jpg" alt="Book 4" />
            </div>
            <div class="carousel-book">
              <img src="https://www.grantlibreria.com/imagenes/9788419/978841916351.GIF" alt="Book 5" />
            </div>
          </div>
        </div>
  
        <!-- Promotion Section -->
        <div class="carousel-highlight-section">
          <div class="carousel-highlight-content">
            <div class="carousel-highlight-text">
              <h2>Essential books with 5% off</h2>
              <p>Don't miss this month's deals with 5% off and FREE shipping for members.</p>
            </div>
            <div class="carousel-highlight-button">
              <button>View Essentials</button>
            </div>
          </div>
        </div>
  
        <!-- Book Carousel Section -->
        <div class="carousel-carousel-section">
          <h2>Discover Our Featured Books</h2>
          <div class="carousel-carousel">
            <div class="carousel-carousel-track" :style="{ transform: `translateX(-${scrollPosition}px)` }">
              <div class="carousel-carousel-item" v-for="product in products" :key="product.id">
                <img :src="product.image" alt="Book Cover" />
                <p>{{ product.name }}</p>
              </div>
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
        products: [],
        scrollPosition: 0,
        intervalId: null,
      };
    },
    methods: {
      fetchProducts() {
        axios
          .get('http://localhost:8081/products')
          .then((response) => {
            this.products = response.data.slice(0, 10);
          })
          .catch((error) => {
            console.error('Error al cargar los productos:', error);
          });
      },
      startCarousel() {
        this.intervalId = setInterval(() => {
          this.scrollPosition += 2;
          const maxScroll = this.products.length * 220;
          if (this.scrollPosition >= maxScroll) {
            this.scrollPosition = 0;
          }
        }, 20);
      },
    },
    mounted() {
      this.fetchProducts();
      this.startCarousel();
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    },
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .carousel-content-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  /* Contenedor principal */
  .carousel-container {
    margin-top: 20px;
    padding: 20px;
    text-align: center;
    background-image: url('https://png.pngtree.com/thumb_back/fw800/background/20241030/pngtree-cozy-library-with-bookshelves-and-sunlight-through-the-window-sunlit-interior-image_16474023.jpg');
    background-size: cover;
    background-position: center;
    color: white;
  }
  
  .carousel-book-gallery {
    display: flex;
    justify-content: center;
    gap: 15px;
    overflow-x: auto;
    padding: 20px 0;
  }
  
  .carousel-book {
    width: 150px;
    height: 220px;
    background-color: #ccc;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .carousel-book img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Sección de promoción */
  .carousel-highlight-section {
    background-color: #000;
    color: #fff;
    padding: 40px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .carousel-highlight-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .carousel-highlight-text {
    text-align: left;
  }
  
  .carousel-highlight-text h2 {
    margin: 0 0 10px 0;
  }
  
  .carousel-highlight-text p {
    margin: 0;
    font-size: 18px;
  }
  
  .carousel-highlight-button {
    padding-left: 20px;
  }
  
  .carousel-highlight-button button {
    background-color: #f4c724;
    border: none;
    padding: 15px 30px;
    color: #000;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 200px;
  }
  
  .carousel-highlight-button button:hover {
    background-color: #e0b822;
  }
  
  /* Carrusel */
  .carousel-carousel-section {
    margin-top: 40px;
    text-align: center;
    color: rgb(0, 0, 0);
  }
  
  .carousel-carousel {
    overflow: hidden;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
  }
  
  .carousel-carousel-track {
    display: flex;
    transition: transform 0.1s linear;
    gap: 20px;
  }
  
  .carousel-carousel-item {
    flex: 0 0 auto;
    width: 200px;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .carousel-carousel-item img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .carousel-carousel-item p {
    margin-top: 10px;
    font-weight: bold;
    color: #000;
  }
  
  .carousel-container h1 {
    font-size: 50px;
    color: #fac400;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
    margin-bottom: 20px;
    font-weight: bold;
  }
  </style>
  