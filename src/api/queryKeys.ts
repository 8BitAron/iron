// Query Key Mangers for React Query
// See: https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories

// Reference:
// const modelKeys = {
//   all: ['model'] as const,
//   lists: () => [...modelKeys.all, 'list'] as const,
//   list: (filters: string) => [...modelKeys.lists(), {filters}] as const,
//   details: () => [...modelKeys.all, 'detail'] as const,
//   detail: (id: number) => [...modelKeys.details(), id] as const,
// };

const locationsKeys = {
  all: ['exercises'] as const,
  lists: () => [...locationsKeys.all, 'exercise'] as const,
  list: (filters: string) => [...locationsKeys.lists(), {filters}] as const,
  details: () => [...locationsKeys.all, 'detail'] as const,
  detail: (id: number) => [...locationsKeys.details(), id] as const,
};

export const queryKeys = {
  locations: locationsKeys,
};
