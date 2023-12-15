package com.artus.artus.controllers;

import com.artus.artus.models.Notification;
import com.artus.artus.services.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByID(@PathVariable int userId){
        return new ResponseEntity<>(notificationService.getNotificationsByUserID(userId), HttpStatus.OK);
    }
    @GetMapping("/{userId}/{type}")
    public ResponseEntity<List<Notification>> getNotificationsByIDByType(@PathVariable int userId,@PathVariable String type){
        return new ResponseEntity<>(notificationService.getNotificationByUserIDByType(userId, type), HttpStatus.OK);
    }
}
