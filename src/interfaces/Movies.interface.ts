import { IComment } from "./Comment.interface";

export interface IMovie {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: Date;
    edited: Date;
    url: string;
    comments_count: number;
    comments: IComment[];
}

export interface IResult {
    count: number;
    next?: any;
    previous?: any;
    results: IMovie[];
}
