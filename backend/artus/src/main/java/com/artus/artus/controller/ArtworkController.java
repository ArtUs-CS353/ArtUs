package com.artus.artus.controller;
import com.artus.artus.models.Artwork;
import com.artus.artus.service.ArtworkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/artwork")
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
                                                 @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
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
        boolean result = artworkService.createArtwork(artwork);

        if(result)
            return new ResponseEntity<>(artwork, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
