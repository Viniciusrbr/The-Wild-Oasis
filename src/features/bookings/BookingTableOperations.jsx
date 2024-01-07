import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Todos" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Não confirmado" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Classificar por data (recente primeiro)" },
          { value: "startDate-asc", label: "Classificar por data (anterior primeiro)" },
          { value: "totalPrice-desc", label: "Classificar por preço (maior primeiro)" },
          { value: "totalPrice-asc", label: "Classificar por preço (menor primeiro)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
