package com.artus.artus.services;

import com.artus.artus.mappers.ArtworkMapper;
import com.artus.artus.mappers.EnthusiastMapper;
import com.artus.artus.models.Artwork;
import com.artus.artus.models.Enthusiast;
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

    public Enthusiast getEnthusiast(int id){
        String sql = "Select * from Enthusiast E, User U where E.user_id = ? AND U.user_id = E.user_id;";
        return jdbcTemplate.query(sql,new EnthusiastMapper(),id).get(0);
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
