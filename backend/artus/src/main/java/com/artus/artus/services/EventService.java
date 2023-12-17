package com.artus.artus.services;
import com.artus.artus.mappers.EventMapper;
import com.artus.artus.models.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {
private final JdbcTemplate jdbcTemplate;
private final EventMapper eventMapper;

    @Autowired
    public EventService(JdbcTemplate jdbcTemplate, EventMapper eventMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.eventMapper = eventMapper;
    }

    public boolean createEvent(Event event){
        try{
            String sql = "INSERT INTO Event (artist_id, meeting_link , start_date , end_date , poster_URL , status) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql,  event.getArtist_id(),event.getMeeting_link(), event.getStart_date(), event.getEnd_date(), event.getPoster_URL(), "waiting");
            return true;
        }
        catch(Exception e){
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the insertion fails, return false
            return false;
        }
    }

    public List<Event> getAllWaitingEvents() {
        try{
            String sql = "SELECT * FROM Event WHERE status = 'waiting'";
            return jdbcTemplate.query(sql, eventMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Event> getAllApprovedEvents() {
        try{
            String sql = "SELECT * FROM Event WHERE status = 'approved'";
            return jdbcTemplate.query(sql, eventMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Event> getAllDeclinedEvents() {
        try{
            String sql = "SELECT * FROM Event WHERE status = 'declined'";
            return jdbcTemplate.query(sql, eventMapper);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public Boolean approveEvent(int eventId) {
        try {
            String sql = "UPDATE Event SET status = 'approved' WHERE event_id = ?";
            jdbcTemplate.update(sql, eventId);
            return true;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return false;
        }
    }

    public Boolean declineEvent(int eventId) {
        try {
            String sql = "UPDATE Event SET status = 'declined' WHERE event_id = ?";
            jdbcTemplate.update(sql, eventId);
            return true;
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return false;
        }
    }

    public List<Event> getAllApprovedCurrentEvents() {
        try{
            LocalDateTime currentTime = LocalDateTime.now();
            String sql = "SELECT * FROM Event WHERE start_date <= ? AND end_date > ? AND status = 'approved'";
            return jdbcTemplate.query(sql, eventMapper, currentTime, currentTime);
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }

    public List<Event> getAllApprovedFutureEvents() {
        try{
            String sql = "SELECT * FROM Event WHERE start_date > ? AND status = 'approved'";
            return jdbcTemplate.query(sql, eventMapper, LocalDateTime.now());
        } catch (Exception e) {
            // Handle exceptions, log errors, etc.
            e.printStackTrace();
            // If the update fails, return false
            return null;
        }
    }
}
