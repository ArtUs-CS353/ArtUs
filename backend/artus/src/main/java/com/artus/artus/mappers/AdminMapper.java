package com.artus.artus.mappers;

import com.artus.artus.models.Admin;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
public class AdminMapper implements RowMapper<Admin> {
    @Override
    public Admin mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id =rs.getInt("user_id");
        String user_name = rs.getString("user_name");
        String user_surname = rs.getString("user_surname");
        String role = rs.getString("role");
        String email = rs.getString("email");
        String password = rs.getString("password");
        String contact_info = rs.getString("contact_info");

        Admin admin = new Admin();
        admin.setUser_id(user_id);
        admin.setUser_name(user_name);
        admin.setUser_surname(user_surname);
        admin.setRole(role);
        admin.setEmail(email);
        admin.setPassword(password);
        admin.setContact_info(contact_info);
        return admin;
    }
}
