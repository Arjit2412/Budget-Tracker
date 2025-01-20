import NavigationCard from "@/components/NavigationCard";
import PageLayout from "@/components/PageLayout";

const states = [
  {
    name: "Maharashtra",
    image: "/placeholder.svg"
  },
  {
    name: "Gujarat",
    image: "/placeholder.svg"
  },
  {
    name: "Karnataka",
    image: "/placeholder.svg"
  },
  // Add more states as needed
];

const States = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {states.map((state, index) => (
          <NavigationCard
            key={index}
            title={state.name}
            image={state.image}
            to={`/state/${state.name.toLowerCase()}`}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default States;