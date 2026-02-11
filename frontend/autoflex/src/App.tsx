import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Materials from './pages/Materials'
import Products from './pages/Products'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='/materials' element={<Materials />} />
        <Route path='/products' element={<Products />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
