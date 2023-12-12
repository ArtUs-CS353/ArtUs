package com.artus.artus.controllers;
import com.artus.artus.models.Artwork;
import com.artus.artus.services.ArtworkService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/artwork")
@CrossOrigin
public class ArtworkController {
    private final ArtworkService artworkService;

    @Autowired
    public ArtworkController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    @PostMapping("/upload")
    @Operation(summary = "To add new user to database", description = "Write user service")
    public ResponseEntity<Artwork> uploadArtworkAdmin(
                                                 @RequestParam("artistId") int artistId,
                                                 @RequestParam("title") String title,
                                                 @RequestParam("type") String type,
                                                 @RequestParam("size") String size,
                                                 @RequestParam("movement") String movement,
                                                 @RequestParam("price") float price,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("material") String material,
                                                 @RequestParam("rarity") String rarity,
                                                 @RequestParam("imageURL") String imageURL,
                                                 @RequestParam("date") LocalDate date,
                                                 @RequestParam("availability") String availability,
                                                 @RequestParam("Status") String status
    ) {
        Artwork artwork = new Artwork();
        artwork.setArtist_id(artistId);
        artwork.setTitle(title);
        artwork.setDescription(description);
        artwork.setType(type);
        artwork.setMaterial(material);
        artwork.setSize(size);
        artwork.setRarity(rarity);
        artwork.setImageURL(imageURL);
        artwork.setMovement(movement);
        artwork.setPrice(price);
        artwork.setDate(date);
        artwork.setAvailability(availability);
        artwork.setStatus(status);
        boolean result = artworkService.createArtwork(artwork);

        if(result)
            return new ResponseEntity<>(artwork, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Artwork>> getAllArtworks() {
        List<Artwork> artworks = artworkService.getAllArtworks();
        if(artworks != null){
            return new ResponseEntity<>(artworks, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<List<Artwork>> getArtworksByArtistId(@PathVariable int artistId) {
        List<Artwork> artworks = artworkService.getAllArtworksOfArtist(artistId);
        if(artworks != null){
            return new ResponseEntity<>(artworks, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/{artworkId}")
    public ResponseEntity<Artwork> getArtwork(@PathVariable int artworkId) {
        Artwork artwork = artworkService.getArtwork(artworkId);
        if(artwork != null){
            return new ResponseEntity<>(artwork, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
