package com.artus.artus.controllers;

import com.artus.artus.models.Artist;
import com.artus.artus.models.Enthusiast;
import com.artus.artus.models.LoginResponseDTO;
import com.artus.artus.models.User;
import com.artus.artus.services.LoginService;
import com.artus.artus.services.RegisterService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping()
public class LogController {
    private final RegisterService registerService;
    private final LoginService loginService;

    @Autowired
    public LogController(RegisterService registerService, LoginService loginService) {
        this.registerService = registerService;
        this.loginService = loginService;
    }

    @PostMapping("/register/enthusiast")
    public ResponseEntity<String> registerEnthusiast(@RequestParam("userName") String userName,
                                                      @RequestParam("userSurname") String userSurname,
                                                      @RequestParam("email") String email,
                                                      @RequestParam("password") String password,
                                                      @RequestParam("contactInfo") String contactInfo,
                                                      @RequestParam("address") String address,
                                                      @RequestParam("role") int role,
                                                      @RequestParam("Preferences") String preferencesJSON
    ){
        try {
            String decodedPreferences = URLDecoder.decode(preferencesJSON, "UTF-8");
            System.out.println(decodedPreferences);


            ObjectMapper objectMapper = new ObjectMapper();
            String[] preferences = objectMapper.readValue(decodedPreferences, String[].class);

            

            Enthusiast enthusiast = new Enthusiast();
            enthusiast.setContact_info(contactInfo);
            enthusiast.setEmail(email);
            enthusiast.setPassword(password);
            enthusiast.setUser_name(userName);
            enthusiast.setUser_surname(userSurname);
            enthusiast.setAddress(address);
            enthusiast.setUser_role(role);

            System.out.println(enthusiast.getContact_info() + " " + enthusiast.getEmail() + " " + enthusiast.getPassword()
            + " " + enthusiast.getUser_name() + " " + enthusiast.getUser_surname() + " " 
            + enthusiast.getAddress() + " " + enthusiast.getUser_role());


            return new ResponseEntity<>(registerService.registerEnthusiast(enthusiast, preferences), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing preferences", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/register/getTypes")
    public ResponseEntity<List<String>> getTypes(){
        return new ResponseEntity<>(registerService.getTypes(),HttpStatus.OK);
    }

    @GetMapping("/register/getMaterials")
    public ResponseEntity<List<String>> getMaterials(){
        return new ResponseEntity<>(registerService.getMaterials(),HttpStatus.OK);
    }

    @GetMapping("/register/getRarities")
    public ResponseEntity<List<String>> getRarities(){
        return new ResponseEntity<>(registerService.getRarities(),HttpStatus.OK);
    }

    @GetMapping("/register/getMovements")
    public ResponseEntity<List<String>> getMovements(){
        return new ResponseEntity<>(registerService.getMovements(),HttpStatus.OK);
    }


    @PostMapping("/register/artist")
    public ResponseEntity<String> registerArtist(@RequestParam("userName") String userName,
                                                     @RequestParam("userSurname") String userSurname,
                                                     @RequestParam("email") String email,
                                                     @RequestParam("password") String password,
                                                     @RequestParam("contactInfo") String contactInfo,
                                                     @RequestParam("profileDetails") String profileDetails,
                                                     @RequestParam("biography") String biography
    ){
        Artist artist = new Artist();
        artist.setContact_info(contactInfo);
        artist.setEmail(email);
        artist.setPassword(password);
        artist.setUser_name(userName);
        artist.setUser_surname(userSurname);
        artist.setProfile_details(profileDetails);
        artist.setBiography(biography);
        return new ResponseEntity<>(registerService.registerArtist(artist), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestParam String email, @RequestParam String password) {
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        System.out.println("Received login request - Email: " + user.getEmail() + ", Password: " + user.getPassword());
        
        User returnedUser = loginService.login(user);

        System.out.println("Received login request - Email: " + user.getEmail() + ", Password: " + user.getPassword());

        if(returnedUser == null){
            loginResponseDTO.setMessage("User with email: " + email + " does not exist!");
            return new ResponseEntity<>(loginResponseDTO,HttpStatus.BAD_REQUEST);
        } else if (returnedUser.getPassword() == null) {
            loginResponseDTO.setMessage("Incorrect password.");
            return new ResponseEntity<>(loginResponseDTO,HttpStatus.BAD_REQUEST);
        }else {
            loginResponseDTO.setRole(returnedUser.getUser_role());
            loginResponseDTO.setUserId(returnedUser.getUser_id());
            loginResponseDTO.setMessage("Successful login!");
            return new ResponseEntity<>(loginResponseDTO,HttpStatus.OK);
        }
    }
}
