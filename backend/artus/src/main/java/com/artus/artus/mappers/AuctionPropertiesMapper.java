package com.artus.artus.mappers;

import com.artus.artus.models.AuctionProperties;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class AuctionPropertiesMapper implements RowMapper<AuctionProperties> {

    @Override
    public AuctionProperties mapRow(ResultSet rs, int rowNum) throws SQLException {
        int artwork_id = rs.getInt("artwork_id");
        int artist_id = rs.getInt("artist_id");
        String title = rs.getString("title");
        String auction_type = rs.getString("auction_type");
        String material = rs.getString("material");
        String artwork_type = rs.getString("artwork_type");
        String imageURL = rs.getString("imageURL");
        int auction_id = rs.getInt("auction_id");
        LocalDateTime start_date = rs.getObject("start_date", LocalDateTime.class);
        LocalDateTime end_date = rs.getObject("end_date", LocalDateTime.class);
        int starting_amount = rs.getInt("starting_amount");
        String auction_status = rs.getString("auction_status");

        AuctionProperties auctionProperties = new AuctionProperties();
        auctionProperties.setArtwork_id(artwork_id);
        auctionProperties.setArtist_id(artist_id);
        auctionProperties.setTitle(title);
        auctionProperties.setAuction_type(auction_type);
        auctionProperties.setMaterial(material);
        auctionProperties.setArtwork_type(artwork_type);
        auctionProperties.setImageURL(imageURL);
        auctionProperties.setAuction_id(auction_id);
        auctionProperties.setStart_date(start_date);
        auctionProperties.setEnd_date(end_date);
        auctionProperties.setStarting_amount(starting_amount);
        auctionProperties.setAuction_status(auction_status);

        return auctionProperties;
    }
}
