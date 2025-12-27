import { promises as fs } from 'fs';
import path from 'path';
import { readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Request must be of type multipart/form-data.'
      });
    }

    const recipeDataPart = formData.find(p => p.name === 'recipe');
    const imagePart = formData.find(p => p.name === 'image');

    if (!recipeDataPart || !imagePart) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid recipe data. Required fields: recipe (JSON), image.'
      });
    }

    const recipeData = JSON.parse(recipeDataPart.data.toString());

    if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid recipe data in JSON. Required fields: title, ingredients, instructions.'
      });
    }

    const recipesDir = path.join(process.cwd(), 'server', 'recipes');
    const recipeDirs = await fs.readdir(recipesDir, { withFileTypes: true });
    const existingIds = recipeDirs
      .filter(dirent => dirent.isDirectory())
      .map(dirent => parseInt(dirent.name))
      .filter(id => !isNaN(id));
      
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const newRecipeDir = path.join(recipesDir, String(newId));
    await fs.mkdir(newRecipeDir);

    const newRecipe = {
      ...recipeData,
      id: newId,
      imageUrl: `/api/recipes/${newId}/image`
    };

    const recipeJsonPath = path.join(newRecipeDir, 'recipe.json');
    await fs.writeFile(recipeJsonPath, JSON.stringify(newRecipe, null, 2));

    const imageExtension = path.extname(imagePart.filename || '');
    const imagePath = path.join(newRecipeDir, `image${imageExtension}`);
    await fs.writeFile(imagePath, imagePart.data);
    
    return { recipe: newRecipe };
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create recipe',
    });
  }
});
