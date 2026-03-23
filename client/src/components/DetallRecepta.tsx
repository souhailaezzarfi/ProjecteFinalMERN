import { ClockIcon, UserIcon } from '@heroicons/react/16/solid'
import type { Recepta } from '../types/Recepta'

type DetallReceptaProps = {
    recepta: Recepta | null
}

export default function DetallRecepta({ recepta }: DetallReceptaProps) {
    if (!recepta) {
        return <p className="text-gray-600">No hi ha cap recepta seleccionada.</p>
    }

    return (
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-3xl mx-auto">
            {/* Títol */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {recepta.titol}
            </h2>

            {/* Info bàsica */}
            <div className="flex items-center gap-6 text-gray-700 mb-4">

                {/* Racions */}
                <div className="flex items-center gap-1">
                    <UserIcon className="w-5 h-5 text-[#FF6B35]" />
                    <span>{recepta.racions} racions</span>
                </div>

                {/* Temps */}
                <div className="flex items-center gap-1">
                    <ClockIcon className="w-5 h-5 text-[#06D6A0]" />
                    <span>{recepta.tempsCoccioMinuts} min</span>
                </div>

                {/* Vegetariana */}
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${recepta.esVegetaria
                        ? 'bg-[#06D6A0]/20 text-[#06D6A0]'
                        : 'bg-red-100 text-red-600'
                        }`}
                >
                    {recepta.esVegetaria ? 'Vegetariana' : 'No vegetariana'}
                </span>
            </div>

            {/* Data */}
            <p className="text-gray-500 text-sm mb-6">
                Publicada: {new Date(recepta.dataPublicacio).toLocaleDateString()}
            </p>

            {/* Ingredients */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                {recepta.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            {/* Passos */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Passos</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
                {recepta.passos.map((pas, index) => (
                    <li key={index}>{pas}</li>
                ))}
            </ol>
        </section>
    )
}