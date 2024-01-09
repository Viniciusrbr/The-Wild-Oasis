import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Check-out da reserva #${data.id} feito com sucesso`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("Ocorreu um erro durante o check-out"),
  });

  return { checkout, isCheckingOut };
}
