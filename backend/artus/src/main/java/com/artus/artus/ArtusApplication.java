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
		jdbcTemplate.execute("create table if not exists User(user_id int, user_name VARCHAR(50), user_surname VARCHAR(50),user_role int, email VARCHAR(30), password VARCHAR(20), contact_info VARCHAR(100), primary key (user_id));");
		jdbcTemplate.execute("create table if not exists Enthusiast( user_id INT, address varchar(200), balance NUMERIC(11,2), primary key(user_id), foreign key (user_id) REFERENCES User (user_id));");
		jdbcTemplate.execute("create table if not exists Collector( user_id INT, primary key(user_id), foreign key (user_id) REFERENCES Enthusiast(user_id));");
		jdbcTemplate.execute("create table if not exists Admin(user_id INT, role VARCHAR(20), foreign key (user_id) REFERENCES User (user_id));");
		jdbcTemplate.execute("create table if not exists Artist(user_id INT,  profile_details VARCHAR(100), follower_count INT, is_featuring boolean, biography VARCHAR(500), balance NUMERIC(11,2), primary key (user_id), foreign key (user_id) REFERENCES User (user_id)) ;");
		jdbcTemplate.execute("create table if not exists Preference(preference_name VARCHAR(20), primary key (preference_name));");
		jdbcTemplate.execute("create table if not exists User_Preference(user_id INT, preference_name VARCHAR(20),primary key (user_id, preference_name),foreign key (user_id) references User (user_id),foreign key (preference_name) references Preference(preference_name));");
		jdbcTemplate.execute("create table if not exists Artwork (artwork_id INT, artist_id INT, title VARCHAR(50), description VARCHAR(300), type VARCHAR(10), material VARCHAR(50), size VARCHAR(30), rarity VARCHAR(10), imageURL varchar(50), movement varchar(10), date DATE, is_featuring boolean,price NUMERIC(30), status varchar(10),availability varchar(10), primary key (artwork_id), foreign key (artist_id ) REFERENCES Artist(user_id));");
		jdbcTemplate.execute("create table if not exists Auction(auction_id int, artwork_id int,start_date datetime, end_date datetime, type varchar(10), starting_amount double,status varchar(10), primary key (auction_id));");
		jdbcTemplate.execute("create table if not exists Purchase(user_id int, artwork_id int, purchase_id int, purchase_date date, price double, receipt BLOB, primary key (user_id, artwork_id, purchase_id), foreign key (artwork_id) references Artwork(artwork_id), foreign key (user_id) references User(user_id));");
		jdbcTemplate.execute("create table if not exists Notification(user_id int, notification_id int, type varchar(10), content varchar(50), primary key (user_id, notification_id), foreign key (user_id) references User(user_id));");
		jdbcTemplate.execute("create table if not exists Bid(user_id int,auction_id int,bid_id int,amount int,time_stamp datetime, status varchar(50), primary key (user_id, auction_id, bid_id),foreign key (user_id) references User(user_id),foreign key (auction_id) references Auction(auction_id));");
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

		//These lines must be deleted after first run!!!
		jdbcTemplate.execute("ALTER TABLE User ADD CONSTRAINT unique_email UNIQUE (email);\n");
		jdbcTemplate.execute("ALTER TABLE User ADD CONSTRAINT unique_user_name UNIQUE (user_name);");
		jdbcTemplate.execute("ALTER TABLE Artist ADD CONSTRAINT check_follower_count CHECK (follower_count >= 0);");
		jdbcTemplate.execute("ALTER TABLE Auction ADD CONSTRAINT check_starting_amount CHECK (starting_amount >= 0);");
		jdbcTemplate.execute("ALTER TABLE Purchase ADD CONSTRAINT check_purchase_amount CHECK (price > 0);");
		jdbcTemplate.execute("ALTER TABLE Bid ADD CONSTRAINT chk_bid_amount CHECK (amount > 0);");
		jdbcTemplate.execute("ALTER TABLE Auction ADD CONSTRAINT chk_auction_dates CHECK (end_date > start_date);");
		jdbcTemplate.execute("ALTER TABLE User MODIFY user_name VARCHAR(50) NOT NULL;");
		jdbcTemplate.execute("ALTER TABLE Artwork MODIFY title VARCHAR(50) NOT NULL;");
		jdbcTemplate.execute("ALTER TABLE User ADD CONSTRAINT chk_password_length CHECK (CHAR_LENGTH(password) >= 6);");
		jdbcTemplate.execute("ALTER TABLE Enthusiast ADD CONSTRAINT chk_balance CHECK (balance >= 0);");
		jdbcTemplate.execute("CREATE TRIGGER delete_associated_bids BEFORE DELETE ON Auction FOR EACH ROW BEGIN DELETE FROM Bid WHERE auction_id = OLD.auction_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER delete_artist_data BEFORE DELETE ON Artist FOR EACH ROW BEGIN DELETE FROM Follow WHERE artist_id = OLD.user_id; DELETE FROM Sell WHERE user_id = OLD.user_id;  DELETE FROM Artwork WHERE user_id = OLD.user_id; DELETE FROM Message WHERE artist_id = OLD.user_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER delete_artwork_data BEFORE DELETE ON Artwork FOR EACH ROW BEGIN  DELETE FROM Auction WHERE artwork_id = OLD.artwork_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER delete_enthusiast_data BEFORE DELETE ON Enthusiast FOR EACH ROW BEGIN DELETE FROM Follow WHERE enthusiast_id = OLD.user_id; DELETE FROM Message WHERE enthusiast_id = OLD.user_id; DELETE FROM Favorite WHERE user_id = OLD.user_id; DELETE FROM Owns WHERE user_id = OLD.user_id; DELETE FROM Purchase WHERE user_id = OLD.user_id; DELETE FROM Bid WHERE user_id = OLD.user_id;END;");
		jdbcTemplate.execute("CREATE TRIGGER delete_collector_data BEFORE DELETE ON Collector FOR EACH ROW BEGIN DELETE FROM Resell WHERE collector_id = OLD.user_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER notify_artwork_purchase AFTER INSERT ON Purchase FOR EACH ROW BEGIN INSERT INTO Notification(user_id, type, content)  VALUES (NEW.user_id, 'Purchase', CONCAT('You have successfully purchased artwork ID ', NEW.artwork_id)); END;");
		jdbcTemplate.execute("CREATE TRIGGER notify_successful_bid AFTER UPDATE ON Bid FOR EACH ROW BEGIN IF NEW.status = 'ACCEPTED' THEN INSERT INTO Notification(user_id, type, content) VALUES (NEW.user_id, 'Successful Bid', CONCAT('Your bid on auction ID ', NEW.auction_id, ' has been accepted.')); END IF; END;");
		jdbcTemplate.execute("CREATE TRIGGER notify_unsuccessful_bid AFTER UPDATE ON Bid FOR EACH ROW BEGIN IF NEW.status = 'REJECTED' THEN INSERT INTO Notification(user_id, type, content) VALUES (NEW.user_id, 'Bid Status', CONCAT('Your bid for auction ID ', NEW.auction_id, ' has been rejected.')); END IF; END;");
		jdbcTemplate.execute("CREATE TRIGGER increment_follower_count AFTER INSERT ON Follow FOR EACH ROW BEGIN UPDATE Artist SET followerCount = followerCount + 1 WHERE user_id = NEW.artist_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER decrement_follower_count AFTER DELETE ON Follow FOR EACH ROW BEGIN UPDATE Artist SET followerCount = followerCount - 1 WHERE user_id = OLD.artist_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER validate_artwork_availability BEFORE INSERT ON Purchase FOR EACH ROW BEGIN DECLARE available BOOLEAN; SELECT COUNT(*) INTO available FROM Artwork WHERE artwork_id = NEW.artwork_id AND availability = 'Available'; IF NOT available THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Artwork is not available for purchase'; END IF; END;");
		jdbcTemplate.execute("CREATE TRIGGER update_artwork_status_after_purchase AFTER INSERT ON Purchase FOR EACH ROW BEGIN UPDATE Artwork SET availability = 'Sold' WHERE artwork_id = NEW.artwork_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER after_favorite_insert AFTER INSERT ON Favorite FOR EACH ROW BEGIN DECLARE artistUserID INT; SELECT artist_id INTO artistUserID FROM Artwork WHERE artwork_id = NEW.artwork_id; INSERT INTO Notification(user_id, notification_id, type, content) VALUES (artistUserID, UUID(), 'favorite', CONCAT('Your artwork with ID ', NEW.artwork_id, ' has been favorited.')); END;");
		jdbcTemplate.execute("CREATE TRIGGER after_owns_insert AFTER INSERT ON Owns FOR EACH ROW BEGIN DECLARE artistUserID INT; SELECT artist_id INTO artistUserID FROM Artwork WHERE artwork_id = NEW.artwork_id; INSERT INTO Notification(user_id, notification_id, type, content) VALUES (artistUserID, UUID(), 'collection_add', CONCAT('Your artwork with ID ', NEW.artwork_id, ' has been added to a collection.')); END;");
		jdbcTemplate.execute("CREATE TRIGGER increase_artist_balance AFTER INSERT ON Purchase FOR EACH ROW BEGIN UPDATE Artist SET balance = balance + NEW.price WHERE user_id = (SELECT artist_id FROM Artwork WHERE artwork_id = NEW.artwork_id); END;");
		jdbcTemplate.execute("CREATE TRIGGER ValidateEnthusiastBalanceBeforePurchase BEFORE INSERT ON Purchase FOR EACH ROW BEGIN DECLARE currentBalance NUMERIC(11,2); SELECT balance INTO currentBalance FROM Enthusiast WHERE user_id = NEW.user_id; IF currentBalance < NEW.price THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance for this purchase'; END IF; END;");
		jdbcTemplate.execute("CREATE TRIGGER decrease_enthusiast_balance AFTER INSERT ON Purchase FOR EACH ROW BEGIN UPDATE Enthusiast SET balance = balance - NEW.price WHERE user_id = NEW.user_id; END;");
		jdbcTemplate.execute("CREATE TRIGGER ValidateEnthusiastBalanceBeforeBid BEFORE INSERT ON Bid FOR EACH ROW BEGIN DECLARE currentBalance NUMERIC(11,2); SELECT balance INTO currentBalance FROM Enthusiast WHERE user_id = NEW.user_id; IF currentBalance < NEW.amount THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient balance for placing this bid'; END IF; END;");
		//this give error jdbcTemplate.execute("CREATE TRIGGER notify_highest_bidder_after_auction_end AFTER UPDATE ON Auction FOR EACH ROW BEGIN IF OLD.end_date != NEW.end_date AND NEW.end_date < NOW() THEN DECLARE highestBidderID INT; DECLARE highestBidAmount DOUBLE; SELECT user_id, MAX(amount) INTO highestBidderID, highestBidAmount FROM Bid  WHERE auction_id = NEW.auction_id GROUP BY user_id ORDER BY MAX(amount) DESC LIMIT 1; INSERT INTO Notification(user_id, type, content) VALUES (highestBidderID, 'Auction Won', CONCAT('You have the highest     bid of ', highestBidAmount, ' for auction ID ', NEW.auction_id, '. Please proceed to purchase.')); END IF; END;");
		//bu haliyle çalışmıyor NEW leri silmek gerekiyor ne kadar doğru bilmiyorum!!jdbcTemplate.execute("CREATE TRIGGER auction_request_notification AFTER UPDATE ON Auction FOR EACH ROW BEGIN INSERT INTO Notification(user_id, type, content) VALUES (NEW.artist_id, 'Auction Request', CONCAT('Your auction request has been ', NEW.status)); END;");
		jdbcTemplate.execute("CREATE TRIGGER NotifyBidEnthusiastBidStatusChange AFTER UPDATE ON Bid FOR EACH ROW BEGIN IF OLD.status <> NEW.status THEN INSERT INTO Notification(user_id, type, content) VALUES (NEW.user_id, 'Bid Request', CONCAT('Your bid request has been ', NEW.status, '.'));  END IF; END;");
		jdbcTemplate.execute("CREATE TRIGGER auction_completion AFTER UPDATE ON Auction FOR EACH ROW BEGIN IF OLD.end_date != NEW.end_date AND NEW.end_date < NOW() THEN INSERT INTO Notification(user_id, notification_id, type, content) SELECT ar.user_id, NULL, 'Auction End', CONCAT('Your auction for artwork ID ', ar.artwork_id, ' has ended.') FROM Auction ar WHERE ar.auction_id = NEW.auction_id; END IF; END\n");

	}

}


