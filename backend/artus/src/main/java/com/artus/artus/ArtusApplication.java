package com.artus.artus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class ArtusApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(ArtusApplication.class, args);
	}

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public void run(String... strings) throws Exception {
		jdbcTemplate.execute("create table if not exists User(user_id int NOT NULL AUTO_INCREMENT, user_name VARCHAR(50), user_surname VARCHAR(50),user_role int, email VARCHAR(30), password VARCHAR(255), contact_info VARCHAR(100), primary key (user_id));");
		jdbcTemplate.execute("create table if not exists Enthusiast( user_id INT, address varchar(200), balance NUMERIC(11,2), primary key(user_id), foreign key (user_id) REFERENCES User (user_id));");
		jdbcTemplate.execute("create table if not exists Collector( user_id INT, primary key(user_id), foreign key (user_id) REFERENCES Enthusiast(user_id));");
		jdbcTemplate.execute("create table if not exists Admin(user_id INT, role VARCHAR(20), foreign key (user_id) REFERENCES User (user_id));");
		jdbcTemplate.execute("create table if not exists Artist(user_id INT,  profile_details VARCHAR(100), follower_count INT, is_featuring boolean, biography VARCHAR(1500), balance NUMERIC(11,2), primary key (user_id), foreign key (user_id) REFERENCES User (user_id)) ;");
		jdbcTemplate.execute("create table if not exists ArtistRequest(request_id INT NOT NULL AUTO_INCREMENT,  user_name VARCHAR(50), user_surname VARCHAR(50), profile_details VARCHAR(100), biography VARCHAR(1500), primary key (request_id));");
		jdbcTemplate.execute("create table if not exists Preference(preference_name VARCHAR(50), primary key (preference_name));");
		jdbcTemplate.execute("create table if not exists User_Preference(user_id INT, preference_name VARCHAR(50),primary key (user_id, preference_name),foreign key (user_id) references Enthusiast (user_id),foreign key (preference_name) references Preference(preference_name));");
		jdbcTemplate.execute("create table if not exists Artwork (artwork_id INT NOT NULL AUTO_INCREMENT, artist_id INT, title VARCHAR(50), description VARCHAR(300), type VARCHAR(50), material VARCHAR(150), size VARCHAR(30), rarity VARCHAR(30), imageURL varchar(300), movement varchar(10), date DATE, is_featuring boolean,price NUMERIC(30), status varchar(20),availability varchar(20),favorite_count INT, primary key (artwork_id), foreign key (artist_id ) REFERENCES Artist(user_id));");
		jdbcTemplate.execute("create table if not exists Auction(auction_id int NOT NULL AUTO_INCREMENT, artwork_id int,start_date datetime, end_date datetime, type varchar(20), starting_amount double,status varchar(10), primary key (auction_id));");
		jdbcTemplate.execute("create table if not exists Purchase(user_id int, artwork_id int, purchase_id int NOT NULL AUTO_INCREMENT, purchase_date date, price double, receipt BLOB, primary key (purchase_id), foreign key (artwork_id) references Artwork(artwork_id), foreign key (user_id) references Enthusiast(user_id));");
		jdbcTemplate.execute("create table if not exists Notification(user_id int, notification_id int NOT NULL AUTO_INCREMENT, type varchar(50), content varchar(100), primary key (notification_id), foreign key (user_id) references User(user_id));");
		jdbcTemplate.execute("create table if not exists Bid(user_id int,auction_id int,bid_id int NOT NULL AUTO_INCREMENT,price double,time_stamp datetime, status varchar(50), primary key (bid_id),foreign key (user_id) references User(user_id),foreign key (auction_id) references Auction(auction_id));");
		jdbcTemplate.execute("create table if not exists Follow(enthusiast_id int, artist_id int, primary key (enthusiast_id, artist_id),foreign key (enthusiast_id) references Enthusiast(user_id), foreign key (artist_id) references Artist(user_id));");
		jdbcTemplate.execute("create table if not exists Message(enthusiast_id int, artist_id int, context varchar(300), send_time datetime, primary key (enthusiast_id, artist_id, send_time), foreign key (enthusiast_id) references Enthusiast(user_id), foreign key (artist_id) references Artist(user_id));");
		jdbcTemplate.execute("create table if not exists Favorite(user_id int, artwork_id int,primary key (user_id, artwork_id),foreign key (user_id) references Enthusiast (user_id),foreign key (artwork_id) references Artwork(artwork_id));");
		jdbcTemplate.execute("create table if not exists Event(user_id int, event_id varchar(50), link varchar(50), start_date datetime, end_date datetime, poster_URL varchar(50), meeting_link varchar(50), primary key (event_id),foreign key (user_id) references Artist (user_id));");
		jdbcTemplate.execute("create table if not exists Exhibition(exhibition_id int, exhibition_name varchar(50), start_date datetime, end_date datetime,poster_URL varchar(50), primary key (exhibition_id));");
		jdbcTemplate.execute("create table if not exists Includes(exhibition_id int, artwork_id int, primary key (exhibition_id, artwork_id), foreign key (exhibition_id) references Exhibition (exhibition_id), foreign key (artwork_id) references Artwork (artwork_id));");
		jdbcTemplate.execute("create table if not exists Sell(artwork_id int, user_id int, primary key (artwork_id, user_id), foreign key (artwork_id) references  Artwork(artwork_id), foreign key (user_id) references  Artist(user_id));");
		jdbcTemplate.execute("create table if not exists Owns(artwork_id int, user_id int, primary key (artwork_id, user_id),foreign key (artwork_id) references  Artwork(artwork_id), foreign key (user_id)references Enthusiast(user_id));");
		jdbcTemplate.execute("create table if not exists Resell(artwork_id int, customer_id int, collector_id int, price double, primary key (artwork_id, customer_id, collector_id), foreign key (artwork_id) references  Artwork(artwork_id), foreign key (customer_id) references  Enthusiast(user_id), foreign key (collector_id) references Collector(user_id));");
		jdbcTemplate.execute("create table if not exists Display(exhibition_id int, artwork_id int,status varchar(50), primary key (exhibition_id,  artwork_id));");
		jdbcTemplate.execute("create table if not exists Type(type_name varchar(50),primary key (type_name));");
		jdbcTemplate.execute("create table if not exists Rarity(rarity_name varchar(50),primary key (rarity_name));");
		jdbcTemplate.execute("create table if not exists Material(material_name varchar(50),primary key (material_name));");
		jdbcTemplate.execute("create table if not exists Movement(movement_name varchar(50),primary key (movement_name));");


		try {
			jdbcTemplate.execute("create view Most_Favorite_Artworks AS WITH temp(artwork_id,favorite_count) AS (SELECT artwork_id, COUNT(*) FROM Favorite GROUP BY artwork_id) SELECT * FROM Artwork A, temp T, User U WHERE T.artwork_id = A.artwork_id AND A.artist_id = U.user_id AND A.is_featuring = TRUE ORDER BY T.favorite_count DESC;");
			jdbcTemplate.execute("ALTER TABLE User ADD CONSTRAINT unique_email UNIQUE (email);\n");
			jdbcTemplate.execute("ALTER TABLE Artist ADD CONSTRAINT check_follower_count CHECK (follower_count >= 0);");
			jdbcTemplate.execute("ALTER TABLE Auction ADD CONSTRAINT check_starting_amount CHECK (starting_amount >= 0);");
			jdbcTemplate.execute("ALTER TABLE Purchase ADD CONSTRAINT check_purchase_amount CHECK (price > 0);");
			jdbcTemplate.execute("ALTER TABLE Bid ADD CONSTRAINT chk_bid_amount CHECK (price > 0);");
			jdbcTemplate.execute("ALTER TABLE Auction ADD CONSTRAINT chk_auction_dates CHECK (end_date > start_date);");
			jdbcTemplate.execute("ALTER TABLE User MODIFY user_name VARCHAR(50) NOT NULL;");
			jdbcTemplate.execute("ALTER TABLE Artwork MODIFY title VARCHAR(50) NOT NULL;");
			jdbcTemplate.execute("ALTER TABLE User ADD CONSTRAINT chk_password_length CHECK (CHAR_LENGTH(password) >= 6);");
			jdbcTemplate.execute("ALTER TABLE Enthusiast ADD CONSTRAINT chk_balance CHECK (balance >= 0);");
			jdbcTemplate.execute("CREATE TRIGGER insert_into_preference_type AFTER INSERT ON Type FOR EACH ROW INSERT INTO Preference (preference_name) VALUES (NEW.type_name);");
			jdbcTemplate.execute("CREATE TRIGGER insert_into_preference_rarity AFTER INSERT ON Rarity FOR EACH ROW INSERT INTO Preference (preference_name) VALUES (NEW.rarity_name);");
			jdbcTemplate.execute("CREATE TRIGGER insert_into_preference_material AFTER INSERT ON Material FOR EACH ROW INSERT INTO Preference (preference_name) VALUES (NEW.material_name);");
			jdbcTemplate.execute("CREATE TRIGGER insert_into_preference_movement AFTER INSERT ON Movement FOR EACH ROW INSERT INTO Preference (preference_name) VALUES (NEW.movement_name);");
			jdbcTemplate.execute("CREATE TRIGGER delete_associated_bids BEFORE DELETE ON Auction FOR EACH ROW BEGIN DELETE FROM Bid WHERE auction_id = OLD.auction_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER delete_artist_data BEFORE DELETE ON Artist FOR EACH ROW BEGIN DELETE FROM Follow WHERE artist_id = OLD.user_id; DELETE FROM Sell WHERE user_id = OLD.user_id;  DELETE FROM Artwork WHERE user_id = OLD.user_id; DELETE FROM Message WHERE artist_id = OLD.user_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER delete_artwork_data BEFORE DELETE ON Artwork FOR EACH ROW BEGIN  DELETE FROM Auction WHERE artwork_id = OLD.artwork_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER delete_enthusiast_data BEFORE DELETE ON Enthusiast FOR EACH ROW BEGIN DELETE FROM Follow WHERE enthusiast_id = OLD.user_id; DELETE FROM Message WHERE enthusiast_id = OLD.user_id; DELETE FROM Favorite WHERE user_id = OLD.user_id; DELETE FROM Owns WHERE user_id = OLD.user_id; DELETE FROM Purchase WHERE user_id = OLD.user_id; DELETE FROM Bid WHERE user_id = OLD.user_id;END;");
			jdbcTemplate.execute("CREATE TRIGGER delete_collector_data BEFORE DELETE ON Collector FOR EACH ROW BEGIN DELETE FROM Resell WHERE collector_id = OLD.user_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER notify_artwork_purchase AFTER INSERT ON Purchase FOR EACH ROW BEGIN INSERT INTO Notification(user_id, type, content)  VALUES (NEW.user_id, 'Purchase', CONCAT('You have successfully purchased artwork ID ', NEW.artwork_id)); END;");
			jdbcTemplate.execute("CREATE TRIGGER notify_successful_bid AFTER UPDATE ON Bid FOR EACH ROW BEGIN IF NEW.status = 'ACCEPTED' THEN INSERT INTO Notification(user_id, type, content) VALUES (NEW.user_id, 'Successful Bid', CONCAT('Your bid on auction ID ', NEW.auction_id, ' has been accepted.')); END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER notify_unsuccessful_bid AFTER UPDATE ON Bid FOR EACH ROW BEGIN IF NEW.status = 'REJECTED' THEN INSERT INTO Notification(user_id, type, content) VALUES (NEW.user_id, 'Bid Status', CONCAT('Your bid for auction ID ', NEW.auction_id, ' has been rejected.')); END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER increment_follower_count AFTER INSERT ON Follow FOR EACH ROW BEGIN UPDATE Artist SET follower_count = follower_count + 1 WHERE user_id = NEW.artist_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER decrement_follower_count AFTER DELETE ON Follow FOR EACH ROW BEGIN UPDATE Artist SET follower_count = follower_count - 1 WHERE user_id = OLD.artist_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER increment_favorite_count AFTER INSERT ON Favorite FOR EACH ROW BEGIN UPDATE Artwork SET favorite_count = favorite_count + 1 WHERE artwork_id = NEW.artwork_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER decrement_favorite_count AFTER DELETE ON Favorite FOR EACH ROW BEGIN UPDATE Artwork SET favorite_count = favorite_count - 1 WHERE artwork_id = OLD.artwork_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER validate_artwork_availability BEFORE INSERT ON Purchase FOR EACH ROW BEGIN DECLARE available BOOLEAN; SELECT COUNT(*) INTO available FROM Artwork WHERE artwork_id = NEW.artwork_id AND availability = 'Available'; IF NOT available THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Artwork is not available for purchase'; END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER update_artwork_status_after_purchase AFTER INSERT ON Purchase FOR EACH ROW BEGIN UPDATE Artwork SET availability = 'Sold' WHERE artwork_id = NEW.artwork_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER after_favorite_insert AFTER INSERT ON Favorite FOR EACH ROW BEGIN DECLARE artistUserID INT; SELECT artist_id INTO artistUserID FROM Artwork WHERE artwork_id = NEW.artwork_id; INSERT INTO Notification(user_id, type, content) VALUES (artistUserID, 'favorite', CONCAT('Your artwork with ID ', NEW.artwork_id, ' has been favorited.')); END;");
			jdbcTemplate.execute("CREATE TRIGGER after_owns_insert AFTER INSERT ON Owns FOR EACH ROW BEGIN DECLARE artistUserID INT; SELECT artist_id INTO artistUserID FROM Artwork WHERE artwork_id = NEW.artwork_id; INSERT INTO Notification(user_id, type, content) VALUES (artistUserID, 'collection_add', CONCAT('Your artwork with ID ', NEW.artwork_id, ' has been added to a collection.')); END;");
			jdbcTemplate.execute("CREATE TRIGGER ValidateEnthusiastBalanceBeforePurchase BEFORE INSERT ON Purchase FOR EACH ROW BEGIN DECLARE currentBalance NUMERIC(11,2); SELECT balance INTO currentBalance FROM Enthusiast WHERE user_id = NEW.user_id; IF currentBalance < NEW.price THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance for this purchase'; END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER decrease_enthusiast_balance AFTER INSERT ON Purchase FOR EACH ROW BEGIN UPDATE Enthusiast SET balance = balance - NEW.price WHERE user_id = NEW.user_id; END;");
			jdbcTemplate.execute("CREATE TRIGGER ValidateEnthusiastBalanceBeforeBid BEFORE INSERT ON Bid FOR EACH ROW BEGIN DECLARE currentBalance NUMERIC(11,2); SELECT balance INTO currentBalance FROM Enthusiast WHERE user_id = NEW.user_id; IF currentBalance < NEW.price THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance for placing this bid'; END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER notify_highest_bidder_after_auction_end AFTER UPDATE ON Auction FOR EACH ROW BEGIN DECLARE highestBidderID int; DECLARE highestBidAmount DOUBLE; IF OLD.end_date != NEW.end_date AND NEW.end_date < NOW() THEN SELECT user_id, MAX(amount) INTO highestBidderID, highestBidAmount FROM Bid WHERE auction_id = NEW.auction_id GROUP BY user_id ORDER BY MAX(amount) DESC LIMIT 1; INSERT INTO Notification (user_id, type, content) VALUES (highestBidderID, 'Auction Won', CONCAT('You have the highest bid of ', highestBidAmount, ' for auction ID ', NEW.auction_id, '. Please proceed to purchase.')); END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER auction_request_notification AFTER UPDATE ON Auction FOR EACH ROW BEGIN INSERT INTO Notification(user_id, type, content) VALUES (artist_id, 'Auction Request', CONCAT('Your auction request has been ', status)); END;");
			jdbcTemplate.execute("CREATE TRIGGER NotifyBidEnthusiastBidStatusChange AFTER UPDATE ON Bid FOR EACH ROW BEGIN IF OLD.status <> NEW.status THEN INSERT INTO Notification(user_id, type, content) VALUES (NEW.user_id, 'Bid Request', CONCAT('Your bid request has been ', NEW.status, '.'));  END IF; END;");
			jdbcTemplate.execute("CREATE TRIGGER auction_completion AFTER UPDATE ON Auction FOR EACH ROW BEGIN IF OLD.end_date != NEW.end_date AND NEW.end_date < NOW() THEN INSERT INTO Notification(user_id, notification_id, type, content) SELECT ar.auction_id, NULL, 'Auction End', CONCAT('Your auction for artwork ID ', ar.artwork_id, ' has ended.') FROM Auction ar WHERE ar.auction_id = NEW.auction_id; END IF; END\n");
			System.out.println("Tables, constraints, and triggers created.");
		}catch (Exception exception){
			System.out.println("Error occured while creating trigger or constraint. Check it (You may ignore it):"+exception.getMessage());
		}
	}
}