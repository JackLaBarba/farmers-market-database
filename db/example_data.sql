
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