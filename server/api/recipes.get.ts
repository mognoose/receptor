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
