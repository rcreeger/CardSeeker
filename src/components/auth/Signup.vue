<template>
  <div class="signup container">
    <form class="card-panel" @submit="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
// import slugify from "slugify";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
      // slug: null
    };
  },
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log("signup success res", res);
          this.$router.push({ name: "Login" });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.feedback = errorMessage;
        });
      // if (this.email) {
      //   this.slug = slugify(this.email, {
      //     replacement: "-",
      //     remove: /[$*_+~.()'"!\-:@]/g,
      //     lower: true
      //   });
      //   console.log(this.slug);
      //   let ref = db.collection("users").doc(this.slug);
      //   ref.get().then(doc => {
      //     if (doc.exists) {
      //       this.feedback = "This username already exists";
      //     } else {
      //       this.feedback = "This username is free to use";
      //     }
      //   });
      // } else {
      //   this.feedback = "Please enter a username";
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
