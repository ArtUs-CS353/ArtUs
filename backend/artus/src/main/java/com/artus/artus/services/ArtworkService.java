package com.artus.artus.services;

import com.artus.artus.mappers.ArtworkMapper;
import com.artus.artus.mappers.AuctionMapper;
import com.artus.artus.models.Artwork;
import com.artus.artus.models.Auction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtworkService {
    private final JdbcTemplate jdbcTemplate;
    private final ArtworkMapper artworkMapper;
    private final AuctionMapper auctionMapper;


    @Autowired
    public ArtworkService(JdbcTemplate jdbcTemplate, ArtworkMapper artworkMapper, AuctionMapper auctionMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.artworkMapper = artworkMapper;
        this.auctionMapper = auctionMapper;
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

    public Auction getArtworkAuction(int artworkId) {
        try{
            String sql = "SELECT * FROM Auction WHERE artwork_id = ?";
            return jdbcTemplate.queryForObject(sql, auctionMapper, artworkId);
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

    public List<Artwork> searchArtworkWithTitle(String title){
        try{
            String sql = "SELECT * FROM Artwork WHERE title like ?";
            return jdbcTemplate.query(sql, artworkMapper, "%" + title + "%");
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return null;
        }
    }

    public List<Artwork> filterArtworks(List<String> types, List<String> materials, List<String> rarities, Integer minPrice, Integer maxPrice, LocalDate startDate, LocalDate endDate){
        String mainSQL = "SELECT * FROM Artwork WHERE ";
        List<Object> allParams = new ArrayList<>();

        if(minPrice != null){
            StringBuilder sqlBuilderForMinPrice = new StringBuilder();
            sqlBuilderForMinPrice.append(" ( price >= ? ) AND");
            mainSQL = mainSQL + sqlBuilderForMinPrice;
            allParams.add(minPrice);}

        if(maxPrice != null){
            StringBuilder sqlBuilderForMaxPrice = new StringBuilder();
            sqlBuilderForMaxPrice.append(" ( price <= ? ) AND");
            mainSQL = mainSQL + sqlBuilderForMaxPrice;
            allParams.add(maxPrice);
        }

        if(startDate != null){
            StringBuilder sqlBuilderForstartDate = new StringBuilder();
            sqlBuilderForstartDate.append(" ( date >= ? ) AND");
            mainSQL = mainSQL + sqlBuilderForstartDate;
            allParams.add(startDate);
        }

        if(endDate != null){
            StringBuilder sqlBuilderForEndDate = new StringBuilder();
            sqlBuilderForEndDate.append(" ( date <= ? ) AND");
            mainSQL = mainSQL + sqlBuilderForEndDate;
            allParams.add(endDate);
        }

        if(materials != null){
            StringBuilder sqlBuilderforMaterials = new StringBuilder();
            sqlBuilderforMaterials.append(" ( ");
            for (int i = 0; i < materials.size(); i++) {
                if (i > 0) {
                    sqlBuilderforMaterials.append(" OR ");
                }
                sqlBuilderforMaterials.append("material LIKE ?");
            }
            sqlBuilderforMaterials.append(" ) ");
            mainSQL = mainSQL + sqlBuilderforMaterials;
            mainSQL = mainSQL + " AND ";
            allParams.addAll(materials.stream().map(material -> "%" + material + "%").collect(Collectors.toList()));
        }
        if(types != null){
            StringBuilder sqlBuilderfortypes = new StringBuilder();
            sqlBuilderfortypes.append(" ( ");
            for (int i = 0; i < types.size(); i++) {
                if (i > 0) {
                    sqlBuilderfortypes.append(" OR ");
                }
                sqlBuilderfortypes.append("type LIKE ?");
            }
            sqlBuilderfortypes.append(" ) ");
            mainSQL = mainSQL + sqlBuilderfortypes;
            mainSQL = mainSQL + " AND ";
            allParams.addAll(types.stream().map(type -> "%" + type + "%").collect(Collectors.toList()));
        }
        if(rarities != null){
            StringBuilder sqlBuilderforRarities = new StringBuilder();
            sqlBuilderforRarities.append(" ( ");
            for (int i = 0; i < rarities.size(); i++) {
                if (i > 0) {
                    sqlBuilderforRarities.append(" OR ");
                }
                sqlBuilderforRarities.append("rarity LIKE ?");
            }
            sqlBuilderforRarities.append(" ) ");
            mainSQL = mainSQL + sqlBuilderforRarities;
            mainSQL = mainSQL + " AND ";
            allParams.addAll(rarities.stream().map(rarity -> "%" + rarity + "%").collect(Collectors.toList()));
        }
        mainSQL = mainSQL + " true ";

        return jdbcTemplate.query(mainSQL,artworkMapper,allParams.toArray());
    }

    public List<Artwork> getExplorePage(){
        String sql = "select * from most_favorite_artworks;";
        return jdbcTemplate.query(sql,new ArtworkMapper());
    }

    public Artwork approveArtwork(int artworkId) {
        try {
            String sql = "UPDATE Artwork SET status = 'approved' WHERE artwork_id = ?";
            jdbcTemplate.update(sql, artworkId);
            sql = "SELECT * FROM Artwork WHERE artwork_id = ?";
            Artwork artwork = jdbcTemplate.queryForObject(sql, artworkMapper, artworkId);
            if(artwork == null){
                throw new Exception("There is no such artwork");
            }

            String sql2 = "UPDATE Artwork SET status = 'on sale' WHERE artwork_id = ?";
            jdbcTemplate.update(sql2, artwork.getArtwork_id());
            return artwork;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public Artwork declineArtwork(int artworkId) {
        try {
            String sql = "UPDATE Artwork SET status = 'declined' WHERE artwork_id = ?";
            jdbcTemplate.update(sql, artworkId);
            sql = "SELECT * FROM Artwork WHERE artwork_id = ?";
            return jdbcTemplate.queryForObject(sql, artworkMapper, artworkId);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Artwork> getAllFeaturedArtworks() {
        try {
            String sql = "SELECT * FROM Artwork WHERE is_featuring = 1";
            return jdbcTemplate.query(sql, artworkMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return null;

        }
    }
}
