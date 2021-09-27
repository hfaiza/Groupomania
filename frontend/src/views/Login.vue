<template>
  <section id="login-section">
    <h1>Connexion</h1>
    <h2>Bienvenue sur le réseau social interne de Groupomania.</h2>
    <Form ref="form" />
    <Button ref="btn" @click="sendForm" text="Se connecter" />
  </section>
</template>

<script lang="js">
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";

export default ({
  name: 'Login',
  components: {
    Form,
    Button,
  },
  methods: {
    sendForm: async function () {
      try {
        const data = await fetch("http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: this.$refs.form.email,
            password: this.$refs.form.password
        })
        });
        const userData = await data.json()
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("admin", userData.admin);
        this.$router.push('/posts')
      } catch (error) {
        console.log(error);
      }
    }
  }
});
</script>

<style scoped lang="scss">
#login-section {
  margin: 3rem auto;
  padding: 0.5rem 0.8rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #f2f2f2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
}

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

#login {
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 3rem;
  padding: 0 1.5rem;
  color: #fff;
  background-color: #fd2d01;
  border: none;
  margin: 2rem 0 3rem 0;
  height: 2.7rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
}
</style>
