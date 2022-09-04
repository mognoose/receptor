<template>
  <div>
    <div class="header">
      <img class="logo" alt="Receptor logo" src="../assets/receptor.svg" />
      <input type="text" v-model="search" placeholder="Hae reseptejä" @input="fetchRecipes()">
    </div>
    <recipePreview
        v-for="recipe in recipes"
        :key="recipe.sys.id"
        :recipe="recipe.fields"
      />
  </div>
</template>

<script>
import {createClient} from 'contentful';
import recipePreview from '../components/recipePreview.vue';

const client = createClient({
  space: process.env.VUE_APP_CTF_SPACE_ID,
  accessToken: process.env.VUE_APP_CTF_CDA_ACCESS_TOKEN,
});

export default {
  name: "HomeView",
  components: {
    recipePreview,
  },
  data() {
    return {
      recipes: [],
      search: ""
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      await client
        .getEntries({
          content_type: 'recept',
          order: '-sys.createdAt',
          'fields.title[match]': this.search,
        })
        .then(recipes => this.recipes = recipes.items)
        .catch(err => console.log(err));
    }
  },
};
</script>
<style scoped>
.header{
  display: flex;
  justify-content: center;
  align-items: center;
}
.header input{
  border: 1px solid #212121;
  background-color: #000; 
  font-size: 1.2em;
  padding: .5em;
  color: #e1e1e1;
  /* padding-left: 2.5em; */
  
}
input:hover {
    outline-width: 0;
    box-shadow: 0px 0px 10px rgba(255,255,255,0.05)
}
input:focus {
    outline-width: 0;
    box-shadow: 0px 0px 10px rgba(255,255,255,0.1)
}
.logo {
  margin: 1em;
  max-height: 4em;
}
</style>
