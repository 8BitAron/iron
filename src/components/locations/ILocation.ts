export interface ILocation {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  isNotSynced?: boolean;
  latitude: number;
  longitude: number;
}
