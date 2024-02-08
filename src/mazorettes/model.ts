export interface SetResult {
  refereeNumber: number;
  ordNumber: number;
  note: string;
  category: number;
  costumes: number;
  choreography: number;
  formationChange: number;
  music: number;
  facialExpression: number;
  difficulty: number;
  faults: number;
  overall: number;
  synchro: number;
}

export interface Result {
  [K: number]: number;
}

export interface RefereeNotes {
  [K: number]: string;
}

export enum Category {
  solo,
  duo,
  trio,
  group,
}

export interface Assignee {
  ordNumber: number;
  category: Result;
  mainCategory: Category;
  choreography: Result;
  difficulty: Result;
  costumes: Result;
  overall: Result;
  facialExpression: Result;
  music: Result;
  faults: Result;
  notes: RefereeNotes;
  synchro: Result | undefined;
  formationChange: Result | undefined;
}
