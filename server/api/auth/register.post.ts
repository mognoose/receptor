import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default defineEventHandler(async (event) => {
  const { invitationKey: storedInvitationKey } = useRuntimeConfig();
  const body = await readBody(event);
  const { email, password, invitationKey } = body;

  if (invitationKey !== storedInvitationKey) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid invitation key.',
    });
  }

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required.',
    });
  }

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
    });
    return { uid: userRecord.uid, email: userRecord.email };
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create user.',
    });
  }
});