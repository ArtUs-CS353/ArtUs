package com.artus.artus.mappers;

import com.artus.artus.models.User;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
@Component
public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        int user_role = rs.getInt("user_role");
        String email = rs.getString("email");
        String password = rs.getString("password");

        User user = new User();
        user.setUser_id(user_id);
        user.setUser_role(user_role);
        user.setEmail(email);
        user.setPassword(password);
        return user;
    }
}
