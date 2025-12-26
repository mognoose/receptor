<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="password-confirm">Confirm Password</label>
        <input type="password" id="password-confirm" v-model="passwordConfirm" required>
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Registering...' : 'Register' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~~/composables/useAuth';

const { registerWithEmail } = useAuth();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const error = ref<string | null>(null);
const isSubmitting = ref(false);

async function handleRegister() {
  if (password.value !== passwordConfirm.value) {
    error.value = 'Passwords do not match.';
    return;
  }
  isSubmitting.value = true;
  error.value = null;
  try {
    await registerWithEmail(email.value, password.value);
    await navigateTo('/');
  } catch (e: any) {
    error.value = e.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
input {
  width: 100%;
}
.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}
</style>
