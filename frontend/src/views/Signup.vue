<template>
  <section>
    <div id="signup-section">
      <h1>Inscription</h1>
      <h2>Rejoignez vos collègues.</h2>
      <Form ref="form" />
      <Button ref="btn" @click="sendForm" text="S'inscrire" />
    </div>
  </section>
</template>

<script lang="js">
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";

export default ({
  name: 'Signup',
  components: {
    Form,
    Button,
  },
  methods: {
    sendForm: async function () {
      try {
        const formData = new FormData();
        if (this.$refs.form.picture.files !== undefined) {
           formData.append("image", this.$refs.form.picture.files[0]);
         }
        formData.append("lastName", this.$refs.form.lastName);
        formData.append("firstName", this.$refs.form.firstName);
        formData.append("email", this.$refs.form.email);
        formData.append("password", this.$refs.form.password);
        const data = await fetch("http://localhost:3000/api/auth/signup",
          {
            method: "POST",
            body: formData,
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
#signup-section {
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
</style>
