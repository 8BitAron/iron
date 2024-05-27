import {ILocation} from '../components/locations/ILocation';

let locations: ILocation[] = [
  {
    id: '1',
    title: 'Governor Knowles State Forest',
    isDone: true,
    latitude: 45.9249493,
    longitude: -92.5835315,
    description: '',
  },
  {
    id: '2',
    title: 'Cuyuna Country State Recreation Area',
    isDone: true,
    latitude: 46.4902065,
    longitude: -94.0004601,
    description: '',
  },
  {
    id: '3',
    title: 'Voyageurs National Park',
    isDone: true,
    latitude: 48.4384142,
    longitude: -93.3163591,
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
