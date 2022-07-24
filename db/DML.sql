-- tokens starting with : indicate a value supplied by the backend programming
-- language.

--
-- SELECTS for all 7 tables
--

-- READ on events.html
SELECT 
  events.event_id
  events.name, 
  events.starts_at,
  events.ends_at,
  events.location_id
FROM events
ORDER BY events.event_id ASC;

-- READ on products.html
-- Allows the user to search for a product name
SELECT
  products.product_id
  products.name,
  products.description,
  products.unit
FROM products
WHERE products.name LIKE '%:user_query%'
ORDER BY products.product_id ASC;

-- READ on locations.html
SELECT
  locations.location_id
  locations.name,
  locations.street_address,
  locations.has_parking,
  locations.contact_information
FROM locations
ORDER BY locations.location_id ASC;

-- READ on people.html
SELECT
  people.people_id
  people.full_name,
  people.email,
  people.phone_number,
  people.is_admin
FROM people
ORDER BY people.people_id ASC;

-- READ on products.html
SELECT
  products.product_id,
  products.product_name,
  products.product_description,
  products.unit
FROM products
ORDER BY products.product_id ASC;

-- READ on stocked_products.html
SELECT
  stocked_products.stocked_product_id,
  vendors.name,
  products.name,
  stocked_prodcts.unit_price_cent
FROM stocked_products
LEFT JOIN vendors
  ON stocked_products.vendor_id = vendors.vendor_id
LEFT JOIN products
  ON stocked_products.product_id = products.product_id
ORDER BY stocked_prodcts.stocked_product_id ASC;

-- READ on vendors_at_events.html
SELECT
  vendors_at_events.vendor_at_event_id,
  vendors.name,
  events.name
FROM vendors_at_events
LEFT JOIN vendors
  ON vendors_at_events.vendor_id =  vendors.vendor_id
LEFT JOIN events
  ON vendors_at_events.event_id = events.event_id
ORDER BY vendors_at_events.vendor_at_event_id ASC;

-- READ on vendors.html
SELECT
  vendors.vendor_id,
  vendors.business_name,
  vendors.website_url,
  people.full_name
FROM vendors
LEFT JOIN people
  ON vendors.people_id = people.person_id
ORDER BY vendors.vendor_id ASC;

--
-- Inserts for all 7 tables
--

-- CREATE on events.html
INSERT INTO events (name, starts_at, ends_at, location_id) VALUES
(:name, :starts_at, :ends_at, :location_id);

-- CREATE on events.html, when specifying a vendor to add simultaneously.
--
-- This satifies the requirement that there is at least one entity that,
-- when inserted to, also creates an entry in a corresponding M:M
-- intersection table.
--
-- These INSERTS are wrapped in a transaction to prevent cases where
-- only one of these INSERTS succeeds due to an error. If one fails, they
-- should both fail.
BEGIN;
INSERT INTO events (name, starts_at, ends_at, location_id) VALUES
(:name, :starts_at, :ends_at, :location_id);
INSERT INTO vendors_at_events (vendor_id, event_id) VALUES
(:vendor_id, LAST_INSERT_ID());
COMMIT;

-- CREATE on products.html
INSERT INTO products (name, description, unit) VALUES 
(:name, :description, :unit);

-- CREATE on locations.html
INSERT INTO locations (name, street_address, has_parking, contact_information) 
VALUES
(:name, :street_address, :has_parking, :contact_information);

-- CREATE on people.html
INSERT INTO people (full_name, email, phone_number, is_admin) VALUES
(:full_name, :email, :phone_number, :is_admin);

-- CREATE on products.html
INSERT INTO products (name, description, unit) VALUES 
(:name, :description, :unit);

-- CREATE on stocked_products.html
INSERT INTO stocked_products (vendor_id, product_id, unit_price_cent) VALUES
(:vendor_id, :product_id, :unit_price_cent);

-- CREATE on vendors_at_events.html
INSERT INTO vendors_at_events (vendor_id, event_id) VALUES
(:vendor_id, :event_id);

-- CREATE on vendors.html
INSERT INTO vendors (business_name, website_url, person_id) VALUES
(:business_name, :website_url, :person_id);

--
-- UPDATES for 1 table
--

-- UPDATE on people.html
UPDATE people SET
  full_name = :full_name,
  email = :email
  phone_number = :phone_number
  is_admin = :is_admin
WHERE people.person_id = :person_id;

--
-- DELETES for 2 tables
-- 

-- DELETE on people.html
DELETE FROM people
WHERE person_id = :person_id;

-- DELETE on stocked_products.html
DELETE FROM stocked_products
WHERE stocked_product_id = :stocked_product_id;
