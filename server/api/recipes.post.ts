import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../receptor-14036-firebase-adminsdk-fbsvc-798cae91d0.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
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
