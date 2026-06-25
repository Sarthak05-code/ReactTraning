function App() {
  const handleClick = () => {
    alert("Hello , Sarthak");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      {/* create a button here */}
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 active:scale-95 transition-all"
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
