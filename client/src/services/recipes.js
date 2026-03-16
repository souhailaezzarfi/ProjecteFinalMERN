const BASE = import.meta.env.VITE_API_BASE_URL

export async function getAllRecipes() {
    const res = await fetch(`${BASE}/recipes`)
    if (!res.ok) throw new Error('Error carregant receptes')
    return res.json()
}

export async function getRecipeById(id) {
    const res = await fetch(`${BASE}/recipes/${id}`)
    if (!res.ok) throw new Error('Recepta no trobada')
    return res.json()
}

export async function createRecipe(recipe) {
    const res = await fetch(`${BASE}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    })
    if (!res.ok) throw new Error('Error creant recepta')
    return res.json()
}

export async function updateRecipe(id, recipe) {
    const res = await fetch(`${BASE}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    })
    if (!res.ok) throw new Error('Error actualitzant recepta')
    return res.json()
}

export async function deleteRecipe(id) {
    const res = await fetch(`${BASE}/recipes/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error esborrant recepta')
    return true
}