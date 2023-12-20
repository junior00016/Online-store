<template>
    <div class="products__cards-card" :key="product.id">
      <img class="products__cards-card-img" :src="product.thumbnail" alt="">
      <h2 class="products__cards-card-title">{{ product.title }} </h2>
      <p class="products__cards-card-discount">-{{ product.discountPercentage }}%</p>
      <p class="products__cards-card-rating">Pейтинг: {{ product.rating }}</p>
      <div class="products__cards-card-shop">
        <p class="products__cards-card-shop-prise">{{ product.price }} $</p>
        <p class="products__cards-card-shop-btn" @click="addToCart(product)">Купить</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
      addToCart: {
        type: Function,
        required: true,
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  