<template>
    <div class="products">
        <div class="container">
            <div class="products__menu">
                <select id="sort" class="products__menu-sorts" v-model="selectedSort">
                    <option class="products__menu-sorts-desc" value="price">По цене</option>
                    <option class="products__menu-sorts-desc" value="discountPercentage">По скидке</option>
                    <option class="products__menu-sorts-desc" value="rating">По рейтингу</option>
                </select>
                <p class="products__menu-total">Общее кол-во товаров-{{ totalProducts }}</p>
            </div>
            <div class="products__cards">
                <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product"
                    :add-to-cart="addToCart" />
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ProductCard,
    },
    data() {
        return {
            selectedSort: 'price',
        };
    },
    computed: {
        ...mapGetters(['products', 'totalCartAmount']),
        sortedProducts() {
            if (this.products) {
                return this.products.slice().sort((a, b) => {
                    if (this.selectedSort === 'price') {
                        return a.price - b.price;
                    } else if (this.selectedSort === 'discountPercentage') {
                        return b.discountPercentage - a.discountPercentage;
                    } else if (this.selectedSort === 'rating') {
                        return b.rating - a.rating;
                    }
                });
            } else {
                return [];
            }
        },
        totalProducts() {
            return this.products ? this.products.length : 0;
        },
    },
    methods: {
        ...mapActions(['setProducts', 'addToCart']),

    },
    mounted() {
        this.setProducts();
    },

};
</script>

<style lang="scss" scoped></style>




  
