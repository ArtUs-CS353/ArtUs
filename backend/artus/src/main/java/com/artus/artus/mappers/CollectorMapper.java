package com.artus.artus.mappers;

import com.artus.artus.models.Collector;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CollectorMapper implements RowMapper<Collector> {
    @Override
    public Collector mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        String address = rs.getString("address");
        float balance = rs.getFloat("balance");
        String user_name=rs.getString("user_name");
        String user_surname=rs.getString("user_surname");
        int user_role= rs.getInt("user_role");
        String contact_info=rs.getString("contact_info");

        Collector collector = new Collector();
        collector.setUser_id(user_id);
        collector.setAddress(address);
        collector.setBalance(balance);
        collector.setUser_name(user_name);
        collector.setUser_surname(user_surname);
        collector.setUser_role(user_role);
        collector.setContact_info(contact_info);

        return collector;
    }
}
