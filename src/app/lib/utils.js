import { FaKitchenSet, FaStairs } from 'react-icons/fa6';
import { MdOutlineLiving, MdOutlineWindow } from 'react-icons/md';
import { PiDesk } from 'react-icons/pi';
import { GiWindow, GiTheaterCurtains, GiWoodFrame } from 'react-icons/gi';
import { FaDoorOpen } from 'react-icons/fa';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { BiCloset, BiBath } from "react-icons/bi";
import { LiaBedSolid } from "react-icons/lia";

const size = '1.35rem';
const categories = {
  'Baño': <BiBath size={size} />,
  'Burós': <RiArchiveDrawerFill size={size} />,
  'Cabeceras': <LiaBedSolid size={size} />,
  'Clósets': <BiCloset size={size} />,
  'Cocina': <FaKitchenSet size={size} />,
  'Cortineros': <GiTheaterCurtains size={size} />,
  'Marcos': <GiWoodFrame size={size} />,
  'Mesas y sillas': <PiDesk size={size} />,
  'Escaleras': <FaStairs size={size} />,
  'Puertas': <FaDoorOpen size={size} />,
  'Sala y Recámara': <MdOutlineLiving size={size} />,
  'Ventanas': <GiWindow size={size} />,
  'Vitrinas': <MdOutlineWindow size={size} />
};

export const getCategoryIcon = (category) => {
  return categories[category];
};

export const isDarkColor = (hex) => {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(hexChar => {
      return hexChar + hexChar;
    }).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq < 192;
};

export const updateFurnitureItemData = (furnitureItems, setFurnitureItems, id, data) => {
  setFurnitureItems(furnitureItems.map(item =>
    item.id === id ?{ ...item, ...data } : item
  ));
};