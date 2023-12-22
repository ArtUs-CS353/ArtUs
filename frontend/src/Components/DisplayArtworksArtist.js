import React, { useState } from 'react';
import { Typography, Card, CardMedia, CardContent, CardActionArea, Button, Grid } from '@mui/material';

function DisplayArtworkArtist({ artwork, type, func, funcAuction }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  // Common styles for both buttons
  const buttonStyles = {
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -30%)',
    zIndex: 2,
    textTransform: 'none',
    backgroundColor: '#302F4D',
  };

  return (
    <Card
      sx={{
        mr: 2,
        position: 'relative',
        '&:hover': {
          boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
          transition: '0.3s',
          zIndex: 1, // Ensure the hovered card is on top
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea>
        <Grid>
        <CardMedia
          component="img"
          height="300"
          width="200"
          image={artwork.imageURL}
          alt={artwork.title}
        />
        <CardContent onClick={() => func(artwork)}>
          {type === 'artwork' && (
            <>
              <Typography gutterBottom variant="h5" component="div">
                {artwork.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${artwork.material} ${artwork.type}, ${artwork.year}`}
              </Typography>
            </>
          )}
        </CardContent>
        </Grid>
        {(isMouseOver && (artwork.status !== 'auction' && artwork.status !== "sold"))  && (
          <Button
            variant="contained"
            size="small"
            onClick={() => funcAuction(artwork)}
            sx={{...buttonStyles}}
          >
            Create Auction Request
          </Button>
        )}
        {isMouseOver && artwork.status === 'auction' && (
          <Button
            variant="contained"
            size="small"
            disabled
            sx={{...buttonStyles}}
          >
            Already on Auction
          </Button>
        )}

        {isMouseOver && artwork.status === 'sold' && (
          <Button
            variant="contained"
            size="small"
            disabled
            sx={{...buttonStyles}}
          >
            Sold
          </Button>
        )}
      </CardActionArea>
    </Card>
  );
}

export default DisplayArtworkArtist;