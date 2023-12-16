package com.artus.artus.mappers;

import com.artus.artus.models.Artwork;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

@Component
public class ArtworkMapper implements RowMapper<Artwork> {
    @Override
    public Artwork mapRow(ResultSet rs, int rowNum) throws SQLException {
        int artwork_id = rs.getInt("artwork_id");
        int artist_id = rs.getInt("artist_id");
        String title = rs.getString("title");
        String description = rs.getString("description");
        String type = rs.getString("type");
        String material = rs.getString("material");
        String size = rs.getString("size");
        String rarity = rs.getString("rarity");
        String imageURL = rs.getString("imageURL");
        String movement = rs.getString("movement");
        LocalDate date = rs.getObject("date", LocalDate.class);
        Boolean is_featuring = rs.getBoolean("is_featuring");
        float price = rs.getFloat("price");
        String status = rs.getString("status");
        String availability = rs.getString("availability");
        int favorite_count = rs.getInt("favorite_count");

        Artwork artwork = new Artwork();
        artwork.setArtwork_id(artwork_id);
        artwork.setArtist_id(artist_id);
        artwork.setTitle(title);
        artwork.setDescription(description);
        artwork.setType(type);
        artwork.setMaterial(material);
        artwork.setSize(size);
        artwork.setRarity(rarity);
        artwork.setImageURL(imageURL);
        artwork.setMovement(movement);
        artwork.setDate(date);
        artwork.setIs_featuring(is_featuring);
        artwork.setPrice(price);
        artwork.setStatus(status);
        artwork.setAvailability(availability);
        artwork.setFavorite_count(favorite_count);

        return artwork;
    }
}
