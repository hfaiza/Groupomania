<template>
  <div id="header-background">
    <header>
      <img class="big-logo" :src="require(`@/assets/groupomania-icon.png`)" alt="Groupomania" />
      <img class="small-logo" :src="require(`@/assets/groupomania-icon-mobile.png`)" alt="Groupomania" />
      <nav>
        <router-link to="/" v-if="!loggedIn">Inscription</router-link>
        <router-link to="/login" v-if="!loggedIn">Connexion</router-link>
        <router-link to="/posts" v-if="loggedIn"><i class="fas fa-home"></i> <span>Accueil</span></router-link>
        <router-link to="/writepost" v-if="loggedIn"><i class="fas fa-pen"></i> <span>Publier</span></router-link>
        <router-link to="/users" v-if="loggedIn"><i class="fas fa-user-friends"></i> <span>Membres</span></router-link>
        <router-link :to="{ name: 'UserProfile', params: { id: userId } }" v-if="loggedIn">
          <i class="fas fa-user"></i>
          <span>Mon profil</span>
        </router-link>
        <a @click="logout" v-if="loggedIn"><i class="fas fa-power-off"></i> <span>Déconnexion</span></a>
      </nav>
    </header>
  </div>
</template>

<script lang="js">
import store from '../store'

export default ({
  name: 'Header',
  computed: {
    loggedIn () {
      return store.state.loggedIn
    },
    userId () {
      return store.state.userId
    }
  },
  methods: {
    logout () {
      store.commit('RESET_STATE')
      this.$router.push('/login')
    }
  }
})
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

  @media (max-width: 900px) {
    padding: 0.8rem 0 0.8rem 0.8rem;
  }
}

nav {
  display: table;
  border-spacing: 1.5rem 0;

  @media (max-width: 769px) {
    border-spacing: 1.5rem 0;
  }
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
  display: table-cell;
  vertical-align: middle;
  position: relative;
  cursor: pointer;

  &:hover {
    color: #bed5fa;
  }

  i {
    margin-right: 0.2rem;

    @media (min-width: 769px) {
      display: none;
    }
  }

  span {
    @media (max-width: 769px) {
      display: none;
    }
  }
}

.router-link-active::before {
  content: "";
  position: absolute;
  bottom: -0.2rem;
  width: 100%;
  height: 0.2rem;
  background-color: #fd2d01;

  @media (max-width: 769px) {
    content: none;
    color: #bed5fa;
  }
}

img {
  height: 2rem;
}

.big-logo {
  @media (max-width: 900px) {
    display: none;
  }
}

.small-logo {
  @media (min-width: 900px) {
    display: none;
  }
}
</style>
