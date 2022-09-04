<template>
    <div class="recipe">
        <h1>{{recipe.title}}</h1>
        <div v-html="rtf(recipe.description)"></div>
        <img v-if="recipe.image" :src="recipe.image.fields.file.url">
        <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.sys.id">{{ingredient.fields.name+' - '+ingredient.fields.amount}}</li>
        </ul>
        <div v-html="rtf(recipe.instructions)"></div>
        <!-- <pre style="text-align: left;">{{ recipe }}</pre> -->
    </div>
</template>
  
<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

  export default {
    props: {
      recipe: {
        type: Object,
        required: true
      },
    },
    mounted() {
      // console.log('Component mounted.')
    },
    methods: {
        showRecipe(){
            this.$router.push({ path:'/recipe/'+this.id});
        },
        rtf(doc){
        return documentToHtmlString(doc);
        }
    }
  
  }
  </script>

<style scoped>
    .recipe {
      border: 1px solid #212121;
      padding: 4em;
      margin: 1em auto;
      max-width: 40em;
      text-align: left;
      }
      .recipe img{
        max-width: 100%;
      }
</style>