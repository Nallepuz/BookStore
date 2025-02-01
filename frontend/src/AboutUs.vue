<template>
    <div class="about-us-container">
      <!-- Introduction Section -->
      <section class="about-us-intro">
        <h1>Welcome to BookStoreNAM</h1>
        <p>
          At our online bookstore, we take the love for books to the next level. We offer a wide selection of titles, from timeless classics to the latest releases, to help you find your next literary adventure.
        </p>
      </section>
  
      <!-- Featured Image Section -->
      <div class="about-us-image-section">
        <img src="https://www.comprarmejor.es/wp-content/uploads/2022/04/DSC03619.jpg" alt="Our book collection" class="about-us-image">
      </div>
  
      <!-- Mission and Values Section -->
      <section class="about-us-mission">
        <h2>Our Mission</h2>
        <p>
          To inspire readers, foster knowledge, and connect people through the power of reading. We work to provide you with the best experience when searching for and purchasing books.
        </p>
  
        <h2>Why Choose Us?</h2>
        <ul>
          <li>📚 <strong>Wide selection of titles:</strong> From fiction, science, fantasy, to educational books.</li>
          <li>🚚 <strong>Fast and secure shipping:</strong> Your order will arrive on time and in perfect condition.</li>
          <li>🌍 <strong>Global access:</strong> Shop from anywhere in the world.</li>
          <li>💬 <strong>Personalized support:</strong> We are here to help you with whatever you need.</li>
        </ul>
      </section>
  
      <!-- Team Section -->
      <section class="about-us-team">
        <h2>Meet Our Team</h2>
        <p>
          Behind every recommendation, offer, and delivery is a team passionate about literature and committed to readers.
        </p>
        <img src="https://pymstatic.com/115717/conversions/ventajas-trabajo-en-equipo-default.jpg" alt="Our team" class="team-photo">
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutUs",
  };
  </script>
  
  <style>
  body {
    font-family: 'Arial, sans-serif';
    background-color: #f5f5dc; /* Fondo claro */
    color: #333333; /* Texto oscuro */
    margin: 0;
    padding: 0;
  }
  
  .about-us-container {
    padding: 40px;
    max-width: 1200px;
    margin: auto;
  }
  
  .about-us-intro {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .about-us-intro h1 {
    font-size: 40px;
    color: #2d2d2d;
    margin-bottom: 10px;
  }
  
  .about-us-intro p {
    font-size: 18px;
    color: #4f4f4f;
  }
  
  .about-us-image-section {
    text-align: center;
    margin: 40px 0;
  }
  
  .about-us-image {
    width: 100%;
    max-width: 800px;
    border-radius: 10px;
  }
  
  .about-us-mission {
    margin-top: 20px;
  }
  
  .about-us-mission h2 {
    color: #2d2d2d;
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .about-us-mission p {
    color: #4f4f4f;
    font-size: 18px;
  }
  
  .about-us-mission ul {
    list-style: none;
    padding: 0;
  }
  
  .about-us-mission ul li {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .about-us-mission ul li strong {
    color: #2d2d2d;
  }
  
  .about-us-team {
    margin-top: 40px;
  }
  
  .about-us-team h2 {
    color: #2d2d2d;
    font-size: 28px;
  }
  
  .about-us-team p {
    color: #4f4f4f;
    font-size: 18px;
  }
  
  .team-photo {
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
    display: block;
    margin: 20px auto;
  }
  </style>
  