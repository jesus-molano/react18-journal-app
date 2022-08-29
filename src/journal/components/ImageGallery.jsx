import Box from '@mui/material/Box';
import {ImageList, ImageListItem} from '@mui/material';

export const ImageGallery = ({images = []}) => {
  return (
    <Box sx={{ width: '100%', height: 500, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image}>
            <img
              src={`${image}?w=248&fit=crop&auto=format`}
              srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={"note image"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
