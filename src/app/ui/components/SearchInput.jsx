'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { debounce } from 'lodash';

import {
  InputBase,
  MenuItem,
  Typography,
  Grow,
  CircularProgress }
from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import FurnitureDetailModal from './FurnitureDetailModal';

import { handleLikeClick, handleClickOutside } from '@/app/lib/utils';

import { 
  getFurnitureItemCompleteBySearch,
  isLocalFurnitureItem }
from '@/app/lib/ajax';

export default function SearchInput({ expanded, setExpanded }) {

  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const menuRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    document.addEventListener(
      'mousedown', (e) => handleClickOutside(e, menuRef, barRef, setOpen, setExpanded)
    );
    return () => {
      document.removeEventListener(
        'mousedown', (e) => handleClickOutside(e, menuRef, barRef, setOpen, setExpanded)
      );
    };
  }, []);

  useEffect(() => {
    if (modalData)
      setLiked(isLocalFurnitureItem(modalData.id));
  }, [modalData])

  const handleOpen = () => {
    if (!expanded)
      setExpanded(true);
    if (open || results.length === 0)
      return;
    setOpen(true);
  };

  const handleResultClick = (result) => {
    setOpen(false);
    setModalData(result);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const debouncedSearch = useMemo(() => {
    return debounce(query => {
      fetchSearchResults(query);
    }, 750);
  }, []);

  const fetchSearchResults = async (query) => {
    setSearchLoading(true);
    try {
      const result = await getFurnitureItemCompleteBySearch(query);
      setResults(result.rows);
      if (!open && result.rows.length > 0)
        setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 2)
      debouncedSearch(query);
  };

  const updateResultItem = (id, data) => {
    setModalData(prevState => ({
      ...prevState,
      ...data
    }));
    
    setResults(results.map(item =>
      item.id === id ? { ...item, ...data } : item
    ));
  };

  return (
    <>
      <div
        ref={barRef}
        onClick={handleOpen}
        className={`${expanded ? 'w-[calc(100%-80px)] sm:w-[350px]' : 'w-[40px] sm:w-[200px]'} transition-all linear ml-auto flex h-[40px] bg-white/15 hover:bg-white/25 rounded-[3px]`}
      >
        <div className='flex items-center justify-center w-[40px] h-[40px] pointer-events-none '>
          {searchLoading
            ? <CircularProgress size={20} sx={{ color: 'white' }} />
            : <SearchIcon />
          }
        </div>
        <InputBase
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar…"
          inputProps={{ 'aria-label': 'search' }}
          sx={{ color: 'white' }}
          className='pl-0 w-[calc(100%-40px)]'
        />
        {open && (
          <Grow in={open}>
            <div
              ref={menuRef}
              className='w-[calc(100%-120px)] sm:w-[350px] absolute top-[55px] rounded-[4px] bg-white shadow-lg text-black'
            >
              {results.length > 0 && results.map(result => (
                <MenuItem onClick={() => handleResultClick(result)} key={result.id} sx={{ paddingX: 2.5, paddingY: 1.5 }}>
                  <Typography variant='body1' noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }} >
                    {result.description}
                  </Typography>
                </MenuItem>
              ))}
            </div>
          </Grow>
        )}  
      </div>
      {modalData &&
        <FurnitureDetailModal
          open={openModal}
          handleClose={handleCloseModal}
          data={modalData}
          liked={liked}
          handleLikeClick={() => handleLikeClick(liked, setLiked, modalData.id)}
          updateItemState={updateResultItem}
        />
      } 
    </>
  );
};