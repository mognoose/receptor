<template>
    <nav class="container">
        <ul>
            <li><NuxtLink to="/" class="logo-link"><img class="logo" src="/img/receptor-logo.svg"><strong>Receptor</strong></NuxtLink></li>
        </ul>
        <ul>
            <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink to="/create">{{ t('nav.create') }}</NuxtLink></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { t } from '../../../utils/i18n';

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