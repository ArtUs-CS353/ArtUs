package com.artus.artus.services;
import com.artus.artus.mappers.AuctionMapper;
import com.artus.artus.models.Auction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {
private final JdbcTemplate jdbcTemplate;
private final AuctionMapper auctionMapper;

    @Autowired
    public AuctionService(JdbcTemplate jdbcTemplate, AuctionMapper auctionMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.auctionMapper = auctionMapper;
    }

    public boolean createAuction(Auction auction){
        try{
            String sql = "INSERT INTO Auction (artwork_id, start_date, end_date, type, starting_amount, status) VALUES ( ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql,  auction.getArtwork_id(), auction.getStart_date(), auction.getEnd_date(), auction.getType(), auction.getStarting_amount(), "Waiting");
            return true;
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }

    public List<Auction> getAllWaitingAuctions() {
        try{
            String sql = "SELECT * FROM Auction WHERE status = 'Waiting'";
            return jdbcTemplate.query(sql, auctionMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Auction> getAllApprovedAuctions() {
        try{
            String sql = "SELECT * FROM Auction WHERE status = 'Approved'";
            return jdbcTemplate.query(sql, auctionMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Auction> getAllDeclinedAuctions() {
        try{
            String sql = "SELECT * FROM Auction WHERE status = 'Declined'";
            return jdbcTemplate.query(sql, auctionMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public Auction approveAuction(int auctionId) {
        try {
            String sql = "UPDATE Auction SET status = 'Approved' WHERE auction_id = ?";
            jdbcTemplate.update(sql, auctionId);
            sql = "SELECT * FROM Auction WHERE auction_id = ?";
            return jdbcTemplate.queryForObject(sql, auctionMapper, auctionId);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public Auction declineAuction(int auctionId) {
        try {
            String sql = "UPDATE Auction SET status = 'Declined' WHERE auction_id = ?";
            jdbcTemplate.update(sql, auctionId);
            sql = "SELECT * FROM Auction WHERE auction_id = ?";
            return jdbcTemplate.queryForObject(sql, auctionMapper, auctionId);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public String getAuctionStatus(int auctionId){
        String sql1 = "SELECT * FROM Auction WHERE auction_id =?";
        return jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId).getStatus();
    }

    public String getAuctionType(int auctionId){
        String sql1 = "SELECT * FROM Auction WHERE auction_id =?";
        return jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId).getType();
    }

    public double getAuctionStartingAmount(int auctionId){
        String sql1 = "SELECT * FROM Auction WHERE auction_id =?";
        return jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId).getStarting_amount();
    }
}
