function Personal({ image, name, role, email, phone, address }) {
    return (
        <div className="w-80 bg-white rounded-xl shadow-xl p-6">
            <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto border-2 border-gray-500 shadow-lg"
            />

            <h2 className="text-2xl font-bold text-center mt-4">
                {name}
            </h2>

            <p className="text-gray-600 text-center">
                {role}
            </p>

            <div className="mt-6 space-y-2">
                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {email}
                </p>

                <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {phone}
                </p>

                <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {address}
                </p>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Contact
            </button>
        </div>
    );
}

export default Personal;

