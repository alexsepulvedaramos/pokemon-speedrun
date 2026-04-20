import { Search, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/pokemon/${search.trim().toLowerCase()}`);
    } else {
      navigate('/pokemons');
    }
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <Link
        to="/pokemons"
        className="text-4xl font-bold text-primary flex items-center gap-2"
      >
        <Zap className="w-10 h-10" />
        PKMN Speedrun
      </Link>

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
  );
}

export default Navbar;
