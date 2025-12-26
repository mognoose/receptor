<template>
    <nav class="container">
        <ul>
            <li><NuxtLink to="/" class="logo-link"><img class="logo" src="/img/receptor-logo.svg"><strong>Receptor</strong></NuxtLink></li>
        </ul>
        <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>

            <template v-if="user">
                <li><NuxtLink to="/create">New Recipe</NuxtLink></li>
                <li><a href="#" @click.prevent="handleLogout">Logout</a></li>
                <li>{{ user.email }}</li>
            </template>
            <template v-else>
                <li><NuxtLink to="/login">Login</NuxtLink></li>
                <li><NuxtLink to="/register">Register</NuxtLink></li>
            </template>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth';

const { user, logout } = useAuth();

const handleLogout = async () => {
    await logout();
    await navigateTo('/login');
};
</script>

<style>
    .logo {
        height: 1.5rem;
        margin-right: 0.5rem;
    }

    a.logo-link {
        display: flex;
        align-items: center;
        color: inherit;

    }

    a.logo-link:hover {
        text-decoration: none;
    }
</style>