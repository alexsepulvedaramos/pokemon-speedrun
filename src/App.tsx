import { useState, useEffect } from 'react'
import { Search, Zap, Activity } from 'lucide-react'

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

function App() {
  const [search, setSearch] = useState('')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchPokemon = async (query: string) => {
    if (!query) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      if (!response.ok) throw new Error('Pokemon not found')
      const data = await response.json()
      setPokemon(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchPokemon(search)
  }

  // Pre-load Pikachu for the initial view
  useEffect(() => {
    fetchPokemon('pikachu')
  }, [])

  const getStatColor = (statName: string) => {
    if (statName === 'speed') return 'progress-success'
    if (statName === 'attack' || statName === 'special-attack') return 'progress-error'
    if (statName === 'defense' || statName === 'special-defense') return 'progress-info'
    return 'progress-warning'
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
            <Zap className="w-10 h-10" />
            PKMN Speedrun
          </h1>
          
          <form onSubmit={handleSearch} className="join w-full md:w-auto">
            <input
              className="input input-bordered join-item w-full md:w-64"
              placeholder="Search Pokemon (e.g. Mewtwo)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary join-item" type="submit">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </header>

        {/* Content */}
        <main>
          {loading && (
            <div className="flex justify-center p-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}

          {error && (
            <div className="alert alert-error shadow-lg mb-8">
              <span>{error}</span>
            </div>
          )}

          {pokemon && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pokemon Image & Types */}
              <div className="card bg-base-100 shadow-xl overflow-hidden border-t-4 border-primary">
                <figure className="bg-gradient-to-b from-primary/10 to-base-100 p-8">
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="w-full max-w-[300px] drop-shadow-2xl"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-3xl capitalize">
                    {pokemon.name}
                    <div className="badge badge-outline text-sm">#{pokemon.id}</div>
                  </h2>
                  <div className="flex gap-2 mt-2">
                    {pokemon.types.map((t) => (
                      <div key={t.type.name} className={`badge badge-lg badge-secondary capitalize`}>
                        {t.type.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats & Data */}
              <div className="flex flex-col gap-6">
                <div className="card bg-base-100 shadow-xl border-t-4 border-secondary">
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
                <div className="card bg-primary text-primary-content shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                      <Zap className="w-6 h-6" />
                      Speedrun Tip
                    </h2>
                    <p className="text-sm">
                      {pokemon.name}'s speed stat is {pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat}. 
                      Check if this outspeeds key boss Pokemon in your route!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-sm opacity-50">
          <p>Powered by PokeAPI & DaisyUI v5</p>
        </footer>
      </div>
    </div>
  )
}

export default App
