<template>
  <section>
    <h1>Publier</h1>
    <div>
      <h2>Publier un message</h2>
      <textarea id="postContent"></textarea>
      <form>
        <button @click="uploadFile" type="button">
          Ajouter un gif (optionnel)
        </button>
        <input id="upload-image" name="upload-image" type="file" accept="image/gif" />
      </form>
    </div>
    <input id="send-post" @click="sendPost" type="button" value="Envoyer" />
  </section>
</template>

<script lang="js">
export default ({
  name: 'WritePost',
  methods: {
    uploadFile: function () {
      document.getElementById("upload-image").click()
    },
    sendPost: async function () {
     try {
     const token = localStorage.getItem("token");
     const formData = new FormData();
     const file = document.querySelector('input[type="file"]');
     formData.append("image", file.files[0]);
     const postContent = document.getElementById("postContent").value;
     formData.append("postContent", postContent);
     await fetch("http://localhost:3000/api/posts",
          {
            method: "POST",
            headers: { Authorization: "Bearer " + token },
            body: formData,
          });
      this.$router.push('/posts')
      } catch (error) {
        console.log(error);
      }
    }
  }
});
</script>

<style scoped lang="scss">
h1 {
  font-size: 2.5rem;
}

h2 {
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  padding-left: 0.3rem;
}

div {
  background-color: #ebe8e8;
  border: solid 0.001rem #e6e3e3;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
  margin: 2rem 0;
  padding: 1rem 2rem;
}

textarea {
  background-color: #ebe8e8;
  padding: 1rem;
  width: calc(100% - 2.2rem);
  border: solid 0.1rem #091f43;
  height: 10rem;
  resize: none;
  font-size: 1rem;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

form button {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background-color: #091f43;
  border: none;
  border-radius: 3rem;
  width: 100%;
  height: 2.7rem;
  font-size: 1rem;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  margin: 1rem auto;
  cursor: pointer;
}

input[type="file"] {
  display: none;
}

#send-post {
  border-radius: 3rem;
  padding: 0rem 2.5rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background-color: #fd2d01;
  cursor: pointer;
  border: none;
  margin: 1rem 0 3rem 0;
  height: 2.7rem;
  font-size: 1.5rem;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
