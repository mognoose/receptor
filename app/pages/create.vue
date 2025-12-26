<template>
  <div>
    <h1>Create a new recipe</h1>
    <form @submit.prevent="createRecipe">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="recipe.title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="recipe.description"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Recipe Image</label>
        <input type="file" id="image" @change="handleFileUpload" accept="image/*">
        <div v-if="isUploading">Uploading image...</div>
        <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Recipe Image Preview" style="max-width: 200px; margin-top: 1rem;" />
      </div>
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <textarea id="ingredients" v-model="recipe.ingredients" required></textarea>
        <small>One ingredient per line.</small>
      </div>
      <div class="form-group">
        <label for="instructions">Instructions</label>
        <textarea id="instructions" v-model="recipe.instructions" required></textarea>
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Creating...' : 'Create Recipe' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  middleware: 'auth'
});

const recipe = ref({
  title: '',
  description: '',
  ingredients: '',
  instructions: '',
  imageUrl: '',
});

const error = ref<string | null>(null);
const isSubmitting = ref(false);
const isUploading = ref(false);

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  isUploading.value = true;
  error.value = null;

  try {
    // 1. Get auth params from our server
    const authParams = await $fetch('/api/imagekit-auth');

    // 2. Upload to ImageKit
    const formData = new FormData();
    const config = useRuntimeConfig();
    formData.append('file', file);
    formData.append('publicKey', config.public.imagekitPublicKey);
    formData.append('signature', authParams.signature);
    formData.append('expire', String(authParams.expire));
    formData.append('token', authParams.token);
    formData.append('fileName', file.name);

    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
    });

    const uploadResult = await response.json();

    if (uploadResult && uploadResult.url) {
        recipe.value.imageUrl = uploadResult.url;
    } else {
      throw new Error('Failed to upload image.');
    }
  } catch (e: any) {
    error.value = 'Image upload failed. Please try again.';
    console.error(e);
  } finally {
    isUploading.value = false;
  }
}

async function createRecipe() {
  error.value = null;
  isSubmitting.value = true;
  try {
    const result = await $fetch('/api/recipes', {
      method: 'POST',
      body: {
        ...recipe.value,
        ingredients: recipe.value.ingredients.split('\n').filter(i => i.trim() !== ''),
      }
    });

    if (result && result.recipe && result.recipe.id) {
        await navigateTo(`/${result.recipe.id}`);
    } else {
        error.value = 'Failed to create recipe: invalid response from server.';
    }

  } catch (e: any) {
    error.value = e.data?.statusMessage || 'An unknown error occurred.';
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
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
</style>
