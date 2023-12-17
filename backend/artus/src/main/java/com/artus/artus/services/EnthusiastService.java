package com.artus.artus.services;

import com.artus.artus.mappers.ArtworkMapper;
import com.artus.artus.mappers.CollectorMapper;
import com.artus.artus.models.Artwork;
import com.artus.artus.models.Collector;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnthusiastService {

    private final JdbcTemplate jdbcTemplate;


    public EnthusiastService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Artwork> getCollectorArtworks(int id){
        String sql = "Select * FROM Owns O , Artwork A where O.user_id = ? AND O.artwork_id = A.artwork_id;";
        return jdbcTemplate.query(sql,new ArtworkMapper(),id);
    }

    public Collector getCollector(int id){
        String sql = "Select * from Collector C, User U where C.user_id = ? AND U.user_id = C.user_id;";
        return jdbcTemplate.query(sql,new CollectorMapper(),id).get(0);
    }

    public boolean increaseBalance(int id,int money){
        String sql = "Update Enthusiast Set balance = balance + ? where user_id = ?;";
        try{
            jdbcTemplate.update(sql,money,id);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }


}
