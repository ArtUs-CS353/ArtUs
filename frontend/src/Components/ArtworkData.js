import React from "react";
import image1 from './Images/image1.png';
import image2 from './Images/image2.png';
import image3 from './Images/image3.png';

export const ArtworkData = [

    { artwork_id: 1,
      title: 'I shop therefore I am', 
      artist: 'Barbara Kruger', 
      year: '1987', 
      image: image1, 
      type: "Photography", 
      material: "Paper", 
      size : "100x120",
      rarity: "Rare",
      movement: "Pop Culture",
      description: "Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.",
      date: "22/10/2022",
      is_featuring: true,
      status: "onAuction",
      availability: "available" },
      
    { artwork_id: 2, 
      title: 'Eroded Car',
      artist: 'Daniel Arsham', 
      year: '2018', 
      image: image2, 
      price: '$2500' ,  
      type: "Sculpture", 
      material: "Metal", 
      size : "100x120x80",
      rarity: "Unique",
      movement: "Expressionism",
      description: "Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.",
      date: "22/10/2023",
      is_featuring: true,
      status: "onSale",
      availability: "available" },


    { artwork_id: 3,
      title: 'Scream', 
      artist: 'Takashi Murakami', 
      year: '1999', 
      image: image3, 
      price: '$1500',  
      type: "Painting", 
      material: "Gemstone", 
      size : "100x120",
      rarity: "Common",
      movement: "Expressionism",
      description: "Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.",
      date: "02/07/2022",
      is_featuring: true,
      status: "onSale",
      availability: "available" },
]