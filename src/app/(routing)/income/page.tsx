import BaseTable from "@/components/BaseTable";
import { Income } from "@/app/constants/frontend";
export default function IncomePage() {
  return (
    <div>
      <h1>Income Page</h1>
      <BaseTable
        route="/income"
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
        title="Incomes"        
      />
    </div>
  );
};