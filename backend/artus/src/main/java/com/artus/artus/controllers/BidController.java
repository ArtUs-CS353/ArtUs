package com.artus.artus.controllers;
import com.artus.artus.models.Bid;
import com.artus.artus.services.AuctionService;
import com.artus.artus.services.BidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/bid")
public class BidController {
    private final BidService bidService;
    private final AuctionService auctionService;


    public BidController(BidService bidService, AuctionService auctionService) {
        this.bidService = bidService;
        this.auctionService = auctionService;
    }

    @GetMapping("/getHighestBid/{auctionId}")
    public ResponseEntity<Bid> getHighestBid(@PathVariable int auctionId){
        Bid bid = bidService.getBidWithHighestPrice(auctionId);
        if(bid != null)
            return new ResponseEntity<>(bid, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PostMapping("/bidForAuction")
    public ResponseEntity<Bid> bidForAuction(@RequestParam("user_id") int user_id,
                                             @RequestParam("auction_id") int auction_id,
                                             @RequestParam("price") double price){
        String type = auctionService.getAuctionType(auction_id);
        if(type.equals("silent") && auctionService.getAuctionStartingAmount(auction_id) > price){
            System.out.println("Price must be higher than the starting amount");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if(type.equals("normal") && bidService.getHighestBid(auction_id) >= price){
            System.out.println("Price must be higher than the previous highest bid and starting amount");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Bid bid = new Bid();
        bid.setAuction_id(auction_id);
        bid.setUser_id(user_id);
        bid.setPrice(price);
        Boolean result = bidService.bidForAuction(user_id,  auction_id,  price);
        if(result)
            return new ResponseEntity<>(bid, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/acceptBid")
    public ResponseEntity<Bid> acceptBid(@RequestParam("bidId") int bidId){
        Bid result = bidService.acceptBid(bidId);
        if(result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/rejectBid")
    public ResponseEntity<Bid> rejectBid(@RequestParam("bidId") int bidId){
        Bid result = bidService.rejectBid(bidId);
        if(result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }


}
