'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import BaseTable from "@/components/BaseTable";
import { Scheme } from "@/app/constants/frontend";
import { useSearchParams } from "next/navigation";
import { Ministry, State } from "@prisma/client";
import convertToIST from "@/app/api/helpers/convertToIST";

export default function SchemePage() {
  const searchParams = useSearchParams();
  const ministry = searchParams.get("ministry");
  const stateId = searchParams.get("stateId");
  const [ministryObj,setMinistryObj] = useState<Ministry>();
  const [stateObj, setStateObj] = useState<State>();
  const [data, setData] = useState<Scheme[]>([]);
  useEffect(() => {
    async function fetchProject(){
      if(ministry && ministry !== "undefined"){
        const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/scheme?ministryId=${ministry}`);
      const scheme = data?.data.map((scheme: Scheme) => {
        const {sid,start,end,...others} = scheme;
        const startNew = convertToIST(Number(start));
        const endNew = convertToIST(Number(end));
        return {id: sid,start:startNew,end: endNew, ...others};
      })
      setData(scheme);
      const ministryData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/ministry?id=${ministry}`);
      setMinistryObj(ministryData.data);
      }
      else if(stateId && stateId !== "undefined"){
        const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/scheme?stateId=${stateId}`);
      const scheme = data?.data.map((scheme: Scheme) => {
        const {sid,start,end,...others} = scheme;
        const startNew = convertToIST(Number(start));
        const endNew = convertToIST(Number(end));
        return {id: sid,start:startNew,end: endNew, ...others};
      })
      setData(scheme);
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
        route="/scheme"
        data={data}
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
            accessor: "end"
          },
          {
            header: "Status",
            accessor: "status"
          }
        ]}
        title="Schemes"
      />
    </div>
  );
};