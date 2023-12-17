package com.artus.artus.controllers;

import com.artus.artus.models.Artwork;
import com.artus.artus.models.Collector;
import com.artus.artus.services.EnthusiastService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/enthusiast")
public class EnthusiastController {
    private final EnthusiastService enthusiastService;

    public EnthusiastController(EnthusiastService enthusiastService) {
        this.enthusiastService = enthusiastService;
    }

    @GetMapping("/{collector_id}/artworks")
    public ResponseEntity<List<Artwork>> getCollectorArtworksByID(@PathVariable int collector_id){
        return new ResponseEntity<>(enthusiastService.getCollectorArtworks(collector_id), HttpStatus.OK);
    }

    @GetMapping("{collector_id}")
    public ResponseEntity<Collector> getCollectorByID(@PathVariable int collector_id){
        return new ResponseEntity<>(enthusiastService.getCollector(collector_id),HttpStatus.OK);
    }

    @PostMapping("/{enthusiast_id}/increase_balance")
    public ResponseEntity<Boolean> increaseBalanceByID(@PathVariable int enthusiast_id,
                                                       @RequestParam("money") int money){
        if(enthusiastService.increaseBalance(enthusiast_id,money))
            return new ResponseEntity<>(true,HttpStatus.OK);
        return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
    }
}
