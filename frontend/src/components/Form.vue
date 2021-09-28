<template>
  <form>
    <div v-if="signup || updateProfile">
      <label for="lastName">Nom :</label>
      <input v-model="lastName" id="lastName" name="lastName" placeholder="Grose" type="text" required />
    </div>
    <div v-if="signup || updateProfile">
      <label for="firstName">Prénom :</label>
      <input v-model="firstName" id="firstName" name="firstName" placeholder="Hannah" type="text" required />
    </div>
    <div v-if="signup || login">
      <label for="email">Adresse e-mail :</label>
      <input v-model="email" id="email" name="email" placeholder="hannah.grose@groupomania.com" type="email" required />
    </div>
    <div v-if="signup || login || updateProfile">
      <label for="password">Mot de passe :</label>
      <input v-model="password" id="password" name="password" placeholder="••••••••" type="password" required />
    </div>
    <div id="icon" v-if="signup || updateProfile">
      <label for="picture">Photo de profil :</label>
      <button @click="uploadFile" type="button">Charger une image</button>
      <input id="picture" name="picture" type="file" accept="image/jpg, image/jpeg, image/png" />
    </div>
  </form>
</template>

<script lang="js">
export default ({
  name: 'Signup',
  data() {
      return {
          lastName: "",
          firstName: "",
          email: "",
          password: "",
          picture: "",
      }
  },
  computed: {
  signup: function () {
    return this.$route.name === "Signup"
  },
  login: function () {
    return this.$route.name === "Login"
  },
  updateProfile: function () {
    return this.$route.name === "UpdateProfile"
  }
  },
  methods: {
    uploadFile: function () {
        document.getElementById("picture").click()
    }
   }
});
</script>

<style scoped lang="scss">
form {
  div {
    display: flex;
    flex-direction: column;
    padding: 0 6rem;
  }

  label {
    text-align: left;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.5rem;
  }

  input {
    background-color: #f2f2f2;
    border: solid 0.12rem #091f43;
    border-radius: 3rem;
    height: 2rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    padding-left: 1rem;
  }
}

#icon {
  justify-content: space-between;
  flex-direction: row;
  margin: 0.5rem 0;

  button {
    border: none;
    border-radius: 3rem;
    background-color: #7c7c7c;
    width: 75%;
    cursor: pointer;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    box-shadow: 0 0 0.5rem #adabab;
    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 1rem #adabab;
    }
  }
}

input[type="file"] {
  display: none;
}
</style>
