<template>
<section>
  <div id="signup-section">
    <h1>Inscription</h1>
    <h2>Rejoignez vos collègues.</h2>
    <form>
      <div>
        <label for="lastName">Nom :</label>
        <input id="lastName" name="lastName" placeholder="Grose" type="text" required />
      </div>
      <div>
        <label for="firstName">Prénom :</label>
        <input id="firstName" name="firstName" placeholder="Hannah" type="text" required />
      </div>
      <div>
        <label for="email">Adresse e-mail :</label>
        <input id="email" name="email" placeholder="hannah.grose@groupomania.com" type="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input id="password" name="password" placeholder="••••••••" type="password" required />
      </div>
      <div id="icon">
        <label for="avatar">Photo de profil :</label>
        <button onclick="document.getElementById('avatar').click()" type="button">Charger une image</button>
        <input id="avatar" name="avatar" type="file" accept="image/jpg, image/jpeg, image/png">
      </div>
      <div>
        <input id="signup" @click="sendForm" type="button" value="S'inscrire" />
      </div>
    </form>
  </div>
</section>
</template>

<script lang="js">
export default ({
  name: 'Signup',
  methods: {
    sendForm: async function () {
      try {
        const formData = new FormData();
        const file = document.querySelector('input[type="file"]');
        formData.append("image", file.files[0]);
        const lastName = document.getElementById("lastName").value;
        formData.append("lastName", lastName);
        const firstName = document.getElementById("firstName").value;
        formData.append("firstName", firstName);
        const email = document.getElementById("email").value;
        formData.append("email", email);
        const password = document.getElementById("password").value;
        formData.append("password", password);
        const data = await fetch("http://localhost:3000/api/auth/signup",
          {
            method: "POST",
            body: formData,
          });
        const userData = await data.json()
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("token", userData.token); 
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
  background-color: #F2F2F2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
}

h1 {
  font-size: 3rem;
  margin: 0.5rem 0;
}

h2 {
  color: #7C7C7C;
  font-weight: 100;
  font-size: 1.2rem;
  margin-top: 0;
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
    cursor: pointer;
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

#signup {
  text-transform: uppercase;
  font-weight: bold;
  color: #FFF;
  background-color: #FD2D01;
  border: none;
  margin: 3rem 0;
  height: 2.7rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}
</style>