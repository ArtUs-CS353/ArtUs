package com.artus.artus.services;
import com.artus.artus.mappers.AuctionMapper;
import com.artus.artus.mappers.BidMapper;
import com.artus.artus.models.Bid;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BidService {
    private final JdbcTemplate jdbcTemplate;
    private final BidMapper bidMapper;
    private final AuctionMapper auctionMapper;
    private final AuctionService auctionService;


    public BidService(JdbcTemplate jdbcTemplate, BidMapper bidMapper, AuctionMapper auctionMapper, AuctionService auctionService) {
        this.jdbcTemplate = jdbcTemplate;
        this.bidMapper = bidMapper;
        this.auctionMapper = auctionMapper;
        this.auctionService = auctionService;
    }

    public double getHighestBid(int auctionId){
        String sql1 = "SELECT MAX(price) FROM Bid WHERE auction_id =?";
        Double highestBid = jdbcTemplate.queryForObject(sql1, Double.class, auctionId);

        if (highestBid != null) {
            return highestBid;
        } else {
            String sql2 = "SELECT starting_amount FROM Auction WHERE auction_id =?";
            Double startingAmount = jdbcTemplate.queryForObject(sql2, Double.class, auctionId);

            return (startingAmount != null) ? startingAmount : 0.0;
        }
    }

    public Boolean bidForAuction(int userId, int auctionId, double price) {
        try{
            String sql = "INSERT INTO Bid(user_id ,auction_id , price,time_stamp, status) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql,  userId, auctionId, price, LocalDateTime.now(), "waiting");
            return true;
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }

    public Bid acceptBid(int bidId) {
        try {
            String sql = "UPDATE Bid SET status = 'approved' WHERE bid_id = ?";
            jdbcTemplate.update(sql, bidId);
            sql = "SELECT * FROM Bid WHERE bid_id = ?";
            Bid bid = jdbcTemplate.queryForObject(sql, bidMapper, bidId);
            auctionService.finishAuctionPositively(bid.getAuction_id());
            return bid;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public Bid rejectBid(int bidId) {
        try {
            String sql = "UPDATE Bid SET status = 'rejected' WHERE bid_id = ?";
            jdbcTemplate.update(sql, bidId);
            sql = "SELECT * FROM Bid WHERE bid_id = ?";
            Bid bid = jdbcTemplate.queryForObject(sql, bidMapper, bidId);
            auctionService.finishAuctionNegatively(bid.getAuction_id());
            return bid;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }


    public Bid getBidWithHighestPrice(int auctionId) {
        try{
            String sql1 = "SELECT * FROM Bid WHERE auction_id = ? ORDER BY price DESC LIMIT 1;";
            Bid highestBid = jdbcTemplate.queryForObject(sql1, bidMapper, auctionId);
            return highestBid;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }
}
