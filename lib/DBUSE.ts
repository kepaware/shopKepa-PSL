import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useDatabase } from "./DBAPI";
import type { AddProps, Item, SeedArray, Toggle, Update } from "./Types";

export function useDBFunctions() {
  const {
    getUser,
    updateUser,
    fetchAll,
    fetchListItems,
    addItem,
    toggleItem,
    deleteItem,
    clearMenuTable,
    seedDatabase,
  } = useDatabase();
  const queryClient = useQueryClient();

  function useGetUser() {
    const {
      isPending,
      data: user,
      error,
    } = useQuery({
      queryKey: ["user"],
      queryFn: getUser,
    });

    return { isPending, user, error };
  }

  function useUpdateUser() {
    const { mutate: updateName, isPending: isUpdating } = useMutation({
      mutationFn: ({ update }: Update) => updateUser({ update }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        console.log("UPDATE USER ERROR: ", error.message);
      },
    });
    return { isUpdating, updateName };
  }

  function useFetchAll() {
    const {
      isPending,
      data: items,
      error,
    } = useQuery({
      queryKey: ["items"],
      queryFn: fetchAll,
    });

    return { isPending, items, error };
  }

  function useFetchListItems() {
    const {
      isPending: isFetching,
      data: listItems,
      error,
    } = useQuery({
      queryKey: ["listItems"],
      queryFn: fetchListItems,
    });

    return { isFetching, listItems, error };
  }

  function useAddItem() {
    const { mutate: newItem, isPending: isCreating } = useMutation({
      mutationFn: ({ item }: AddProps) => addItem({ item }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
      },
      onError: (error) => {
        console.log("ADD ITEM ERROR: ", error.message);
      },
    });
    return { isCreating, newItem };
  }

  function useToggleItem() {
    const { mutate: toggleList, isPending: isUpdating } = useMutation({
      mutationFn: ({ item }: Toggle) => toggleItem({ item }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["listItems"] });
      },
      onError: (error) => {
        console.log("ADD ITEM ERROR: ", error.message);
      },
    });
    return { isUpdating, toggleList };
  }

  function useDeleteItem() {
    const { mutate: deleteMenuItem, isPending: isDeleting } = useMutation({
      mutationFn: (id: number) => deleteItem(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["listItems"] });
      },
      onError: (error) => {
        console.log("DELETE ITEM ERROR: ", error.message);
      },
    });
    return { isDeleting, deleteMenuItem };
  }

  function useClearMenuTable() {
    const { mutate: clearTable, isPending: isClearing } = useMutation({
      mutationFn: clearMenuTable,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["listItems"] });
      },
      onError: (error) => {
        console.log("CLEAR TABLE ERROR: ", error.message);
      },
    });
    return { isClearing, clearTable };
  }

  function useSeedDatabase() {
    const { mutate: seedDB, isPending: isSeeding } = useMutation({
      mutationFn: ({ fileItemsArray }: SeedArray) =>
        seedDatabase({ fileItemsArray }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
        queryClient.invalidateQueries({ queryKey: ["listItems"] });
      },
      onError: (error) => {
        console.log("SEED DB ERROR: ", error.message);
      },
    });
    return { seedDB, isSeeding };
  }

  return {
    useGetUser,
    useUpdateUser,
    useFetchAll,
    useFetchListItems,
    useAddItem,
    useToggleItem,
    useDeleteItem,
    useClearMenuTable,
    useSeedDatabase,
  };
}
