package com.artus.artus.services;
import com.artus.artus.mappers.AuctionMapper;
import com.artus.artus.mappers.BidMapper;
import com.artus.artus.models.Bid;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BidService {
    private final JdbcTemplate jdbcTemplate;
    private final BidMapper bidMapper;
    private final AuctionService auctionService;


    public BidService(JdbcTemplate jdbcTemplate, BidMapper bidMapper, AuctionService auctionService) {
        this.jdbcTemplate = jdbcTemplate;
        this.bidMapper = bidMapper;
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
        }
        catch (EmptyResultDataAccessException e){
            Bid nullBid = new Bid();
            nullBid.setUser_id(-1);
            nullBid.setAuction_id(auctionId);
            nullBid.setStatus("none");
            return nullBid;
        }
        catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<String> getBidHistory(int user_id){
        String sql = "Select AR.title,B.price,B.time_stamp,Au.end_date,B.status from Bid B, Auction AU, Artwork AR where B.user_id = ? AND B.auction_id = AU.auction_id AND AU.artwork_id = AR.artwork_id;";
        return jdbcTemplate.query(sql, (rs,rowNum) ->{
            String title = rs.getString("title");
            String date = rs.getString("time_stamp");
            String end_date = rs.getString("end_date");
            double price = rs.getFloat("price");
            String status =rs.getString("status");

            return "You have placed bid for'"+ title + "' at "+date+" for "+ price +". Auction ends at "+ end_date + ". Status of the bid: " + status;
        },user_id);
    }


}
