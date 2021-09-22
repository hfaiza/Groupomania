<template>
  <Header />
  <router-view/>
</template>

<script>
import Header from '@/components/Header.vue' 

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #091F43;
  text-align: center;
}

section {
  margin: auto;
  max-width: 1000px;
}
</style>
