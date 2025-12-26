<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Logging in...' : 'Login with Email' }}
      </button>
      <p v-if="emailError" class="error-message">{{ emailError }}</p>
    </form>
    <hr>
    <button @click="handleGoogleLogin" :disabled="isSubmitting">
      Login with Google
    </button>
    <p v-if="googleError" class="error-message">{{ googleError }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~~/composables/useAuth';

const { loginWithEmail, loginWithGoogle } = useAuth();

const email = ref('');
const password = ref('');
const emailError = ref<string | null>(null);
const googleError = ref<string | null>(null);
const isSubmitting = ref(false);

async function handleLogin() {
  isSubmitting.value = true;
  emailError.value = null;
  try {
    await loginWithEmail(email.value, password.value);
    await navigateTo('/');
  } catch (e: any) {
    emailError.value = e.message;
  } finally {
    isSubmitting.value = false;
  }
}

async function handleGoogleLogin() {
  isSubmitting.value = true;
  googleError.value = null;
  try {
    await loginWithGoogle();
    await navigateTo('/');
  } catch (e: any) {
    googleError.value = e.message;
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
hr {
  margin: 2rem 0;
}
</style>
