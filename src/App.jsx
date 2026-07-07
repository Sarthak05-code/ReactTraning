import profileImage from "./assets/ReoMikage.png";
import Personal from "./components/Personal";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <Personal
                image={profileImage}
                name="Sarthak"
                role="Zig / Rust Learner"
                email="sarthak@gmail.com"
                phone="123456789"
                address="Ekantakuna"
            />
        </div>
    );
}

export default App;