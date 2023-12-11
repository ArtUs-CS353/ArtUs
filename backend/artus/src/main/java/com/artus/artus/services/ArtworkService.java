package com.artus.artus.services;

import com.artus.artus.mappers.ArtworkMapper;
import com.artus.artus.models.Artwork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArtworkService {
    private final JdbcTemplate jdbcTemplate;
    private final ArtworkMapper artworkMapper;

    @Autowired
    public ArtworkService(JdbcTemplate jdbcTemplate, ArtworkMapper artworkMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.artworkMapper = artworkMapper;
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

    public List<Artwork> getAllArtworks() {
        try{
            String sql = "SELECT * FROM Artwork";
            return jdbcTemplate.query(sql, artworkMapper);
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return null;
        }
    }

    public List<Artwork> getAllArtworksOfArtist(int artistId) {
        try{
            String sql = "SELECT * FROM Artwork WHERE artist_id = ?";
            return jdbcTemplate.query(sql, artworkMapper, artistId);
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return null;
        }
    }

    public Artwork getArtwork(int artworkId) {
        try{
            String sql = "SELECT * FROM Artwork WHERE artwork_id = ?";
            return jdbcTemplate.queryForObject(sql, artworkMapper, artworkId);
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return null;
        }
    }
}
