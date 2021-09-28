<template>
  <section class="signup-login-section">
    <h1>Inscription</h1>
    <h2>Rejoignez vos collègues.</h2>
    <Form ref="form" />
    <Button @click="checkUserInput" text="S'inscrire" />
  </section>
</template>

<script lang="js">
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";

export default ({
  name: 'Signup',
  components: {
    Form,
    Button
  },
  methods: {
    checkUserInput: function () {
      const namesRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,80}$/;
      const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@groupomania.com$/;
      const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

      if (namesRegex.test(this.$refs.form.lastName) == false) {
        alert("Merci de renseigner un nom valide.");
      } else if (namesRegex.test(this.$refs.form.firstName) == false) {
        alert("Merci de renseigner un prénom valide.");
      } else if (emailRegex.test(this.$refs.form.email) == false) {
        alert("Merci de renseigner votre e-mail professionnel (@groupomania.com).");
      } else if (pwRegex.test(this.$refs.form.password) == false) {
        alert("Merci de renseigner un mot de passe entre 8 et 64 caractères, contenant au moins une majuscule, une minuscule, un chiffre et un caractère spécial.");
      } else {
        this.sendForm();
      }
    },
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
        const data = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: formData
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
