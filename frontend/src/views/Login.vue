<template>
  <section class="signup-login-section">
    <h1>Connexion</h1>
    <h2>Bienvenue sur le réseau social interne de Groupomania.</h2>
    <Form ref="form" />
    <p v-if="invalidInput">{{ invalidInput }}</p>
    <Button @click="sendForm" text="Se connecter" />
  </section>
</template>

<script lang="js">
import Form from '@/components/LoginForm.vue'
import Button from '@/components/Button.vue'
import VueJwtDecode from 'vue-jwt-decode'
import store from '../store'

export default ({
  name: 'Login',
  components: {
    Form,
    Button
  },
  data () {
    return {
      invalidInput: ''
    }
  },
  methods: {
    async sendForm () {
      try {
        const data = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            email: this.$refs.form.email,
            password: this.$refs.form.password
          })
        })
        if (data.status === (401 || 500)) {
          const response = await data.json()
          this.invalidInput = `${response.error}`
        } else if (data.status === 429) {
          this.invalidInput = 'Vous avez atteint la limite de tentatives de connexion. Veuillez réessayer dans quelques minutes.'
        } else {
          const userData = await data.json()
          const decodedToken = VueJwtDecode.decode(userData.token)
          store.dispatch('setToken', userData.token)
          store.dispatch('setUserId', decodedToken.userId)
          store.dispatch('setAdmin', decodedToken.admin)
          store.dispatch('setExpirationDate', decodedToken.exp)
          this.$router.push('/posts')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style scoped lang="scss">
p {
  color: #c50404;
  border: solid 0.1rem #c50404;
  background-color: #fcf3f3;
  margin: 1rem 6rem 0 6rem;
  padding: 1rem;

  @media (max-width: 895px) {
    margin: 1rem;
  }
}
</style>
