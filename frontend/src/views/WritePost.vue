<template>
  <section>
    <h1>Publier</h1>
    <div>
      <h2>Publier un message</h2>
      <textarea v-model="postContent" id="postContent"></textarea>
      <button @click="uploadFile" type="button">Ajouter un gif (optionnel)</button>
      <input ref="file" v-on:change="handleFileUpload()" id="picture" type="file" accept="image/gif" />
    </div>
    <Button @click="checkUserInput" text="Envoyer" />
  </section>
</template>

<script lang="js">
import Button from "@/components/Button.vue";

export default ({
  name: 'WritePost',
  components: {
    Button
  },
  data() {
    return {
      file: ""
    }
  },
  methods: {
    uploadFile() {
      document.getElementById("picture").click()
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    checkUserInput() {
      const regex = /^[a-z0-9A-ZÀ-ÖØ-öø-ÿ,' !.-:;\n]{20,1000}$/;
      if (regex.test(this.postContent) == false) {
        alert("Votre publication doit contenir entre 20 et 1000 caractères. Certains symboles ne sont pas acceptés.");
      } else {
        this.sendPost();
      }
    },
    async sendPost() {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("postContent", this.postContent);
        await fetch("http://localhost:3000/api/posts", {
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

div:not(#form-button) {
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
}

button {
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  background-color: #091f43;
  border: none;
  border-radius: 3rem;
  width: 100%;
  height: 2.7rem;
  font-size: 1rem;
  display: block;
  margin: 1rem auto;
  cursor: pointer;
  box-shadow: 0 0 0.3rem #091f43;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0.6rem #091f43;
  }
}

input[type="file"] {
  display: none;
}

#form-button {
  margin-top: -1rem;
  padding: 0 40%;
}
</style>
