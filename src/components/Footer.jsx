import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm ">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}
