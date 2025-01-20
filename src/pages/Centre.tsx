import NavigationCard from "@/components/NavigationCard";
import PageLayout from "@/components/PageLayout";

const Centre = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NavigationCard
          title="Ministries"
          image="/placeholder.svg"
          to="/centre/ministries"
        />
        <NavigationCard
          title="States"
          image="/placeholder.svg"
          to="/centre/states"
        />
      </div>
    </PageLayout>
  );
};

export default Centre;