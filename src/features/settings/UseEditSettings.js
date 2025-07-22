import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isPending: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editSetting, isEditing };
}
