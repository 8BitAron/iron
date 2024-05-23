import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {ILocation} from '../../components/locations/ILocation';
import {useApiClient} from '../apiClient';
import {fakeApi} from '../fakeApi';
import {queryKeys} from '../queryKeys';

export function useLocations() {
  const apiClient = useApiClient();
  const request = () => fakeApi.getLocations();
  // apiClient
  //   .get('/locations')
  //   .then(response => response.data)
  //   .catch(error => {
  //     throw error;
  //   });

  return useQuery({
    queryKey: queryKeys.locations.all,
    queryFn: request,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function usePuLocations() {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const request = (location: ILocation) =>
    fakeApi.updateUpdateLocationStatus(location.id, location.isDone);
  // apiClient
  //   .put(`/locations/${location.id}`, {done: location.isDone})
  //   .then(response => response.data)
  //   .catch(error => {
  //     throw error;
  //   });

  return useMutation({
    mutationKey: queryKeys.locations.all,
    mutationFn: request,
    onMutate: async data => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.locations.all,
      });
      updateLocalLocationsList(queryClient, data.id, data.isDone, true);
    },
    onSuccess: data => {
      updateLocalLocationsList(queryClient, data.id, data.isDone, false);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log('onError', error);
      console.log(`rolling back optimistic update with id `);
    },
  });
}

const updateLocalLocationsList = (
  queryClient: QueryClient,
  id: string,
  isDone: boolean,
  isNotSynced?: boolean,
) => {
  queryClient.setQueryData<ILocation[]>(
    queryKeys.locations.all,
    locationsList => {
      return locationsList?.map(location => {
        if (location.id === id) {
          return {...location, isDone, isNotSynced};
        }
        return location;
      });
    },
  );
};
