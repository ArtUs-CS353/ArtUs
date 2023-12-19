package com.artus.artus.controllers;

import com.artus.artus.models.Artist;
import com.artus.artus.models.AuctionProperties;
import com.artus.artus.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/artists")
@CrossOrigin
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
    @GetMapping("search/{artistName}")
    public ResponseEntity<List<Artist>> getArtistByName(@PathVariable String artistName){
        return new ResponseEntity<>(artistService.searchArtistByNameBySurname(artistName),HttpStatus.OK);
    }

    @GetMapping("/featuring_artists")
    public ResponseEntity<List<Artist>> getFeaturingArtists(){
        return new ResponseEntity<>(artistService.getFeaturingArtists(),HttpStatus.OK);
    }

    @GetMapping("/{artist_id}/artwork_url")
    public ResponseEntity<String> getImageURL(@PathVariable int artist_id){
        return new ResponseEntity<>(artistService.getImageURL(artist_id), HttpStatus.OK);
    }
}
