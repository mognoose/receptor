import { ref } from 'vue';

// Define your translation object
const translations = {
  en: {
    hello: 'Hello',
    welcome: 'Welcome!',
    'nav.home': 'Home',
    'nav.create': 'New Recipe',
    'home.search.placeholder': 'Search recipes...',
    'home.filters': 'Categories',
    'filters.button': 'Categories',
    'filters.all_categories': 'All Categories',
    'create.recipe.title': 'Create a new recipe',
    'recipe.title': 'Title',
    'recipe.description': 'Description',
    'recipe.image': 'Recipe Image',
    'recipe.ingredients': 'Ingredients',
    'recipe.instructions': 'Instructions',
    'recipe.create.button': 'Create Recipe',
    'recipe.create.submitting': 'Creating...',
    'edit.recipe.title': 'Edit Recipe',
    'recipe.update.button': 'Update Recipe',
    'recipe.update.submitting': 'Updating...',
    'recipe.ingredient.hint': 'One ingredient per line.',
    'recipe.back_to_recipes': 'Back to recipes',
    'recipe.category': 'Category',
    'recipe.categories': 'Categories',
    'recipe.edit_recipe': 'Edit Recipe',
    'recipe.add_category': 'Add Category',
    'recipe.delete_recipe': 'Delete Recipe',
    'delete.recipe.title': 'Delete Recipe',
    'delete.recipe.deleting': 'Deleting...',
    'delete.recipe.confirm_text': 'Are you sure you want to delete the recipe',
    'delete.recipe.confirm': 'Confirm Deletion',
    'delete.recipe.cancel': 'Cancel',
    'recipe.publish_recipe': 'Publish Recipe',
    'error.image.required': 'Please select an image.',
    'error.create.failed': 'Failed to create recipe: invalid response from server.',
    'error.update.failed': 'Failed to update recipe: invalid response from server.',
    'error.unknown': 'An unknown error occurred.',
    'error.invalid.multipart': 'Request must be of type multipart/form-data.'
  },
  fi: {
    hello: 'Hei',
    welcome: 'Tervetuloa!',
    'nav.home': 'Koti',
    'nav.create': 'Luo resepti',
    'home.search.placeholder': 'Etsi reseptejä...',
    'home.filters': 'Kategoriat',
    'filters.button': 'Kategoriat',
    'filters.all_categories': 'Kaikki kategoriat',
    'create.recipe.title': 'Luo uusi resepti',
    'recipe.title': 'Otsikko',
    'recipe.description': 'Kuvaus',
    'recipe.image': 'Reseptikuva',
    'recipe.ingredients': 'Ainesosat',
    'recipe.instructions': 'Ohjeet',
    'recipe.create.button': 'Luo resepti',
    'recipe.create.submitting': 'Luodaan...',
    'edit.recipe.title': 'Muokkaa reseptiä',
    'recipe.update.button': 'Päivitä resepti',
    'recipe.update.submitting': 'Päivitetään...',
    'recipe.ingredient.hint': 'Yksi ainesosa per rivi.',
    'recipe.back_to_recipes': 'Takaisin resepteihin',
    'recipe.category': 'Kategoria',
    'recipe.categories': 'Kategoriat',
    'recipe.edit_recipe': 'Muokkaa reseptiä',
    'recipe.add_category': 'Lisää kategoria',
    'recipe.delete_recipe': 'Poista resepti',
    'delete.recipe.title': 'Poista resepti',
    'delete.recipe.deleting': 'Poistetaan...',
    'delete.recipe.confirm_text': 'Haluatko varmasti poistaa reseptin',
    'delete.recipe.confirm': 'Vahvista poisto',
    'delete.recipe.cancel': 'Peruuta',
    'recipe.publish_recipe': 'Julkaise resepti',
    'error.image.required': 'Valitse kuva.',
    'error.create.failed': 'Reseptin luominen epäonnistui: virheellinen vastaus palvelimelta.',
    'error.update.failed': 'Reseptin päivittäminen epäonnistui: virheellinen vastaus palvelimelta.',
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
