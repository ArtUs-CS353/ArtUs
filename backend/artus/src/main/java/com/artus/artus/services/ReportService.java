package com.artus.artus.services;

import com.artus.artus.mappers.ArtistMapper;
import com.artus.artus.mappers.ArtworkMapper;
import com.artus.artus.models.Artist;
import com.artus.artus.models.Artwork;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    private final JdbcTemplate jdbcTemplate;

    public ReportService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Artist> getMostFollowedArtists(){
        String sql = "WITH temp(artist_id, follower_count) AS (SELECT artist_id, COUNT(*) FROM Follow GROUP BY artist_id) " +
                "SELECT U.user_id,A.profile_details,A.is_featuring,A.biography,a.balance,U.contact_info, U.user_name, U.user_surname, T.follower_count " +
                "FROM temp T, User U, Artist A WHERE U.user_id = T.artist_id AND U.user_id = A.user_id " +
                "ORDER BY T.follower_count DESC;";

        return jdbcTemplate.query(sql,new ArtistMapper());
    }

    public List<Artwork> getMostFavoriteArtworks(){
        String sql = "WITH temp(artwork_id,favorite_count) AS(SELECT artwork_id, COUNT(*) FROM Favorite GROUP BY artwork_id) " +
                "SELECT * FROM temp T, Artwork A WHERE A.artwork_id = T.artwork_id ORDER BY T.favorite_count DESC;";
        return jdbcTemplate.query(sql,new ArtworkMapper() );
    }

    public List<Map<String, Integer>> getTopSellingArtists(){
        String sql = "WITH TopSellingArtists AS (SELECT a.artist_id, COUNT(a.artwork_id) AS total_sales" +
                " FROM Artwork a WHERE a.status = 'sold' GROUP BY a.artist_id ORDER BY total_sales DESC)" +
                "SELECT A.user_id AS artist_id, A.profile_details, A.follower_count, A.is_featuring, A.biography, A.balance," +
                "       U.user_name, U.user_surname, U.user_role, U.email, U.contact_info, T.total_sales " +
                "FROM Artist A JOIN TopSellingArtists T ON A.user_id = T.artist_id JOIN User U ON A.user_id = U.user_id;\n";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String name = rs.getString("user_name");
            String surname = rs.getString("user_surname");
            String returnedName = name + " " + surname;
            Integer sellingCount = rs.getInt("total_sales");
            Map<String,Integer> map  =new HashMap<>();
            map.put(returnedName,sellingCount);
            return map;
        });
    }

    
}
