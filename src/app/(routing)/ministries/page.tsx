'use client';
import axios from 'axios';
import NavigationCard from '@/components/NavigationCard'; // Adjust the import path as needed
import { useEffect, useState } from 'react';
import { Ministry } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

export default function Ministries({stateId}: {stateId: string}) {
    const [data, setData] = useState<Ministry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const params = useSearchParams();
    const stateID = stateId && stateId !== "undefined" ? stateId : params.get("stateId");
    useEffect(() => {
        async function fetchMinistries(){
            const data = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/ministry?stateId=${stateID}`);
            setData(data.data);
        }
        try {
            
        fetchMinistries();
    
        } catch (error) {
            setError("Some error occured");
        }    
    }, [stateID]);

  if (error) return <p>Error: {error}</p>;
    return (
        <>
        <h1 className='text-4xl font-bold'>Ministries</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {data.map((option) => (
                    <NavigationCard
                        key={option.mid}
                        title={option.name}
                        image={"images/Home.svg"}
                        href={`/ministries/${option.mid}`}
                    />
                ))}
            </div>
        </>
    );
};
