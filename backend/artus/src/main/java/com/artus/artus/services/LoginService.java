package com.artus.artus.services;

import com.artus.artus.helpers.HashPasswordHelper;
import com.artus.artus.mappers.UserMapper;
import com.artus.artus.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    private final JdbcTemplate jdbcTemplate;
    private HashPasswordHelper hashPasswordHelper = HashPasswordHelper.getInstance();

    public LoginService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User login(User user){
        String checkUser = "SELECT EXISTS (SELECT * FROM USER U WHERE U.email = ?)";
        boolean existsUser = jdbcTemplate.queryForObject(checkUser, Boolean.class, user.getEmail());
        if (!existsUser) {
            return null;
        }
        hashPasswordHelper.setPassword(user.getPassword());
        String hashedPassword = hashPasswordHelper.Hash();
        String userSql = "SELECT * FROM USER U WHERE U.email = ?;";
        User returnedUser = jdbcTemplate.queryForObject(userSql,new UserMapper(),user.getEmail());

        if(returnedUser.getPassword().equals(hashedPassword)){
            return returnedUser;
        }
        returnedUser.setPassword(null);
        return returnedUser;
    }
}
