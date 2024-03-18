/**
 *  This function finds the default image of the dog
 * @param {*} dog
 * @returns - the default image of the dog
 */
export const findDefaultImage = (dog) => {
  const defaultImage =
    dog.dog_images_attributes.find((image) => image.is_default) ||
    dog.dog_images_attributes[0];
  return defaultImage ? defaultImage.url : "";
};
