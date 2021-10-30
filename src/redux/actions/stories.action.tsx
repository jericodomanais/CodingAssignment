import { ActionCreator } from 'redux';
import { GET_TOP_STORIES, GET_RANDOM_STORIES } from '../types'
import { StoryInterface, StoriesActionTypes } from '../types'
import { storiesService } from '../../services';

const getTopStoriesSuccess: ActionCreator<StoriesActionTypes> = (topStories: Number[]) => {
    return { type: GET_TOP_STORIES, payload: topStories };
}

const getRandomStoriesSuccess: ActionCreator<StoriesActionTypes> = (stories: StoryInterface[]) => {
    return { type: GET_RANDOM_STORIES, payload: stories };
}

function sortByScore(a, b) {
    return a.score - b.score;
}

export function getTopStories() {
    return async dispatch => {
        try {
            var topStories = await storiesService.getTopStories();
            return dispatch(getTopStoriesSuccess(topStories));
        } catch (error) {
            throw new Error(`Server error. {error}`);
        }
        
    }
}

export function getRandomStories() {
    return async (dispatch, getState) => {
        try {
            const topStories = getState().stories.topStories;        
            const storiesId = topStories.sort(function(){return .5 - Math.random()}).slice(0, 10);            
            const stories = await storiesService.getStories(storiesId);
           
            return dispatch(getRandomStoriesSuccess(stories.sort(sortByScore)));
        } catch (error) {
            throw new Error(`Server error. {error}`);
        }
        
    }
}