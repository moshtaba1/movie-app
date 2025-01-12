import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Toaster } from "react-hot-toast";
import { HeaderProvider } from "./Context/HeaderContext";
import UserProvider from "./Context/UserContext"; // اضافه کردن UserProvider

function App() {
    return (
        <UserProvider>
            <HeaderProvider>
                <div className="App">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                    <Toaster />
                </div>
            </HeaderProvider>
        </UserProvider>
    );
}

export default App;