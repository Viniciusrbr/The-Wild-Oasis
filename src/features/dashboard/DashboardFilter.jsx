import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Últimos 7 dias" },
        { value: "30", label: "Últimos 30 dias" },
        { value: "90", label: "Últimos 90 dias" },
      ]}
    />
  );
}

export default DashboardFilter;
