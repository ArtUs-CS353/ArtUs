package com.artus.artus.mappers;

import com.artus.artus.models.Bid;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

@Component
public class BidMapper implements RowMapper<Bid> {
    @Override
    public Bid mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("user_id");
        int auction_id = rs.getInt("auction_id");
        int bid_id = rs.getInt("bid_id");
        double amount = rs.getInt("amount");
        LocalDateTime time_stamp = rs.getObject("time_stamp", LocalDateTime.class);
        String status = rs.getString("status");

        Bid bid = new Bid();
        bid.setUser_id(user_id);
        bid.setAuction_id(auction_id);
        bid.setBid_id(bid_id);
        bid.setAmount(amount);
        bid.setTime_stamp(time_stamp);
        bid.setStatus(status);

        return bid;
    }
}
