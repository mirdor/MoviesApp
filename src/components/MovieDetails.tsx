import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Cast } from '../interfaces/creditsInterface';
import { MovieDetails as MovieDetailsInterface } from '../interfaces/movieInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import CastItem from './CastItem';

interface Props {
  movieData: MovieDetailsInterface;
  cast: Cast[];
}

const MovieDetails = ({ movieData, cast }: Props) => {
  return (
    <>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="star-outline" size={16} color="grey" />
          <Text style={{ marginLeft: 5 }}>{movieData.vote_average}</Text>

          <Text> - {movieData.genres.map(genre => genre.name).join(', ')}</Text>
        </View>

        {/* Overview */}

        <Text style={styles.title}>Overview</Text>
        <Text style={{ fontSize: 16 }}>{movieData.overview}</Text>

        {/* Budget */}

        <Text style={styles.title}>Budget</Text>
        <Text style={{ fontSize: 18 }}>
          {currencyFormatter.format(movieData.budget, { code: 'USD' })}
        </Text>

        {/* Casting */}
      </View>
      <View style={{ marginTop: 10, marginBottom: 100 }}>
        <Text style={{ ...styles.title, marginHorizontal: 20 }}>Cast</Text>

        <FlatList
          data={cast}
          renderItem={({ item }) => <CastItem actor={item} />}
          keyExtractor={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 15, height: 70 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#111',
  },
});

export default MovieDetails;
