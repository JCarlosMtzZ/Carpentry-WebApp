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
  'Baños': <BiBath size={size} />,
  'Burós': <RiArchiveDrawerFill size={size} />,
  'Cabeceras': <LiaBedSolid size={size} />,
  'Clósets': <BiCloset size={size} />,
  'Cocinas': <FaKitchenSet size={size} />,
  'Cortineros': <GiTheaterCurtains size={size} />,
  'Marcos': <GiWoodFrame size={size} />,
  'Mesas y sillas': <PiDesk size={size} />,
  'Escaleras': <FaStairs size={size} />,
  'Puertas': <FaDoorOpen size={size} />,
  'Para Sala': <MdOutlineLiving size={size} />,
  'Ventanas': <GiWindow size={size} />,
  'Vitrinas': <MdOutlineWindow size={size} />
};

export const getCategoryIcon = (category) => {
  return categories[category];
};