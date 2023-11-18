import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;


const pizzaData = [
  {
    id: 1,
    title: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco',
    image: require("../../assets/margherita.jpg"),
  },
  {
    id: 2,
    title: 'Pepperoni',
    description: 'Molho de tomate, queijo, e fatias de pepperoni (salame de cura seco).',
    image: require("../../assets/pepperoni.jpg"),
  },
  {
    id: 3,
    title: 'Quatro Queijos',
    description: 'Molho de tomate, mussarela, gorgonzola, parmesão e provolone.',
    image: require("../../assets/quatroqueijos.png"),
  },
  {
    id: 4,
    title: 'Calabresa',
    description: 'Molho de tomate, queijo, linguiça calabresa fatiada e cebolas.',
    image: require("../../assets/calabresa.jpg"),
  },
  {
    id: 5,
    title: 'Frango com Catupiry',
    description: 'Molho de tomate, queijo, frango desfiado e catupiry (um tipo de requeijão cremoso).',
    image: require("../../assets/frango.jpg"),
  }
];

const styles = {
  pizzaItemContainer: {
    display: 'flex',
  },
  pizzaImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 100,
  },
  textCenter: {
    textAlign: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    marginBottom: 45,
  },
  arrowButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#EF5350',
    marginLeft: 5,
    marginRight: 5
  },
};

export function PizzaCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderPizzaItem = (pizza) => {
    return (
      <View key={pizza.id} style={styles.pizzaItemContainer}>
        <Image source={pizza.image} style={styles.pizzaImage} />
        <Text style={styles.textCenter}>{pizza.title}</Text>
        <Text style={styles.textCenter}>{pizza.description}</Text>
      </View>
    );
  };

  const handlePrev = () => {
    const newActiveSlide = activeSlide - 1 >= 0 ? activeSlide - 1 : pizzaData.length - 1;
    setActiveSlide(newActiveSlide);
  };

  const handleNext = () => {
    const newActiveSlide = (activeSlide + 1) % pizzaData.length;
    setActiveSlide(newActiveSlide);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slide = Math.floor(event.nativeEvent.contentOffset.x / windowWidth);
          setActiveSlide(slide);
        }}
        style={styles.scrollViewContainer}
      >
        {pizzaData.map((pizza, index) => (
          <React.Fragment key={index}>
            {index === activeSlide && renderPizzaItem(pizza)}
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -20 }}>
        {pizzaData.map((_, index) => (
          <View
            key={index}
            style={{
              ...styles.paginationDot,
              backgroundColor: index === activeSlide ? 'rgba(0, 0, 0, 0.92)' : 'rgba(0, 0, 0, 0.2)',
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
          <Icon name="arrow-forward" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}