import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../components/common/Header';
import Link from 'next/link';

const EditRecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate fetching the recipe data
      const fetchRecipe = async () => {
        const data = await new Promise<{ title: string; description: string }>((resolve) => {
          setTimeout(() => {
            resolve({
              title: 'Sample Recipe Title',
              description: 'Sample Recipe Description',
            });
          }, 1000);
        });
        setTitle(data.title);
        setDescription(data.description);
        setLoading(false);
      };

      fetchRecipe();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate an API call to edit the recipe
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    router.push('/recipes');
  };

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <Link href="/recipes" className="text-blue-500 underline mb-4 inline-block">
          ← Back to Recipes
        </Link>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </main>
      <footer className="bg-green-600 text-white p-4 text-center">
        <p>&copy; 2023 Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EditRecipePage;
