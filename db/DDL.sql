CREATE TABLE `products` (
	`product_id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(1024) NOT NULL,
	`description` TEXT(10000) NOT NULL,
	`unit` varchar(1024) NOT NULL,
	PRIMARY KEY (`product_id`)
);

CREATE TABLE `vendors` (
	`vendor_id` int NOT NULL AUTO_INCREMENT,
	`business_name` varchar(1024) NOT NULL,
	`website_url` varchar(1024) NOT NULL,
	`person_id` int NOT NULL,
	PRIMARY KEY (`vendor_id`)
);

CREATE TABLE `vendors_at_events` (
	`vendor_at_event_id` int NOT NULL AUTO_INCREMENT,
	`vendor_id` int NOT NULL,
	`event_id` int NOT NULL,
	PRIMARY KEY (`vendor_at_event_id`)
);

CREATE TABLE `locations` (
	`location_id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(1024) NOT NULL,
	`street_address` varchar(1024) NOT NULL,
	`has_parking` tinyint NOT NULL,
	`contact_information` varchar(1024) NOT NULL,
	PRIMARY KEY (`location_id`)
);

CREATE TABLE `events` (
	`event_id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(1024) NOT NULL,
	`starts_at` DATETIME NOT NULL,
	`ends_at` DATETIME NOT NULL,
	`location_id` int NOT NULL,
	PRIMARY KEY (`event_id`)
);

CREATE TABLE `people` (
	`person_id` int NOT NULL AUTO_INCREMENT,
	`full_name` varchar(1024) NOT NULL,
	`email` varchar(1024) NOT NULL,
	`phone_number` varchar(1024) NOT NULL,
	`is_admin` tinyint NOT NULL,
	PRIMARY KEY (`person_id`)
);

CREATE TABLE `stocked_products` (
	`stocked_product_id` int NOT NULL AUTO_INCREMENT,
	`vendor_id` int NOT NULL,
	`product_id` int NOT NULL,
	`unit_price_cent` int NOT NULL,
	PRIMARY KEY (`stocked_product_id`)
);

ALTER TABLE `vendors` ADD CONSTRAINT `vendors_fk0` FOREIGN KEY (`person_id`) 
REFERENCES `people`(`person_id`);

ALTER TABLE `vendors_at_events` ADD CONSTRAINT `vendors_at_events_fk0`
FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`vendor_id`) 
ON DELETE CASCADE;

ALTER TABLE `vendors_at_events` ADD CONSTRAINT `vendors_at_events_fk1` 
FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) 
ON DELETE CASCADE;

ALTER TABLE `events` ADD CONSTRAINT `events_fk0` FOREIGN KEY (`location_id`)
REFERENCES `locations`(`location_id`);

ALTER TABLE `stocked_products` ADD CONSTRAINT `stocked_products_fk0` 
FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`vendor_id`) 
ON DELETE CASCADE;

ALTER TABLE `stocked_products` ADD CONSTRAINT `stocked_products_fk1`
FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) 
ON DELETE CASCADE;


-- Example Data 

INSERT INTO products (name, description, unit) VALUES 
("Coffee", "Strong, smoky aroma with notes of tarry and pipe tobacco", "pound"),
("Orange", "Navel oranges, winter orange with thick, bright orange skin and sweet, juicy fruit.", "pound"),
("Kale", "Green and healthy", "pound"),
("Carrot", "Orange and crunchy", "pound"),
("Cheese", "Smooth and yummy", "ounce");

INSERT INTO people (full_name, email, phone_number, is_admin) VALUES
("Carl Bun", "carlb@yahoo.com", "(541)879-8276", True),
("Donna Martinez", "donnam@gmail.com", "(591)889-1076", False),
("Billy Ross", "billyr@gmail.com", "(591)403-8753", True),
("Pontipe Kopkaew", "kopkaewp@oregonstate.edu", "(555)555-0001", True),
("John LaBarba", "labarbaj@oregonstate.edu", "(555)555-0002", False),
("George Michael Bluth", "bluthg@oregonstate.edu", "(555)555-0003", False);


INSERT INTO vendors (business_name, website_url, person_id) VALUES
("CoffeeMania", "https://www.coffeemania.com", 
(SELECT person_id FROM people WHERE full_name = "Carl Bun" limit 1)),
("CitrusLand", "https://www.citrusland.com", 
(SELECT person_id FROM people WHERE full_name = "Donna Martinez" limit 1)),
("EatYourVeggies", "https://www.eatyourveggies.com", 
(SELECT person_id FROM people WHERE full_name = "Billy Ross" limit 1)),
("Sun farm", "https://sunnysidefarms.com", 
(SELECT person_id FROM people WHERE full_name = "George Michael Bluth" limit 1)),
("Moon farm", "https://sunnysidefarms.com", 
(SELECT person_id FROM people WHERE full_name = "George Michael Bluth" limit 1)),
("Star farm", "https://sunnysidefarms.com", 
(SELECT person_id FROM people WHERE full_name = "John LaBarba" limit 1));


INSERT INTO stocked_products (vendor_id, product_id, unit_price_cent) VALUES
((SELECT vendor_id FROM vendors WHERE business_name = "Sun Farm" limit 1),
 (SELECT product_id FROM products WHERE name = "Carrot" limit 1), 50),
((SELECT vendor_id FROM vendors WHERE business_name = "Sun Farm" limit 1),
 (SELECT product_id FROM products WHERE name = "Kale" limit 1), 150),
((SELECT vendor_id FROM vendors WHERE business_name = "Moon Farm" limit 1),
 (SELECT product_id FROM products WHERE name = "Cheese" limit 1), 90),
((SELECT vendor_id FROM vendors WHERE business_name = "Moon Farm" limit 1),
 (SELECT product_id FROM products WHERE name = "Kale" limit 1), 70),
((SELECT vendor_id FROM vendors WHERE business_name = "Star Farm" limit 1),
 (SELECT product_id FROM products WHERE name = "Carrot" limit 1), 80),
((SELECT vendor_id FROM vendors WHERE business_name = "Star Farm" limit 1),
 (SELECT product_id FROM products WHERE name = "Kale" limit 1), 90);

 INSERT INTO locations (name, street_address, has_parking, contact_information) 
 VALUES
 ("County fairgrounds", "1234 fair st.", True, "Bob at (555)555-0123"),
 ("City park", "5678 park st.", True, "Jane at (555)555-0456"),
 ("Library parking lot", "1234 library st.", False, "Madeleine at (555)555-0789");

 INSERT INTO events (name, starts_at, ends_at, location_id) VALUES
 ("Summer extravaganza", "2022-07-04 10:00:00", "2022-07-04 16:00:00", 
 (SELECT location_id FROM locations WHERE name = "County fairgrounds" limit 1)),
 ("Spring fling", "2022-04-04 10:00:00", "2022-04-04 16:00:00", 
 (SELECT location_id FROM locations WHERE name = "City park" limit 1)),
 ("Harvest festival", "2022-09-04 10:00:00", "2022-09-04 16:00:00", 
 (SELECT location_id FROM locations WHERE name = "Library parking lot" limit 1));

INSERT INTO vendors_at_events (vendor_id, event_id) VALUES
((SELECT vendor_id FROM vendors WHERE business_name = "Sun farm" limit 1),
(SELECT event_id FROM events WHERE name = "Summer extravaganza" limit 1)),
((SELECT vendor_id FROM vendors WHERE business_name = "Moon farm" limit 1),
(SELECT event_id FROM events WHERE name = "Summer extravaganza" limit 1)),
((SELECT vendor_id FROM vendors WHERE business_name = "Sun farm" limit 1),
(SELECT event_id FROM events WHERE name = "Spring fling" limit 1)),
((SELECT vendor_id FROM vendors WHERE business_name = "Star farm" limit 1),
(SELECT event_id FROM events WHERE name = "Spring fling" limit 1));






