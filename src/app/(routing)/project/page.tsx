'use client'
import { useSearchParams } from "next/navigation";
import BaseTable from "@/components/BaseTable";
import { useEffect, useState } from "react";
import { Ministry, Project, State } from "@prisma/client";
import axios from "axios";
import convertToIST from "@/app/api/helpers/convertToIST";

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const ministry = searchParams.get("ministry");
  const stateId = searchParams.get("stateId");
  const [ministryObj,setMinistryObj] = useState<Ministry>();
  const [stateObj,setStateObj] = useState<State>();
  const [data, setData] = useState<Project[]>([]);
  useEffect(() => {
    async function fetchProject(){
      if(ministry && ministry !== "undefined"){
        const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/project?ministryId=${ministry}`);
      const projects = data?.data.map((project: Project) => {
        const {pid,start,end,...others} = project;
        const startNew = convertToIST(Number(start));
        const endNew = convertToIST(Number(end));
        return {id: pid,start:startNew,end: endNew, ...others};
      })
      setData(projects);
      const ministryData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/ministry?id=${ministry}`);
      setMinistryObj(ministryData.data);
      }
      else if(stateId && stateId !== "undefined"){
        const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/project?stateId=${stateId}`);
      const projects = data?.data.map((project: Project) => {
        const {pid,start,end,...others} = project;
        const startNew = convertToIST(Number(start));
        const endNew = convertToIST(Number(end));
        return {id: pid,start:startNew,end: endNew, ...others};
      })
      setData(projects);
      const stateData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/state?stateId=${stateId}`);
      setStateObj(stateData.data);
      }
    }
    fetchProject();
  },[ministry,stateId]);
  return (
    <div>
      {ministry && ministry !== "undefined" && <p>Ministry: {ministryObj?.name}</p>}
      {stateId && stateId !== "undefined" && <p>State: {stateObj?.name}</p>}

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
