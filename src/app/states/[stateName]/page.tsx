import NavigationCard from "@/components/NavigationCard";
import React from "react";
import Ministries from "@/app/(routing)/ministries/page";

interface StatePageProps {
  params: { stateName: string };
}

// Format the state name for display
const formatStateName = (stateName: string) => {
  return stateName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// `StatePage` component
const StatePage = async ({ params }: StatePageProps) => {
  const { stateName } = params;
  const formattedStateName = formatStateName(stateName);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", color: "#333" }}>{formattedStateName}</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Welcome to the page for <strong>{formattedStateName}</strong>! Here, you can find information about this state.
      </p>
      <Ministries/>
    </div>
  );
};

export default StatePage;
