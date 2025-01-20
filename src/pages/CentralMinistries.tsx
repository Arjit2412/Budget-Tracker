import NavigationCard from "@/components/NavigationCard";
import PageLayout from "@/components/PageLayout";

const ministries = [
  {
    name: "Ministry of Home Affairs",
    minister: "Amit Shah",
    image: "/placeholder.svg"
  },
  {
    name: "Ministry of Defence",
    minister: "Rajnath Singh",
    image: "/placeholder.svg"
  },
  {
    name: "Ministry of Finance",
    minister: "Nirmala Sitharaman",
    image: "/placeholder.svg"
  },
  // Add more ministries as needed
];

const CentralMinistries = () => {
  return (
    <PageLayout>
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

export default CentralMinistries;