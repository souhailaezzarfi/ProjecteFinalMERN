export type Recepta = {
  _id: string;
  titol: string;
  racions: number;
  esVegetaria: boolean;
  ingredients: string[];
  passos: string[];
  tempsCoccioMinuts: number;
  dataPublicacio: string;
};
export type NewRecepta = {
  titol: string;
  racions: number;
  esVegetaria: boolean;
  ingredients: string[];
  passos: string[];
  tempsCoccioMinuts: number;
  dataPublicacio: string;
};
export type ReceptaFormProps = {
  newContent: NewRecepta;
  editingNote: Recepta | null;
  onTitolChange: (value: string) => void;
  onRacionsChange: (value: number) => void;
  onEsVegetariaChange: (value: boolean) => void;
  onIngredientsChange: (value: string[]) => void;
  onPassosChange: (value: string[]) => void;
  onTempsCoccioChange: (value: number) => void;
  onDataPublicacioChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
