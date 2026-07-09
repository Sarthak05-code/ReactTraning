import { useState } from "react";

export function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data From DummyJson", data);
        if (data.accessToken) {
          alert(`Welcome BACK , ${data.firstName}!`);
        } else {
          alert(`Login Failed: ` + data.message);
        }
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-80 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
          DummyJSON Login
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
            placeholder="Enter name...."
          ></input>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-blue-500"
            placeholder="Enter your password...."
          ></input>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 py-2 font-semibold text-white hover:bg-blue-700 "
        >
          Sign-In
        </button>
      </form>
    </div>
  );
}

export default App;