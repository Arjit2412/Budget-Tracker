'use client';
import { useState, useEffect } from "react";
import NavigationCard from "@/components/NavigationCard";
import { State } from "@prisma/client";
import axios from "axios";

export default function States() {
  const [states,setStates] = useState<State[]>([]);
  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/state`);
      setStates(response.data);
    }
    fetchData();
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {states.map((state, index) => (
        <NavigationCard
          key={index}
          title={state.name}
          image={"placeholder.svg"}
          href={`/states/${state.sid}`}
        />
      ))}
    </div>
  );
}