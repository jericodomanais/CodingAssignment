import { combineReducers } from 'redux';
import { storiesReducer } from './stories.reducer'

export const rootReducer = combineReducers({
    stories: storiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;