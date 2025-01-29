import BaseTable from "@/components/BaseTable";
import { Expenditure } from "@/app/constants/frontend";

export default function ExpenditurePage() {
  return (
    <div>
      <h1>Expenditure Page</h1>
      <BaseTable
        data={[]}
        columns={[
          {
            header: "Name",
            accessor: "name",
          },
          {
            header: "Desc",
            accessor: "desc",
          },
        ]}
        title="Expenditures"                
      />
    </div>
  );
};