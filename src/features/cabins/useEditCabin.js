import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
