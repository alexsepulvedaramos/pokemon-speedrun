export function PokemonListSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-700 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-700 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-16">
          <div className="btn btn-primary btn-lg shadow-md bg-gray-700 animate-pulse"></div>
          <div className="btn btn-primary btn-lg shadow-md bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
