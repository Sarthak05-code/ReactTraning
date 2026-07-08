function Navbar({ title }) {
  return (
    <nav className="flex justify-between p-5 bg-black text-white">
      <h1>{title}</h1>

      <div className="flex gap-5">
        <a href="#">Home</a>

        <a href="#">About</a>

        <a href="#">Projects</a>

        <a href="#">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
