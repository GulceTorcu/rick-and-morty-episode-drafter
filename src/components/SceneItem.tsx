import React from 'react';
import { Scene } from '../Types';


type SceneItemProps = {
    sceneId: number
    selectedScene: Scene;
    onEditItem: (Scene: Scene) => void
};

const SceneItem: React.FC<SceneItemProps> = ({ sceneId, selectedScene, onEditItem }) => {

    return (
        <div>
            <li key={sceneId}>
                {selectedScene.description}, {selectedScene.location.name},{selectedScene.characters.map((char) => char.name + ', ')}
            </li>
            <button onClick={() => onEditItem(selectedScene)}>Edit</button>
            {/* <button onClick={() => onDeleteClick(todo.id)}>Delete</button> // TODO*/} 
        </div >
    );
};

export default SceneItem;
