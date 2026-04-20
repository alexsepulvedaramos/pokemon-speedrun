import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import MainLayout from './layouts/MainLayout';
import PokemonListPage from './pages/PokemonListPage';
import PokemonDetailsPage from './pages/PokemonDetailsPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index path="pokemons" element={<PokemonListPage />} />
          <Route path="pokemon/:pokemonId" element={<PokemonDetailsPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/pokemons" />} />
        <Route path="*" element={<Navigate to="/pokemons" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
