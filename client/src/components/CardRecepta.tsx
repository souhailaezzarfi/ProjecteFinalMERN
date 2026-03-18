import type { Recepta } from '../types/Recepta'
import Button from './Button'

type CardReceptaProps = {
    recepta: Recepta
    onVeure?: (recepta: Recepta) => void
    onEditar?: (recepta: Recepta) => void
    onEliminar?: (id: string) => void
}

export default function CardRecepta({
    recepta,
    onVeure,
    onEditar,
    onEliminar,
}: CardReceptaProps) {
    return (
        <article
            style={{
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                backgroundColor: '#fff',
            }}
        >
            <h3 style={{ marginTop: 0 }}>{recepta.titol}</h3>

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

            <div style={{ marginTop: '14px' }}>
                {onVeure && (
                    <Button type="button" variant="secondary" onClick={() => onVeure(recepta)}>
                        Veure detall
                    </Button>
                )}

                {onEditar && (
                    <Button type="button" onClick={() => onEditar(recepta)}>
                        Editar
                    </Button>
                )}

                {onEliminar && (
                    <Button type="button" variant="danger" onClick={() => onEliminar(recepta._id)}>
                        Eliminar
                    </Button>
                )}
            </div>
        </article>
    )
}