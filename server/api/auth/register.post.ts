import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import serviceAccount from '../../../receptor-14036-firebase-adminsdk-fbsvc-798cae91d0.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
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
    const userRecord = await getAdminAuth().createUser({
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