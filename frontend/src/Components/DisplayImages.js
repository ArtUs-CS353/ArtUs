import React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActionArea} from '@mui/material';

function DisplayImages({artwork, type, func}){
    return(
        <Card sx = 
        {{mr:2, '&:hover': {
          boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
          transition: '0.3s'
        } }}>
          <CardActionArea onClick={() => func(artwork)}>
          <CardMedia
              component="img"
              height="270"
              image={artwork.imageURL}
              alt={artwork.title}
            />
            <CardContent>

                {type === "artist" &&(
                    <Typography gutterBottom variant="h5" component="div">
                    {artwork.artist}
                  </Typography>
                )}

                {type === "artwork" && (
                <>
                    <Typography gutterBottom variant="h5" component="div">
                    {artwork.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {`${artwork.artist}, ${artwork.year}`}
                    </Typography>
                    {artwork.status === "auction" && (
                      <Typography variant="body1" sx={{fontWeight: 'bold', color:"purple"}}>On Auction</Typography>
                    )}
                    {artwork.status === "sale" && (
                    <Typography variant="body1">${artwork.price}</Typography>
                    )}
                </>
                )}

                 
            </CardContent>
          </CardActionArea>
          </Card>
    )
}
export default DisplayImages;