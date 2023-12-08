package com.artus.artus.mappers;

import com.artus.artus.models.Resell;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResellMapper implements RowMapper<Resell> {
    @Override
    public Resell mapRow(ResultSet rs, int rowNum) throws SQLException {
        int artwork_id = rs.getInt("artwork_id");
        int customer_id = rs.getInt("customer_id");
        int collector_id = rs.getInt("collector_id");
        float price = rs.getFloat("price");

        Resell resell = new Resell();
        resell.setArtwork_id(artwork_id);
        resell.setCollector_id(collector_id);
        resell.setCustomer_id(customer_id);
        resell.setPrice(price);

        return resell;
    }
}
