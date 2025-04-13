import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import the LinearGradient component
import {useNavigation} from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#003087', '#69CFF7']} // Set your gradient colors
      style={styles.gradientBox}>
      <View style={styles.innerBlueBox}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between', // Changed to space-between for better layout
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              // Ensure the first column of texts stays within bounds
            }}>
            <Text style={styles.title}>5</Text>
            <Text style={styles.title}>Current Points</Text>
          </View>

          {/* Separator line fixed */}
          <View
            style={{
              width: 1, // Width of the vertical line
              backgroundColor: '#ccc', // Line color
              height: '80%', // Adjust the height to span the space between the two sections
              marginHorizontal: 10, // Space around the line horizontally
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flex: 0.5,
              marginLeft: 10, // Added some space from the left
              maxWidth: 300, // Set maxWidth to prevent overflow
            }}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/Loading_circle.png')}
            />
            <Text style={styles.title2} numberOfLines={3}>
              You are 30 points away from your next reward
            </Text>
            <Text> </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  innerBlueBox: {
    height: 88, // Height of the inner blue box
    width: '90%', // Use a percentage for the width of the inner box to be more responsive
    backgroundColor: '#003087', // Blue background for the inner box
    borderRadius: 5, // Optional: rounded corners for the inner box
    marginTop: 50,
    paddingHorizontal: 10, // Added padding to ensure space inside
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: 'white',
  },
  tinyLogo: {
    marginRight: 10,
  },
  gradientBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, // Set the height of the box
    width: '100%', // Use the full screen width
  },
  title2: {
    color: 'white', // White text color for contrast
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap', // Ensure text can wrap
    flex: 2, // Allow text to take up available space
    maxWidth: 200, // Limit the width of the second Text component
  },
});

export default CustomHeader;
