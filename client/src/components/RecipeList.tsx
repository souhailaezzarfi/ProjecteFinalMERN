import type { Recepta } from '../types/Recepta'
import LlistaRecepta from './LlistaRecepta'

type RecipeListProps = {
    receptes: Recepta[]
    onVeure?: (recepta: Recepta) => void
    onEditar?: (recepta: Recepta) => void
    onEliminar?: (id: string) => void
}

export default function RecipeList({
    receptes,
    onVeure,
    onEditar,
    onEliminar,
}: RecipeListProps) {
    return (
        <LlistaRecepta
            receptes={receptes}
            onVeure={onVeure ?? (() => { })}
            onEdit={onEditar ?? (() => { })}
            onDelete={onEliminar ?? (() => { })}
        />
    )
}