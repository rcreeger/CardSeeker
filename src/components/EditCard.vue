<template>
  <div v-if="card" class="edit-card container z-depth-1">
    <h2 class="indigo-text center-align">Edit {{ card.name }} Card</h2>
    <form @submit.prevent="editCard">
      <div class="field title">
        <label for="title">Card:</label>
        <input type="text" name="name" v-model="name" />
      </div>
      <div class="field price">
        <label for="price">Price:</label>
        <input type="text" name="price" v-model="price" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Card</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditCard",
  data() {
    return {
      card: null,
      price: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    editCard() {
      if (this.card.name) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.card.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        db.collection("cards")
          .doc(this.card.id)
          .update({
            name: this.card.name,
            slug: this.slug,
            price: this.card.price
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a card title";
      }
    },
    addIng() {
      if (this.another) {
        this.card.price.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add another card";
      }
    },
    deleteIng(ing) {
      this.card.price = this.card.price.filter(price => {
        return price != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("cards")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-card {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-card h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-card .field {
  margin: 20px auto;
  position: relative;
}
.edit-card .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
