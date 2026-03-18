import type { Recepta } from '../types/Recepta'

type DetallReceptaProps = {
    recepta: Recepta | null
}

export default function DetallRecepta({ recepta }: DetallReceptaProps) {
    if (!recepta) {
        return <p>No hi ha cap recepta seleccionada.</p>
    }

    return (
        <section
            style={{
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#fff',
            }}
        >
            <h2>{recepta.titol}</h2>

            <p>
                <strong>Racions:</strong> {recepta.racions}
            </p>

            <p>
                <strong>Vegetariana:</strong> {recepta.esVegetaria ? 'Sí' : 'No'}
            </p>

            <p>
                <strong>Temps de cocció:</strong> {recepta.tempsCoccioMinuts} min
            </p>

            <p>
                <strong>Data publicació:</strong> {recepta.dataPublicacio}
            </p>

            <h3>Ingredients</h3>
            <ul>
                {recepta.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h3>Passos</h3>
            <ol>
                {recepta.passos.map((pas, index) => (
                    <li key={index}>{pas}</li>
                ))}
            </ol>
        </section>
    )
}