import {ILocation} from '../components/locations/ILocation';

let locations: ILocation[] = [
  {
    id: '1',
    title: 'Camp 1',
    isDone: true,
    latitude: 0,
    longitude: 0,
    description: '',
  },
  {
    id: '2',
    title: 'Camp 1',
    isDone: true,
    latitude: 0,
    longitude: 0,
    description: '',
  },
  {
    id: '3',
    title: 'Camp 1',
    isDone: true,
    latitude: 0,
    longitude: 0,
    description: '',
  },
];

export const fakeApi = {
  getLocations: () =>
    new Promise<ILocation[]>(resolve => {
      setTimeout(() => resolve(locations), 300);
    }),
  updateUpdateLocationStatus: (id: string, isDone: boolean) =>
    new Promise<ILocation>(resolve => {
      setTimeout(() => {
        const locationToBeUpdated = locations.find(t => t.id === id);

        if (locationToBeUpdated) {
          const updatedLocation = {
            ...locationToBeUpdated,
            isDone,
          };

          locations = locations.map(location => {
            if (location.id === id) {
              return updatedLocation;
            }
            return location;
          });

          resolve(updatedLocation);
        }
      }, 300);
    }),
};
