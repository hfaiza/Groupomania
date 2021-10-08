<template>
  <section>
    <h1>Publier</h1>
    <div>
      <label for="postContent">Publier un message</label>
      <textarea v-model="postContent" id="postContent"></textarea>
      <input type="button" @click="uploadFile" value="Ajouter un gif (optionnel)" />
      <input
        ref="file"
        v-on:change="handleFileUpload()"
        id="picture"
        type="file"
        accept="image/gif"
        aria-label="Ajouter un gif (optionnel)"
      />
      <p v-if="invalidInput">{{ invalidInput }}</p>
    </div>
    <Button @click="sendPost" text="Envoyer" />
  </section>
</template>

<script lang="js">
import Button from '@/components/Button.vue'
import store from '../store'

export default ({
  name: 'WritePost',
  components: {
    Button
  },
  data () {
    return {
      file: '',
      postContent: '',
      invalidInput: '',
      token: store.state.token
    }
  },
  methods: {
    uploadFile () {
      document.getElementById('picture').click()
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    async sendPost () {
      try {
        const formData = new FormData()
        formData.append('image', this.file)
        formData.append('postContent', this.postContent)
        const data = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.token}` },
          body: formData
        })
        if (data.status === (400 || 500)) {
          const response = await data.json()
          this.invalidInput = `${response.error}`
        } else {
          this.$router.push('/posts')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style scoped lang="scss">
section {
  @media (max-width: 1050px) {
    background-color: #f2f2f2;
  }
}

h1 {
  font-size: 2.5rem;

  @media (max-width: 1050px) {
    padding-top: 2rem;
    margin-top: 0;
  }
}

label {
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.7rem 0;
}

div:not(#form-button) {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border: solid 0.001rem #e6e3e3;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
  margin: 2rem 0;
  padding: 1rem 2rem;

  @media (max-width: 1050px) {
    box-shadow: none;
    border: none;
    padding: 0.5rem;
  }
}

textarea {
  background-color: #f2f2f2;
  padding: 1rem;
  width: calc(100% - 2.2rem);
  border: solid 0.1rem #091f43;
  height: 10rem;
  resize: none;
  font-size: 1rem;

  @media (max-width: 1050px) {
    background-color: #fff;
  }
}

input[type="button"] {
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
  margin: -3rem auto 0 auto;
  width: 10rem;
}

p {
  color: #f00;
  border: solid 0.1rem #f00;
  background-color: #fae8e8;
  margin: 2rem auto 1rem auto;
  padding: 1rem;
}
</style>
