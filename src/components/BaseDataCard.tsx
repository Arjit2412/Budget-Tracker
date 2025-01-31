import React from "react";

interface SchemaInfo {
  [key: string]: string | number | boolean | string[] | null;
}

interface DataCardProps {
  schemas: SchemaInfo[];
}

const DataCard: React.FC<DataCardProps> = ({ schemas }) => {
  return (
    <div className="gap-6 p-6 max-w-3xl mx-auto ">
      {schemas.map((schema, index) => (
        <div key={index} className="glass-card shadow-lg rounded-2xl p-4 border">
          {Object.entries(schema).map(([key, value]) => (
            <p key={key} className="text-gray-600">
              <strong>{key.toUpperCase()}:</strong> {Array.isArray(value) ? value.join(", ") : String(value)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataCard;