import React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActionArea} from '@mui/material';

function DisplayEvents({event, func, type}){
    return(
        <Card sx = 
        {{mr:2, '&:hover': {
          boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
          transition: '0.3s'
        } }}>
          <CardActionArea onClick={() => func(event)}>
          <CardMedia
              component="img"
              height="270"
              image={event.poster_URL}
              alt={event.title}
            />
            <CardContent>
              {(type == "exhibition" &&
              <>
               <Typography gutterBottom variant="h4" component="div">
                {event.exhibition_name}
                </Typography>

              </>
              )}
               {(type == "event" &&
              <>
               <Typography gutterBottom variant="h4" component="div">
                {event.title}
                </Typography>
              </>
              )}

            <Typography gutterBottom variant="h7" component="div">
                {event.startDate}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
                {event.endDate}
            </Typography>  
            </CardContent>
          </CardActionArea>
          </Card>
    )
}
export default DisplayEvents;