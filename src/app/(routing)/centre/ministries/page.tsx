// /c:/Users/kambo/OneDrive/Desktop/NextProject/civic-cardinal/src/app/centre/ministry/[id].tsx


import NavigationCard from '@/components/NavigationCard'; // Adjust the import path as needed

const ministryOptions = [
    { id: 1, name: 'Ministry of Home', image: '/images/Home.svg' },
    { id: 2, name: 'Ministry of Finance', image: '/images/FInance.svg' },
    { id: 3, name: 'Ministry of Defense', image: '/images/Defense.svg' },
    { id: 4, name: 'Minister of Education', image: '/images/education.svg' },
    { id: 5, name: 'Ministry of Health and Family', image: '/images/Health_India.svg' },
];

export default function Ministries() {

    return (
        <>
        <h1 className='text-4xl font-bold'>Ministries</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {ministryOptions.map((option) => (
                    <NavigationCard
                        key={option.id}
                        title={option.name}
                        image={option.image}
                        href={`/centre/ministries/${option.id}`}
                    />
                ))}
            </div>
        </>
    );
};
