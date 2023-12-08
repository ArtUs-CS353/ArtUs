package com.artus.artus.mappers;

import com.artus.artus.models.Exhibition;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class ExhibitionMapper implements RowMapper<Exhibition> {
    @Override
    public Exhibition mapRow(ResultSet rs, int rowNum) throws SQLException {
        int exhibition_id = rs.getInt("exhibition_id");
        String exhibition_name = rs.getString("exhibition_name");
        LocalDateTime start_date = rs.getObject("start_date", LocalDateTime.class);
        LocalDateTime end_date = rs.getObject("end_date", LocalDateTime.class);
        String poster_URL = rs.getString("poster_URL");

        Exhibition exhibition = new Exhibition();
        exhibition.setExhibition_id(exhibition_id);
        exhibition.setExhibition_name(exhibition_name);
        exhibition.setStart_date(start_date);
        exhibition.setEnd_date(end_date);
        exhibition.setPoster_URL(poster_URL);

        return exhibition;
    }
}
