import BaseTable from "@/components/BaseTable";
import { Scheme } from "@/app/constants/frontend";

export default function SchemePage() {
  return (
    <div>
      <h1>Scheme Page</h1>
      <BaseTable
        route="/scheme"
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
        title="Schemes"
      />
    </div>
  );
};