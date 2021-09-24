<template>
  <section>
    <div id="no-posts" v-if="posts.length == 0">Aucune publication.</div>
    <div v-if="posts.length > 0">
      <h1>Publications</h1>
      <ul v-for="post of posts" :key="post.id">
        <li id="post" :data-post-id="post.post_id">
          <p id="user-data">
            <img :src="post.User.user_picture" :alt="`Photo de profil de ` + post.User.first_name + ` ` + post.User.last_name + `.`" />
            <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'UserProfile', params: { id: post.User.user_id  }}">
              {{ post.User.first_name }} {{ post.User.last_name }} •
            </router-link>
            <span id="date">{{ formatDate(post.post_date) }}</span>
            <a id="delete-post" @click="deletePost">Supprimer</a>
          </p>
          <p id="text">
            {{ post.post_content }}
            <img v-if="post.image_url !== null" :src="post.image_url" /> 
          </p>
        </li>
        <div v-if="post.Comments.length > 0">
          <ul v-for="comment of post.Comments" :key="comment.id">
            <li id="comment" :data-comment-id="comment.comment_id">
              <div id="comment-header">
                <router-link id="name" style="text-decoration: none; color: inherit;" :to="{ name: 'UserProfile', params: { id: comment.user_id  }}">
                  {{ comment.User.first_name }} {{ comment.User.last_name }} 
                </router-link>
                • <span id="date">{{ formatDate(comment.comment_date) }}</span>
                <a id="delete-comment" @click="deleteComment">Supprimer</a>          
              </div>
                {{ comment.comment_content }}
            </li>
          </ul>
        </div> 
        <div id="writeComment">
          <p>Laisser un commentaire</p>
          <input placeholder="Saisir un commentaire..." id="commentContent" v-on:keyup.enter="sendComment" />
        </div>
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
    },
    sendComment: async function () {
     try {
     const token = localStorage.getItem("token");  
     const post = document.querySelector("#post");
     const postId = post.dataset.postId;
     await fetch("http://localhost:3000/api/comments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
            body: JSON.stringify({
              postId: postId,
              commentContent: document.getElementById("commentContent").value
            })
          });
     } catch (error) {
        console.log(error);
     }     
    },
    deletePost: async function () {
     try {
     const token = localStorage.getItem("token");  
     const post = document.querySelector("#post");
     const postId = post.dataset.postId;
     await fetch(`http://localhost:3000/api/posts/${postId}`,
          {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
          });
     } catch (error) {
        console.log(error);
     }  
    },
    deleteComment: async function () {
     try {
     const token = localStorage.getItem("token");  
     const post = document.querySelector("#comment");
     const commentId = post.dataset.commentId;
     await fetch(`http://localhost:3000/api/comments/${commentId}`,
          {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
          });
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

ul {
  list-style-type: none;
  padding-left: 0;

  #post {
    text-align: left;
    color: #000;
    background-color: #ebe8e8;
    border: solid 0.001rem #e6e3e3;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem #d3d3d3;
    margin: 3rem 3rem 0.5rem 3rem;
    padding: 1rem 2rem;
  }

  #name {
    color: #091F43;
    font-weight: bold;
    margin-right: 0.3rem;
  }

  #comment {
    text-align: left;
    background-color: #cecccc;
    border: solid 0.001rem #e6e3e3;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem #d3d3d3;
    margin: 0.5rem 3rem 0 8rem;
    padding: 1rem 2rem;

    #comment-header {
      display: flex;
      margin-bottom: 0.5rem;
    }

    &:last-child {
      color: #000;
    }

    #date {
      color: #091F43;
    }
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

#delete-post {
  font-weight: 100;
  color: #FD2D01;
  text-align: right;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
}

#delete-comment {
  font-weight: 100;
  text-align: right;
  margin-left: auto;
  cursor: pointer;
  color: #091F43;

  &:hover {
    font-weight: bold;
  }
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

#writeComment {
  margin: 1rem 3rem 0 8rem;

  p {
    text-align: left;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1rem;
    padding-left: 0.6rem;
    margin-bottom: 0.5rem;
  }

  input {
    border: solid 0.001rem #e6e3e3;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem #d3d3d3;
    padding: 1rem;
    height: 2rem;
    width: calc(100% - 2rem);
    resize: none;
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
}
}
</style>