import { useParams } from "react-router-dom";
import NavigationCard from "@/components/NavigationCard";
import PageLayout from "@/components/PageLayout";

const stateMinistries = {
  maharashtra: [
    {
      name: "Home Department",
      minister: "Devendra Fadnavis",
      image: "/placeholder.svg"
    },
    {
      name: "Finance Department",
      minister: "Ajit Pawar",
      image: "/placeholder.svg"
    },
    // Add more ministries
  ],
  // Add more states
};

const StateMinistries = () => {
  const { state } = useParams();
  const ministries = stateMinistries[state as keyof typeof stateMinistries] || [];

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8 capitalize">{state} Ministries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ministries.map((ministry, index) => (
          <NavigationCard
            key={index}
            title={ministry.name}
            subtitle={`Minister: ${ministry.minister}`}
            image={ministry.image}
            to="#"
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default StateMinistries;