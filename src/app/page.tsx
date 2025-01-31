import Carousel from "@/components/Carousel";
import NavigationCard from "@/components/NavigationCard";
import MapComponent from "@/components/MapComponent";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Carousel */}
      <Carousel />

      {/* Map */}
      <div style={{ height: 500, width: 500 }} className="mt-8">
        <MapComponent />
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
        <NavigationCard title="Centre" image="/placeholder.svg" href="/centre" />
        <NavigationCard title="State" image="/placeholder.svg" href="/state" />
        <NavigationCard title="Local" image="/placeholder.svg" href="/local" />
      </div>
    </div>
  );
}
