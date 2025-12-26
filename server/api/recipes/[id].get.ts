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
