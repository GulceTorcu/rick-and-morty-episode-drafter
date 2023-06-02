import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Location } from '../Types';
import { GET_LOCATIONS } from '../graphql/queries';


type LocationFormProps = {
  value: Location | undefined
  onSelectLocation: (location: Location) => void;
};

const LocationForm: React.FC<LocationFormProps> = ({ value, onSelectLocation }) => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  useEffect(() => {
    if (value) {
      onSelectLocation(value);
    }
  }, [value]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = data.locations.results.find(
      (location: Location) => location.id === (event.target.value as string)
    );

    if (selectedLocation) {
      onSelectLocation(selectedLocation);
    }
  };

  return (
    <div>
      <h3>Select Location</h3>
      <select onChange={handleSelectChange} value={value?.id || ''}>
        <option value={''}>Select a location</option>
        {data.locations.results.map((location: Location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationForm;
