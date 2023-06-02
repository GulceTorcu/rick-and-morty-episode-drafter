import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_CHARACTERS } from '../graphql/queries';
import { Character } from '../Types';

type CharacterSelectionProps = {
  values: Character[] | undefined
  onSelectCharacters: (characters: Character[]) => void;
};

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ values, onSelectCharacters }) => {
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS);
  const [selectedValues, setSelectedValues] = useState<Character[]>([]);


  useEffect(() => {
    if (values) {
      setSelectedValues(values);
    }
  }, [values]);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p>Error fetching characters: {error.message}</p>;
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCharacterId = event.target.value;

    if (event.target.checked) {
      const selectedCharacter = data.characters.results.find((character: Character) => character.id === selectedCharacterId);

      if (selectedCharacter) {
        onSelectCharacters([...(values || []), selectedCharacter]);
      }
    } else {
      const updatedCharacters = values?.filter((character) => character.id !== selectedCharacterId) || [];
      setSelectedValues(updatedCharacters);
      onSelectCharacters(updatedCharacters);
    }
  };

  return (
    <div>
      <h3>Select Characters</h3>
      <form>
        {data.characters.results.map((character: Character) => (
          <label key={character.id}>
            <input
              type="checkbox"
              name="character"
              value={character.id}
              onChange={handleCheckboxChange}
              checked={selectedValues.some((value) => value.id === character.id)}
            />
            {character.name}
          </label>
        ))}
      </form>
    </div>
  );
};

export default CharacterSelection;
