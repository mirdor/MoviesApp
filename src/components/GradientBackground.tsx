import React, { useContext } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';
import useFade from '../hooks/useFade';

interface Props {
  children: React.ReactNode;
}

const GradientBackground = ({ children }: Props) => {
  const { colorsState, prevColors, setPrevMainColors } = useContext(GradientContext);

  const { opacity, fadeIn, fadeOut } = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevMainColors(colorsState);
      fadeOut();
    });
  }, [colorsState]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.8, y: 0.8 }}
        colors={[prevColors.primary, prevColors.secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
      />

      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
        <LinearGradient
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 0.8, y: 0.8 }}
          colors={[colorsState.primary, colorsState.secondary, 'white']}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default GradientBackground;
