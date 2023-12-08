package com.artus.artus.mappers;

import com.artus.artus.models.Auction;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class AuctionMapper implements RowMapper<Auction> {
    @Override
    public Auction mapRow(ResultSet rs, int rowNum) throws SQLException {
        int auction_id = rs.getInt("auction_id");
        int artwork_id = rs.getInt("artwork_id");
        LocalDateTime start_date = rs.getObject("start_date", LocalDateTime.class);
        LocalDateTime end_date = rs.getObject("end_date", LocalDateTime.class);
        String type = rs.getString("type");
        float starting_amount = rs.getFloat("starting_amount");
        String status = rs.getString("status");

        Auction auction = new Auction();
        auction.setAuction_id(auction_id);
        auction.setArtwork_id(artwork_id);
        auction.setStart_date(start_date);
        auction.setEnd_date(end_date);
        auction.setType(type);
        auction.setStarting_amount(starting_amount);
        auction.setStatus(status);

        return auction;
    }
}
