import {
  createStore
} from 'vuex';

export const store = createStore({
  state: {
    products: null,
    cart: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    addToCart(state, product) {
      state.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    clearProduct(state, index) {
      state.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {
    async getProductsByCategory({
      commit
    }, category) {
      let response = await fetch(`https://dummyjson.com/products/category/${category}`);
      let result = await response.json();
      commit('setProducts', result.products);
    },
    async setProducts({
      commit
    }) {
      let response = await fetch(`https://dummyjson.com/products?limit=100`);
      let result = await response.json();
      commit('setProducts', result.products);
    },
    addToCart({
      commit
    }, product) {
      commit('addToCart', product);
    },
    clearCart({
      commit
    }) {
      commit('clearCart');
    },
  },
  getters: {
    products: state => state.products,
    cartItems: state => state.cart,
    totalCartAmount: state => {
      return state.cart.reduce((total, product) => total + product.price, 0);
    },
  },
});