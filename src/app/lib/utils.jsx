import { FaKitchenSet, FaStairs } from 'react-icons/fa6';
import { MdOutlineLiving, MdOutlineWindow } from 'react-icons/md';
import { PiDesk } from 'react-icons/pi';
import { GiWindow, GiTheaterCurtains, GiWoodFrame } from 'react-icons/gi';
import { FaDoorOpen } from 'react-icons/fa';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { BiCloset } from "react-icons/bi";

const size = '1.35rem';
const categories = {
  'Burós': <RiArchiveDrawerFill size={size} />,
  'Closets': <BiCloset size={size} />,
  'Cocinas': <FaKitchenSet size={size} />,
  'Cortineros': <GiTheaterCurtains size={size} />,
  'Marcos': <GiWoodFrame size={size} />,
  'Mesas': <PiDesk size={size} />,
  'Pasamanos': <FaStairs size={size} />,
  'Puertas': <FaDoorOpen size={size} />,
  'Para Sala': <MdOutlineLiving size={size} />,
  'Ventanas': <GiWindow size={size} />,
  'Vitrinas': <MdOutlineWindow size={size} />
};

export const getCategoryIcon = (category) => {
  return categories[category];
};