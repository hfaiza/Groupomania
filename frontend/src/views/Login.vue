<template>
  <section>
    <div id="login-section">
      <h1>Connexion</h1>
      <h2>Bienvenue sur le réseau social interne de Groupomania.</h2>
      <form id="login-form">
        <div>
          <label for="email">Adresse e-mail :</label>
          <input id="email" name="email" placeholder="hannah.grose@groupomania.com"  type="email" required />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input id="password" name="password" placeholder="••••••••" type="password" required />
        </div>
        <div>
          <input id="login" @click="sendForm" type="button" value="Se connecter" />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="js">
export default ({
  name: 'Login',
  methods: {
    sendForm: async function () {
      try {
        const data = await fetch("http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
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
#login-section {
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

#login {
  text-transform: uppercase;
  font-weight: bold;
  color: #FFF;
  background-color: #FD2D01;
  border: none;
  margin: 2rem 0 3rem 0;
  height: 2.7rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}
</style>