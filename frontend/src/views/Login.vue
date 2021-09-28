<template>
  <section class="signup-login-section">
    <h1>Connexion</h1>
    <h2>Bienvenue sur le réseau social interne de Groupomania.</h2>
    <Form ref="form" />
    <Button @click="sendForm" text="Se connecter" />
  </section>
</template>

<script lang="js">
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";

export default ({
  name: 'Login',
  components: {
    Form,
    Button
  },
  methods: {
    async sendForm() {
      try {
        const data = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: this.$refs.form.email,
            password: this.$refs.form.password
          })
        });
        if (data.status == 401) {
          alert("Aucun compte n'est associé à cette adresse e-mail ou le mot de passe est incorrect.");
        } else {
          const userData = await data.json()
          localStorage.setItem("userId", userData.userId);
          localStorage.setItem("token", userData.token);
          if (userData.admin === true) {
            localStorage.setItem("admin", userData.admin);
          }
          this.$router.push('/posts')
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
});
</script>
