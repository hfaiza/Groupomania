<template>
  <div id="header-background">
    <header>
      <img :src="require(`@/assets/groupomania-icon.png`)" alt="Groupomania" />
      <nav>
        <router-link to="/" v-if="!loggedIn">Inscription</router-link>
        <router-link to="/login" v-if="!loggedIn">Connexion</router-link>
        <router-link to="/posts" v-if="loggedIn">Accueil</router-link>
        <router-link to="/writepost" v-if="loggedIn">Publier</router-link>
        <router-link to="/users" v-if="loggedIn">Membres</router-link>
        <router-link :to="{ name: 'UserProfile', params: { id: userId } }" v-if="loggedIn">Mon profil</router-link>
        <a id="logout" @click="logout" v-if="loggedIn">Déconnexion</a>
      </nav>
    </header>
  </div>
</template>

<script lang="js">
export default ({
  name: 'Header',
    data() {
    return {
      userId: localStorage.getItem("userId"),
    }
  },
  computed: {
    loggedIn: function () {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.push('/login');
    },
  }
});
</script>

<style scoped lang="scss">
#header-background {
  background-color: #091f43;
}

header {
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0.8rem 0.8rem 1.5rem;
  margin: auto;
  position: relative;
}

nav {
  display: table;
  border-spacing: 1.5rem 0;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
  display: table-cell;
  vertical-align: middle;
  position: relative;

  &:hover {
    color: #bed5fa;
  }
}

.router-link-active::before {
  content: "";
  position: absolute;
  bottom: -0.2rem;
  width: 100%;
  height: 0.2rem;
  background-color: #fd2d01;
}

img {
  height: 2rem;
}

#logout {
  cursor: pointer;
}
</style>
