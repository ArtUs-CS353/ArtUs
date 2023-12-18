package com.artus.artus.controllers;

import com.artus.artus.models.Notification;
import com.artus.artus.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;
    private final ArtworkService artworkService;
    private final BidService bidService;
    private final ArtistService artistService;
    private final AuctionService auctionService;
    private final EventService eventService;

    public NotificationController(NotificationService notificationService, ArtworkService artworkService, BidService bidService, ArtistService artistService, AuctionService auctionService, EventService eventService) {
        this.notificationService = notificationService;
        this.artworkService = artworkService;
        this.bidService = bidService;
        this.artistService = artistService;
        this.auctionService = auctionService;
        this.eventService = eventService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByID(@PathVariable int userId){
        return new ResponseEntity<>(notificationService.getNotificationsByUserID(userId), HttpStatus.OK);
    }
    @GetMapping("/{userId}/{type}")
    public ResponseEntity<List<Notification>> getNotificationsByIDByType(@PathVariable int userId,@PathVariable String type){
        return new ResponseEntity<>(notificationService.getNotificationByUserIDByType(userId, type), HttpStatus.OK);
    }

    @GetMapping("/activityHistory/{user_id}")
    public ResponseEntity<Map<String,List<String>>> getActivityHistory(@PathVariable int user_id){
        Map<String,List<String>> map = new HashMap<>();
        if(artistService.checkArtistByID(user_id)) {
            map.put("Auction", auctionService.getAuctionHistory(user_id));
            map.put("Event",eventService.getEventHistory(user_id));
        }else {
            map.put("Bid",bidService.getBidHistory(user_id));
            map.put("Purchase",artworkService.getPurchaseHistory(user_id));
        }
        map.put("Sell",artworkService.getSellHistory(user_id));
        return new ResponseEntity<>(map,HttpStatus.OK);
    }
}
