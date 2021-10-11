<template>
  <section>
    <img :src="userData.user_picture" :alt="`Photo de profil de ${userData.first_name} ${userData.last_name}.`" />
    <div id="user-card">
      <h1>{{ userData.first_name }} {{ userData.last_name }}</h1>
      <p id="email">{{ userData.email }}</p>
      <router-link :to="{ name: 'UserPosts', params: { id: this.$route.params.id } }">
        <h2 id="user-posts">Voir ses publications</h2>
      </router-link>
    </div>
    <div v-if="ownProfile" id="modify-profile">
      <a @click="modifyProfile" id="modify-account">Modifier mon compte</a>
      <a @click="deleteAccount" id="delete-account">Supprimer mon compte</a>
    </div>
  </section>
</template>

<script lang="js">
import store from '../store'

export default ({
  name: 'UserProfile',
  data () {
    return {
      userData: {},
      token: store.state.token,
      userId: store.state.userId
    }
  },
  created () {
    this.getUserData()
  },
  watch: {
    $route () {
      this.getUserData()
    }
  },
  computed: {
    ownProfile () {
      if (this.userId === parseInt(this.$route.params.id)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async getUserData () {
      try {
        const id = this.$route.params.id
        const getData = await fetch(`http://localhost:3000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        const userData = await getData.json()
        this.userData = userData
      } catch (error) {
        console.log(error)
      }
    },
    modifyProfile () {
      this.$router.push('/updateprofile')
    },
    async deleteAccount () {
      if (confirm('Voulez-vous supprimer votre compte ? Toutes vos publications et tous vos commentaires seront supprimés. Cette action est irréversible.')) {
        try {
          const id = this.$route.params.id
          await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${this.token}` }
          })
          store.commit('RESET_STATE')
          this.$router.push('/signup')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
section {
  margin: 10rem auto;
  position: relative;

  @media (max-width: 769px) {
    margin: 0;
    padding: 2rem 0.5rem;
    background-color: #f2f2f2;
  }
}

#user-card {
  width: 35rem;
  margin: auto;
  padding: 7rem 0.8rem 2rem 0.8rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #f2f2f2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;

  @media (max-width: 1050px) {
    background-color: #fff;
  }

  @media (max-width: 769px) {
    margin-top: 5rem;
    padding-top: 5rem;
    width: auto;
  }
}

img {
  border-radius: 50%;
  height: 15rem;
  width: 15rem;
  object-fit: cover;
  border: solid 0.5rem #091f43;
  position: absolute;
  top: -7rem;
  left: 50%;
  transform: translate(-50%);

  @media (max-width: 769px) {
    border: solid 0.3rem #091f43;
    height: 10rem;
    width: 10rem;
    top: 2rem;
  }
}

h1 {
  padding-top: 1rem;
  font-size: 3rem;
  position: relative;

  @media (max-width: 769px) {
    font-size: 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -1rem;
    width: 29rem;
    height: 0.4rem;
    left: 3rem;
    text-align: center;
    background-color: #fd2d01;

    @media (max-width: 769px) {
      content: none;
    }
  }
}

#email {
  color: #000;
  font-size: 1.3rem;

  @media (max-width: 769px) {
    margin-top: -1rem;
    font-size: 1rem;
  }
}

#user-posts {
  color: #fd2d01;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.3rem;
  border: solid 0.15rem #fd2d01;
  border-radius: 3rem;
  padding: 0.5rem 2rem;
  display: inline-block;
  margin-top: 2rem;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: #edd6d3;
  }

  @media (max-width: 769px) {
    font-size: 1.2rem;
  }
}

#modify-profile {
  width: 36.6rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  #modify-account::after {
    background-color: #091f43;
  }

  #delete-account {
    color: #e22803;

    &::after {
      background-color: #fd2d01;
    }
  }

  @media (max-width: 769px) {
    width: auto;
  }

  @media (max-width: 430px) {
    flex-direction: column;
  }

  a {
    display: inline-block;
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 0.2rem;
      bottom: -0.5rem;
      left: 0;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;

      @media (max-width: 1050px) {
        content: none;
      }
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }

    @media (max-width: 1050px) {
      background-color: #fff;
      box-shadow: 0 0 0.3rem #d3d3d3;
      border-radius: 1rem;
      padding: 1rem;
    }

    @media (max-width: 430px) {
      margin-bottom: 1rem;
    }
  }
}
</style>
