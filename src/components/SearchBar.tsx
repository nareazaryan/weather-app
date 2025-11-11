interface Props {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = (e.currentTarget.elements.namedItem("city") as HTMLInputElement).value;
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-8">
      <input
        name="city"
        placeholder="Enter city name..."
        className="bg-white/70 border border-white/40 text-gray-800 rounded-full px-5 py-3 w-72 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-inner placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:opacity-90 transition"
      >
        Search
      </button>
    </form>
  );
}
