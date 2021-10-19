<template>
  <div id="header-background">
    <header>
      <img class="big-logo" :src="require(`@/assets/groupomania-icon.png`)" alt="Groupomania" />
      <img class="small-logo" :src="require(`@/assets/groupomania-icon-mobile.png`)" alt="Groupomania" />
      <nav>
        <template v-if="!loggedIn">
          <router-link to="/">Inscription</router-link>
          <router-link to="/login">Connexion</router-link>
        </template>
        <template v-else>
          <router-link to="/posts">
            <i class="fas fa-home" title="Accueil"></i>
            <span>Accueil</span>
          </router-link>
          <router-link to="/writepost">
            <i class="fas fa-pen" title="Publier"></i>
            <span>Publier</span>
          </router-link>
          <router-link to="/users">
            <i class="fas fa-user-friends" title="Membres"></i>
            <span>Membres</span>
          </router-link>
          <router-link :to="{ name: 'UserProfile', params: { id: userId } }">
            <i class="fas fa-user" title="Mon profil"></i>
            <span>Mon profil</span>
          </router-link>
          <a @click="logout">
            <i class="fas fa-power-off" title="Déconnexion"></i>
            <span>Déconnexion</span>
          </a>
        </template>
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

  i {
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
