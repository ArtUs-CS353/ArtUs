package com.artus.artus.controllers;

import com.artus.artus.models.Artist;
import com.artus.artus.models.Enthusiast;
import com.artus.artus.models.LoginResponseDTO;
import com.artus.artus.models.User;
import com.artus.artus.services.LoginService;
import com.artus.artus.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
                                                      @RequestParam("address") String address
    ){
        Enthusiast enthusiast = new Enthusiast();
        enthusiast.setContact_info(contactInfo);
        enthusiast.setEmail(email);
        enthusiast.setPassword(password);
        enthusiast.setUser_name(userName);
        enthusiast.setUser_surname(userSurname);
        enthusiast.setAddress(address);
        return new ResponseEntity<>(registerService.registerEnthusiast(enthusiast), HttpStatus.OK);
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
    public ResponseEntity<LoginResponseDTO> login(@RequestParam String email, @RequestParam String password){
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        User returnedUser = loginService.login(user);

        if(returnedUser == null){
            loginResponseDTO.setMessage("User with email: " + email + " does not exist!");
            return new ResponseEntity<>(loginResponseDTO,HttpStatus.BAD_REQUEST);
        } else if (returnedUser.getPassword()==null) {
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
