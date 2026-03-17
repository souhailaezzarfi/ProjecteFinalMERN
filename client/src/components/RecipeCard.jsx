import { Routes, Route, Navigate } from 'react-router-dom'
import RecipeListPage from './pages/RecipeListPage.jsx'
import RecipeDetailPage from './pages/RecipeDetailPage.jsx'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<RecipeListPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />

            {/* Redirecció si entrem a qualsevol altra ruta */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}