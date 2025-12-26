import { initializeApp, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type Auth,
  type User 
} from 'firebase/auth';

// Create a singleton instance of the Firebase app and auth.
let firebaseApp: FirebaseApp;
let auth: Auth;

function initAuth() {
  // Make sure this runs only on the client
  if (process.server) {
    return;
  }

  // Initialize only once
  if (!firebaseApp) {
    const config = useRuntimeConfig();
    const firebaseConfig = {
      apiKey: config.public.firebase.apiKey,
      authDomain: config.public.firebase.authDomain,
      projectId: config.public.firebase.projectId,
      storageBucket: config.public.firebase.storageBucket,
      messagingSenderId: config.public.firebase.messagingSenderId,
      appId: config.public.firebase.appId,
      measurementId: config.public.firebase.measurementId,
    };
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
  }
}

// Initialize on module load
initAuth();

export const useAuth = () => {
  const user = useState<User | null>('user', () => null);

  // Set up the auth state listener
  // It will only run on the client because `auth` will be undefined on the server
  if (auth) {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });
  }

  const registerWithEmail = (email, password) => {
    if (!auth) return Promise.reject(new Error('Firebase Auth not available.'));
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = (email, password) => {
    if (!auth) return Promise.reject(new Error('Firebase Auth not available.'));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    if (!auth) return Promise.reject(new Error('Firebase Auth not available.'));
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    if (!auth) return Promise.reject(new Error('Firebase Auth not available.'));
    return firebaseSignOut(auth);
  };

  return {
    user,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };
};