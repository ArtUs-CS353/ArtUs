package com.artus.artus.controllers;
import com.artus.artus.models.Auction;
import com.artus.artus.services.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/auction")
public class AuctionController {

    private final AuctionService auctionService;

    @Autowired
    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Auction> createAuction(@RequestParam("type") String type,
                                                 @RequestParam("price") float price,
                                                 @RequestParam("artworkId") int artworkId,
                                                 @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime startDatetime,
                                                 @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime endDatetime) {
      
        if(startDatetime.isBefore(LocalDateTime.now())){
            System.out.println("Start datetime must be in the future");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        if(endDatetime.isBefore(startDatetime)){
            System.out.println("End datetime must be after start datetime");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // Your existing code to create an Auction
        Auction auction = new Auction();
        auction.setType(type);
        auction.setStarting_amount(price);
        auction.setArtwork_id(artworkId);
        auction.setStart_date(startDatetime);
        auction.setEnd_date(endDatetime);

        boolean result = auctionService.createAuction(auction);

        if (result) {
            return new ResponseEntity<>(auction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllWaitingAuctions")
    public ResponseEntity<List<Auction>> getAllWaitingAuctions(){
        List<Auction> auctions = auctionService.getAllWaitingAuctions();
        if(auctions != null ){
            return new ResponseEntity<>(auctions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllApprovedAuctions")
    public ResponseEntity<List<Auction>> getAllApprovedAuctions(){
        List<Auction> auctions = auctionService.getAllApprovedAuctions();
        if(auctions != null ){
            return new ResponseEntity<>(auctions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllApprovedFutureAuctions")
    public ResponseEntity<List<Auction>> getAllApprovedFutureAuctions(){
        List<Auction> auctions = auctionService.getAllApprovedFutureAuctions();
        if(auctions != null ){
            return new ResponseEntity<>(auctions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllApprovedCurrentAuctions")
    public ResponseEntity<List<Auction>> getAllApprovedCurrentAuctions(){
        List<Auction> auctions = auctionService.getAllApprovedCurrentAuctions();
        if(auctions != null ){
            return new ResponseEntity<>(auctions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllDeclinedAuctions")
    public ResponseEntity<List<Auction>> getAllDeclinedAuctions(){
        List<Auction> auctions = auctionService.getAllDeclinedAuctions();
        if(auctions != null ){
            return new ResponseEntity<>(auctions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/approve/{auctionId}")
    public ResponseEntity<Auction> approveAuction(@PathVariable int auctionId){
        Auction result = auctionService.approveAuction(auctionId);
        if(result != null ){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/decline/{auctionId}")
    public ResponseEntity<Auction> declineAuction(@PathVariable int auctionId){
        Auction result = auctionService.declineAuction(auctionId);
        if(result != null ){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/finish/{auctionId}")
    public ResponseEntity<Boolean> finishAuction(@PathVariable int auctionId){
        if(auctionService.finishAuction(auctionId))
            return new ResponseEntity<>(true,HttpStatus.OK);
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }

    public String getStatus(int auctionId){
        return auctionService.getAuctionStatus(auctionId);
    }

}
