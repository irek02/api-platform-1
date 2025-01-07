import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getStars } from '../../misc/util';
import Header from '../../components/common/Header';
import Link from 'next/link';
import Footer from '../../components/common/Footer';

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newReview, setNewReview] = useState({ author: '', rating: '', body: '' });
  const [recipe, setRecipe] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submitReview(id, newReview);
    await fetchReviews();
    await fetchRecipe();
    setNewReview({ author: '', rating: '', body: '' });
  };

  const fetchRecipe = async () => {
    const req = await fetch(`https://localhost/recipes/${id}`);
    const recipeData = await req.json();
    setRecipe(recipeData);
  };

  const fetchReviews = async () => {
    const req = await fetch(`https://localhost/recipes/${id}/reviews`);
    const reviewsData = await req.json();
    setReviews(reviewsData);
  };

  const submitReview = async (recipeId: string | string[] | undefined, review: any) => {
    const response = await fetch(`https://localhost/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify({
        recipe: `recipes/${recipeId}`,
        ...review,
        rating: parseInt(review.rating),
        publicationDate: new Date().toISOString(),
      }),
    });

    return await response.json();
  };

  useEffect(() => {
    if (id) {

      const fetchData = async () => {
        await fetchRecipe();
        await fetchReviews();
      };

      fetchData();
    }
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <Link href="/recipes" className="text-blue-500 underline mb-4 inline-block">
          ← Back to Recipes
        </Link>
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <p className="m-4">{getStars(recipe.averageRating)} {recipe.averageRating}</p>
        <p className="text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
          {recipe.description}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
        <ul>
          {reviews.map((review: any, index: any) => (
            <li key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <p className="font-bold">{review.author}</p>
              <p>{review.body}</p>
              <p>{getStars(review.rating)} {review.rating}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="mt-8">
          <h3 className="text-xl font-bold mb-4">Submit a Review</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={newReview.author}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="body"
              value={newReview.body}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RecipePage;
