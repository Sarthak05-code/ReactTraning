import { useState } from "react"

function App() {
  const [counter , Setcounter] = useState(0)
  
  
  return (
    <>
      <div>
        <h2 className="w-full p-2 bg-green-800 text-center text-white font-bold mb-2">Counter: {counter}</h2>
        <button className="w-40 bg-blue-400 p-2 rounded-lg ml-1 shadow-lg" onClick={() => Setcounter(counter + 1)} > +1</button>
        <button className="w-40 bg-red-400 p-2 rounded-lg shadow-lg" onClick={() => Setcounter(counter - 1)}> -1</button>
      </div>

    
    </>
  )


}

export default App