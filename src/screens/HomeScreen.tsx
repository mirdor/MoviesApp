import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import useMovies from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';

const HomeScreen = () => {
  const { moviesNowPlaying, isLoading } = useMovies();

  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={{ marginTop: top + 10 }}>
      <View
        style={{
          height: 420,
        }}>
        <Carousel
          data={moviesNowPlaying}
          renderItem={({ item }) => <MovieCard movie={item} />}
          sliderWidth={width}
          itemWidth={250}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
