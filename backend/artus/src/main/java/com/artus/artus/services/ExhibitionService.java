package com.artus.artus.services;
import com.artus.artus.mappers.ArtworkMapper;
import com.artus.artus.mappers.ExhibitionMapper;
import com.artus.artus.models.Artwork;
import com.artus.artus.models.Exhibition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExhibitionService {
private final JdbcTemplate jdbcTemplate;
private final ExhibitionMapper exhibitionMapper;
    private final ArtworkMapper artworkMapper;


    @Autowired
    public ExhibitionService(JdbcTemplate jdbcTemplate, ExhibitionMapper exhibitionMapper, ArtworkMapper artworkMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.exhibitionMapper = exhibitionMapper;
        this.artworkMapper = artworkMapper;
    }

    public boolean createExhibition(Exhibition exhibition){
        try{
            String sql = "INSERT INTO Exhibition ( exhibition_name , start_date , end_date ,poster_URL ) VALUES ( ?, ?, ?, ?)";
            jdbcTemplate.update(sql,  exhibition.getExhibition_name(), exhibition.getStart_date(), exhibition.getEnd_date(), exhibition.getPoster_URL());
            return true;
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }

    public List<Exhibition> getAllExhibitions() {
        try{
            String sql = "SELECT * FROM Exhibition";
            return jdbcTemplate.query(sql, exhibitionMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Exhibition> getAllCurrentExhibitions() {
        try{
            LocalDateTime currentTime = LocalDateTime.now();
            String sql = "SELECT * FROM Exhibition WHERE start_date <= ? AND end_date > ?";
            return jdbcTemplate.query(sql, exhibitionMapper, currentTime, currentTime);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Exhibition> getAllFutureExhibitions() {
        try{
            String sql = "SELECT * FROM Exhibition WHERE start_date > ?";
            return jdbcTemplate.query(sql, exhibitionMapper, LocalDateTime.now());
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Exhibition> getAllPassedExhibitions() {
        try{
            String sql = "SELECT * FROM Exhibition WHERE end_date < ?";
            System.out.println("SQL Query: " + sql);
            System.out.println("Current Time: " + LocalDateTime.now());
            return jdbcTemplate.query(sql, exhibitionMapper, LocalDateTime.now());
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Artwork> getAllArtworks(int exhibitionId) {
        try{
            String sql = "SELECT artwork_id FROM Includes where exhibition_id =? and status = 'approved'";
            List<Integer> idList = jdbcTemplate.queryForList(sql, Integer.class, exhibitionId);
            List<Artwork> artworks = new ArrayList<Artwork>();
            String artworkSql;
            for(int id: idList){
                artworkSql = "SELECT * FROM Artwork where artwork_id =?";
                artworks.add( jdbcTemplate.queryForObject(artworkSql, artworkMapper, id));
            }

            return artworks;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }
}
