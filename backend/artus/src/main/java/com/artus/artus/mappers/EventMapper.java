package com.artus.artus.mappers;

import com.artus.artus.models.Event;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
@Component
public class EventMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        int user_id = rs.getInt("artist_id");
        int event_id = rs.getInt("event_id");
        LocalDateTime start_date = rs.getObject("start_date", LocalDateTime.class);
        LocalDateTime end_date = rs.getObject("end_date", LocalDateTime.class);
        String poster_URL = rs.getString("poster_URL");
        String meeting_link = rs.getString("meeting_link");
        String status = rs.getString("status");


        Event event = new Event();
        event.setArtist_id(user_id);
        event.setEvent_id(event_id);
        event.setStart_date(start_date);
        event.setEnd_date(end_date);
        event.setPoster_URL(poster_URL);
        event.setMeeting_link(meeting_link);
        event.setStatus(status);

        return event;
    }
}
