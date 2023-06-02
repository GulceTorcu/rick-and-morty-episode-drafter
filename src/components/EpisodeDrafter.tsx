import React, { useState } from 'react';
import { Location, Scene, Character } from '../Types';
import LocationForm from './LocationForm';
import CharacterSelection from './CharacterSelection';
import SceneItem from './SceneItem';

const EpisodeDrafter: React.FC = () => {

    const [id, setId] = useState<string>('')
    const [description, setDescription] = useState<string>('');
    const [location, setLocation] = useState<Location>({ id: '', name: '', type: '', dimension: '' });
    const [characters, setCharacters] = useState<Character[]>([]);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [isEditing, setEditing] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (description.trim() !== '') {

            const newScene: Scene = {
                id: Date.now().toString(),
                description,
                location,
                characters
            };

            setScenes([...scenes, newScene]);
            setDescription('');
            setLocation({ id: '', name: '', type: '', dimension: '' })
            setCharacters([])
        }
    };

    const handleLocationSelect = (location: Location) => {
        setLocation(location)
    }

    const handleSelectCharacters = (characters: Character[]) => {
        setCharacters(characters)
    }

    const handleSceneEdit = (selectedScene: Scene) => {
        setId(selectedScene.id)
        setDescription(selectedScene.description);
        setLocation(selectedScene.location);
        setCharacters(selectedScene.characters)
        setEditing(true)
    }

    const handleEdit = () => {
        const updatedScene: Scene = {
          id,
          description,
          location,
          characters,
        };
    
        const updatedScenes = scenes.map((scene) => {
          return scene.id === id ? updatedScene : scene;
        });
        setEditing(false);
        setScenes(updatedScenes);
      };

    return (
        <div>
            {!isEditing ?
                <><h3>Create Scene</h3><form onSubmit={handleSubmit}>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <LocationForm value={location} onSelectLocation={handleLocationSelect} />
                    <CharacterSelection values={characters} onSelectCharacters={handleSelectCharacters} />
                    <button type="submit">Add Scene</button>
                </form></> :
                <><h3>Edit Scene</h3><form onSubmit={handleEdit}>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <LocationForm value={location} onSelectLocation={handleLocationSelect} />
                    <CharacterSelection values={characters} onSelectCharacters={handleSelectCharacters} />
                    <button type="submit">Edit Scene</button>
                </form></>
            }

            <h3>Scenes:</h3>
            <ul>
                {scenes.map((scene, index) => (
                    <SceneItem sceneId={index} selectedScene={scene} onEditItem={handleSceneEdit} />
                ))}
            </ul>
        </div>
    );

};

export default EpisodeDrafter