import type { ReceptaFormProps } from '../types/Recepta'
import Button from './Button'

export default function FormRecepta({
  newContent,
  editingRecepta,
  onTitolChange,
  onRacionsChange,
  onEsVegetariaChange,
  onIngredientsChange,
  onPassosChange,
  onTempsCoccioChange,
  onSubmit,
}: ReceptaFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingRecepta ? 'Editar recepta' : 'Crear recepta'}
      </h2>

      {/* Títol */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Títol</label>
        <input
          type="text"
          value={newContent.titol}
          onChange={(e) => onTitolChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />
      </div>

      {/* Racions */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Racions</label>
        <input
          type="number"
          value={newContent.racions}
          onChange={(e) => onRacionsChange(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />
      </div>

      {/* Vegetariana */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={newContent.esVegetaria}
          onChange={(e) => onEsVegetariaChange(e.target.checked)}
          className="w-4 h-4 accent-[#06D6A0]"
        />
        <label className="text-gray-700">És vegetariana</label>
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">
          Ingredients (separats per comes)
        </label>
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
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />
      </div>

      {/* Passos */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">
          Passos (separats per comes)
        </label>
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
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />
      </div>

      {/* Temps */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-1">
          Temps de cocció (minuts)
        </label>
        <input
          type="number"
          value={newContent.tempsCoccioMinuts}
          onChange={(e) => onTempsCoccioChange(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:outline-none"
        />
      </div>

      {/* Botó */}
      <div className="mt-6">
        <Button
          type="submit"
          className="bg-[#FF6B35] hover:bg-[#e85f2f] text-white px-6 py-2 rounded-lg"
        >
          {editingRecepta ? 'Actualitzar recepta' : 'Guardar recepta'}
        </Button>
      </div>
    </form>
  )
}