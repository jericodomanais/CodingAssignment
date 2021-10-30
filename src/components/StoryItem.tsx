import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { StoryInterface } from '../redux/types';

interface Props {
    story: StoryInterface,
    goToStory: () =>  void
 }

const StoryItem: React.FC<Props> = ({story, goToStory} : {story: StoryInterface, goToStory: () =>  void}) => {      
    return (        
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={goToStory}>  
            <View style={styles.scoreContainer}>
                <Text>By: {story.author.id}</Text>          
                <Text>{story.datetime}</Text>   
            </View>
            <Text style={styles.title}>{story.title}</Text>
            <Text>Story score: {story.score}</Text>          
            <Text>Karma score: {story.author.karma}</Text>          
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        marginVertical: 5
    },
    scoreContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default StoryItem;  