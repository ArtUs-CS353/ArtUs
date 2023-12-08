package com.artus.artus.mappers;

import com.artus.artus.models.Enthusiast;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EnthusiastMapper implements RowMapper<Enthusiast> {
    @Override
    public Enthusiast mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        String address = rs.getString("address");
        float balance = rs.getFloat("balance");
        String user_name = rs.getString("user_name");
        String user_surname = rs.getString("user_surname");
        int user_role = rs.getInt("user_role");
        String email = rs.getString("email");
        String password = rs.getString("password");
        String contact_info = rs.getString("contact_info");

        Enthusiast enthusiast = new Enthusiast();
        enthusiast.setUser_id(user_id);
        enthusiast.setAddress(address);
        enthusiast.setBalance(balance);
        enthusiast.setUser_name(user_name);
        enthusiast.setUser_surname(user_surname);
        enthusiast.setUser_role(user_role);
        enthusiast.setEmail(email);
        enthusiast.setPassword(password);
        enthusiast.setContact_info(contact_info);

        return enthusiast;
    }
}
