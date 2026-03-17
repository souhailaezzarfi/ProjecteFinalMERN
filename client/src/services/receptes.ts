import axios from "axios";
import type { NewRecepte, Recepte } from "../types/Recepte";
//GET
export const getAll = async (url: string): Promise<Recepte[]> => {
  const res = await axios.get<Recepte[]>(url);
  return res.data;
};
//GET by ID
export const getById = async (url: string, id: string): Promise<Recepte> => {
  const res = await axios.get<Recepte>(`${url}/${id}`);
  return res.data;
}
//POST
export const create = async (url: string, recepte: NewRecepte): Promise<Recepte> => {
  const res = await axios.post(url, recepte)
  return res.data
}
//PUT
export const update = async (url: string, id: string, updatedRecepte: NewRecepte): Promise<Recepte> => {
  const res = await axios.put(`${url}/${id}`, updatedRecepte)
  return res.data
}