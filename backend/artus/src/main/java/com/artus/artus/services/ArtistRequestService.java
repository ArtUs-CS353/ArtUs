package com.artus.artus.services;

import com.artus.artus.mappers.ArtistRequestMapper;
import com.artus.artus.mappers.UserMapper;
import com.artus.artus.models.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
public class ArtistRequestService {
    private final JdbcTemplate jdbcTemplate;
    private final ArtistRequestMapper artistRequestMapper;
    private final UserMapper userMapper;

    public ArtistRequestService(JdbcTemplate jdbcTemplate, ArtistRequestMapper artistRequestMapper, UserMapper userMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.artistRequestMapper = artistRequestMapper;
        this.userMapper = userMapper;
    }

    public boolean createArtistRequest(String user_name, String user_surname, String profile_details, String biography){
        try{
            String sql = "INSERT INTO ArtistRequest (user_name, user_surname, profile_details, biography) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, user_name,user_surname, profile_details,biography);
            return true;
        }catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }

    public boolean acceptArtistRequest(int requestId) {
        try {
            String sql = "SELECT * FROM ArtistRequest WHERE request_id =?";
            ArtistRequest request = jdbcTemplate.queryForObject(sql, artistRequestMapper, requestId);

            if(request == null){
                throw new Exception("There is no such artist");
            }

            Artist newArtist = new Artist();
            newArtist.setUser_name(request.getUser_name());
            newArtist.setUser_surname(request.getUser_surname());
            newArtist.setProfile_details(request.getProfile_details());
            newArtist.setBiography(request.getBiography());
            newArtist.setFollower_count(0);
            newArtist.setUser_role(2);

            String insertUserSql = "INSERT INTO User (user_name, user_surname, user_role) VALUES (?, ?, ?)";
            jdbcTemplate.update(insertUserSql,newArtist.getUser_name(),newArtist.getUser_surname(),newArtist.getUser_role());

            String userSql = "SELECT * FROM User U where U.user_name= ? AND U.user_surname = ? AND U.user_role = 2;";
            User user = jdbcTemplate.queryForObject(userSql, userMapper,newArtist.getUser_name(), newArtist.getUser_surname());

            String insertArtistSql = "INSERT INTO Artist (user_id, profile_details, follower_count, is_featuring, biography, balance) VALUES (?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(insertArtistSql, Objects.requireNonNull(user).getUser_id(), newArtist.getProfile_details(),0,false,newArtist.getBiography(),0);

            sql = "DELETE FROM ArtistRequest WHERE request_id = ?";
            jdbcTemplate.update(sql, requestId);

            return true;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return false;
        }
    }

    public boolean rejectArtistRequest(int requestId) {
        try {
            String sql = "DELETE FROM ArtistRequest WHERE request_id = ?";
            jdbcTemplate.update(sql, requestId);
            return true;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return false;
        }
    }

    public List<ArtistRequest> getAllRequests() {
        try {
            String sql = "SELECT * FROM ArtistRequest";
            return jdbcTemplate.query(sql, artistRequestMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }
}
