package com.artus.artus.mappers;

import com.artus.artus.models.Artist;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ArtistMapper implements RowMapper<Artist> {
    @Override
    public Artist mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        String profile_details =rs.getString("profile_details");
        int follower_count =rs.getInt("follower_count");
        boolean is_featuring = rs.getBoolean("is_featuring");
        String biography = rs.getString("biography");
        int balance = rs.getInt("balance");
        String user_name = rs.getString("user_name");
        String user_surname = rs.getString("user_surname");
        String email = rs.getString("email");
        String password = rs.getString("password");
        String contact_info = rs.getString("contact_info");

        Artist artist = new Artist();
        artist.setUser_id(user_id);
        artist.setProfile_details(profile_details);
        artist.setFollower_count(follower_count);
        artist.setIs_featuring(is_featuring);
        artist.setBiography(biography);
        artist.setBalance(balance);
        artist.setUser_name(user_name);
        artist.setUser_surname(user_surname);
        artist.setEmail(email);
        artist.setPassword(password);
        artist.setContact_info(contact_info);
        return artist;
    }
}
