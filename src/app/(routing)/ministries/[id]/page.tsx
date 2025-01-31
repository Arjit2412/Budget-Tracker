'use client'
import {useParams} from "next/navigation";
import NavigationCard from "@/components/NavigationCard";

export default function MinistryDetailPage() {

  const params=useParams();
  const {id}=params;

  return (
    <div>
      <h1>Ministry Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NavigationCard
          title="Income"
          image="/placeholder.svg"
          href={`/income?ministry=${id}`}
        />
        <NavigationCard
          title="Expenditure"
          image="/placeholder.svg"
          href={`/expenditure?ministry=${id}`}
        />
        <NavigationCard
          title="Scheme"
          image="/placeholder.svg"
          href={`/scheme?ministry=${id}`}
        />
        <NavigationCard
          title="Project"
          image="/placeholder.svg"
          href={`/project?ministry=${id}`}
          />
        </div>
    </div>
  );
}