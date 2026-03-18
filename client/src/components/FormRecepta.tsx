import type { ReceptaFormProps } from '../types/Recepta'
import Button from './Button'

export default function FormRecepta({
  newContent,
  editingNote,
  onTitolChange,
  onRacionsChange,
  onEsVegetariaChange,
  onIngredientsChange,
  onPassosChange,
  onTempsCoccioChange,
  onDataPublicacioChange,
  onSubmit,
}: ReceptaFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <h2>{editingNote ? 'Editar recepta' : 'Crear recepta'}</h2>

      <div>
        <label>Títol</label>
        <input
          type="text"
          value={newContent.titol}
          onChange={(e) => onTitolChange(e.target.value)}
        />
      </div>

      <div>
        <label>Racions</label>
        <input
          type="number"
          value={newContent.racions}
          onChange={(e) => onRacionsChange(Number(e.target.value))}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={newContent.esVegetaria}
            onChange={(e) => onEsVegetariaChange(e.target.checked)}
          />
          És vegetariana
        </label>
      </div>

      <div>
        <label>Ingredients (separats per comes)</label>
        <input
          type="text"
          value={newContent.ingredients.join(', ')}
          onChange={(e) =>
            onIngredientsChange(
              e.target.value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
        />
      </div>

      <div>
        <label>Passos (separats per comes)</label>
        <input
          type="text"
          value={newContent.passos.join(', ')}
          onChange={(e) =>
            onPassosChange(
              e.target.value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
        />
      </div>

      <div>
        <label>Temps de cocció (minuts)</label>
        <input
          type="number"
          value={newContent.tempsCoccioMinuts}
          onChange={(e) => onTempsCoccioChange(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Data publicació</label>
        <input
          type="date"
          value={newContent.dataPublicacio}
          onChange={(e) => onDataPublicacioChange(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '16px' }}>
        <Button type="submit">
          {editingNote ? 'Actualitzar recepta' : 'Guardar recepta'}
        </Button>
      </div>
    </form>
  )
}