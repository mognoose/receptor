import { promises as fs } from 'fs';
import path from 'path';
import { sendStream } from 'h3';
import { createReadStream } from 'fs';


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
    const files = await fs.readdir(recipeDir);
    const imageFile = files.find(file => file.startsWith('image.'));

    if (!imageFile) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Image not found',
      });
    }

    const imagePath = path.join(recipeDir, imageFile);
    
    const ext = path.extname(imageFile).toLowerCase();
    
    let contentType = 'image/jpeg';
    if (ext === '.png') {
        contentType = 'image/png';
    } else if (ext === '.gif') {
        contentType = 'image/gif';
    } else if (ext === '.svg') {
        contentType = 'image/svg+xml';
    }
    
    event.node.res.setHeader('Content-Type', contentType);
    return sendStream(event, createReadStream(imagePath));

  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch image',
    });
  }
});
