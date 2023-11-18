import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const pizzaData = [
  {
    id: 1,
    title: 'Banana com Canela',
    description: 'Banana, açúcar, canela',
    image: require("../../assets/banana_canela.jpg"),
  },
  {
    id: 2,
    title: 'Chocolate com Morango',
    description: 'Chocolate, morangos frescos, chantilly (opcional)',
    image: require("../../assets/chocolate_morango.png"),
  },
  {
    id: 3,
    title: 'Romeu e Julieta',
    description: 'Goiabada derretida, queijo branco',
    image: require("../../assets/romeu_julieta.png"),
  },
  {
    id: 4,
    title: 'Nutella com Frutas',
    description: 'Nutella, morangos, banana, outras frutas',
    image: require("../../assets/nutella_frutas.png"),
  },
  {
    id: 5,
    title: 'Maçã com Caramelo',
    description: 'Maçãs fatiadas, cobertura de caramelo, canela',
    image: require("../../assets/maca_caramelo.png"),
  }
];

const styles = {
  pizzaItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  pizzaImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
};

export function PizzaCarousel2() {
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
    console.log(`Visualizando Pizza ID ${pizzaData[newActiveSlide].id}`);
  };

  const handleNext = () => {
    const newActiveSlide = (activeSlide + 1) % pizzaData.length;
    setActiveSlide(newActiveSlide);
    console.log(`Visualizando Pizza ID ${pizzaData[newActiveSlide].id}`);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slide = Math.floor(event.nativeEvent.contentOffset.x / 300);
          setActiveSlide(slide);
          console.log(`Visualizando Pizza ID ${pizzaData[slide].id}`);
        }}
        style={styles.scrollViewContainer}
      >
        {pizzaData.map((pizza, index) => (
          <React.Fragment key={index}>
            {index === activeSlide && renderPizzaItem(pizza)}
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 45 }}>
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