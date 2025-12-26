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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }
  .recipes .card {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
  }

  .recipes .card article:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    transform: translateY(-2px);
    transition: all 0.2s ease-in-out;

    h3 {
      color: var(--pico-primary-hover);
    }

    p {
      color: var(--pico-text-color);
    }
  }

  .recipes .card article {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    height: 550px;
    overflow: hidden;
    border-radius: 8px;
    padding: 0;
  }

  .recipes .card article img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    flex-shrink: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .recipes .card article h3 {
    flex-shrink: 0;
    margin: 0.5rem 1rem 0.25rem 1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--pico-primary);
  }

  .recipes .card article p {
    flex-grow: 1;
    margin: 0 1rem 1rem 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    color: var(--pico-muted-color);
  }
</style>