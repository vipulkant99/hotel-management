import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: creatingCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { creatingCabin, isCreating };
}
