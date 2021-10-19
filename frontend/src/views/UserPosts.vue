<template>
  <section>
    <div id="no-posts" v-if="userPosts.length == 0">
      <h1>{{ userData.first_name }} {{ userData.last_name }} n'a pas encore publié de message.</h1>
    </div>
    <div v-if="userPosts.length > 0">
      <h1>Publications de {{ userData.first_name }} {{ userData.last_name }}</h1>
      <ul v-for="(post, i) of userPosts" :key="post.id">
        <li class="post">
          <p class="user-data">
            <img
              :src="userData.user_picture"
              :alt="`Photo de profil de ${userData.first_name} ${userData.last_name}.`"
            />
            <router-link
              style="text-decoration: none; color: inherit;"
              :to="{ name: 'UserProfile', params: { id: id } }"
            >
              {{ userData.first_name }} {{ userData.last_name }} •
            </router-link>
            <span class="date">{{ formatDate(post.post_date) }}</span>
            <a
              v-if="canDelete(post.user_id)"
              class="delete-post"
              @click="deletePost(post.post_id)"
              title="Supprimer la publication"
            >
              <i class="fas fa-times"></i>
            </a>
          </p>
          <p class="text">
            {{ post.post_content }}
            <img v-if="post.image_url !== null" :src="post.image_url" />
          </p>
        </li>
        <li v-if="post.Comments.length > 0">
          <ul v-for="comment of post.Comments" :key="comment.id">
            <li class="comment">
              <div class="comment-header">
                <router-link
                  class="name"
                  style="text-decoration: none; color: #091f43;"
                  :to="{ name: 'UserProfile', params: { id: comment.user_id } }"
                >
                  <span class="name">{{ comment.User.first_name }} {{ comment.User.last_name }}</span>
                </router-link>
                • <span class="date">{{ formatDate(comment.comment_date) }}</span>
                <a
                  v-if="canDelete(comment.User.user_id)"
                  class="delete-comment"
                  @click="deleteComment(comment.comment_id)"
                  title="Supprimer le commentaire"
                >
                  <i class="fas fa-times"></i>
                </a>
              </div>
              {{ comment.comment_content }}
            </li>
          </ul>
        </li>
        <li class="writeComment">
          <label :for="`commentContent` + i">Laisser un commentaire</label>
          <input
            v-model="comment[post.post_id]"
            placeholder="Saisir un commentaire..."
            :id="`commentContent` + i"
            v-on:keyup.enter="sendComment(post.post_id)"
          />
          <p class="invalid-input" v-if="invalidInput[post.post_id]">{{ invalidInput[post.post_id] }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="js">
import moment from 'moment'
import store from '../store'

export default ({
  name: 'UserPosts',
  data () {
    return {
      userData: {},
      userPosts: [],
      comment: [],
      invalidInput: [],
      token: store.state.token,
      id: this.$route.params.id,
      userId: store.state.userId,
      admin: store.state.admin
    }
  },
  created () {
    this.getUserData()
    this.getUserPosts()
  },
  methods: {
    async getUserData () {
      try {
        const getData = await fetch(`${process.env.VUE_APP_URL_API}/users/${this.id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        const userData = await getData.json()
        this.userData = userData
      } catch (error) {
        console.log(error)
      }
    },
    async getUserPosts () {
      try {
        const getUserPosts = await fetch(`${process.env.VUE_APP_URL_API}/users/${this.id}/posts`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        const userPosts = await getUserPosts.json()
        this.userPosts = userPosts
      } catch (error) {
        console.log(error)
      }
    },
    formatDate (date) {
      if (date) {
        moment.locale('fr')
        return moment(date).fromNow()
      }
    },
    canDelete (userId) {
      return this.userId === userId || this.admin
    },
    async sendComment (postId) {
      try {
        const data = await fetch(`${process.env.VUE_APP_URL_API}/api/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify({
            postId: postId,
            commentContent: this.comment[postId]
          })
        })
        if ([400, 500].includes(data.status)) {
          const response = await data.json()
          this.invalidInput[postId] = `${response.error}`
        } else {
          await this.getUserPosts()
          this.comment = []
          this.invalidInput = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deletePost (postId) {
      if (confirm('Voulez-vous supprimer cette publication ?')) {
        try {
          await fetch(`${process.env.VUE_APP_URL_API}/posts/${postId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${this.token}` }
          })
          await this.getUserPosts()
        } catch (error) {
          console.log(error)
        }
      }
    },
    async deleteComment (commentId) {
      if (confirm('Voulez-vous supprimer ce commentaire ?')) {
        try {
          await fetch(`${process.env.VUE_APP_URL_API}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${this.token}` }
          })
          await this.getUserPosts()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
h1 {
  font-size: 2.5rem;
}

ul {
  list-style-type: none;
  padding-left: 0;

  .post {
    text-align: left;
    color: #000;
    background-color: #ebe8e8;
    border: solid 0.001rem #e6e3e3;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem #d3d3d3;
    margin: 3rem 3rem 0.5rem 3rem;
    padding: 1rem 2rem;

    @media (max-width: 1050px) {
      margin: 0.5rem;
    }

    @media (max-width: 769px) {
      margin-top: 3rem;
      padding: 1rem;
    }
  }

  .name {
    font-weight: bold;
    margin-right: 0.3rem;
    color: #091f43;
  }

  .comment {
    text-align: left;
    background-color: #dfdddd;
    border: solid 0.001rem #e6e3e3;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem #d3d3d3;
    margin: 0.5rem 3rem 0 8rem;
    padding: 1rem;

    @media (max-width: 1050px) {
      margin-right: 0.5rem;
    }

    @media (max-width: 769px) {
      margin-left: 0.5rem;
    }

    .comment-header {
      display: flex;
      margin-bottom: 0.5rem;
    }

    &:last-child {
      color: #000;
    }

    .date {
      color: #091f43;
    }
  }
}

.text {
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
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }
}

.user-data {
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

.date {
  padding-left: 0.3rem;
  font-weight: 100;
  font-style: italic;
}

.delete-post {
  font-weight: 100;
  color: #fd2d01;
  text-align: right;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
}

.delete-comment {
  font-weight: 100;
  text-align: right;
  margin-left: auto;
  cursor: pointer;
  color: #686766;
}

#no-posts {
  h1 {
    font-size: 1.3rem;
    font-weight: 100;
  }
  background-color: #ebe8e8;
  border: solid 0.001rem #e6e3e3;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
  margin: 5rem 3rem;
  padding: 1rem;

  @media (max-width: 1050px) {
    margin: 5rem 0.5rem;
  }
}

.writeComment {
  display: flex;
  flex-direction: column;
  margin: 1rem 3rem 0 8rem;

  @media (max-width: 1050px) {
    margin-right: 0.5rem;
  }

  @media (max-width: 769px) {
    margin-left: 0.5rem;
  }

  label {
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
  }
}

.invalid-input {
  color: #c50404;
  border: solid 0.1rem #c50404;
  background-color: #fcf3f3;
  margin: 2rem auto 1rem auto;
  padding: 1rem;
}
</style>
