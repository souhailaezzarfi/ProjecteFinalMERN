import type { Recepta } from '../types/Recepta'
import DetallRecepta from './DetallRecepta'

type RecipeDetailProps = {
    recepta: Recepta | null
}

export default function RecipeDetail(props: RecipeDetailProps) {
    return <DetallRecepta {...props} />
}