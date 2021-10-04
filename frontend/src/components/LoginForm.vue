<template>
  <form>
    <div>
      <label for="email">Adresse e-mail :</label>
      <input
        v-model="email"
        id="email"
        placeholder="hannah.grose@groupomania.com"
        type="email"
        autocomplete="on"
        required
      />
    </div>
    <div>
      <label for="password">Mot de passe :</label>
      <input v-model="password" id="password" placeholder="••••••••" type="password" autocomplete="on" required />
    </div>
  </form>
</template>

<script lang="js">
export default ({
  name: 'LoginForm',
  data() {
    return {
      email: "",
      password: ""
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

    @media (max-width: 895px) {
      padding: 0 0.5rem;
    }
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

    @media (max-width: 1050px) {
      background-color: #fff;
    }
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
