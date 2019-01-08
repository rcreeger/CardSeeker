<template>
  <div class="add-card container z-depth-1">
    <h2 class="center-align indigo-text">Add New Card</h2>
    <form @submit.prevent="addCard">
      <div class="field title">
        <label for="title">Card:</label>
        <input type="text" name="title" v-model="name" />
      </div>
      <div class="field price">
        <label for="price">Price:</label>
        <input type="text" name="price" v-model="price" />
      </div>
      <div class="field team">
        <label for="price">Team:</label>
        <input type="text" name="team" v-model="team" />
      </div>
      <div class="field grade">
        <label for="price">Grade:</label>
        <input type="text" name="grade" v-model="grade" />
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Card</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddCard",
  data() {
    return {
      name: null,
      price: 0,
      team: null,
      grade: null,
      feedback: null
    };
  },
  methods: {
    addCard() {
      if (this.name) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);

        db.collection("cards")
          .add({
            name: this.name,
            price: this.price,
            team: this.team,
            year: this.year
            // slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a card";
      }
    }
  }
};
</script>

<style>
.add-card {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-card h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-card .field {
  margin: 20px auto;
  position: relative;
}
.add-card .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
