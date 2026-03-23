import type { Recepta } from '../types/Recepta'
import CardRecepta from './CardRecepta'

type RecipeCardProps = {
    recepta: Recepta
    onVeure?: (recepta: Recepta) => void
    onEditar?: (recepta: Recepta) => void
    onEliminar?: (id: string) => void
}

export default function RecipeCard(props: RecipeCardProps) {
    return <CardRecepta {...props} />
}