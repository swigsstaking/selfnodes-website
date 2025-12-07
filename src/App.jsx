import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Monitoring from './pages/Monitoring';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Migrate from './pages/Migrate';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Calculator from './pages/Calculator';
import { AuthProvider } from './context/AuthContext';
import Favicon from './components/Favicon';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Favicon />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/migrate" element={<Migrate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/success" element={<Success />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
