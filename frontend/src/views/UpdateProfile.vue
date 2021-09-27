<template>
  <section id="update-section">
    <h1>Mon profil</h1>
    <Form ref="form" />
    <Button ref="btn" @click="sendForm" text="Mettre à jour" />
  </section>
</template>

<script lang="js">
import Form from "@/components/Form.vue";
import Button from "@/components/Button.vue";

export default {
  name: 'UpdateProfile',
  components: {
    Form,
    Button,
  },
  data() {
    return {
      userData: {},
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData: async function () {
      try {
        const id = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const getData = await fetch(`http://localhost:3000/api/users/${id}`,
        { headers: { Authorization: "Bearer " + token } });
        const userData = await getData.json();
        this.userData = userData;
        this.$refs.form.lastName = this.userData.last_name;
        this.$refs.form.firstName = this.userData.first_name;
      } catch (error) {
        console.log(error);
      }
    },
     sendForm: async function () {
       try {
         const id = localStorage.getItem("userId");
         const token = localStorage.getItem("token");
         let userPassword = this.$refs.form.lastName;
         if (userPassword.length == 0) {
           userPassword = "0";
         }
         const formData = new FormData();
         if (this.$refs.form.picture.files !== undefined) {
           formData.append("image", this.$refs.form.picture.files[0]);
         }
         formData.append("password", userPassword);
         formData.append("lastName", this.$refs.form.lastName);
         formData.append("firstName", this.$refs.form.firstName);
         await fetch(`http://localhost:3000/api/users/${id}`, {
           method: "PUT",
           headers: { Authorization: "Bearer " + token },
           body: formData,
         });
         this.$router.push({ name: 'UserProfile', params: { id: id } })
       } catch (error) {
         console.log(error);
       }
    }
  }
};
</script>

<style scoped lang="scss">
#update-section {
  max-width: 1000px;
  margin: 3rem auto;
  padding: 0.5rem 2rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #f2f2f2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
}

h1 {
  font-size: 3rem;
  margin: 0.5rem 0;
}
</style>
