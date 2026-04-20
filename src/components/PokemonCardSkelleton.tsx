export default function PokemonCardSkeleton() {
  return (
    <div className="card bg-gray-800 shadow-md border border-gray-700">
      <div className="absolute top-3 right-3 badge badge-lg bg-gray-700 text-white font-bold border-0">
        <div className="h-5 w-8 bg-gray-600 rounded animate-pulse" />
      </div>
      <figure className="px-4 pt-4 bg-gray-700">
        <div className="h-48 w-48 bg-gray-600 rounded animate-pulse" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl text-gray-100">
          <div className="h-6 w-32 bg-gray-600 rounded animate-pulse" />
        </h2>
        <div className="flex gap-2 flex-wrap pt-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-600 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
