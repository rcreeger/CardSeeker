<template>
  <div class="signup container">
    <form class="card-panel" @submit="Signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <!-- <div class="field">
        <label for="name">Username</label>
        <input id="name" type="text" v-model="username" />
      </div> -->
      <!-- <p v-if="feedback" class="red-text center">{{ feedback }}</p> -->
      <div class="field center">
        <button @click.prevent="Signup" class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
// import slugify from "slugify";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: ""
      // username: null,
      // feedback: null,
      // slug: null
    };
  },
  methods: {
    signup: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => console.log("err", err));
      //     if (this.username) {
      //       this.slug = slugify(this.username, {
      //         replacement: "-",
      //         remove: /[$*_+~.()'"!\-:@]/g,
      //         lower: true
      //       });
      //       console.log(this.slug);
      //       let ref = db.collection("users").doc(this.slug);
      //       ref.get().then(doc => {
      //         if (doc.exists) {
      //           this.feedback = "This username already exists";
      //         } else {
      //           this.feedback = "This username is free to use";
      //         }
      //       });
      //     } else {
      //       this.feedback = "Please enter a username";
      // }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
