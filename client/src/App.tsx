import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages";

const App = () => (
    <>
        <NavBar />
        <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
    </>
);

export default App;
