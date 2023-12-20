<template>
    <div class="header">
        <div class="container">
            <nav class="header__nav">
                <img src="@assets/images/logo.svg" alt="">
                <div class="header__nav-menu">
                    <li class="header__nav-menu-link" @click="toggleCategoriesMenu" >Категории</li>
                </div>
                <div v-if="categoriesMenuVisible" class="header__nav-categories">
                    <li class="header__nav-categories-title" @click="showAllProducts">Показать все категории</li>
                    <li class="header__nav-categories-title" v-for="category in categories" :key="category"
                        @click="selectCategory(category)">
                        {{ category }}
                    </li>
                </div>
                <img src="@assets/images/basket.svg" class="header__nav-basket" @click="toggleCart" alt="">
                <div class="header__nav-modal" :class="{ active: cartVisible }" @click.stop="">
                    <div v-if="cartItems.length === 0" class="header__nav-modal-blok">
                        <div class="header__nav-modal-blok-top">
                            <img src="@assets/images/cross.svg" class="header__nav-modal-blok-top-close" @click="closeCart" alt="">
                            <h2 class="header__nav-modal-blok-top-title">Корзина</h2>
                        </div>
                        <p class="header__nav-modal-blok-emptiness">Корзина пуста</p>
                    </div>
                    <div class="header__nav-modal-blok" v-else>
                        <div class="header__nav-modal-blok-top">
                            <img src="@assets/images/cross.svg" class="header__nav-modal-blok-top-close" @click="closeCart" alt="">
                            <h2 class="header__nav-modal-blok-top-title">Корзина</h2>
                        </div>
                        <ul class="header__nav-modal-blok-ul">
                            <li class="header__nav-modal-blok-ul-li" v-for="item in cartItems" :key="item.id">
                                <div class="header__nav-modal-blok-ul-li-info">
                                    <p class="header__nav-modal-blok-ul-li-info-title">{{ item.title }}</p>
                                    <p class="header__nav-modal-blok-ul-li-info-price">{{ item.price }}$</p>
                                </div>
                                <button class="header__nav-modal-blok-ul-li-btn" @click="cancelProduct(index)">-</button>
                            </li>
                        </ul>
                        <p class="header__nav-modal-blok-totla"> Общая сумма: {{ totalCartAmount }}$</p>
                        <div class="header__nav-modal-blok-desc">
                            <p class="header__nav-modal-blok-desc-closel" @click="cancel">Отмена</p>
                            <p class="header__nav-modal-blok-desc-buy" @click="checkout">Купить</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            categoriesMenuVisible: false,
            cartVisible: true,
            categories: [
                "smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration",
                "furniture",
                "tops",
                "womens-dresses",
                "womens-shoes",
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "womens-watches",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
                "automotive",
                "motorcycle",
                "lighting",
            ],
        };
    },
    computed: {
        ...mapGetters(['cartItems', 'totalCartAmount']),
    },
    methods: {
        ...mapActions(['getProductsByCategory', 'setProducts', 'addToCart', 'clearCart']),
        toggleCategoriesMenu() {
            this.categoriesMenuVisible = !this.categoriesMenuVisible;
        },
        selectCategory(category) {
            this.toggleCategoriesMenu();
            this.fetchDataByCategory(category);
        },
        async fetchDataByCategory(category) {
            try {
                await this.getProductsByCategory(category);
            } catch (error) {
                console.error(error);
            }
        },
        showAllProducts() {
            this.toggleCategoriesMenu();
            this.setProducts();
        },
        toggleCart() {
            this.cartVisible = !this.cartVisible;
           
        },
        checkout() {
            alert('Ваш заказ принят')
            this.clearCart();
            this.toggleCart();
            window.location.reload();

        },
        cancel() {
            this.clearCart();
            this.toggleCart();
        },
        cancelProduct(index) {
            this.cartVisible = false;
            this.clearProduct(index);
        },
        clearProduct(index) {
            this.$store.commit('clearProduct', index);
        },
        closeCart() {
            this.cartVisible = true;
        },
        preventScroll(event) {
            event.preventDefault();
        },
    },
    watch: {
        cartVisible: function (newVal) {
            if (newVal) {
                document.body.style.overflow = '';
                document.body.removeEventListener('scroll', this.preventScroll, false);
            } else {
                document.body.style.overflow = 'hidden';
                document.body.addEventListener('scroll', this.preventScroll, false);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
