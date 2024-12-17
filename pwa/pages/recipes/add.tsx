import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/common/Header';
import Link from 'next/link';

const AddRecipePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
      const req = await fetch('https://localhost/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!req.ok) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      router.push('/recipes');

  };

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
          <div className="mb-4 flex justify-end">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
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

export default AddRecipePage;
