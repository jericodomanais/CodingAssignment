import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator, FlatList, Linking, Alert} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { getTopStories, getRandomStories } from '../redux';
import { StoryInterface } from '../redux/types';

import { RootState } from '../redux/reducers';
import StoryItem from '../components/StoryItem'

interface Props { }

const HomeScreen: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { stories } = useSelector((state: RootState) => state.stories);

    const initializeStories = async () => {
        setIsLoading(true);
        await dispatch(getTopStories());
        await dispatch(getRandomStories());
        setIsLoading(false);
    }

    const fetchRandomStories = async () => {
        setIsRefreshing(true);
        await dispatch(getRandomStories());
        setIsRefreshing(false);
    }

    useEffect(() => {
        initializeStories()        
    }, [])

    const goToStory = async (url: String) => {
        if(typeof url === "undefined") {
            Alert.alert("", "Invalid URL!");
            return;
        }
        
        await Linking.openURL(url.toString());
    }

    if(isLoading) {
        return (<View style={styles.centered}>
            <ActivityIndicator size="large" color="#1a81ff" />
        </View>)
    }

    return (        
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Top Stories</Text>
            <FlatList 
                onRefresh={fetchRandomStories}
                refreshing={isRefreshing}
                keyExtractor={(item: StoryInterface) => item.id.toString()}
                data={stories}
                renderItem={({item}) => <StoryItem story={item} goToStory={() => goToStory(item.url)} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
        color: "#1a81ff"
    }
});

export default HomeScreen;  