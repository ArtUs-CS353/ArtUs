package com.artus.artus.controllers;
import com.artus.artus.models.Artwork;
import com.artus.artus.models.Auction;
import com.artus.artus.services.ArtworkService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/artwork")
public class ArtworkController {
    private final ArtworkService artworkService;

    @Autowired
    public ArtworkController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    @PostMapping("/upload")
    @Operation(summary = "To add new artwork to database")
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
            @RequestParam("availability") String availability
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
        artwork.setStatus("waiting");
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

    @GetMapping("/getAllFeatured")
    public ResponseEntity<List<Artwork>> getAllFeaturedArtworks() {
        List<Artwork> artworks = artworkService.getAllFeaturedArtworks();
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
    @GetMapping("/auction/{artworkId}")
    public ResponseEntity<Auction> getArtworkAuction(@PathVariable int artworkId) {
        Auction auction = artworkService.getArtworkAuction(artworkId);
        if(auction != null){
            return new ResponseEntity<>(auction, HttpStatus.OK);
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

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Artwork>> searchArtworkWithTitle(@PathVariable String title){
        List<Artwork> artworkList = artworkService.searchArtworkWithTitle(title);
        if(artworkList != null)
            return new ResponseEntity<>(artworkService.searchArtworkWithTitle(title),HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
    }

    @GetMapping("filter")
    public ResponseEntity<List<Artwork>> filterArtworks(@RequestParam(value = "types" , required = false) List<String> types,
                                                        @RequestParam(value = "material" , required = false) List<String> material,
                                                        @RequestParam(value = "rarity" , required = false) List<String> rarities,
                                                        @RequestParam(value = "min_price" , required = false) Integer minPrice,
                                                        @RequestParam(value = "max_price" , required = false) Integer maxPrice,
                                                        @RequestParam(value = "start_date" , required = false) LocalDate startDatetime,
                                                        @RequestParam(value = "end_date", required = false) LocalDate endDatetime)
    {
        return new ResponseEntity<>(artworkService.filterArtworks(types,material,rarities,minPrice,maxPrice,startDatetime,endDatetime),HttpStatus.OK);
    }

    @GetMapping("/explorePage")
    public ResponseEntity<List<Artwork>> getExplorePage(){
        return new ResponseEntity<>(artworkService.getExplorePage(),HttpStatus.OK);
    }


    @GetMapping("/explorePage/{user_id}")
    public ResponseEntity<List<Artwork>> getExplorePageAccordingToUser(@PathVariable int user_id){
        return new ResponseEntity<>(artworkService.getExplorePageAccordingToUserPreferences(user_id),HttpStatus.OK);
    }
    @PutMapping("/approve/{artworkId}")
    public ResponseEntity<Artwork> approveArtwork(@PathVariable int artworkId){
        Artwork result = artworkService.approveArtwork(artworkId);
        if(result != null ){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/decline/{artworkId}")
    public ResponseEntity<Artwork> declineArtwork(@PathVariable int artworkId){
        Artwork result = artworkService.declineArtwork(artworkId);
        if(result != null ){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }

    }

    @PostMapping("/{artworkID}/direct-purchase")
    public ResponseEntity<Boolean> purchaseArtwork(@PathVariable int artworkID,
                                                  @RequestParam("user_id") int user_id){

        if(artworkService.purchaseArtwork(artworkID,user_id))
            return new ResponseEntity<>(true,HttpStatus.OK);
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/{artwork_id}/putForSale")
    public ResponseEntity<Boolean> putForSale(@PathVariable int artwork_id,@RequestParam("price") int price){
        if(artworkService.putForSale(artwork_id,price))
            return new ResponseEntity<>(true,HttpStatus.OK);
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/{artworkID}/addToExhibition")
    public ResponseEntity<Boolean> addArtworkToExhibition(@PathVariable int artworkID, @RequestParam int exhibitionId){
        boolean result = artworkService.addArtworkToExhibition(artworkID, exhibitionId);
        if(result){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/{artworkID}/approveToExhibition")
    public ResponseEntity<Boolean> approveArtworkToExhibition(@PathVariable int artworkID, @RequestParam int exhibitionId){
        boolean result = artworkService.approveArtworkToExhibition(artworkID, exhibitionId);
        if(result){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/{artworkID}/declineToExhibition")
    public ResponseEntity<Boolean> declineArtworkToExhibition(@PathVariable int artworkID, @RequestParam int exhibitionId){
        boolean result = artworkService.declineArtworkToExhibition(artworkID, exhibitionId);
        if(result){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false, HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
