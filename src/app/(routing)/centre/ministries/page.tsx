// /c:/Users/kambo/OneDrive/Desktop/NextProject/civic-cardinal/src/app/centre/ministry/[id].tsx


import NavigationCard from '@/components/NavigationCard'; // Adjust the import path as needed

const ministryOptions = [
    { id: 1, name: 'Ministry 1' },
    { id: 3, name: 'Ministry 3' },
    { id: 2, name: 'Ministry 2' },
    { id: 4, name: 'Ministry 4' },
];

export default function Ministries() {

    return (
        <>
        <h1 className='text-4xl font-bold'>Ministries</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {ministryOptions.map((option) => (
                    <NavigationCard
                        key={option.id}
                        title={option.name}
                        image="/placeholder.svg"
                        href={`/centre/ministries/${option.id}`}
                    />
                ))}
            </div>
        </>
    );
};
