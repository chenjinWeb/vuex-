<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <product-list></product-list>
    <hr>
    <cart></cart>

  </div>
</template>

<script>

  import productList from "./components/productList";
  import cart from "./components/cart.vue"


  export default {
    name: 'app',
    components:{
      productList,
      cart
    }
  }
</script>

<style>

</style>
