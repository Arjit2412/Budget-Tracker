'use client';
import { useEffect, useState } from "react";
import BaseTable from "@/components/BaseTable";
import { useSearchParams } from "next/navigation";
import { Income, Ministry, State } from "@prisma/client";
import axios from "axios";
import convertToIST from "@/app/api/helpers/convertToIST";
import DataCard from "@/components/BaseDataCard";

export default function IncomePage() {
  const searchParams = useSearchParams();
  const ministry = searchParams.get("ministry");
  const stateId = searchParams.get("stateId");
  const iid = searchParams.get("id");
  const [incomeObj,setIncomeObj] = useState<Income>();
  const [ministryObj,setMinistryObj] = useState<Ministry>();
  const [stateObj,setStateObj] = useState<State>();
  const [data, setData] = useState<Income[]>([]);
  useEffect(() => {
    async function fetchProject(){
      if(ministry && ministry !== "null" && ministry !== "undefined"){
        const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/income?ministryId=${ministry}`);
      const income = data?.data.map((project: Income) => {
        const {iid,date,...others} = project;
        const dateNew = convertToIST(Number(date));
        return {date: dateNew, id: iid, ...others};
      })
      setData(income);
      const ministryData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/ministry?id=${ministry}`);
      setMinistryObj(ministryData.data);
      }else if(stateId && stateId!== "null" && stateId !== "undefined"){
        const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/income?stateId=${stateId}`);
      const income = data?.data.map((income: Income) => {
        const {iid,date,...others} = income;
        const dateNew = convertToIST(Number(date));
        return {date:dateNew,id: iid, ...others};
      })
      setData(income);
      const stateData = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/state?stateId=${stateId}`);
      setStateObj(stateData.data);
      }else if(iid && iid !== "null" && iid !== "undefined"){
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/income?id=${iid}`);
        setIncomeObj(response.data);
      }
    }
    fetchProject();
  },[ministry,stateId]);
  if(iid && iid !== "null" && iid !== "undefined"){
    return <DataCard schemas={data} />
  }
  return (
    <div>
      {ministry && ministry !== "undefined" && <p>Ministry: {ministryObj?.name}</p>}
      {stateId && stateId !== "undefined" && <p>State: {stateObj?.name}</p>}
        <BaseTable
          route="/income"
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
              header: "Date",
              accessor: "date"
            }
          ]}
          title="Income sources"
        />
    </div>
  );
};