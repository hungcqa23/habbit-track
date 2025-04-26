/**
 * Validates profile data during the setup process
 */

/**
 * Validates the user's name
 * @param name The name to validate
 * @returns An object with isValid and message properties
 */
export function validateName(name: string): { isValid: boolean; message?: string } {
  if (!name || name.trim() === '') {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: 'Name must be less than 50 characters' };
  }
  
  return { isValid: true };
}

/**
 * Validates the user's bio
 * @param bio The bio to validate
 * @returns An object with isValid and message properties
 */
export function validateBio(bio: string): { isValid: boolean; message?: string } {
  if (bio && bio.length > 200) {
    return { isValid: false, message: 'Bio must be less than 200 characters' };
  }
  
  return { isValid: true };
}

/**
 * Validates the entire profile data object
 * @param profileData The profile data to validate
 * @returns An object with isValid and errors properties
 */
export function validateProfileData(profileData: any): { 
  isValid: boolean; 
  errors: Record<string, string> 
} {
  const errors: Record<string, string> = {};
  
  // Validate name
  const nameValidation = validateName(profileData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message || 'Invalid name';
  }
  
  // Validate bio
  const bioValidation = validateBio(profileData.bio);
  if (!bioValidation.isValid) {
    errors.bio = bioValidation.message || 'Invalid bio';
  }
  
  // Check if avatar is selected
  if (!profileData.avatar || Object.keys(profileData.avatar).length === 0) {
    errors.avatar = 'Please select or create an avatar';
  }
  
  // Check if at least one category is selected
  if (!profileData.preferredCategories || profileData.preferredCategories.length === 0) {
    errors.preferredCategories = 'Please select at least one category';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
