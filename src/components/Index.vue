<template>
  <div class="index container">
    <div v-for="card in cards" :key="card.id">
      <div class="card">
        <div class="card-image">
          <img class="activator" :src="card.image" />
        </div>
        <div class="card-content">
          <h2 class="indigo-text card-title activator">{{ card.name }}</h2>
        </div>
        <div class="card-reveal">
          <span><i class="material-icons right">close</i></span>
          <span class="chip">{{ card.grade }}</span>
          <span class="chip">{{ card.team }}</span>
          <span class="chip">{{ card.price }}</span>
        </div>
        <a class="btn-floating halfway-fab waves-effect waves-light blue left"
          ><i class="material-icons" @click="deleteCard(card.id)">delete</i></a
        >
        <span class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'EditCard', params: { card_id: card.id } }">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      cards: []
    };
  },
  methods: {
    deleteCard(id) {
      console.log(id);
      db.collection("cards")
        .doc(id)
        .delete()
        .then(() => {
          this.cards = this.cards.filter(card => {
            return card.id != id;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    console.log("currentUser in index", firebase.auth().currentUser.uid);
    db.collection("cards")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          let card = doc.data();
          card.id = doc.id;
          this.cards.push(card);
        });
      });
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .prices {
  margin: 30px auto;
}
.index .prices li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
