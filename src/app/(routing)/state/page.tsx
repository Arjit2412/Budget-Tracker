import NavigationCard from "@/components/NavigationCard";

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
];

export default function States() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {states.map((state, index) => (
        <NavigationCard
          key={index}
          title={state.name}
          image={state.image}
          href={`/states/${state.name.toLowerCase()}`}
        />
      ))}
    </div>
  );
}