<template>
  <div id="app">
      <Header />
      <router-view />
  </div>
</template>

<script>

import Header from './components/Header';
import Map from './components/Map';
import MaskDescription from './components/MaskDescription';

export default {
  name: 'App',
  components: {
    Header,
    Map,
    MaskDescription
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
