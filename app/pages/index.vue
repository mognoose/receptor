<template>
  <div class="container">
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="searchbox"
      />
    </div>

    <div class="recipes">
      <NuxtLink
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
      class="card"
      :to="recipe.id"
      >
        <article>
          <img v-if="recipe.imageUrl" :src="recipe.imageUrl" :alt="recipe.title" />
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description }}</p>
        </article>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Recipe {
    imageUrl: string;
    id: string;
    title: string;
    description: string;
}

const searchQuery = ref('');

const {data: recipes, pending, status} = await useFetch<{recipes: Recipe[]}>('/api/recipes');

const filteredRecipes = computed(() => {
  if (!searchQuery.value) {
    return recipes.value?.recipes;
  }
  return recipes.value?.recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
<style scoped>
  .container .recipes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    a, p {
      text-decoration: none;
      color: inherit;
    }
  }
</style>