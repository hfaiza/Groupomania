<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
// STYLE GLOBAL
body {
  margin: 0;
}

#app {
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #091f43;
  text-align: center;
}

section {
  margin: auto;
  max-width: 1000px;
}

button,
input,
textarea {
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// PAGES D'INSCRIPTION ET DE CONNEXION
.signup-login-section {
  margin: 3rem auto;
  padding: 0.5rem 0.8rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #f2f2f2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;

  h1 {
    font-size: 3rem;
    margin: 0.5rem 0;
  }

  h2 {
    color: #7c7c7c;
    font-weight: 100;
    font-size: 1.2rem;
    margin-top: 0;
  }
}
</style>
