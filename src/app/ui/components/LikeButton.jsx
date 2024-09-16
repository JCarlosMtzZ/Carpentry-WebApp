import { IconButton } from '@mui/material';

import ThumbIcon from '@mui/icons-material/ThumbUp';

export default function LikeButton({ onClick, liked }) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="like"
      edge="start"
      size='medium'
      sx={{
        color: liked ? 'white' : 'black',
        m: 1,
        backgroundColor: liked ? '#52b9dd' : 'white',
        opacity: 0.9,
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
        ':hover': {
          backgroundColor: liked ? '#52b9dd' : 'lightgray',
          opacity: 1
        }
      }}
    >
      <ThumbIcon />
    </IconButton>
  );
};