import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const recipeId = event.context.params?.id;

  if (!recipeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Recipe ID not provided',
    });
  }

  try {
    const recipeDir = path.join(process.cwd(), 'server', 'recipes', recipeId);
    const recipeJsonPath = path.join(recipeDir, 'recipe.json');
    
    try {
      await fs.access(recipeJsonPath);
    } catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipe not found',
      });
    }

    const content = await fs.readFile(recipeJsonPath, 'utf-8');
    const recipe = JSON.parse(content);

    // Find image file
    const imageFiles = await fs.readdir(recipeDir);
    const imageFile = imageFiles.find(f => f.startsWith('image.'));
    if (imageFile) {
      recipe.imageUrl = `/api/recipes/${recipe.id}/image`;
    }

    return { recipe };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recipe',
    });
  }
});
