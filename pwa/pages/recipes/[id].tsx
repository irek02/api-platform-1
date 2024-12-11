import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getStars } from '../../misc/util';

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate fetching the recipe data
      const fetchRecipe = async () => {
        const recipeData = await new Promise<any>((resolve) => {
          setTimeout(() => {
            resolve({
              id,
              title: 'Sample Recipe Title',
              description: 'Sample Recipe Description',
              averageRating: 4.5,
            });
          }, 1000);
        });
        setRecipe(recipeData);
      };

      // Simulate fetching the reviews data
      const fetchReviews = async () => {
        const reviewsData = await new Promise<any[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { author: 'John Doe', description: 'Great recipe!', rating: 5 },
              { author: 'Jane Smith', description: 'Pretty good.', rating: 4 },
            ]);
          }, 1000);
        });
        setReviews(reviewsData);
      };

      const fetchData = async () => {
        await fetchRecipe();
        await fetchReviews();
        setLoading(false);
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mx-auto my-8 animate-spin"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">{recipe.title}</h1>
      </header>
      <main className="container mx-auto p-4">
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <p>{getStars(recipe.averageRating)} {recipe.averageRating}</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
        <ul>
          {reviews.map((review: any, index: any) => (
            <li key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <p className="font-bold">{review.author}</p>
              <p>{review.description}</p>
              <p>{getStars(review.rating)} {review.rating}</p>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-green-600 text-white p-4 text-center">
        <p>&copy; 2023 Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RecipePage;
