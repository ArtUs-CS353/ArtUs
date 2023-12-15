package com.artus.artus.services;

import com.artus.artus.mappers.ArtistMapper;
import com.artus.artus.mappers.AuctionPropertiesMapper;
import com.artus.artus.models.Artist;
import com.artus.artus.models.AuctionProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ArtistService {
    private final JdbcTemplate jdbcTemplate;



    public ArtistService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Artist> getAllArtists(){
        String sql = "SELECT * FROM Artist A, User U where U.user_id = A.user_id";
        return jdbcTemplate.query(sql,new ArtistMapper());
    }

    public Artist getArtistByID(int artist_id){
        String sql = "SELECT * FROM Artist A, User U where U.user_id = A.user_id and A.user_id = ?";
        return jdbcTemplate.query(sql,new ArtistMapper(),artist_id).get(0);
    }

    public List<AuctionProperties> getAuctionsByArtistID(int artist_id){
        String sql = "SELECT AU.type AS auction_type,AW.type AS artwork_type, AU.status AS auction_status, AU.*,AW.* FROM Auction AU, Artwork AW, Artist AR where AU.artwork_id = AW.artwork_id AND AW.artist_id = AR.user_id AND AR.user_id = ?;";
        return jdbcTemplate.query(sql,new AuctionPropertiesMapper(),artist_id);
    }
    public List<Artist> searchArtistByNameBySurname(String search){
        String mainSQL = "WITH temp (user_name,user_surname,contact_info,balance,biography,is_featuring,follower_count,user_id,profile_details,name_surname) as (SELECT U.user_name,U.user_surname,U.contact_info,A.balance,A.biography,A.is_featuring,A.follower_count,U.user_id,A.profile_details,CONCAT(U.user_name, ' ', U.user_surname) as name_surname FROM Artist A, User U WHERE A.user_id = U.user_id) Select * FROM temp WHERE name_surname LIKE ? ";
        return jdbcTemplate.query(mainSQL,new ArtistMapper(),"%" + search + "%" );
    }
}
