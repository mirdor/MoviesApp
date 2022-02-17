import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  title?: string;
}

const HorizontalSlider = ({ movies, title }: Props) => {
  return (
    <View
      style={{
        height: title ? 300 : 260,
      }}>
      {title && <Text style={{ fontSize: 30, fontWeight: '700', marginLeft: 10 }}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} width={160} height={240} />}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalSlider;
