import NavigationCard from "@/components/NavigationCard";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NavigationCard
          title="Centre"
          image="/placeholder.svg"
          to="/centre"
        />
        <NavigationCard
          title="State"
          image="/placeholder.svg"
          to="/state"
        />
        <NavigationCard
          title="Local"
          image="/placeholder.svg"
          to="/local"
        />
      </div>
    </PageLayout>
  );
};

export default Index;