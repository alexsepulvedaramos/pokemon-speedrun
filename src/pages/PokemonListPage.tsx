import { useEffect, useState } from 'react';
import type { PokemonCardInfo, Type } from '../interfaces/pokemon.interface';
import PokemonCard from '../components/PokemonCard';
import { PokemonListSkeleton } from '../components/PokemonListSkelleton';

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState<PokemonCardInfo[]>([]);
  const [currentUrl, setCurrentUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon',
  );
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(currentUrl);
        const data = await response.json();
        console.log(data);

        setPreviousUrl(data.previous);
        setNextUrl(data.next);

        const pokemonList: PokemonCardInfo[] = await Promise.all(
          data.results.map(async ({ url }: { url: string }) => {
            const pokemonResponse = await fetch(url);
            const pokemonData = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              imgSrc: pokemonData.sprites.front_default,
              types: pokemonData.types.map((t: Type) => t.type.name),
            };
          }),
        );

        setPokemonList(pokemonList);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentUrl, previousUrl, nextUrl]);

  if (loading) return <PokemonListSkeleton />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="alert alert-error shadow-lg max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pokemonList.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-16">
          <button
            className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            disabled={previousUrl === null}
            onClick={() => setCurrentUrl(previousUrl)}
          >
            ← Previous
          </button>
          <button
            className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            disabled={nextUrl === null}
            onClick={() => setCurrentUrl(nextUrl)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
