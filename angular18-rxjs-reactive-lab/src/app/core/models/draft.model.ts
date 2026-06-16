export interface DraftPayload {
  title: string;
  notes: string;
}

export interface DraftSaveResult {
  id: string;
  savedAt: string;
  payload: DraftPayload;
}
