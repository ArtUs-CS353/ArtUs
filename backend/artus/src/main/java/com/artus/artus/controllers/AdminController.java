package com.artus.artus.controllers;

import com.artus.artus.models.Artist;
import com.artus.artus.models.Artwork;
import com.artus.artus.services.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    
}
