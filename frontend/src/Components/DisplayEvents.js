import React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActionArea} from '@mui/material';

function DisplayEvents({event, func}){
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
              image={'https://d7hftxdivxxvm.cloudfront.net?height=667&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FOK0GVkyEWSSFJFz2TOqf0Q%2Fnormalized.jpg&width=800'}
              alt={event.title}
            />
            <CardContent>
            <Typography gutterBottom variant="h4" component="div">
            {event.exhibition_name}
            </Typography>
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