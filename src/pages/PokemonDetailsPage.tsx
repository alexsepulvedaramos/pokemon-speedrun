import { Activity } from 'lucide-react';
import type { Pokemon } from '../interfaces/pokemon.interface';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import PokemonCardSkeleton from '../components/PokemonCardSkelleton';

function PokemonDetailsPage() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getStatColor = (statName: string) => {
    if (statName === 'speed') return 'progress-success';
    if (statName === 'attack' || statName === 'special-attack')
      return 'progress-error';
    if (statName === 'defense' || statName === 'special-defense')
      return 'progress-info';
    return 'progress-warning';
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!pokemonId) return;

      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        );
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  return (
    <>
      {loading && <PokemonCardSkeleton />}

      {error && navigate('/pokemons')}

      {pokemon && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pokemon Image & Types */}
          <div className="card bg-base-100 shadow-xl overflow-hidden border-t-4 border-primary">
            <figure className="bg-linear-to-b from-primary/10 to-base-100 p-8 flex justify-center items-center min-h-75 relative">
              {!imageLoaded && (
                <div className="skeleton w-64 h-64 rounded-full absolute"></div>
              )}

              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full max-w-75 object-contain drop-shadow-2xl transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl capitalize">
                {pokemon.name}
                <div className="badge badge-outline text-sm">#{pokemon.id}</div>
              </h2>
              <div className="flex gap-2 mt-2">
                {pokemon.types.map((t) => (
                  <div
                    key={t.type.name}
                    className={`badge badge-lg badge-secondary capitalize`}
                  >
                    {t.type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Data */}
          <div className="flex flex-col gap-6">
            <div className="card bg-base-100 shadow-xl border-t-4 border-secondary h-full">
              <div className="card-body">
                <h2 className="card-title mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Base Stats
                </h2>
                <div className="space-y-4">
                  {pokemon.stats.map((s) => (
                    <div key={s.stat.name}>
                      <div className="flex justify-between mb-1 capitalize text-sm font-semibold">
                        <span>{s.stat.name.replace('-', ' ')}</span>
                        <span>{s.base_stat}</span>
                      </div>
                      <progress
                        className={`progress w-full h-3 ${getStatColor(s.stat.name)}`}
                        value={s.base_stat}
                        max="255"
                      ></progress>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Speedrun Insight */}
            {/* <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Speedrun Tip
                </h2>
                <p className="text-sm">
                  {pokemon.name}'s speed stat is{' '}
                  {
                    pokemon.stats.find((s) => s.stat.name === 'speed')
                      ?.base_stat
                  }
                  . Check if this outspeeds key boss Pokemon in your route!
                </p>
              </div>
            </div> */}
          </div>
          <div className="card bg-base-100 shadow-xl border-t-4 border-accent">
            <div className="card-body">
              <h2 className="card-title mb-4">Abilities</h2>
              <div className="space-y-2">
                {pokemon.abilities.map((a) => (
                  <div
                    key={a.ability?.name}
                    className="flex items-center gap-2"
                  >
                    <span className="capitalize font-semibold">
                      {a.ability?.name}
                    </span>
                    {a.is_hidden && (
                      <span className="badge badge-warning text-xs">
                        Hidden
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Physical Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-title">Height</div>
              <div className="stat-value text-primary text-2xl">
                {(pokemon.height / 10).toFixed(1)}m
              </div>
            </div>
            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-title">Weight</div>
              <div className="stat-value text-primary text-2xl">
                {(pokemon.weight / 10).toFixed(1)}kg
              </div>
            </div>
            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-title">Base Experience</div>
              <div className="stat-value text-primary text-2xl">
                {pokemon.base_experience}
              </div>
            </div>
          </div>

          {/* Moves */}
          <div className="card bg-base-100 shadow-xl border-t-4 border-info">
            <div className="card-body">
              <h2 className="card-title mb-4">
                Moves ({pokemon.moves.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.slice(0, 15).map((m) => (
                  <span
                    key={m.move.name}
                    className="badge badge-outline capitalize"
                  >
                    {m.move.name}
                  </span>
                ))}
                {pokemon.moves.length > 15 && (
                  <span className="badge badge-ghost">
                    +{pokemon.moves.length - 15} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Forms & Species */}
          <div className="card bg-base-100 shadow-xl border-t-4 border-success">
            <div className="card-body">
              <h2 className="card-title mb-4">Forms</h2>
              <div className="space-y-1">
                {pokemon.forms.map((f) => (
                  <p key={f.name} className="capitalize text-sm">
                    {f.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetailsPage;
