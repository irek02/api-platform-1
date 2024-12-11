export const getStars = (rating: number) => {
  const roundedRating = Math.floor(rating);
  const filledStars = '★'.repeat(roundedRating);
  const emptyStars = '☆'.repeat(5 - roundedRating);
  return filledStars + emptyStars;
};
