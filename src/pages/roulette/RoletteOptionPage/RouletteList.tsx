import React from 'react';

interface ParticipantListProps {
  participants: string[];
  onDelete: (index: number) => void;
}

function RouletteList({ participants, onDelete }: ParticipantListProps) {
  return (
    <ul className="flex p-1 gap-1 items-center">
      {participants.map((participant, index) => (
        <li className="flex p-2 rounded-md bg-green items-center" key={index}>
          {participant}
          <button
            onClick={() => onDelete(index)}
            className="ml-2 bg-red-500 text-white p-1"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RouletteList;
