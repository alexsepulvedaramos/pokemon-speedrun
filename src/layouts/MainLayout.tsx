import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Navbar />
        <main>
          <Outlet />
        </main>

        <footer className="mt-12 text-center text-sm opacity-50">
          <p>Powered by PokeAPI & DaisyUI v5</p>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
