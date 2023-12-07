package com.artus.artus.service;

import com.artus.artus.models.Artwork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
@Service
public class ArtworkService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ArtworkService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean createArtwork(Artwork artwork) {
        try{
            String sql = "INSERT INTO Artwork (artist_id, title, description, type, material, size, rarity, imageURL, movement, date, is_featuring, price, status, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql,  artwork.getArtist_id(), artwork.getTitle(), artwork.getDescription(), artwork.getType(),
                    artwork.getMaterial(), artwork.getSize(), artwork.getRarity(), artwork.getImageURL(), artwork.getMovement(), artwork.getDate(),
                    false, artwork.getPrice(), artwork.getStatus(), artwork.getAvailability());
            return true;
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }
}