// pages/index.js
// 'use client'
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const cities = [
    { 
      name: 'New York', 
      img: '/newyork.png', 
      description: 'New York, the city that never sleeps, offers endless entertainment, dining, and cultural experiences.',
      cards: [
        { 
          img: '/centralpark.png',
          title: 'Central Park Walking Tour',
          duration: '3 hours',
          features: ['Transportation', 'Food'],
          planType: 'Family Plan',
          reviews: '455 reviews',
          cost: '$45.00 per person'
        },
        { 
          img: '/statueofliberty.png',
          title: 'Statue of Liberty Tour',
          duration: '4 hours',
          features: ['Transportation', 'Guide'],
          planType: 'Family Plan',
          reviews: '385 reviews',
          cost: '$60.00 per person'
        },
      ]
    },
    { 
      name: 'California', 
      img: '/california.png', 
      description: 'California is known for its diverse landscapes, sunny beaches, and Hollywood glamour.',
      cards: [
        { 
          img: '/yosemite.png',
          title: 'Yosemite National Park Day Trip',
          duration: '12 hours',
          features: ['Transportation', 'Food'],
          planType: 'Family Plan',
          reviews: '250 reviews',
          cost: '$150.00 per person'
        },
        { 
          img: '/hollywood.png',
          title: 'Hollywood Tour',
          duration: '5 hours',
          features: ['Transportation', 'Guide'],
          planType: 'Family Plan',
          reviews: '300 reviews',
          cost: '$75.00 per person'
        },
      ]
    },
    { 
      name: 'Alaska', 
      img: '/alaska.png', 
      description: 'Alaska, a land of stunning natural beauty, offers breathtaking glaciers, mountains, and wildlife.',
      cards: [
        { 
          img: '/al1.png',
          title: 'Westminster to Greenwich River Thames',
          duration: '2 hours',
          features: ['Transportation', 'Guide'],
          planType: 'Family Plan',
          reviews: '584 reviews',
          cost: '$35.00 per person'
        },
        { 
          img: '/al2.png',
          title: 'Vintage Double Decker Bus Tour & Thames',
          duration: '2 hours',
          features: ['Transportation', 'Guide'],
          planType: 'Family Plan',
          reviews: '584 reviews',
          cost: '$35.00 per person'
        },
        { 
          img: '/al3.png',
          title: 'Magic of London Tour with Afternoon Tea at',
          duration: '2 hours',
          features: ['Transportation', 'Guide', 'Food'],
          planType: 'Family Plan',
          reviews: '584 reviews',
          cost: '$35.00 per person'
        },
      ]
    },
    { 
      name: 'Sydney', 
      img: '/sydney.png', 
      description: 'Sydney is famous for its iconic Opera House, beautiful harbour, and vibrant cultural scene.',
      cards: [
        { 
          img: '/sydney_opera.png',
          title: 'Sydney Opera House Tour',
          duration: '1.5 hours',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '720 reviews',
          cost: '$30.00 per person'
        },
        { 
          img: '/sydney_harbour.png',
          title: 'Sydney Harbour Cruise',
          duration: '2 hours',
          features: ['Transportation', 'Guide'],
          planType: 'Family Plan',
          reviews: '650 reviews',
          cost: '$40.00 per person'
        },
      ]
    },
    { 
      name: 'Dubai', 
      img: '/dubai.png', 
      description: 'Dubai is a city of superlatives, known for its futuristic architecture and luxury shopping.',
      cards: [
        { 
          img: '/dubai_burj.png',
          title: 'Burj Khalifa Tour',
          duration: '1 hour',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '800 reviews',
          cost: '$50.00 per person'
        },
        { 
          img: '/dubai_desert.png',
          title: 'Desert Safari',
          duration: '6 hours',
          features: ['Transportation', 'Food', 'Guide'],
          planType: 'Family Plan',
          reviews: '750 reviews',
          cost: '$100.00 per person'
        },
      ]
    },
    { 
      name: 'London', 
      img: '/london.png', 
      description: 'London, a historic city, boasts landmarks like the Tower of London, Big Ben, and the British Museum.',
      cards: [
        { 
          img: '/london_tower.png',
          title: 'Tower of London Tour',
          duration: '3 hours',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '900 reviews',
          cost: '$40.00 per person'
        },
        { 
          img: '/london_eye.png',
          title: 'London Eye Experience',
          duration: '30 minutes',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '850 reviews',
          cost: '$25.00 per person'
        },
      ]
    },
    { 
      name: 'Tokyo', 
      img: '/tokyo.png', 
      description: 'Tokyo is a bustling metropolis that blends the ultramodern with the traditional, offering unique experiences.',
      cards: [
        { 
          img: '/tokyo_tower.png',
          title: 'Tokyo Tower Tour',
          duration: '1 hour',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '650 reviews',
          cost: '$20.00 per person'
        },
        { 
          img: '/tokyo_sushi.png',
          title: 'Sushi Making Experience',
          duration: '2 hours',
          features: ['Food', 'Guide'],
          planType: 'Family Plan',
          reviews: '700 reviews',
          cost: '$50.00 per person'
        },
      ]
    },
    { 
      name: 'Delhi', 
      img: '/delhi.png', 
      description: 'Delhi, the capital of India, is rich in history and culture, with landmarks such as the Red Fort and India Gate.',
      cards: [
        { 
          img: '/delhi_fort.png',
          title: 'Red Fort Tour',
          duration: '2 hours',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '500 reviews',
          cost: '$15.00 per person'
        },
        { 
          img: '/delhi_gate.png',
          title: 'India Gate Tour',
          duration: '1 hour',
          features: ['Guide'],
          planType: 'Family Plan',
          reviews: '450 reviews',
          cost: '$10.00 per person'
        },
      ]
    },
  ];
  

export default function Popular_Cities() {
  const [selectedCity, setSelectedCity] = useState(cities[2]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <Head>
        <title>Explore Popular Cities</title>
      </Head>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Explore Popular Cities</h1>
        <p className="text-center mb-8 text-gray-600">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
        </p>
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityClick(city)}
              className={`py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                selectedCity.name === city.name ? 'bg-gray-100' : ''
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
        <div className="relative mb-8">
          <img src={selectedCity.img} alt={selectedCity.name} className="w-full h-[30rem] sm:h-[35rem] object-cover rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-6 rounded-b-lg">
            <h2 className="text-3xl font-bold mb-2">{selectedCity.name}</h2>
            <p className="text-gray-600 mb-4">{selectedCity.description}</p>
            <div className="flex flex-wrap space-x-2">
              <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Public Transportations</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Nature & Adventure</span>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Private Transportations</span>
              <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Business Tours</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">Local Visit</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {selectedCity.cards.map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img src={card.img} alt={card.title} className="w-full h-48 sm:h-56 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-2">Duration: {card.duration}</p>
              <div className="flex flex-wrap mb-2">
                {card.features.map((feature, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">{feature}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-2">Plan Type: {card.planType}</p>
              <p className="text-gray-600 mb-2">Reviews: {card.reviews}</p>
              <p className="text-gray-600 font-bold">{card.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}