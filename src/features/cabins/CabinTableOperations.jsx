import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "Todos",
          },
          {
            value: "no-discount",
            label: "Sem desconto",
          },
          {
            value: "with-discount",
            label: "Com desconto",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
