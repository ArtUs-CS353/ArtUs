package com.artus.artus.controllers;

import com.artus.artus.models.ArtistRequest;
import com.artus.artus.services.ArtistRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/artist_request")
@CrossOrigin
public class ArtistRequestController {
    private final ArtistRequestService artistRequestService;

    @Autowired
    public ArtistRequestController(ArtistRequestService artistRequestService) {
        this.artistRequestService = artistRequestService;
    }

    @PostMapping("/createRequest")
    public ResponseEntity<Boolean> createArtistRequest(
            @RequestParam("user_name") String user_name,
            @RequestParam("user_surname") String user_surname,
            @RequestParam("profile_details") String profile_details,
            @RequestParam("biography") String biography) {
        if(artistRequestService.createArtistRequest(user_name,user_surname,profile_details,biography)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ArtistRequest>> getAllRequests() {
        List<ArtistRequest> requests = artistRequestService.getAllRequests();
        if(requests != null){
            return new ResponseEntity<>(requests, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @DeleteMapping("/accept/{request_id}")
    public ResponseEntity<Boolean> accept(@PathVariable int request_id){
        if(artistRequestService.acceptArtistRequest(request_id)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @DeleteMapping("/reject/{request_id}")
    public ResponseEntity<Boolean> reject(@PathVariable int request_id){
        if(artistRequestService.rejectArtistRequest(request_id)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

}
