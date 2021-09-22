<template>
  <section>
    <img :src="userData.user_picture" :alt="`Photo de profil de ` + userData.first_name + ` ` + userData.last_name + `.`" /> 
    <div id="user-card">
      <h1>{{ userData.first_name }} {{ userData.last_name }}</h1>
      <p id="email">{{ userData.email }}</p>
        <router-link style="text-decoration: none;" :to="{ name: 'UserPosts', params: { id: userData.user_id  }}">
          <p id="user-posts">Voir mes publications</p>
        </router-link>
    </div>
    <div id="modify-profile">
      <a @click="modifyProfile" id="modify-account">Modifier mon compte</a>
      <a @click="deleteProfile" id="delete-account">Supprimer mon compte</a>
    </div>
  </section>
</template>

<script lang="js">
export default ({
  name: 'Profile',
  data() {
    return {
    userData: {},
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
     getUserData: async function () {
       try {
         const id = localStorage.getItem("userId"); 
         const token = localStorage.getItem("token");  
         const getData = await fetch(`http://localhost:3000/api/users/${id}`,
         { headers: { Authorization: "Bearer " + token } });
         const userData = await getData.json();
         this.userData = userData;
       } catch (error) {
         console.log(error);
       }     
     },
     modifyProfile: function () {
       this.$router.push('/updateprofile');
     },
     deleteProfile: function () {
       // CONFIRMATION + SUPPRESSION DE L'USER
       this.$router.push('/login');
     }
   }
}); 
</script>

<style scoped lang="scss">
section {
  margin: 10rem auto;
  position: relative;
}

#user-card {
  width: 35rem;
  margin: auto;
  padding: 7rem 0.8rem 2rem 0.8rem;
  border: solid 0.001rem #f9f7f7;
  background-color: #F2F2F2;
  border-radius: 1rem;
  box-shadow: 0 0 0.3rem #d3d3d3;
}

img {
  border-radius: 50%;
  height: 15rem;
  width: 15rem;
  object-fit: cover;
  border: solid 0.5rem #091F43;
  position: absolute;
  top: -7rem;
  left: 50%;
  transform: translate(-50%);
}

h1 {
  padding-top: 1rem;
  font-size: 3rem;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    bottom: -1rem;
    width: 29rem;
    height: 0.4rem;
    left: 3rem;
    text-align: center;
    background-color: #FD2D01;
  }
}

#email {
  color: #000;
  font-size: 1.3rem;
}

#user-posts {
  color: #FD2D01;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.3rem;
  border: solid 0.15rem #FD2D01;
  border-radius: 3rem;
  padding: 0.5rem 2rem;
  display: inline-block;
  margin-top: 2rem;
  transition: all 0.5s ease-in-out;
  
  &:hover {
    background-color: #edd6d3;
  }
}

#modify-profile {
  width: 36.6rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  #modify-account::after {
    background-color: #091F43;
  }
  
  #delete-account {
    color: #FD2D01;

    &::after {
      background-color: #FD2D01;
    }
  }

  a {
    display: inline-block;
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 0.2rem;
      bottom: -0.5rem;
      left: 0;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
}
</style>