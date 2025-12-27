<template>
  <div>
    <h1>{{ t('edit.recipe.title') }}</h1>
    <form @submit.prevent="updateRecipe">
      <div class="form-group">
        <label for="title">{{ t('recipe.title') }}</label>
        <input type="text" id="title" v-model="recipe.title" required>
      </div>
      <div class="form-group">
        <label for="description">{{ t('recipe.description') }}</label>
        <textarea id="description" v-model="recipe.description"></textarea>
      </div>
      <div class="form-group">
        <label for="image">{{ t('recipe.image') }}</label>
        <input type="file" id="image" @change="handleFileUpload" accept="image/*">
        <img v-if="imageUrl" :src="imageUrl" alt="Recipe Image Preview" style="max-width: 200px; margin-top: 1rem;" />
      </div>
      <div class="form-group">
        <label for="categories">{{ t('recipe.categories') }}</label>
        <div class="category-input-group">
          <input
            type="text"
            id="newCategory"
            v-model="newCategory"
            @keyup.enter="addCategory"
            :placeholder="t('recipe.add_category')"
          >
          <button type="button" @click="addCategory">{{ t('recipe.add_category') }}</button>
        </div>
        <div class="categories-list">
          <span v-for="(cat, index) in categories" :key="index" class="category-pill">
            {{ cat }}
            <button type="button" @click="removeCategory(index)" class="category-remove">x</button>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="ingredients">{{ t('recipe.ingredients') }}</label>
        <textarea id="ingredients" v-model="recipe.ingredients" required></textarea>
        <small>{{ t('recipe.ingredient.hint') }}</small>
      </div>
      <div class="form-group">
        <label for="instructions">{{ t('recipe.instructions') }}</label>
        <textarea id="instructions" v-model="recipe.instructions" required></textarea>
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? t('recipe.update.submitting') : t('recipe.update.button') }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { t } from '../../../utils/i18n';

const recipe = ref({
  title: '',
  description: '',
  ingredients: '',
  instructions: '',
});
const imageUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const categories = ref<string[]>([]);
const newCategory = ref('');

const error = ref<string | null>(null);
const isSubmitting = ref(false);

const route = useRoute();
const recipeId = route.params.id as string;

onMounted(async () => {
  try {
    const fetchedRecipe = await $fetch(`/api/recipes/${recipeId}`);
    if (fetchedRecipe && fetchedRecipe.recipe) {
      recipe.value.title = fetchedRecipe.recipe.title;
      recipe.value.description = fetchedRecipe.recipe.description;
      recipe.value.ingredients = fetchedRecipe.recipe.ingredients.join('\n');
      recipe.value.instructions = fetchedRecipe.recipe.instructions;
      imageUrl.value = fetchedRecipe.recipe.imageUrl;
      categories.value = fetchedRecipe.recipe.categories || []; // Populate categories
    }
  } catch (e) {
    error.value = t('error.unknown');
    console.error(e);
  }
});

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
    imageUrl.value = URL.createObjectURL(target.files[0]);
  }
}

function addCategory() {
  if (newCategory.value.trim() !== '' && !categories.value.includes(newCategory.value.trim())) {
    categories.value.push(newCategory.value.trim());
    newCategory.value = '';
  }
}

function removeCategory(index: number) {
  categories.value.splice(index, 1);
}

async function updateRecipe() {
  error.value = null;
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    const recipePayload = {
      ...recipe.value,
      ingredients: recipe.value.ingredients.split('\n').filter(i => i.trim() !== ''),
      categories: categories.value, // Add categories to payload
    };
    formData.append('recipe', JSON.stringify(recipePayload));
    if (imageFile.value) {
      formData.append('image', imageFile.value);
    }

    const result = await $fetch(`/api/recipes/${recipeId}`, {
      method: 'PUT',
      body: formData,
    });

    if (result && result.recipe && result.recipe.id) {
        await navigateTo(`/${result.recipe.id}`);
    }
    else {
        error.value = t('error.update.failed');
    }

  } catch (e: any) {
    error.value = e.data?.statusMessage || t('error.unknown');
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* Styles are copied from create.vue and should be the same */
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

small {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #666;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}

/* Category specific styles */
.category-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.category-input-group input {
  flex-grow: 1;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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

.category-pill .category-remove {
  background: none;
  border: none;
  color: #777;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.category-pill .category-remove:hover {
  color: #000;
}
</style>