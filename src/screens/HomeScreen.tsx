import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import moviesAPI from '../api/movies';
import Spinner from '../components/Spinner';
import useMovies from '../hooks/useMovies';
import { MovieDBNowPlaying } from '../interfaces/movieInterface';
import { RootStackParamList } from '../navigation/Navigation';

type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProps>();
  const { moviesNowPlaying, isLoading } = useMovies();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button title="Go details" onPress={() => navigation.navigate('DetailsScreen')} />
    </View>
  );
};

export default HomeScreen;
