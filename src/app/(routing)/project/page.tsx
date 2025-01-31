'use client'
import { useSearchParams } from "next/navigation";
import BaseTable from "@/components/BaseTable";
import { useEffect, useState } from "react";
import { Ministry, Project } from "@prisma/client";
import axios from "axios";
import convertToIST from "@/app/api/helpers/convertToIST";

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const ministry = searchParams.get("ministry");
  const [ministryObj,setMinistryObj] = useState<Ministry>();
  const [data, setData] = useState<Project[]>([]);
  useEffect(() => {
    async function fetchProject(){
      const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/project?ministryId=${ministry}`);
      const projects = data?.data.map((project: Project) => {
        const {start,end,...others} = project;
        const startNew = convertToIST(Number(start));
        const endNew = convertToIST(Number(end));
        return {start:startNew,end: endNew, ...others};
      })
      setData(projects);
      const ministryData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/ministry?id=${ministry}`);
      setMinistryObj(ministryData.data);
    }
    fetchProject();
  },[]);

  return (
    <div>
      <p>Ministry: {ministryObj?.name}</p> {/* Display ministry value */}
      <BaseTable
        route="/project"
        data={data} // Fetch and pass data based on ministry later
        columns={[
          {
            header: "Name",
            accessor: "name",
          },
          {
            header: "Desc",
            accessor: "desc",
          },
          {
            header: "Start Time",
            accessor: "start"
          },
          {
            header: "End Time",
            accessor: "end",
          },
          {
            header: "Status",
            accessor: "status"
          },
        ]}
        title="Projects"
      />
    </div>
  );
}
