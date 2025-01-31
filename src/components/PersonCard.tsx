import React from "react";

interface PersonInfo {
  name: string;
  image: string;
  position: string;
  description: string;
}

interface PersonCardProps {
  persons: PersonInfo[];
}

const PersonCard: React.FC<PersonCardProps> = ({ persons }) => {
  return (
    <div className="glass-card gap-6 p-6 max-w-3xl mx-auto flex flex-col justify-center items-centre rounded-sm">
      {persons.map((person, index) => (
        <div className="flex flex-row gap-4" key={index}>
            <div className="flex flex-col ">
                <img src={person.image} alt={person.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{person.name}</h3>
            </div>
            <div>
                <p className="text-gray-500 text-sm">{person.position}</p>
                <p className="text-gray-600 mt-2">{person.description}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default PersonCard;