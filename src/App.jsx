import { Route, Routes } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import DashBoard from "./components/DashBoard"

function App() {
    return(
        <>
        
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<DashBoard/>}></Route>
        </Routes>
        
        </>
    )
}

export default App