import axios from "axios";
import type { NewRecepta, Recepta } from "../types/Recepta";
//GET
export const getAll = async (url: string): Promise<Recepta[]> => {
  const res = await axios.get<Recepta[]>(url);
  return res.data;
};
//GET by ID
export const getById = async (url: string, id: string): Promise<Recepta> => {
  const res = await axios.get<Recepta>(`${url}/${id}`);
  return res.data;
}
//POST
export const create = async (url: string, recepte: NewRecepta): Promise<Recepta> => {
  const res = await axios.post(url, recepte)
  return res.data
}
//PUT
export const update = async (url: string, id: string, updatedRecepta: NewRecepta): Promise<Recepta> => {
  const res = await axios.put(`${url}/${id}`, updatedRecepta)
  return res.data
}