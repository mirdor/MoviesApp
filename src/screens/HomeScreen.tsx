import React from 'react';
import { FlatList, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import useMovies from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';

const HomeScreen = () => {
  const { popular, nowPlaying, upcoming, topRated, isLoading } = useMovies();

  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: top + 10 }}>
        {/* Movies Now Playing Carousel */}
        <View
          style={{
            height: 400,
          }}>
          <Carousel
            data={nowPlaying}
            renderItem={({ item }) => <MovieCard movie={item} />}
            sliderWidth={width}
            itemWidth={266}
            inactiveSlideOpacity={0.8}
          />
        </View>

        {/* Popular movies */}
        <HorizontalSlider movies={popular} title="Popular now" />
        <HorizontalSlider movies={topRated} title="Top Rated" />
        <HorizontalSlider movies={upcoming} title="Upcoming" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
