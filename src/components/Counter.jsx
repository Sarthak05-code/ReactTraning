import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
      <span className="text-xl font-bold"> Count : {count}</span>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-cyan-500 rounded text-white font-semibold hover:bg-cyan-600 transition"
      >
        +1
      </button>
    </div>
  );
}
