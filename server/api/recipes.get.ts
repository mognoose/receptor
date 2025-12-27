import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const recipesDir = path.join(process.cwd(), 'server', 'recipes');
    const recipeDirs = await fs.readdir(recipesDir, { withFileTypes: true });
    
    let allCategories: string[] = [];

    const recipes = await Promise.all(
      recipeDirs
        .filter(dirent => dirent.isDirectory())
        .map(async (dirent) => {
          const recipeJsonPath = path.join(recipesDir, dirent.name, 'recipe.json');
          try {
            await fs.access(recipeJsonPath);
            const content = await fs.readFile(recipeJsonPath, 'utf-8');
            const recipe = JSON.parse(content);

            // Find image file
            const imageFiles = await fs.readdir(path.join(recipesDir, dirent.name));
            const imageFile = imageFiles.find(f => f.startsWith('image.'));
            if (imageFile) {
              recipe.imageUrl = `/api/recipes/${recipe.id}/image`;
            }

            // Collect categories
            if (recipe.categories && Array.isArray(recipe.categories)) {
                allCategories = allCategories.concat(recipe.categories);
            }

            return recipe;
          } catch (error) {
            return null;
          }
        })
    );

    const validRecipes = recipes.filter(recipe => recipe !== null);
    const uniqueCategories = Array.from(new Set(allCategories));

    return { recipes: validRecipes, categories: uniqueCategories }; // Return categories as well
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recipes',
    });
  }
});
