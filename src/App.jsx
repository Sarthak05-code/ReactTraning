import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { Dashboard } from "./pages/DashBoard"

function App() {
    return(
        <>
        
        <Routes>
            <Route path="/ReactTraning/" element={<LoginPage/>}/>
            <Route path="/ReactTraning/dashboard" element={<Dashboard/>} />
        </Routes>
        
        </>
    )
}

export default App