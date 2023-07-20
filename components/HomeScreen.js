import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import React from 'react';
import background from '../assets/background.jpg';

const HomeScreen = ({ navigation }) => {

    const handleLinkPress = () => {
      const url = 'https://portfolio-website-rajib.vercel.app/';
      Linking.openURL(url);
    };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image} resizeMode="cover">
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Jalpaiguri Govt. Engineering College
          </Text>
          
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GenerateIdentity')}>
            <Text style={styles.buttonText}>
              Generate Identity Card
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.footerText}>
              Made with ❤️ by Rajib Ghosh
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 100,
    textAlign: 'center',
    color: '#06a5ee',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3e404a',
    paddingVertical: 6,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#ffff',
  },
});

export default HomeScreen;
