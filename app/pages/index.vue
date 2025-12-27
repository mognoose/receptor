<template>
  <div class="container">
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('home.search.placeholder')"
        class="searchbox"
      />
      <div class="filters-dropdown">
        <button @click="showFilters = !showFilters">{{ t('filters.button') }}</button>
        <div v-if="showFilters" class="dropdown-content">
          <a @click="selectCategory(null)" :class="{ active: selectedCategory === null }">{{ t('filters.all_categories') }}</a>
          <a
            v-for="category in uniqueCategories"
            :key="category"
            @click="selectCategory(category)"
            :class="{ active: selectedCategory === category }"
          >
            {{ category }}
          </a>
        </div>
      </div>
    </div>

    <div class="recipes">
      <NuxtLink
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
      class="card"
      :to="`/${recipe.id}`"
      >
        <article>
          <img v-if="recipe.imageUrl" :src="recipe.imageUrl" :alt="recipe.title" />
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description }}</p>
          <div v-if="recipe.categories && recipe.categories.length" class="categories-list">
              <span v-for="(cat, index) in recipe.categories" :key="index" class="category-pill">
                  {{ cat }}
              </span>
          </div>
        </article>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t } from '../../utils/i18n';
interface Recipe {
    imageUrl?: string; // Make optional
    id: string;
    title: string;
    description: string;
    categories?: string[]; // Add categories
}

const searchQuery = ref('');
const showFilters = ref(false);
const selectedCategory = ref<string | null>(null);

const {data: apiData, pending, status} = await useFetch<{recipes: Recipe[], categories: string[]}>('/api/recipes');

const recipes = computed(() => apiData.value?.recipes || []);
const uniqueCategories = computed(() => apiData.value?.categories || []);

function selectCategory(category: string | null) {
  selectedCategory.value = category;
  showFilters.value = false; // Close dropdown after selection
}

const filteredRecipes = computed(() => {
  let filtered = recipes.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(recipe => recipe.categories && recipe.categories.includes(selectedCategory.value!));
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      (recipe.categories && recipe.categories.some(cat => cat.toLowerCase().includes(query)))
    );
  }
  
  return filtered;
});
</script>
<style scoped>
  .container .search-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    position: relative; /* For dropdown positioning */
  }

  .filters-dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: block;
    position: absolute;
    background-color: var(--pico-background-color);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 4px;
    margin-top: 0.5rem;
  }

  .dropdown-content a {
    color: var(--pico-text-color);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }

  .dropdown-content a:hover {
    background-color: var(--pico-secondary-background);
  }

  .dropdown-content a.active {
    background-color: var(--pico-primary);
    color: white;
  }

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
    height: 550px; /* Adjust height as needed with categories */
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

  .categories-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 1rem 1rem 1rem;
  }

  .category-pill {
    display: inline-flex;
    align-items: center;
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    color: #333;
  }
</style>