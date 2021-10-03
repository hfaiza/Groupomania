<template>
  <section id="update-section">
    <h1>Mon profil</h1>
    <Form ref="form" />
    <p v-if="invalidInput">{{ invalidInput }}</p>
    <Button @click="sendForm" text="Mettre à jour" />
  </section>
</template>

<script lang="js">
import Form from "@/components/SignupForm.vue";
import Button from "@/components/Button.vue";

export default {
  name: 'UpdateProfile',
  components: {
    Form,
    Button
  },
  data() {
    return {
      userData: {},
      invalidInput: ""
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      try {
        const id = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const getData = await fetch(`http://localhost:3000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await getData.json();
        this.userData = userData;
        this.$refs.form.lastName = this.userData.last_name;
        this.$refs.form.firstName = this.userData.first_name;
        this.$refs.form.email = this.userData.email;
      } catch (error) {
        console.log(error);
      }
    },
    async sendForm() {
      try {
        const id = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        let userPassword = this.$refs.form.password;
        if (userPassword.length == 0) {
          userPassword = "0";
        }
        const formData = new FormData();
        formData.append("image", this.$refs.form.file);
        formData.append("password", userPassword);
        formData.append("lastName", this.$refs.form.lastName);
        formData.append("firstName", this.$refs.form.firstName);
        const data = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        if (data.status == (400 || 500)) {
          const response = await data.json();
          this.invalidInput = `${response.error}`;
        } else {
          this.$router.push({ name: 'UserProfile', params: { id: id } });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
#update-section {
  margin: 3rem auto;
  padding: 0.5rem 1.5rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #f2f2f2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;

  @media (max-width: 1050px) {
    border: none;
    box-shadow: none;
    padding: 0.5rem;
  }
}

h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0;

  @media (max-width: 1050px) {
    margin: -1rem auto 2rem auto;
  }
}

p {
  color: #f00;
  border: solid 0.1rem #f00;
  background-color: #fae8e8;
  margin: 2rem 6rem 0rem 6rem;
  padding: 1rem 1rem;

  @media (max-width: 895px) {
    margin: 2rem 0.5rem 0 0.5rem;
  }
}
</style>
