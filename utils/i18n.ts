import { ref } from 'vue';

// Define your translation object
const translations = {
  en: {
    hello: 'Hello',
    welcome: 'Welcome!',
    'nav.home': 'Home',
    'nav.create': 'New Recipe',
    'home.search.placeholder': 'Search recipes...',
    'create.recipe.title': 'Create a new recipe',
    'recipe.title': 'Title',
    'recipe.description': 'Description',
    'recipe.image': 'Recipe Image',
    'recipe.ingredients': 'Ingredients',
    'recipe.instructions': 'Instructions',
    'recipe.create.button': 'Create Recipe',
    'recipe.create.submitting': 'Creating...',
    'recipe.ingredient.hint': 'One ingredient per line.',
    'recipe.back_to_recipes': 'Back to recipes',
    'recipe.edit_recipe': 'Edit Recipe',
    'recipe.delete_recipe': 'Delete Recipe',
    'recipe.publish_recipe': 'Publish Recipe',
    'error.image.required': 'Please select an image.',
    'error.create.failed': 'Failed to create recipe: invalid response from server.',
    'error.unknown': 'An unknown error occurred.',
    'error.invalid.multipart': 'Request must be of type multipart/form-data.'
  },
  fi: {
    hello: 'Hei',
    welcome: 'Tervetuloa!',
    'nav.home': 'Koti',
    'nav.create': 'Luo resepti',
    'home.search.placeholder': 'Etsi reseptejä...',
    'create.recipe.title': 'Luo uusi resepti',
    'recipe.title': 'Otsikko',
    'recipe.description': 'Kuvaus',
    'recipe.image': 'Reseptikuva',
    'recipe.ingredients': 'Ainesosat',
    'recipe.instructions': 'Ohjeet',
    'recipe.create.button': 'Luo resepti',
    'recipe.create.submitting': 'Luodaan...',
    'recipe.ingredient.hint': 'Yksi ainesosa per rivi.',
    'recipe.back_to_recipes': 'Takaisin resepteihin',
    'recipe.edit_recipe': 'Muokkaa reseptiä',
    'recipe.delete_recipe': 'Poista resepti',
    'recipe.publish_recipe': 'Julkaise resepti',
    'error.image.required': 'Valitse kuva.',
    'error.create.failed': 'Reseptin luominen epäonnistui: virheellinen vastaus palvelimelta.',
    'error.unknown': 'Tuntematon virhe tapahtui.',
    'error.invalid.multipart': 'Pyynnön on oltava tyyppiä multipart/form-data.'
  }
};

// Reactive state for current locale
export const currentLocale = useState<string>('locale', () => 'fi');

// Translation function
export function t(key: string, locale?: string): string {
  const activeLocale = locale || currentLocale.value;
  // Fallback to English if translation for activeLocale is not found
  return translations[activeLocale]?.[key] || translations.en[key] || key;
}

// Function to change locale
export function setLocale(locale: string) {
  currentLocale.value = locale;
}
