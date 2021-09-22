<template>
<section>
  <div id="update-section">
    <h1>Mon profil</h1>
    <form>
      <div>
        <label for="lastName">Nom :</label>
        <input id="lastName" name="lastName" type="text" :value="userData.last_name" required />
      </div>
      <div>
        <label for="firstName">Prénom :</label>
        <input id="firstName" name="firstName" type="text" :value="userData.first_name" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input id="password" name="password" type="password" />
      </div>
      <div id="icon">
        <label for="avatar">Photo de profil :</label>
        <button onclick="document.getElementById('avatar').click()" type="button">Charger une image</button>
        <input id="avatar" name="avatar" type="file" accept="image/jpg, image/jpeg, image/png">
      </div>
      <div>
        <input id="update-profile" @click="sendForm" type="button" value="Mettre à jour" />
      </div>
    </form>
  </div>
</section>
</template>

<script lang="js">
export default {
  name: 'UpdateProfile',
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
      } catch (error) {
        console.log(error);
      }     
    },
     sendForm: async function () {
       try {
         const id = localStorage.getItem("userId"); 
         const token = localStorage.getItem("token");
         let userPassword = document.getElementById("password").value;
         if (userPassword.length == 0) {
           userPassword = "0";
         }
         const formData = new FormData();
         const file = document.querySelector('input[type="file"]');
         formData.append("image", file.files[0]);
         formData.append("password", userPassword);
         const lastName = document.getElementById("lastName").value;
         formData.append("lastName", lastName);
         const firstName = document.getElementById("firstName").value;
         formData.append("firstName", firstName);
         await fetch(`http://localhost:3000/api/users/${id}`, {
           method: "PUT",
           headers: { Authorization: "Bearer " + token },
           body: formData,
         });
         this.$router.push('/profile')
       } catch (error) {
         console.log(error);
       } 
    }
  }
};
</script>

<style scoped lang="scss">
#update-section {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0.5rem 0.8rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #F2F2F2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
}

h1 {
  font-size: 3rem;
  margin: 0.5rem 0;
}

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
    background-color: #F2F2F2;
    border: solid 0.12rem #091F43;
    border-radius: 3rem;
    height: 2rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
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
    background-color: #7C7C7C;
    width: 75%;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
  }
}

input[type=file] {
  display: none;
}

#update-profile {
  text-transform: uppercase;
  font-weight: bold;
  color: #FFF;
  background-color: #FD2D01;
  border: none;
  margin: 3rem 0;
  height: 2.7rem;
  font-size: 1.2rem;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}
</style>