import BaseTable from "@/components/BaseTable";
import { Project } from "@/app/constants/frontend";

export default function ProjectPage() {
  return (
    <div>
      <h1>Project Page</h1>
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
        title="Projects"        
      />
    </div>
  );
};