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
        const data = await fetch(`${process.env.VUE_APP_URL_API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            email: this.$refs.form.email,
            password: this.$refs.form.password
          })
        })
        if ([400, 500].includes(data.status)) {
          const response = await data.json()
          this.invalidInput = `${response.error}`
        } else if (data.status === 429) {
          this.invalidInput = 'Vous avez atteint la limite de tentatives de connexion. Veuillez réessayer dans quelques minutes.'
        } else {
          const userData = await data.json()
          store.dispatch('setToken', userData.token)
          const decodedToken = VueJwtDecode.decode(userData.token)
          store.dispatch('setUserData', decodedToken)
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
