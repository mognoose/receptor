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
  try {
    const recipesSnapshot = await db.collection('recipes').get();
    const recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { recipes };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recipes',
    });
  }
});
