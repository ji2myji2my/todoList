import React from "react";
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet, useWindowDimensions } from "react-native";

//Images import 
import lightBgDesktop from "../assets/images/bg-desktop-light.jpg";
import lightBgMobile from "../assets/images/bg-mobile-light.jpg"; 
import MoonIcon from "../assets/images/icon-moon.svg";


const LightDarkBar = () => {

    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const backgroundSource = isMobile ? lightBgMobile : lightBgDesktop;

    const styles = StyleSheet.create({

      imageContainer: {
        width: "100%",
        height: "40vh",
        zIndex: -1,
        position: 'absolute',
        // minHeighth: isMobile ? "50vh" : "40vh",
      },
    
      container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'stretch',
        // alignContent: 'space-between',
        zIndex: 1,
        // position: 'relative',
        marginInline: 'auto',
        maxWidth: '80vw',
      },
    
      modeHandlebtn: {
        width: 60,
        height: 60,
      },
    
      imageTheme: {
        width: "100%",
        height: "100%",
      },
    
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
      },
    
    });


    return (
        <ImageBackground source={backgroundSource} resizeMode={isMobile ? "contain" : "cover"} style={styles.imageContainer} alt="Bckgrnd">

            <View style={styles.container}>

                <Text style={styles.sectionTitle}>TODO</Text>

                <TouchableOpacity style={styles.modeHandlebtn} >
                  <MoonIcon width={100} height={100} fill="#333" />
                </TouchableOpacity>

            </View>

        </ImageBackground>
    )

}

// const styles = StyleSheet.create({

//   imageContainer: {
//     // width: "100%",
//     height: "30vh",
//   },

//   container: {
//     marginTop: 30,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',

//   },

//   modeHandlebtn: {
//     width: 60,
//     height: 60,
//   },

//   imageTheme: {
//     width: "100%",
//     height: "100%",
//   },

//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },

// });


export default LightDarkBar;