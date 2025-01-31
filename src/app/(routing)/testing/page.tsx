import React from 'react';
import DataCard from "@/components/BaseDataCard";

export default function TestingPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center items-centre">
        <div className='flex flex-col items-center'>
            Testing Page
        </div>
        <DataCard schemas={[{
          name: "Smart City Development Phase II",
          desc: "A state initiative for smart city development phase ii.",
          start: "1738271255602",
          end: "1895951255602",
          status: "HALTED",
          stateIds: ["5e96318c-dd9f-4ada-a614-752c0811c23d", "ac4e2c59-b371-4b5c-9251-9bd965480026"],
          photos: [],
          central: false,
          localIds: [],
          ministryId: null
        }]} />

    </div>
  );
}