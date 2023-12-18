package com.artus.artus.services;

import com.artus.artus.helpers.HashPasswordHelper;
import com.artus.artus.mappers.UserMapper;
import com.artus.artus.models.Admin;
import com.artus.artus.models.Artist;
import com.artus.artus.models.Enthusiast;
import com.artus.artus.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class RegisterService {
    private final JdbcTemplate jdbcTemplate;
    private final HashPasswordHelper hashPasswordHelper = HashPasswordHelper.getInstance();
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

            if(enthusiast.getUser_role() == 4){
                String insertCollector = "INSERT INTO Collector (user_id) VALUES (?);";
                jdbcTemplate.update(insertCollector, Objects.requireNonNull(user).getUser_id());
            }

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

    public String addNewAdmin(Admin admin){
        try {
            String checkUser = "SELECT EXISTS (SELECT * FROM USER U WHERE U.email = ?)";
            boolean existsUser = jdbcTemplate.queryForObject(checkUser, Boolean.class, admin.getEmail());
            if (existsUser) {
                return "This email have already registered the system!";
            }
            String insertUserSql = "INSERT INTO User (user_name, user_surname, user_role, email, password, contact_info) VALUES (?, ?, ?, ?, ?, ?)";
            hashPasswordHelper.setPassword(admin.getPassword());
            String hashedPassword = hashPasswordHelper.Hash();
            jdbcTemplate.update(insertUserSql,admin.getUser_name(),admin.getUser_surname(),1,admin.getEmail(),hashedPassword,admin.getContact_info());

            String userSql = "SELECT * FROM User U where U.email = ?;";
            User user = jdbcTemplate.queryForObject(userSql, new UserMapper(),admin.getEmail());

            String insertAdminSql = "INSERT INTO Admin (user_id, role) VALUES (?, ?)";
            jdbcTemplate.update(insertAdminSql, Objects.requireNonNull(user).getUser_id(),admin.getRole());

            return "Successfully added new admin!";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "Error at adding new admin process! Check It.";
        }

    }

    public List<String> getTypes(){
        String sql = "Select type_name from Type order by type_name";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString(1));
    }

    public List<String> getMaterials(){
        String sql = "Select material_name from Material order by material_name";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString(1));
    }

    public List<String> getRarities(){
        String sql = "Select rarity_name from Rarity order by rarity_name";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString(1));
    }

    public List<String> getMovements(){
        String sql = "Select movement_name from Movement order by movement_name";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString(1));
    }




}
