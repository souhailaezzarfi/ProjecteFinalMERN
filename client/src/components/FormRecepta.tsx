import { useEffect, useState } from 'react'
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
  const [ingredientsText, setIngredientsText] = useState('')
  const [passosText, setPassosText] = useState('')

  useEffect(() => {
    setIngredientsText(newContent.ingredients.join(', '))
    setPassosText(newContent.passos.join(', '))
  }, [editingRecepta])

  useEffect(() => {
    const formulariBuit =
      newContent.titol === '' &&
      newContent.racions === 1 &&
      newContent.esVegetaria === false &&
      newContent.ingredients.length === 0 &&
      newContent.passos.length === 0 &&
      newContent.tempsCoccioMinuts === 0 &&
      newContent.dataPublicacio === ''

    if (formulariBuit) {
      setIngredientsText('')
      setPassosText('')
    }
  }, [newContent])

  const handleIngredientsChange = (value: string) => {
    setIngredientsText(value)
    onIngredientsChange(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    )
  }

  const handlePassosChange = (value: string) => {
    setPassosText(value)
    onPassosChange(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {editingRecepta ? 'Editar recepta' : 'Crear recepta'}
      </h2>

      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">Títol</label>
        <input
          type="text"
          value={newContent.titol}
          onChange={(e) => onTitolChange(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Ex: Arròs amb llet"
        />
      </div>

      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">Racions</label>
        <input
          type="number"
          min="1"
          value={newContent.racions}
          onChange={(e) => onRacionsChange(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center gap-2 text-slate-700 font-medium">
          <input
            type="checkbox"
            checked={newContent.esVegetaria}
            onChange={(e) => onEsVegetariaChange(e.target.checked)}
            className="h-4 w-4"
          />
          És vegetariana
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">
          Ingredients (separats per comes)
        </label>
        <input
          type="text"
          value={ingredientsText}
          onChange={(e) => handleIngredientsChange(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Ex: arròs, llet, sucre, canyella"
        />
      </div>

      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">
          Passos (separats per comes)
        </label>
        <input
          type="text"
          value={passosText}
          onChange={(e) => handlePassosChange(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Ex: bull la llet, afegeix l'arròs, remena, serveix"
        />
      </div>

      <div className="mb-4">
        <label className="block text-slate-700 font-medium mb-2">
          Temps de cocció (minuts)
        </label>
        <input
          type="number"
          min="0"
          value={newContent.tempsCoccioMinuts}
          onChange={(e) => onTempsCoccioChange(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>


      <div className="flex flex-wrap gap-3">
        <Button type="submit">
          {editingRecepta ? 'Actualitzar recepta' : 'Guardar recepta'}
        </Button>
      </div>
    </form>
  )
}