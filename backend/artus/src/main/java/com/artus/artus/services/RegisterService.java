package com.artus.artus.services;

import com.artus.artus.helpers.HashPasswordHelper;
import com.artus.artus.mappers.UserMapper;
import com.artus.artus.models.Artist;
import com.artus.artus.models.Enthusiast;
import com.artus.artus.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class RegisterService {
    private final JdbcTemplate jdbcTemplate;
    private HashPasswordHelper hashPasswordHelper = HashPasswordHelper.getInstance();
    @Autowired
    public RegisterService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String registerEnthusiast(Enthusiast enthusiast, String[] preferences){
        try {
            String checkUser = "SELECT EXISTS (SELECT * FROM USER U WHERE U.email = ?)";
            boolean existsUser = jdbcTemplate.queryForObject(checkUser, Boolean.class, enthusiast.getEmail());
            if (existsUser) {
                return "This email have already registered the system!";
            }
            String insertUserSql = "INSERT INTO User (user_name, user_surname, user_role, email, password, contact_info) VALUES (?, ?, ?, ?, ?, ?)";
            hashPasswordHelper.setPassword(enthusiast.getPassword());
            String hashedPassword = hashPasswordHelper.Hash();
            jdbcTemplate.update(insertUserSql,enthusiast.getUser_name(),enthusiast.getUser_surname(),enthusiast.getUser_role(),enthusiast.getEmail(),hashedPassword,enthusiast.getContact_info());

            String userSql = "SELECT * FROM User U where U.email = ?;";
            User user = jdbcTemplate.queryForObject(userSql, new UserMapper(),enthusiast.getEmail());

            String insertEnthusiastSql = "INSERT INTO Enthusiast (user_id, address, balance) VALUES (?, ?, ?)";
            jdbcTemplate.update(insertEnthusiastSql, Objects.requireNonNull(user).getUser_id(),enthusiast.getAddress(),0);

            String insertPreferenceSql = "INSERT INTO User_Preference (user_id, preference_name) VALUES (?, ?)";
            for (String preference: preferences) {
                jdbcTemplate.update(insertPreferenceSql, Objects.requireNonNull(user).getUser_id(),preference);
            }

            return "Successfully registered!";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "Error! Check It.";
        }
    }

    public String registerArtist(Artist artist){
        try {
            String checkUser = "SELECT EXISTS (SELECT * FROM USER U WHERE U.email = ?)";
            boolean existsUser = jdbcTemplate.queryForObject(checkUser, Boolean.class, artist.getEmail());
            if (existsUser) {
                return "This email have already registered the system!";
            }            
            String insertUserSql = "INSERT INTO User (user_name, user_surname, user_role, email, password, contact_info) VALUES (?, ?, ?, ?, ?, ?)";
            hashPasswordHelper.setPassword(artist.getPassword());
            String hashedPassword = hashPasswordHelper.Hash();
            jdbcTemplate.update(insertUserSql,artist.getUser_name(),artist.getUser_surname(),2,artist.getEmail(),hashedPassword,artist.getContact_info());

            String userSql = "SELECT * FROM User U where U.email = ?;";
            User user = jdbcTemplate.queryForObject(userSql, new UserMapper(),artist.getEmail());

            String insertEnthusiastSql = "INSERT INTO Artist (user_id, profile_details, follower_count, is_featuring, biography, balance) VALUES (?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(insertEnthusiastSql, Objects.requireNonNull(user).getUser_id(),artist.getProfile_details(),0,false,artist.getBiography(),0);

            return "Successfully registered!";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "Error at registration process! Check It.";
        }
    }


}
