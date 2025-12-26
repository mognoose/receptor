import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../receptor-14036-firebase-adminsdk-fbsvc-798cae91d0.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  });
}

const db = getFirestore();

export default defineEventHandler(async (event) => {
  const recipeId = event.context.params?.id;

  if (!recipeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Recipe ID not provided',
    });
  }

  try {
    const recipeDoc = await db.collection('recipes').doc(recipeId).get();

    if (!recipeDoc.exists) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipe not found',
      });
    }

    const recipe = { id: recipeDoc.id, ...recipeDoc.data() };
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
