import React from 'react';
import DataCard from "@/components/BaseDataCard";
import PersonCard from "@/components/PersonCard";

export default function TestingPage() {
  return (
    <div className="max-w-3xl flex flex-col justify-start">
        <div className='flex flex-col items-center justify-start'>
            Testing Page
        </div>
        {/* <DataCard schemas={[{
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
        }]} /> */}

        <div className='flex flex-col justify-start'>
        <PersonCard persons={[{
          name: "John Doe",
          image: "https://via.placeholder.com/150",
          position: "Software Engineer",
          description: "Passionate about building scalable web applications."
        }]} />
        </div>

    </div>
  );
}

