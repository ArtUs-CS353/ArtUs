package com.artus.artus.controllers;
import com.artus.artus.models.Bid;
import com.artus.artus.services.AuctionService;
import com.artus.artus.services.BidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/bid")
public class BidController {
    private final BidService bidService;
    private final AuctionService auctionService;


    public BidController(BidService bidService, AuctionService auctionService) {
        this.bidService = bidService;
        this.auctionService = auctionService;
    }

    @PostMapping("/bidForAuction")
    public ResponseEntity<Bid> bidForAuction(int user_id, int auction_id, double price){
        String type = auctionService.getAuctionType(auction_id);
        System.out.println("\n\nAuction type:" + type);
        System.out.println("\n\nBid price:" + price);
        System.out.println("\n\nAuction starting amount:" + auctionService.getAuctionStartingAmount(auction_id));
        System.out.println(type.equals("Close"));

        if(type.equals("close") && auctionService.getAuctionStartingAmount(auction_id) > price){
            System.out.println("Price must be higher than the starting amount");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if(type.equals("open") && bidService.getHighestBid(auction_id) >= price){
            System.out.println("Price must be higher than the previous highest bid and starting amount");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Bid bid = new Bid();
        bid.setAuction_id(auction_id);
        bid.setUser_id(user_id);
        bid.setAmount(price);
        Boolean result = bidService.bidForAuction(user_id,  auction_id,  price);
        if(result)
            return new ResponseEntity<>(bid, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/acceptBid")
    public ResponseEntity<Bid> acceptBid(int bidId){
        Bid result = bidService.acceptBid(bidId);
        if(result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/rejectBid")
    public ResponseEntity<Bid> rejectBid(int bidId){
        Bid result = bidService.rejectBid(bidId);
        if(result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }


}
