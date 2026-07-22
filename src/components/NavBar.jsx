import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          My Website
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li className="cursor-pointer hover:text-gray-200">Home</li>
          <li className="cursor-pointer hover:text-gray-200">About</li>
          <li className="cursor-pointer hover:text-gray-200">Services</li>
          <li className="cursor-pointer hover:text-gray-200">Contact</li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden bg-white text-blue-600 px-4 py-2 rounded"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-3">
          <li className="border-b pb-2">Home</li>
          <li className="border-b pb-2">About</li>
          <li className="border-b pb-2">Services</li>
          <li className="border-b pb-2">Contact</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;