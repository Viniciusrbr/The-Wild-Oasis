import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Todos" },
          { value: "no-discount", label: "Sem desconto" },
          { value: "with-discount", label: "Com desconto" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Classificar por nome (A-Z)" },
          { value: "name-desc", label: "Classificar por nome (Z-A)" },
          { value: "regularPrice-asc", label: "Classificar por preço (menor primeiro)" },
          { value: "regularPrice-desc", label: "Classificar por preço (maior primeiro)" },
          { value: "maxCapacity-asc", label: "Classificar por capacidade (menor primeiro)" },
          { value: "maxCapacity-desc", label: "Classificar por capacidade (maior primeiro)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
