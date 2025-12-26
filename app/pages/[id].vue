<template>
    <article>
        <div v-if="pending">Loading...</div>
        <div v-else-if="recipe">
            <h1>{{ recipe.title }}</h1>
            <p>{{ recipe.description }}</p>
            <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Recipe Image" />
            <ul>
                <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
            </ul>
            <p>{{ recipe.instructions }}</p>
        </div>
        <div v-else-if="error">Error loading recipe</div>
    </article>
</template>

<script setup lang="ts">
interface Recipe {
    recipe: Recipe | Promise<Recipe>;
    title: string;
    description: string;
    imageUrl?: string;
    ingredients: string[];
    instructions: string;
}

// You can fetch data based on the dynamic id here
const route = useRoute();
const id = route.params.id;
const { data: recipe, pending, error } = await useFetch<Recipe>(`/api/recipes/${id}`, {
    transform: (data) => data.recipe,
});
</script>