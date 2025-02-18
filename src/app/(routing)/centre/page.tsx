import NavigationCard from "@/components/NavigationCard";

export default function Centre() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NavigationCard
        title="Ministries"
        image="/placeholder.svg"
        href="/ministries"
      />
      <NavigationCard
        title="States"
        image="/placeholder.svg"
        href="./state"
      />
    </div>
  );
}