import moment from 'moment';

export const GET_TOP_STORIES = "GET_TOP_STORIES";
export const GET_RANDOM_STORIES = "GET_RANDOM_STORIES";

export interface StoryInterface {
    id: Number,
    title: String,
    url: String,
    datetime: String,
    score: Number,
    author: Author,
    type: String
}

export interface Author {
    id: String,
    karma: Number
}

interface GetTopStories {
    type: typeof GET_TOP_STORIES,
    payload: Number[]
}

interface GetRandomStories {
    type: typeof GET_RANDOM_STORIES,
    payload: StoryInterface[]
}

export type StoriesActionTypes = GetTopStories | GetRandomStories;