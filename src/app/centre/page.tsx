import NavigationCard from "@/components/NavigationCard";

export default function Centre() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NavigationCard
        title="Ministries"
        image="/placeholder.svg"
        href="/centre/ministries"
      />
      <NavigationCard
        title="States"
        image="/placeholder.svg"
        href="./state"
      />
    </div>
  );
}