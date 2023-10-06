import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
//import mainLayout from './layout/mainLayout';
import { AuthContextProvider } from './context/AuthContext';
import { Protected } from './components/Protected';
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <AuthContextProvider>
 <Routes>
   <Route path="/home" element={<Protected> <Home/></Protected>} />
   <Route path="/login" element={<Login />}/>
   <Route path="/signup" element={<SignUp />}/>
   <Route path="/" element={<Home/>}/>
 </Routes>
 </AuthContextProvider>
 </Router>

  )
}

export default App