package com.artus.artus.services;


import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseLoader {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostConstruct
    private void initDatabase(){
        System.out.println("You may ignore the following errors");
        initUserTable();
        initArtistTable();
        initArtworkTable();
        initPreferenceTable();
    }
    
    private void initUserTable(){
        try{
            jdbcTemplate.execute("INSERT INTO User (user_name, user_surname, user_role, email, password, contact_info) VALUE " +
                    "( 'Robert', 'Nava', 2, 'robert.nava@artist.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '123-456-7890'), " +
                    "( 'Issy', 'Wood', 2, 'issy.wood@artist.com', 'wrong-password', '987-654-3210'), " +
                    "( 'Anna', 'Park', 2, 'alice.johnson@artist.com', 'wrong-password', '555-123-4567')," +
                    "( 'Louis', 'Fratino', 2, 'louis.fratino@artist.com', 'wrong-password', '505-123-4567')," +
                    "( 'Pablo', 'Picasso', 2, 'pablo.picasso@artist.com', 'wrong-password', '505-106-8574')," +
                    "( 'Leonardo da', 'Vinci', 2, 'leo.vinci@artist.com', 'wrong-password', '505-106-8674')," +
                    "( 'Judy', 'Chicago', 2, 'judy@artist.com', 'wrong-password', '505-106-5974')," +
                    "( 'Lee', 'Ufan', 2, 'leesin@artist.com', 'wrong-password', '505-106-5974')," +
                    "( 'Fausto', 'Melotti', 2, 'melotti@artist.com', 'wrong-password', '505-106-9874')," +
                    "( 'Philip', 'Colbert', 2, 'colbert@artist.com', 'wrong-password', '505-106-4541')," +
                    "( 'Dua', 'Lipa', 1, 'dualipa@admin.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '+1 (917) 810-3415');");
        }catch (Exception e){
            System.out.println("Error occurred while inserting into User table:"+e.getMessage());
        }
    }
    private void initArtistTable(){
        try {
            jdbcTemplate.execute("INSERT INTO Artist (user_id, profile_details, follower_count, is_featuring, biography, balance) VALUES" +
                    "(1, 'American, b. 1985', 8, TRUE, 'Robert Nava’s striking, pared-down figurations generate their own irreverent, mythical visual language. The Indiana-born, Brooklyn-based artist uses a mix of spray paint, acrylics, and grease pencil to create a lexicon of creatures real and imagined, including sharks, angels, clowns, and more. Nava, who graduated with an MFA in painting from Yale in 2011, has exhibited widely in the intervening years: He has enjoyed solo shows in New York, Brussels, Los Angeles, and Copenhagen. His work also belongs in the Art Institute of Chicago’s permanent collection. Nava’s purposeful chaos and formal simplicity place his work in a number of iconic lineages, from cave paintings to Jean-Michel Basquiat’s gestural exuberance.', 0.0), " +
                    "(2, 'American, b. 1993', 7, TRUE, 'Painter Issy Wood turns subjects like Joan Rivers or an ornate silver tureen into dusty, sad relics of fading luxury. Her works are populated by an absurdist menagerie of subject matter that seems desultory, but is distinctly the artist’s own. Wood uses auction catalogues and a collection of items bequeathed to her by her maternal grandmother as source materials in some of her work, which includes painting and installation, as well as writing. Her searingly sardonic tone comes through in her titles, like Kettle (By which I mean you die in a fire) (2018). Wood, who calls herself a “medieval millennial” in reference to her classical style, envisions a dark world in which women have been battered by consumerism, heritage is turned into a transaction, and humor is as trenchant as a pair of gold teeth. Wood is featured in The Artsy Vanguard 2020.', 0.00), " +
                    "(3, 'South Korean, b. 1996', 20, TRUE, 'Anna Park’s frenetic charcoal drawings range from near-abstract compositions to kaleidoscopic representational scenes of debauched parties, but they are uniformly dense with the artist’s gestural strokes and intricate shading. In Park’s canvases, grayscale pandemonium reigns, with distended limbs and fractured faces swirling amid a whirlpool of discards from parties, dinners, and other high-energy social events. Park usually sources her imagery from internet searches, incorporating the constant bombardment of digital media into her canvases. The artist received her MFA from the New York Academy of Art and has exhibited in New York, London, Paris, Los Angeles, Amsterdam, and Miami. Her work is in the collections of the High Museum of Art, the Institute of Contemporary Art Miami, the Museum of Fine Arts, Houston, and the Pérez Art Museum Miami.', 0.0)," +
                    "(4, 'American, b. 1993', 10, TRUE, 'Louis Fratino synthesizes his own experiences, memories, and fantasies in his intimate, sensual paintings of gay life in the metropolis. In his celebrated male nudes, scenes of entangled bodies, and pictures of subway passengers peering at their reflections, Fratino imbues contemporary subject matter with art historical references. Evoking tenets of Cubism and Fauvism, his paintings often embrace the styles and palettes of early 20th-century modernists such as Pablo Picasso, Fernand Léger, and Henri Matisse. A graduate of the Maryland Institute College of Art, Fratino was awarded a Fulbright Research Fellowship in 2016. His work has been exhibited in New York, Los Angeles, Paris, Berlin, and Stockholm, among other cities. Along with his portraits and group scenes, Fratino has also painted still lifes and interiors.', 0.0)," +
                    "(5, 'Spanish, 1881–1973', 0, FALSE, 'Perhaps the most influential artist of the 20th century, Pablo Picasso may be best known for pioneering Cubism and fracturing the two-dimensional picture plane in order to convey three-dimensional space. Inspired by African and Iberian art, he also contributed to the rise of Surrealism and Expressionism. Picasso’s sizable oeuvre grew to include over 20,000 paintings, prints, drawings, sculptures, ceramics, theater sets, and costume designs. He painted his most famous work, Guernica (1937), in response to the Spanish Civil War; the totemic grisaille canvas remains a definitive work of anti-war art. At auction, a number of Picasso’s paintings have sold for more than $100 million. The indefatigable artist has been the subject of exhibitions at the world’s most prestigious institutions, from the Museum of Modern Art and Centre Pompidou to the Stedelijk Museum and Tate Modern.', 0.0)," +
                    "(6, 'Italian, 1452–1519', 24, FALSE, 'Leonardo da Vinci is one of the foremost artists in the history of Western art, famed for painting the Mona Lisa (ca. 1503-6), and for his meticulous, dynamic drawings of various mechanical devices, animals, and imagined machines, as well as his portraits and writings on art and science. A founding father of the High Renaissance style, he is admired for his virtuosity as a painter and draughtsman in the handling of space, depiction of light and shadow, and expert use of sfumato, in which tones and colors shade gradually into one, producing softened outlines. Although few works seem to have been finished, and even fewer survive, Leonardo’s writings and sketchbooks offer glimpses into the life of an ingenious polymath. “Painting,” he wrote, “is poetry that is seen rather than felt.”', 0.0)," +
                    "(7, 'American, b. 1939', 30, FALSE, 'Multidisciplinary artist Judy Chicago helped pioneer the feminist art movement in the 1960s and ’70s; for decades, she has made work that celebrates the multiplicity of female identity. Chicago’s practice spans painting, textile arts, sculpture, and installation and has explored the intricacies of childbirth (as seen in her “Birth Project” series, 1980–85), the possibilities of minimalist sculpture, and the relationship between landscape and the female body. Her most famous work, an installation called The Dinner Party (1974–79), is an homage to 39 influential female figures from Eastern and Western mythology and civilization. Chicago studied at the University of California, Los Angeles. She founded a groundbreaking and widely influential feminist art program while on staff at California State University, Fresno. Her work has been exhibited in New York, London, Milan, Chicago, and San Francisco and belongs in the collections of the British Museum, Moderna Museet, the Metropolitan Museum of Art, the Los Angeles County Museum of Art, the Tate, the Art Institute of Chicago, and the National Gallery of Art in Washington, D.C.', 0)," +
                    "(8, 'Korean, b. 1936', 0, FALSE, 'A founding member of the Japanese Mono-ha movement, Lee Ufan arranges his installations and sculptures to emphasize the equal relationship between his artwork, the viewer, and the exhibition space. He often juxtaposes natural and industrial materials in site-specific installations; throughout various pieces, steel reeds appear to sprout from a patch of sand, heavy stones perch on cushions, and boulders bookend a towering metal arc. Subdued hues are another signature element of Lee’s work. Throughout his paintings, for example, the artist applies muted colors against light, plain backgrounds. His brushstrokes fade as they end, evoking East Asian calligraphy. Lee has exhibited in New York, London, Seoul, Tokyo, Versailles, and Washington, D.C., among other cities. In 2000, he won the UNESCO Prize at the Shanghai Biennale, and the following year, he was awarded the Praemium Imperiale by the Japan Art Association. His work belongs in prominent collections in Europe, North America, Australia, Asia, and South America, and has sold for seven figures at auction.', 0)," +
                    "(9, 'Italian, 1901–1986', 0, TRUE, 'Working in an array of materials, including wood, wire, plaster, and ceramics, Fausto Melotti is known for creating curious Surrealist sculptures in which symbolic forms express what has been described as the “inner realms of human experience.” Melotti’s artistic career spanned the mid-20th century, and he is thought to have been influenced by fellow Italians Georgio de Chirico and Lucio Fontana, the latter a contemporary of Melotti’s at the Academia de Belle Arti di Brera in Milan. Melotti’s wire mobiles and “cages” have been compared, respectively, to the work of Alexander Calder and Alberto Giacometti. With their repeating motifs and rhythmic structures, these works also reflect Melotti’s strong interest in musical composition. Later in his career, Melotti’s work became increasingly figurative, a turn described by some critics as a postwar return to humanism.', 0.0)," +
                    "(10, 'Scottish, b. 1979', 0, TRUE, 'Philip Colbert’s tongue-in-cheek practice combines references to Pop icons such as Andy Warhol and Roy Lichtenstein with the compositional techniques of Old Masters such as Peter Paul Reubens and Anthony Van Dyck, all shot through with the psychologically probing humor of the Surrealists. His canvases collage recognizable such pop-cultural imagery as Captain America’s shield and branded Lacoste hoodies in jam-packed tableaux full of wry humor, often featuring his signature lobster character. Colbert occasionally translates his multilayered canvases to three-dimensional sculptural and installation works. He has exhibited in London, Busan, Seoul, Shanghai, Hong Kong, Tokyo, Los Angeles, and Miami, and his work has been exhibited at institutions including the Van Gogh Museum, the Modern Art Museum, Shanghai, and the Multimedia Art Museum in Moscow.', 0.0);");
        }catch (Exception e){
            System.out.println("Error occurred while inserting into Artist table:"+e.getMessage());
        }
    }


    private void initArtworkTable(){
        try {
            jdbcTemplate.execute("INSERT INTO Artwork (artwork_id, artist_id, title, description, type, material, size, rarity, imageURL, movement, date, is_featuring, price, status, availability,favorite_count) VALUES" +
                    "(1, 1, 'Untitled', 'Hand-signed by artist, Hand Signed Lower Right, Includes a Certificate of Authenticity', 'Drawing, Collage or other Work on Paper', 'Mixed Media on Paper', '22.9 × 30.5 cm','Unique','https://d7hftxdivxxvm.cloudfront.net?height=667&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FOK0GVkyEWSSFJFz2TOqf0Q%2Fnormalized.jpg&width=800', '','2019-01-01',  FALSE, 15000.00, 'auction', 'available',8)," +
                    "(2, 1, 'Veszhuu A Party in Vegas Wolf Spider or a Owl', 'Hand-signed by artist, Back of Painting, Includes a Certificate of Authenticity', 'Painting', 'Mixed Media on Canvas', '152.4 × 109.2 cm', 'Unique', 'https://d7hftxdivxxvm.cloudfront.net?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FWMT6K8I6v3qxQwVl-s_T2Q%2Fmain.jpg&width=800', '', '2015-01-01', TRUE, 55000.00, 'sale', 'available',10)," +
                    "(3, 1, 'Artist Plate Project', 'Signed in plate, Plate signed, Part of a limited edition set, Includes a Certificate of Authenticity', 'Ephemera or Merchandise', 'Ceramic', '26.7 × 26.7 cm', 'Limited edition', 'https://d7hftxdivxxvm.cloudfront.net?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F4EvVyQNvM9TqrBJviww7lg%2Fmain.jpg&width=800', '', '2023-01-01', false, 750, 'auction', 'available',5)," +
                    "(4, 2, 'Cool (From Love Angel Music Baby)', 'Hand-signed by artist, Edition of 100', 'Print', 'Quality giclée printed cover fixed to a custom dyed linen wrapped vinyl jacket in Gucci-designed packaging', '29.2 × 29.2 cm', 'Limited edition', 'https://d7hftxdivxxvm.cloudfront.net?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FkiPyT7i2y-WmbRiPa4-HOg%2Fmain.jpg&width=789', '', '2023-01-01', false, 4500, 'auction', 'available',4)," +
                    "(5, 2, 'Pig, Chinese Zodiac animal series', 'Not signed', 'Painting', 'Oil on clothing', '', 'Unique', 'https://d7hftxdivxxvm.cloudfront.net?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FGd2DDi2J7xCCmEMa8Y-ifQ%2Fnormalized.jpg&width=600', '', '2020-01-01', false, 0, 'on loan', 'not available',0)," +
                    "(6, 3, 'Eyes Up Here', 'Not signed, Frame Not included', 'Drawing, Collage or other Work on Paper', 'Ink, acrylic, charcoal, and paper on panel', '62.2 × 121.9 × 4.4 cm', 'Unique', 'https://d7hftxdivxxvm.cloudfront.net?height=533&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FOFV3FKaLVo2d_VMjYwoCOA%2Fnormalized.jpg&width=800', '', '2022-01-01', false, 0, 'sold', 'not available',7)," +
                    "(7, 4, 'Anemones and Shells', 'Hand-signed by artist, Signed and numbered on front Frame not included', 'Print', 'Etching with aquatint and drypoint, printed on Hahnemuhle White 300gsm paper', '60 × 45.1 cm', 'Limited edition', 'https://d7hftxdivxxvm.cloudfront.net?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCBDl-w3EQaq7QnDgJOK3wA%2Fnormalized.jpg&width=641', '', '2021-01-01', false, 7500., 'sale', 'available',0);\n");
        }catch (Exception e){
            System.out.println("Error occurred while inserting into Artwork table:"+e.getMessage());
        }
    }

    private void initPreferenceTable(){
        try {
            jdbcTemplate.execute("INSERT INTO Type (type_name) Values ('Drawing'),('Painting'),('Prints'),('Photography'),('NFT'),('Film/Video'),('Performance Art'),('Ephemera or Merchandise'),('Sculpture'),('Work on Paper'),('Design'),('Installation'),('Jewelry'),('Reproduction');");
            jdbcTemplate.execute("INSERT INTO Material (material_name) Values ('Collage'),('Paper'),('Arches paper'),('Art paper'),('Laid paper'),('Rag paper'),('Wove paper'),('Mixed Media'),('Paint'),('Spray paint'),('Blown glass'),('Canvas'),('Sound'),('Video')," +
                    "('Ceramic'),('Screen print'),('Oil'),('Ink'),('Acrylic'),('Clay'),('Crystal'),('Dye'),('Foam'),('Graphite'),('Leaf'),('Lacquer'),('Leather'),('Monotype'),('Pastel'),('Pigment'),('Platinum'),('Polaroid'),('Porcelain'),('Resin'),('Thread'),('Walnut')," +
                    "('Cotton'),('Digital'),('Glass'),('Gold'),('Iron'),('Marble'),('Metal'),('Panel'),('Pencil'),('Plastic'),('Plaster'),('Silk'),('Concrete'),('Copper'),('Silver'),('Stainless steel'),('Bronze'),('Cardboard'),('Steel'),('Stone'),('Wood'),('Wire');");
            jdbcTemplate.execute("INSERT INTO Rarity (rarity_name) Values ('Unique'),('Limited Edition'),('Open Edition'),('Unknown Edition');");
            jdbcTemplate.execute("INSERT INTO Movement (movement_name) VALUES ('Contemporary Art'),('Emerging Art'),('Street Art'),('Abstract Art'),('Pop Art'),('Minimalism'),('Impressionist and Modern Art'),('Surrealism'),('Cubism'),('Romanticism')");
        }catch (Exception e){
            System.out.println("Error occurred while inserting into Preference tables:"+e.getMessage());
        }
    }

}
