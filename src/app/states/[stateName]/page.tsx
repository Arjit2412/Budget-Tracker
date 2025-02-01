'use client';

import React, { useEffect, useState } from "react";
import Ministries from "@/app/(routing)/ministries/page";
import { State } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";
import NavigationCard from "@/components/NavigationCard";

// `StatePage` component
function StatePage() {
  const [state, setState] = useState<State | null>(null); // ✅ Initialize properly
  const params = useParams();
  const { stateName } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/state?stateId=${stateName}`);
        setState(response.data);
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    }

    fetchData();
  }, [stateName]); // ✅ Add `stateName` to dependencies

  return (
    <div className="p-[20px]">
      <h1 className="text-[32px] text-[#333]">{state?.name || "Loading..."}</h1>
      <p className="text-[19.2px] text-[#555]">
        Welcome to the page for <strong>{state?.name}</strong>! Here, you can find information about this state.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NavigationCard
          title="Ministries"
          image="/placeholder.svg"
          href={`/ministries?stateId=${state?.sid}`}
        />
        <NavigationCard
          title="Income"
          image="/placeholder.svg"
          href={`/income?stateId=${state?.sid}`}
        />
        <NavigationCard
          title="Schemes"
          image="/placeholder.svg"
          href={`/scheme?stateId=${state?.sid}`}
        />
        <NavigationCard
          title="Projects"
          image="/placeholder.svg"
          href={`/project?stateId=${state?.sid}`}
        />
      </div>
    </div>
  );
};

export default StatePage;
