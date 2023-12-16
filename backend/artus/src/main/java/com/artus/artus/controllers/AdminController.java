package com.artus.artus.controllers;

import com.artus.artus.models.Artist;
import com.artus.artus.models.Artwork;
import com.artus.artus.services.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    private final ReportService reportService;

    public AdminController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/mostFollowedArtists")
    public ResponseEntity<List<Artist>> getMostFollowerArtist(){
        return new ResponseEntity<>(reportService.getMostFollowedArtists(), HttpStatus.OK);
    }

    @RequestMapping (path="/mostFavoriteArtworks", method=RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Artwork> getMostFavoriteArtworks(){
        return reportService.getMostFavoriteArtworks();
    }

    @GetMapping("/topSellingArtists")
    public ResponseEntity<List<Map<String,Integer>>> getTopSellingArtists()
    {
        return new ResponseEntity<>(reportService.getTopSellingArtists(),HttpStatus.OK);
    }

    @GetMapping("/topCollectors")
    public ResponseEntity<List<Map<Map<String,Integer>,Integer>>> getTopCollectors(){
        return new ResponseEntity<>(reportService.getTopCollectors(),HttpStatus.OK);
    }

    @GetMapping("/highestBids")
    public ResponseEntity<List<Map<Map<String,Integer>,Integer>>> getHighestBids(){
        return new ResponseEntity<>(reportService.getTopBids(),HttpStatus.OK);
    }

    
}
