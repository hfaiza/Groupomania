<template>
  <section>
    <div id="no-posts" v-if="posts.length == 0">Aucune publication.</div>
    <div v-if="posts.length > 0">
      <h1>Publications</h1>
      <ul v-for="post of posts" :key="post.id">
        <li>
          <p id="user-data">
            <img :src="post.User.user_picture" :alt="`Photo de profil de ` + post.User.first_name + ` ` + post.User.last_name + `.`" />
            <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'UserProfile', params: { id: post.User.user_id  }}">
              {{ post.User.first_name }} {{ post.User.last_name }} •
            </router-link>
            <span id="date">{{ formatDate(post.post_date) }}</span>
            <span id="delete">Supprimer</span>
          </p>
          <p id="text">
            {{ post.post_content }}
            <img v-if="post.image_url !== null" :src="post.image_url" /> 
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="js">
import moment from 'moment';

export default ({
  name: 'Posts',
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getPosts();
  }, 
  methods: {
    getPosts: async function () {
      try {
        const token = localStorage.getItem("token");  
        const getPostData = await fetch(`http://localhost:3000/api/posts`,
        { headers: { Authorization: "Bearer " + token } });
        const posts = await getPostData.json();
        this.posts = posts;
      } catch (error) {
        console.log(error);
      }     
    },
    formatDate: function (value) {
      if (value) {
      moment.locale('fr');
      return moment(value).fromNow();
      }
    }
  }
}); 
</script>

<style scoped lang="scss">
h1 {
  font-size: 2.5rem;
}

ul {
  list-style-type: none;
  padding-left: 0;

  li {
    text-align: left;
    color: #000;
    background-color: #ebe8e8;
    border: solid 0.001rem #e6e3e3;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem #d3d3d3;
    margin: 2rem 3rem;
    padding: 1rem 2rem;
  }
}

#text {
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: -1rem;
    width: 100%;
    height: 0.1rem;
    background-color: #FD2D01; 
  }

  img {
    display: block;
    margin: 1.5rem auto 0 auto;
  }
}

#user-data {
  color: #091F43;
  font-weight: bold;
  padding-bottom: 1rem;
  display: flex;
  
  img {
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
    object-fit: cover;
    margin-right: 0.5rem;
    margin-top: -0.1rem;
  }
}

#date {
  padding-left: 0.3rem;
  font-weight: 100;
  font-style: italic;
}

#delete {
  font-weight: 100;
  color: #FD2D01;
  text-align: right;
  margin-left: auto;
}

#no-posts {
  font-size: 1.3rem;
  background-color: #ebe8e8;
  border: solid 0.001rem #e6e3e3;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
  margin: 5rem 3rem;
  padding: 2rem; 
}
</style>