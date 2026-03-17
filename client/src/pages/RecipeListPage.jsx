import { useEffect, useState } from "react"
import { getAllRecipes } from "../services/recipes"
import RecipeCard from "../components/RecipeCard"
import ErrorBanner from "../components/ErrorBanner"

export default function RecipeListPage() {

    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadRecipes() {
            try {
                const data = await getAllRecipes()
                setRecipes(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadRecipes()
    }, [])

    if (loading) return <p>Carregant receptes...</p>

    return (
        <div>
            <h1>Receptes</h1>

            {error && <ErrorBanner message={error} />}

            {recipes.length === 0 ? (
                <p>No hi ha receptes encara</p>
            ) : (
                recipes.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))
            )}

        </div>
    )
}