package com.artus.artus.controllers;

import com.artus.artus.models.Artist;
import com.artus.artus.models.AuctionProperties;
import com.artus.artus.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/artists")
public class ArtistController {
    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/allArtists")
    public ResponseEntity<List<Artist>> getAllArtist(){
        return new ResponseEntity<>(artistService.getAllArtists(), HttpStatus.OK);
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<Artist> getArtistByID(@PathVariable int artistId){
        return new ResponseEntity<>(artistService.getArtistByID(artistId), HttpStatus.OK);
    }

    @GetMapping("/{artistId}/auctions")
    public ResponseEntity<List<AuctionProperties>> getAuctionsByArtistID(@PathVariable int artistId){
        return new ResponseEntity<>(artistService.getAuctionsByArtistID(artistId),HttpStatus.OK);
    }
}