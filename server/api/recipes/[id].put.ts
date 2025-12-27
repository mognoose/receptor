import { promises as fs } from 'fs';
import path from 'path';
import { readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  const recipeId = event.context.params?.id;

  if (!recipeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Recipe ID not provided',
    });
  }

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

    if (!recipeDataPart) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid recipe data. Required fields: recipe (JSON).'
      });
    }

    const recipeData = JSON.parse(recipeDataPart.data.toString());
    const recipeDir = path.join(process.cwd(), 'server', 'recipes', recipeId);
    
    const updatedRecipe = {
      ...recipeData,
      id: parseInt(recipeId),
      imageUrl: `/api/recipes/${recipeId}/image`
    };

    const recipeJsonPath = path.join(recipeDir, 'recipe.json');
    await fs.writeFile(recipeJsonPath, JSON.stringify(updatedRecipe, null, 2));

    if (imagePart) {
      // Remove old image
      const files = await fs.readdir(recipeDir);
      const oldImage = files.find(f => f.startsWith('image.'));
      if (oldImage) {
        await fs.unlink(path.join(recipeDir, oldImage));
      }
      
      const imageExtension = path.extname(imagePart.filename || '');
      const imagePath = path.join(recipeDir, `image${imageExtension}`);
      await fs.writeFile(imagePath, imagePart.data);
    }
    
    return { recipe: updatedRecipe };
  } catch (error: any) {
    console.error('Error updating recipe:', error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update recipe',
    });
  }
});
