import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import useMovieDetails from '../hooks/useMovieDetails';
import Spinner from '../components/Spinner';
import MovieDetails from '../components/MovieDetails';

interface Props extends NativeStackScreenProps<RootStackParamList, 'DetailsScreen'> {}

const DetailsScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const { height } = useWindowDimensions();
  const { isLoading, cast, movieData } = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={{ ...styles.imageContainer, height: height * 0.7 }}>
        <Image source={{ uri }} style={styles.posterImage} />
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      <View style={styles.marginContainer}></View>
      {isLoading ? <Spinner /> : <MovieDetails movieData={movieData!} cast={cast} />}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backButton}
        onPress={() => navigation.pop()}>
        <Icon color="white" name="arrow-back-outline" size={45} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    top: 20,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 100,
    padding: 5,
  },
});

export default DetailsScreen;
