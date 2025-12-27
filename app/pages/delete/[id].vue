<template>
  <div>
    <h1>{{ t('delete.recipe.title') }}</h1>
    <div v-if="recipe">
      <p>{{ t('delete.recipe.confirm_text') }} "{{ recipe.title }}"?</p>
      <button @click="deleteRecipe" :disabled="isDeleting">
        {{ isDeleting ? t('delete.recipe.deleting') : t('delete.recipe.confirm') }}
      </button>
      <NuxtLink to="/" role="button" class="secondary">{{ t('delete.recipe.cancel') }}</NuxtLink>
    </div>
    <div v-else>
      <p>Loading recipe...</p>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { t } from '../../../utils/i18n';

const recipe = ref<{ title: string } | null>(null);
const error = ref<string | null>(null);
const isDeleting = ref(false);

const route = useRoute();
const recipeId = route.params.id as string;

onMounted(async () => {
  try {
    const fetchedRecipe = await $fetch(`/api/recipes/${recipeId}`);
    if (fetchedRecipe && fetchedRecipe.recipe) {
      recipe.value = fetchedRecipe.recipe;
    }
  } catch (e) {
    error.value = t('error.unknown');
    console.error(e);
  }
});

async function deleteRecipe() {
  error.value = null;
  isDeleting.value = true;

  try {
    await $fetch(`/api/recipes/${recipeId}`, {
      method: 'DELETE',
    });
    await navigateTo('/');
  } catch (e: any) {
    error.value = e.data?.statusMessage || t('error.unknown');
    console.error(e);
  } finally {
    isDeleting.value = false;
  }
}
</script>

<style scoped>
.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}
button {
  margin-right: 1rem;
}
</style>
