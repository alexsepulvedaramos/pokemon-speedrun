import { Link } from 'react-router';

export default function PokemonCard({ pokemon }) {
  const calculateTypeBadgeClass = (type: string) => {
    const typeColors: Record<string, string> = {
      grass: 'bg-green-500 text-white',
      fire: 'bg-red-500 text-white',
      water: 'bg-blue-500 text-white',
      bug: 'bg-lime-500 text-white',
      normal: 'bg-gray-500 text-white',
      poison: 'bg-purple-500 text-white',
      electric: 'bg-yellow-400 text-black',
      ground: 'bg-yellow-600 text-white',
      fairy: 'bg-pink-500 text-white',
      fighting: 'bg-orange-700 text-white',
      psychic: 'bg-pink-600 text-white',
      rock: 'bg-gray-600 text-white',
      ghost: 'bg-purple-700 text-white',
      ice: 'bg-cyan-400 text-black',
      dragon: 'bg-indigo-600 text-white',
      dark: 'bg-gray-800 text-white',
      steel: 'bg-slate-400 text-white',
      flying: 'bg-sky-400 text-white',
    };

    return `badge badge-lg font-semibold ${typeColors[type] || 'bg-gray-500 text-white'}`;
  };

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      key={pokemon.id}
      className="card bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700"
    >
      <div className="absolute top-3 right-3 badge badge-lg bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold border-0">
        #{pokemon.id}
      </div>
      <figure className="px-4 pt-4 bg-gray-700">
        <img
          src={pokemon.imgSrc}
          alt={pokemon.name}
          className="h-48 object-contain drop-shadow-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize text-xl text-gray-100">
          {pokemon.name}
        </h2>
        <div className="flex gap-2 flex-wrap pt-2">
          {pokemon.types.map((type) => (
            <div key={type} className={calculateTypeBadgeClass(type)}>
              {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
