package com.artus.artus.mappers;

import com.artus.artus.models.ArtistRequest;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
@Component
public class ArtistRequestMapper implements RowMapper<ArtistRequest> {
    @Override
    public ArtistRequest mapRow(ResultSet rs, int rowNum) throws SQLException {
        int request_id = rs.getInt("request_id");
        String profile_details =rs.getString("profile_details");
        String biography = rs.getString("biography");
        String user_name = rs.getString("user_name");
        String user_surname = rs.getString("user_surname");

        ArtistRequest artistRequest = new ArtistRequest();
        artistRequest.setRequest_id(request_id);
        artistRequest.setProfile_details(profile_details);
        artistRequest.setBiography(biography);
        artistRequest.setUser_name(user_name);
        artistRequest.setUser_surname(user_surname);

        return artistRequest;
    }
}
