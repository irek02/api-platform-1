import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getStars } from '../misc/util';
import Header from '../components/common/Header';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchRecipes = async () => {
    const data = await new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.', averageRating: 4.5 },
          { id: 2, title: 'Chicken Curry', description: 'A spicy and flavorful dish.', averageRating: 4.0 },
          { id: 3, title: 'Beef Stroganoff', description: 'A rich and creamy beef dish.', averageRating: 4.2 },
        ]);
      }, 1000);
    });
    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id: number) => {
    setLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    fetchRecipes();
  };

  const editRecipe = (id: number) => {
    router.push(`/recipes/edit/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        {loading ? (
          <div className="text-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mx-auto my-8 animate-spin"></div>
            <p>Loading recipes...</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
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
                        &#9998; {/* Unicode character for pencil */}
                      </button>
                      <button
                        onClick={() => deleteRecipe(recipe.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &#128465; {/* Unicode character for trash can */}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{recipe.description}</p>
                  <p>{getStars(recipe.averageRating)} {recipe.averageRating}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer className="bg-green-600 text-white p-4 text-center">
        <p>&copy; 2023 Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RecipesPage;
