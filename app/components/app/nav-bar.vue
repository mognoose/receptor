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
                <li>
                    <div class="user-icon-circle">
                        <svg class="user-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                        </svg>
                    </div>
                </li>
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

    .user-icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.2rem; /* Adjust size as needed */
        height: 2.2rem;
        border-radius: 50%;
        background-color: var(--pico-primary); /* Use a primary color from PicoCSS */
        color: var(--pico-background-color); /* For the icon color */
        cursor: pointer;
        margin-left: 0.5rem; /* Space from logout button */
        /* Optional: Add a subtle shadow */
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .user-icon-circle:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .user-icon {
        width: 1.4rem; /* Adjust icon size within the circle */
        height: 1.4rem;
    }
</style>