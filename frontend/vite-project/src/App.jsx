import Navbar from "./components/Navbar"
import "./App.css"
import { UserProvider } from "./context/UserContext"
import AppRoutes from "./routes/AppRoutes"

function App() {


  return (
    <div className="App">
       <UserProvider>
       <Navbar/>
       <AppRoutes />

       </UserProvider>

    </div>
  )
}

export default App
