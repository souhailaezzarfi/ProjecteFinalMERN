import { useEffect, useState } from 'react'
import type { NewRecepta, Recepta } from './types/Recepta'
import receptesService from './services/receptes'
import FormRecepta from './components/FormRecepta'
import LlistaRecepta from './components/LlistaRecepta'
import DetallRecepta from './components/DetallRecepta'
import Button from './components/Button'

const cleanRecepta: NewRecepta = {
  titol: '',
  racions: 1,
  esVegetaria: false,
  ingredients: [],
  passos: [],
  tempsCoccioMinuts: 0,
  dataPublicacio: '',
}

type Vista = 'llista' | 'formulari' | 'detall'

function App() {
  const [receptes, setReceptes] = useState<Recepta[]>([])
  const [editingRecepta, setEditingRecepta] = useState<Recepta | null>(null)
  const [newContent, setNewContent] = useState<NewRecepta>(cleanRecepta)
  const [error, setError] = useState<string | null>(null)
  const [vista, setVista] = useState<Vista>('llista')
  const [receptaSeleccionada, setReceptaSeleccionada] = useState<Recepta | null>(null)

  useEffect(() => {
    receptesService
      .getAll()
      .then(setReceptes)
      .catch(() => setError('Error carregant les receptes'))
  }, [])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (editingRecepta) {
      receptesService
        .update(editingRecepta._id, newContent)
        .then((updated) => {
          setReceptes((prev) =>
            prev.map((r) => (r._id === updated._id ? updated : r))
          )
          setEditingRecepta(null)
          setNewContent(cleanRecepta)
          setVista('llista')
        })
        .catch(() => setError('Error actualitzant la recepta'))
    } else {
      receptesService
        .create(newContent)
        .then((created) => {
          setReceptes((prev) => prev.concat(created))
          setNewContent(cleanRecepta)
          setVista('llista')
        })
        .catch(() => setError('Error creant la recepta'))
    }
  }

  const handleEdit = (recepta: Recepta) => {
    setError(null)
    setEditingRecepta(recepta)
    setNewContent({
      titol: recepta.titol,
      racions: recepta.racions,
      esVegetaria: recepta.esVegetaria,
      ingredients: recepta.ingredients,
      passos: recepta.passos,
      tempsCoccioMinuts: recepta.tempsCoccioMinuts,
      dataPublicacio: recepta.dataPublicacio
        ? recepta.dataPublicacio.slice(0, 10)
        : '',
    })
    setVista('formulari')
  }

  const handleDelete = (id: string) => {
    setError(null)
    receptesService
      .remove(id)
      .then(() => {
        setReceptes((prev) => prev.filter((r) => r._id !== id))
        if (receptaSeleccionada?._id === id) {
          setReceptaSeleccionada(null)
        }
        setVista('llista')
      })
      .catch(() => setError('Error eliminant la recepta'))
  }

  const handleVeure = (recepta: Recepta) => {
    setError(null)
    setReceptaSeleccionada(recepta)
    setVista('detall')
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-gray-800">
      <header className="bg-[#FF6B35] text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Receptes Delicioses
          </h1>
          <p className="text-white/90 mt-1">
            Descobreix, crea i comparteix plats plens de sabor
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {vista === 'llista' && (
          <>
            <Button
              onClick={() => {
                setError(null)
                setEditingRecepta(null)
                setNewContent(cleanRecepta)
                setVista('formulari')
              }}
              className="mb-6"
            >
              + Nova recepta
            </Button>

            <LlistaRecepta
              receptes={receptes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onVeure={handleVeure}
            />
          </>
        )}

        {vista === 'formulari' && (
          <>
            <Button
              onClick={() => {
                setError(null)
                setVista('llista')
              }}
              className="mb-4"
            >
              ← Tornar
            </Button>

            <FormRecepta
              newContent={newContent}
              editingRecepta={editingRecepta}
              onSubmit={handleSubmit}
              onTitolChange={(v) =>
                setNewContent((prev) => ({ ...prev, titol: v }))
              }
              onRacionsChange={(v) =>
                setNewContent((prev) => ({ ...prev, racions: v }))
              }
              onEsVegetariaChange={(v) =>
                setNewContent((prev) => ({ ...prev, esVegetaria: v }))
              }
              onIngredientsChange={(v) =>
                setNewContent((prev) => ({ ...prev, ingredients: v }))
              }
              onPassosChange={(v) =>
                setNewContent((prev) => ({ ...prev, passos: v }))
              }
              onTempsCoccioChange={(v) =>
                setNewContent((prev) => ({
                  ...prev,
                  tempsCoccioMinuts: v,
                }))
              }
              onDataPublicacioChange={(v) =>
                setNewContent((prev) => ({ ...prev, dataPublicacio: v }))
              }
            />
          </>
        )}

        {vista === 'detall' && (
          <>
            <Button
              onClick={() => {
                setError(null)
                setVista('llista')
              }}
              className="mb-4"
            >
              ← Tornar
            </Button>

            <DetallRecepta recepta={receptaSeleccionada} />
          </>
        )}
      </main>
    </div>
  )
}

export default App