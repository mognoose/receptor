import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || !body.title || !body.ingredients || !body.instructions) {
      throw createError({
          statusCode: 400,
          statusMessage: 'Invalid recipe data. Required fields: name, ingredients, instructions.'
      });
  }

  try {
    const { title, ingredients, instructions, description, imageUrl, ...rest } = body;
    const recipeData = { title, ingredients, instructions, description, imageUrl, ...rest };

    const newRecipeRef = await db.collection('recipes').add(recipeData);
    const newRecipe = { id: newRecipeRef.id, ...recipeData };

    return { recipe: newRecipe };
  } catch (error: any) {
    console.error('Error creating recipe:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create recipe',
    });
  }
});
