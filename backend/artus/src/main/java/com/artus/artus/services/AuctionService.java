package com.artus.artus.services;
import com.artus.artus.mappers.AuctionMapper;
import com.artus.artus.models.Auction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
            jdbcTemplate.update(sql,  auction.getArtwork_id(), auction.getStart_date(), auction.getEnd_date(), auction.getType(), auction.getStarting_amount(), "waiting");
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
            String sql = "SELECT * FROM Auction WHERE status = 'waiting'";
            return jdbcTemplate.query(sql, auctionMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Auction> getAllApprovedFutureAuctions() {
        try{
            String sql = "SELECT * FROM Auction WHERE start_date > ? AND status = 'approved'";
            return jdbcTemplate.query(sql, auctionMapper, LocalDateTime.now());
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Auction> getAllApprovedCurrentAuctions() {
        try{
            LocalDateTime currentTime = LocalDateTime.now();
            String sql = "SELECT * FROM Auction WHERE start_date <= ? AND end_date > ? AND status = 'approved'";
            return jdbcTemplate.query(sql, auctionMapper, currentTime, currentTime);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }


    public List<Auction> getAllApprovedAuctions() {
        try{
            String sql = "SELECT * FROM Auction WHERE status = 'approved'";
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
            String sql = "SELECT * FROM Auction WHERE status = 'declined'";
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
            String sql = "UPDATE Auction SET status = 'approved' WHERE auction_id = ?";
            jdbcTemplate.update(sql, auctionId);
            sql = "SELECT * FROM Auction WHERE auction_id = ?";
            Auction auction = jdbcTemplate.queryForObject(sql, auctionMapper, auctionId);
            if(auction == null){
                throw new Exception("There is no such auction");
            }

            String sql2 = "UPDATE Artwork SET status = 'auction' WHERE artwork_id = ?";
            jdbcTemplate.update(sql2, auction.getArtwork_id());
            return auction;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public Auction declineAuction(int auctionId) {
        try {
            String sql = "UPDATE Auction SET status = 'declined' WHERE auction_id = ?";
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
        System.out.println("type is " + jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId).getType());
        return jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId).getType();
    }

    public double getAuctionStartingAmount(int auctionId){
        String sql1 = "SELECT * FROM Auction WHERE auction_id =?";
        return jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId).getStarting_amount();
    }

    public void finishAuctionPositively(int auctionId) {
        try{
            String sql1 = "SELECT * FROM Auction WHERE auction_id =?";
            Auction auction = jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId);
            sql1 = "UPDATE Auction SET status = 'positive' WHERE auction_id = ?";
            jdbcTemplate.update(sql1, auctionId);

            String sql2 = "UPDATE Artwork SET status = 'sold' WHERE artwork_id = ?";
            jdbcTemplate.update(sql2, auction.getArtwork_id());
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
        }
    }

    public void finishAuctionNegatively(int auctionId) {
        try{
            String sql1 = "SELECT * FROM Auction WHERE auction_id =?";
            Auction auction = jdbcTemplate.queryForObject(sql1, auctionMapper, auctionId);
            sql1 = "UPDATE Auction SET status = 'negative' WHERE auction_id = ?";
            jdbcTemplate.update(sql1, auctionId);

            String sql2 = "UPDATE Artwork SET status = 'on sale' WHERE artwork_id = ?";
            jdbcTemplate.update(sql2, auction.getArtwork_id());
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
        }
    }

    public List<String> getAuctionHistory(int user_id){
        String sql = "Select A.title, au.status,au.end_date,au.start_date,au.starting_amount,au.type from auction au, Artwork A where A.artwork_id = au.artwork_id AND A.artist_id = ?;";
        return jdbcTemplate.query(sql, (rs,rowNum) ->{
            String title = rs.getString("title");
            String start_date = rs.getString("start_date");
            String end_date = rs.getString("end_date");
            double starting_amount = rs.getFloat("starting_amount");
            String status = rs.getString("status");
            String type = rs.getString("type");


            return "You have "+type+" auction for Artwork '"+ title + "' starting amount: "+starting_amount+", start date: "+start_date+", end date: "+end_date+", status:"+ status;
        },user_id);
    }

    public Boolean finishAuction(int auctionId){
        try{
            String delete = "Update Auction set status = 'finished'  where auction_id =?";
            jdbcTemplate.update(delete, auctionId);
            return true;
        }catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }
}
