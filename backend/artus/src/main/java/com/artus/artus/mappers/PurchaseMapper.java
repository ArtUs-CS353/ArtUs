package com.artus.artus.mappers;

import com.artus.artus.models.Purchase;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class PurchaseMapper implements RowMapper<Purchase> {
    @Override
    public Purchase mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        int artwork_id = rs.getInt("artwork_id");
        int purchase_id = rs.getInt("purchase_id");
        LocalDateTime purchase_date = rs.getObject("purchase_date", LocalDateTime.class);
        float price = rs.getFloat("price");
        String receipt = rs.getString("receipt");

        Purchase purchase = new Purchase();
        purchase.setUser_id(user_id);
        purchase.setArtwork_id(artwork_id);
        purchase.setPurchase_id(purchase_id);
        purchase.setPrice(price);
        purchase.setPurchase_date(purchase_date);
        purchase.setReceipt(receipt);

        return purchase;
    }
}
