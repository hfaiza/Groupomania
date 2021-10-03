<template>
  <section class="signup-login-section">
    <h1>Inscription</h1>
    <h2>Rejoignez vos collègues.</h2>
    <Form ref="form" />
    <p v-if="invalidInput">{{ invalidInput }}</p>
    <Button @click="sendForm" text="S'inscrire" />
  </section>
</template>

<script lang="js">
import Form from "@/components/SignupForm.vue";
import Button from "@/components/Button.vue";

export default ({
  name: 'Signup',
  components: {
    Form,
    Button
  },
  data() {
    return {
      invalidInput: ""
    }
  },
  methods: {
    async sendForm() {
      try {
        const formData = new FormData();
        formData.append("image", this.$refs.form.file);
        formData.append("lastName", this.$refs.form.lastName);
        formData.append("firstName", this.$refs.form.firstName);
        formData.append("email", this.$refs.form.email);
        formData.append("password", this.$refs.form.password);
        const data = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: formData
        });
        const userData = await data.json()

        if (data.status == (400 || 500)) {
          this.invalidInput = `${userData.error}`;
        } else {
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

<style scoped lang="scss">
p {
  color: #f00;
  border: solid 0.1rem #f00;
  background-color: #fae8e8;
  margin: 2rem 6rem 0rem 6rem;
  padding: 1rem;
}
</style>
