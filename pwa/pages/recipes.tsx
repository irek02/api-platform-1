import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getStars } from '../misc/util';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter();

  const fetchRecipes = async () => {
    const req = await fetch('https://localhost/recipes');
    const data = await req.json();
    setRecipes(data.member);
  };

  const deleteRecipe = async (id: number) => {
    await fetch(`https://localhost/recipes/${id}`, {
      method: 'DELETE',
    });
    fetchRecipes();
  };

  const editRecipe = (id: number) => {
    router.push(`/recipes/edit/${id}`);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex justify-end mb-4">
          <Link href="/recipes/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Recipe
          </Link>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4 ">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">
                  <Link href={`/recipes/${recipe.id}`}>
                    {recipe.title}
                  </Link>
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editRecipe(recipe.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <p>{getStars(recipe.averageRating)} {recipe.averageRating}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;
