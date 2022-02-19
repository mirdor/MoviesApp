import React, { useContext } from 'react';
import { FlatList, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import useMovies from '../hooks/useMovies';
import ImageColors from 'react-native-image-colors';

import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import getColors from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const HomeScreen = () => {
  const { popular, nowPlaying, upcoming, topRated, isLoading } = useMovies();

  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const { setMainColors } = useContext(GradientContext);

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
    console.log('apla');
  }, [nowPlaying]);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];

    const [primary = 'blue', secondary = 'lightblue'] = await getColors(movie.poster_path);

    setMainColors({
      primary,
      secondary,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <GradientBackground>
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
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Popular movies */}
          <HorizontalSlider movies={popular} title="Popular now" />
          <HorizontalSlider movies={topRated} title="Top Rated" />
          <HorizontalSlider movies={upcoming} title="Upcoming" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
