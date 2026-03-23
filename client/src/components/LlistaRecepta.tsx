import { ClockIcon, UserIcon } from '@heroicons/react/20/solid'
import type { Recepta } from '../types/Recepta'

type LlistaReceptaProps = {
    receptes: Recepta[]
    onEdit: (recepta: Recepta) => void
    onDelete: (id: string) => void
    onVeure: (recepta: Recepta) => void
}

const LlistaRecepta = ({ receptes, onEdit, onDelete, onVeure }: LlistaReceptaProps) => {
    return (
        <div className="py-4">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                Les teves receptes
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {receptes.map((recepta) => (
                    <li
                        key={recepta._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
                    >
                        {/* Títol */}
                        <h3
                            className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-[#FF6B35] transition"
                            onClick={() => onVeure(recepta)}
                        >
                            {recepta.titol}
                        </h3>

                        {/* Info */}
                        {/* Racions */}
                        <div className="flex items-center gap-1">
                            <UserIcon className="w-5 h-5 text-[#FF6B35]" />
                            <span>{recepta.racions} racions</span>
                        </div>

                        <p
                            className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${recepta.esVegetaria
                                ? 'bg-[#06D6A0]/20 text-[#06D6A0]'
                                : 'bg-red-100 text-red-600'
                                }`}
                        >
                            {recepta.esVegetaria ? 'Vegetariana' : 'No vegetariana'}
                        </p>

                        {/* Temps */}
                        <div className="flex items-center gap-1">
                            <ClockIcon className="w-5 h-5 text-[#06D6A0]" />
                            <span>{recepta.tempsCoccioMinuts} min</span>
                        </div>

                        {/* Botons */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => onEdit(recepta)}
                                className="px-4 py-2 rounded-lg bg-[#FFD166] text-gray-900 hover:bg-[#e6bc5c] transition"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => onDelete(recepta._id)}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LlistaRecepta