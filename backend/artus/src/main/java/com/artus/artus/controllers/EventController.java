package com.artus.artus.controllers;
import com.artus.artus.models.Event;
import com.artus.artus.services.EventService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @PostMapping("/create")
    /*
    user_id int, event_id int NOT NULL AUTO_INCREMENT, link varchar(50), start_date datetime, end_date datetime, poster_URL varchar(50), meeting_link varchar(50), status varchar(50)
     */
    public ResponseEntity<Event> createEvent(@RequestParam("user_id") int artistId,
                                                 @RequestParam("eventLink") String link,
                                                 @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime startDatetime,
                                                 @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime endDatetime,
                                                 @RequestParam("posterURL") String posterURL) {
      
        if(startDatetime.isBefore(LocalDateTime.now())){
            System.out.println("Start datetime must be in the future");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        if(endDatetime.isBefore(startDatetime)){
            System.out.println("End datetime must be after start datetime");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // Your existing code to create an event
        Event event = new Event();
        event.setArtist_id(artistId);
        event.setMeeting_link(link);
        event.setPoster_URL(posterURL);
        event.setStart_date(startDatetime);
        event.setEnd_date(endDatetime);
        event.setStatus("waiting");

        boolean result = eventService.createEvent(event);

        if (result) {
            return new ResponseEntity<>(event, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllWaitingEvents")
    public ResponseEntity<List<Event>> getAllWaitingEvents(){
        List<Event> events = eventService.getAllWaitingEvents();
        if(events != null ){
            return new ResponseEntity<>(events, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllApprovedEvents")
    public ResponseEntity<List<Event>> getAllApprovedEvents(){
        List<Event> events = eventService.getAllApprovedEvents();
        if(events != null ){
            return new ResponseEntity<>(events, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllDeclinedEvents")
    public ResponseEntity<List<Event>> getAllDeclinedEvents(){
        List<Event> events = eventService.getAllDeclinedEvents();
        if(events != null ){
            return new ResponseEntity<>(events, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllApprovedCurrentEvents")
    public ResponseEntity<List<Event>> getAllApprovedCurrentEvents(){
        List<Event> events = eventService.getAllApprovedCurrentEvents();
        if(events != null ){
            return new ResponseEntity<>(events, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllApprovedFutureEvents")
    public ResponseEntity<List<Event>> getAllApprovedFutureEvents(){
        List<Event> events = eventService.getAllApprovedFutureEvents();
        if(events != null ){
            return new ResponseEntity<>(events, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }


    @PutMapping("/approve/{eventId}")
    public ResponseEntity<Boolean> approveEvent(@PathVariable int eventId){
        Boolean result = eventService.approveEvent(eventId);
        if(result){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/decline/{eventId}")
    public ResponseEntity<Boolean> declineEvent(@PathVariable int eventId){
        Boolean result = eventService.declineEvent(eventId);
        if(result ){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

}
