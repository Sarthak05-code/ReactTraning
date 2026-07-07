import profileImage from "./assets/ReoMikage.png";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-80 bg-white rounded-xl shadow-xl p-6">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-2 border-gray-500 shadow-lg"
                />

                <h2 className="text-2xl font-bold text-center mt-4">
                    Sarthak
                </h2>

                <p className="text-gray-600 text-center">
                    FrontEnd-Learner
                </p>

                <div className="mt-6 space-y-2">
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        sarthak@gmail.com
                    </p>

                    <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        123456789
                    </p>

                    <p>
                        <span className="font-semibold">Address:</span>{" "}
                        Ekantakuna
                    </p>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Contact
                </button>
            </div>
        </div>
    );
}

export default App;