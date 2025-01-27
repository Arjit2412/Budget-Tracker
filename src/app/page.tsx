import NavigationCard from "@/components/NavigationCard";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NavigationCard
        title="Centre"
        image="/government-of-india.jpg"
        href="/centre"
      />
      <NavigationCard
        title="State"
        image="/placeholder.svg"
        href="/state"
      />
      <NavigationCard
        title="Local"
        image="/placeholder.svg"
        href="/local"
      />
    </div>
  );
}