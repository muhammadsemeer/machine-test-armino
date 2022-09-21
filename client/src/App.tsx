import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";
import NavBar from "./components/NavBar";
import Index from "./pages";
import Cart from "./pages/Cart";

const App = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        localStorage.setItem("userId", v4());
    }

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    );
};

export default App;
