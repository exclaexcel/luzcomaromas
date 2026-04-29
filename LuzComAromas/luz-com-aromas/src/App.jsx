import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ManualButton from './components/ManualButton'
import CosmicBackground from './components/CosmicBackground'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Colecoes from './pages/Colecoes'
import Loja from './pages/Loja'
import Quiz from './pages/Quiz'
import Ritual from './pages/Ritual'
import Produto from './pages/Produto'
import Manual from './pages/Manual'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <CosmicBackground />
          <div style={{ width: '100%', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
            <Navbar />
            <main>
              <Routes>
                <Route path="/"              element={<Home />} />
                <Route path="/sobre"         element={<Sobre />} />
                <Route path="/colecoes"      element={<Colecoes />} />
                <Route path="/loja"          element={<Loja />} />
                <Route path="/quiz"          element={<Quiz />} />
                <Route path="/ritual"        element={<Ritual />} />
                <Route path="/produto/:id"   element={<Produto />} />
                <Route path="/manual"        element={<Manual />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <ManualButton />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}
