<template>
  <section>
    <div id="no-posts" v-if="userPosts.length == 0">
      {{ userData.first_name }} {{ userData.last_name }} n'a pas encore publié de message.
    </div>
    <div v-if="userPosts.length > 0">
      <h1>Publications de {{ userData.first_name }} {{ userData.last_name }}</h1>
      <ul v-for="post of userPosts" :key="post.id">
        <li>
          <p id="user-data">
            <img
              :src="userData.user_picture"
              :alt="`Photo de profil de ` + userData.first_name + ` ` + userData.last_name + `.`"
            />
            {{ userData.first_name }} {{ userData.last_name }} •
            <span id="date">{{ formatDate(post.post_date) }}</span>
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
  name: 'UserPosts',
  data() {
    return {
      userData: {},
      userPosts: [],
    }
  },
  created() {
    this.getUserData();
    this.getUserPosts();
  },
  methods: {
   getUserData: async function () {
     try {
      const token = localStorage.getItem("token");
      const id = this.$route.params.id;
      const getData = await fetch(`http://localhost:3000/api/users/${id}`,
      { headers: { Authorization: "Bearer " + token } });
      const userData = await getData.json();
      this.userData = userData;
     } catch (error) {
       console.log(error);
     }
   },
   getUserPosts: async function () {
     try {
     const token = localStorage.getItem("token");
     const id = this.$route.params.id;
     const getUserPosts = await fetch(`http://localhost:3000/api/users/${id}/posts`,
        { headers: { Authorization: "Bearer " + token } });
     const userPosts = await getUserPosts.json();
     this.userPosts = userPosts;
     } catch (error) {
        console.log(error);
     }
    },
    formatDate: function (date) {
      if (date) {
      moment.locale('fr');
      return moment(date).fromNow();
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
    background-color: #fd2d01;
  }

  img {
    display: block;
    margin: 1.5rem auto 0 auto;
  }
}

#user-data {
  color: #091f43;
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
