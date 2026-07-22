import { useState } from "react";

export const Form = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!data.name || !data.username || !data.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      // credentials: "include", // Include cookies (e.g., accessToken) in the request
    })

    const result = await res.json()
    if(result.accessToken){

      sessionStorage.setItem("accessToken",result.accessToken)
      setMessage("Login successfully")
    }else{
      setMessage(result.message)
    }
    console.log(result)
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">Username</label>

            <input
              type="text"
              placeholder="Enter your email"
              value={data.username}
              onChange={(e) =>
                setData({
                  ...data,
                  username: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};