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
    
    // Check if directory exists
    try {
      await fs.access(recipeDir);
    } catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipe not found',
      });
    }

    await fs.rm(recipeDir, { recursive: true, force: true });

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting recipe:', error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete recipe',
    });
  }
});
