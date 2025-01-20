import NavigationCard from "@/components/NavigationCard";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NavigationCard
          title="Centre"
          image="/placeholder.svg"
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
    </PageLayout>
  );
}