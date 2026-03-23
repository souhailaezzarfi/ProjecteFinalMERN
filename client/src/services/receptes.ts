import axios from 'axios'
import type { NewRecepta, Recepta } from '../types/Recepta'

const baseUrl = 'http://localhost:3005/api/receptes'

const getAll = async (): Promise<Recepta[]> => {
  const response = await axios.get<Recepta[]>(baseUrl)
  return response.data
}

const getById = async (id: string): Promise<Recepta> => {
  const response = await axios.get<Recepta>(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject: NewRecepta): Promise<Recepta> => {
  const response = await axios.post<Recepta>(baseUrl, newObject)
  return response.data
}

const update = async (id: string, newObject: NewRecepta): Promise<Recepta> => {
  const response = await axios.put<Recepta>(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
}