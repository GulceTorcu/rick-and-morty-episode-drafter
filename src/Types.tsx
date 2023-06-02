export type Episode = {
    id: number;
    name: string;
    scenes: Scene[];
}

export type Scene = {
    id: string;
    description: string;
    location: Location;
    characters: Character[];
}

export type Location = {
    id: string;
    name: string;
    type: string;
    dimension: string;
}

export type Character = {
    id: string;
    name: string;
    status: string;
    species: string;
}

export type CreateEpisodeProps = {
    onCreateEpisode: (episode: Episode) => void;
};