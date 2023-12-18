package com.artus.artus.controllers;
import com.artus.artus.models.Artwork;
import com.artus.artus.models.Exhibition;
import com.artus.artus.services.ExhibitionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/exhibition")
public class ExhibitionController {

    private final ExhibitionService exhibitionService;

    public ExhibitionController(ExhibitionService exhibitionService) {
        this.exhibitionService = exhibitionService;
    }


    @PostMapping("/create")
    public ResponseEntity<Exhibition> createExhibition(@RequestParam("title") String title,
                                                       @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime startDatetime,
                                                       @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime endDatetime,
                                                       @RequestParam("posterURL") String posterURL) {
      
        if(startDatetime.isBefore(LocalDateTime.now())){
            System.out.println("Start datetime must be in the future");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        if(endDatetime.isBefore(startDatetime)){
            System.out.println("End datetime must be after start datetime");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // Your existing code to create an Auction
        Exhibition exhibition = new Exhibition();
        exhibition.setExhibition_name(title);
        exhibition.setStart_date(startDatetime);
        exhibition.setEnd_date(endDatetime);
        exhibition.setPoster_URL(posterURL);

        boolean result = exhibitionService.createExhibition(exhibition);

        if (result) {
            return new ResponseEntity<>(exhibition, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllExhibitions")
    public ResponseEntity<List<Exhibition>> getAllExhibitions(){
        List<Exhibition> exhibitions = exhibitionService.getAllExhibitions();
        if(exhibitions != null ){
            return new ResponseEntity<>(exhibitions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllCurrentExhibitions")
    public ResponseEntity<List<Exhibition>> getAllCurrentExhibitions(){
        List<Exhibition> exhibitions = exhibitionService.getAllCurrentExhibitions();
        if(exhibitions != null ){
            return new ResponseEntity<>(exhibitions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllFutureExhibitions")
    public ResponseEntity<List<Exhibition>> getAllFutureExhibitions(){
        List<Exhibition> exhibitions = exhibitionService.getAllFutureExhibitions();
        if(exhibitions != null ){
            return new ResponseEntity<>(exhibitions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/getAllPassedExhibitions")
    public ResponseEntity<List<Exhibition>> getAllPassedExhibitions(){
        List<Exhibition> exhibitions = exhibitionService.getAllPassedExhibitions();
        if(exhibitions != null ){
            return new ResponseEntity<>(exhibitions, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @GetMapping("/{exhibitionId}/getAllArtworks")
    @Operation(summary = "This method gives list of artwork ids in an exhibition")
    public ResponseEntity<List<Artwork>> getAllArtworks(@PathVariable int exhibitionId){
        List<Artwork> result = exhibitionService.getAllArtworks(exhibitionId);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
