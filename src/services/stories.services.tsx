import moment from 'moment';
import { getFromServer } from './helpers.services'
import { StoryInterface, Author } from '../redux/types';

export const storiesService = {
    getTopStories,
    getStories
};

async function getTopStories(): Promise<Number[]> {
    return await getFromServer("https://hacker-news.firebaseio.com/v0/topstories.json");
}

async function getStories(storiesId: Number[]): Promise<StoryInterface[]> {
    const stories: StoryInterface[] = [];

    for (let index = 0; index < storiesId.length; index++) {
        var storyDetails = await getFromServer("https://hacker-news.firebaseio.com/v0/item/" + storiesId[index] +".json");
        var author = await getFromServer("https://hacker-news.firebaseio.com/v0/user/" + storyDetails.by +".json");
        const story: StoryInterface = {
            id: storyDetails.id,
            title: storyDetails.title,
            url: storyDetails.url,
            datetime: moment.unix(storyDetails.time).format("DD.MM.YYYY"),
            score: storyDetails.score,
            author: {
                id: author.id,
                karma: author.karma
            },
            type: storyDetails.type
        }
        stories.push(story);                
    }

    return stories;
}