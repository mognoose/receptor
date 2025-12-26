<template>
    <article>
        <div v-if="pending">Loading...</div>
        <div v-else-if="recipe">
            <h1>{{ recipe.title }}</h1>
            <p>{{ recipe.description }}</p>
            <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Recipe Image" />
            <div class="content">
                <ul>
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                </ul>
                <p>{{ recipe.instructions }}</p>
            </div>
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

<style scoped>
    article div {
        img {
            width: 100%;
            aspect-ratio: 2 / 1;
            object-fit: cover;
            flex-shrink: 0;
            border-radius: 8px;
        }

        .content {
            margin-top: 1.5rem;
            display: flex;

            ul {
                white-space: nowrap;
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            
            p {
                padding-left: 2rem;
                margin-left: 2rem;
                border-left: 1px solid var(--pico-secondary-border);
                margin-top: 1rem;
                line-height: 1.6;
                white-space: break-spaces;
            }
        }

        @media (max-width: 760px) {
            .content {
                flex-direction: column;

                ul {
                    white-space: break-spaces;
                }

                p {
                    padding-left: 0;
                    margin-left: 0;
                    border-left: none;
                    margin-top: 1rem;
                }
            }
        }
    }
</style>