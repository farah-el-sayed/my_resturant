import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Meals App
        </Link>
      </div>
    </header>
  );
}
