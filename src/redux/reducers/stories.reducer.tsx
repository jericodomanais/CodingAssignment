import {StoryInterface, GET_TOP_STORIES, GET_RANDOM_STORIES, StoriesActionTypes} from '../types';

interface StoriesState {
    topStories: Number[],
    stories: StoryInterface[]
}

const initialState: StoriesState = {
    topStories: [],
    stories: []
};

export function storiesReducer(state: StoriesState = initialState, action: StoriesActionTypes): StoriesState {
    switch (action.type) {
        case GET_TOP_STORIES: {
          return {
            ...state,
            topStories: action.payload
          };
        }
        case GET_RANDOM_STORIES: {
          return {
            ...state,
            stories: action.payload
          };
        }
        default:
          return state;
      }
}