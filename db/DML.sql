-- tokens starting with : indicate a value supplied by the backend programming
-- language.

-- Selects for all 7 tables
SELECT 
  events.event_id
  events.name, 
  events.starts_at,
  events.ends_at,
  events.location_id
FROM events
ORDER BY events.event_id ASC;

SELECT
  products.product_id
  products.name,
  products.description,
  products.unit
FROM products
ORDER BY products.product_id ASC;

SELECT
  locations.location_id
  locations.name,
  locations.street_address,
  locations.has_parking,
  locations.contact_information
FROM locations
ORDER BY locations.location_id ASC;

SELECT
  people.people_id
  people.full_name,
  people.email,
  people.phone_number,
  people.is_admin
FROM people
ORDER BY people.people_id ASC;

SELECT
  products.product_id,
  products.product_name,
  products.product_description,
  products.unit
FROM products
ORDER BY products.product_id ASC;

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

SELECT
  vendors.vendor_id,
  vendors.business_name,
  vendors.website_url,
  people.full_name
FROM vendors
LEFT JOIN people
  ON vendors.people_id = people.person_id
ORDER BY vendors.vendor_id ASC;


-- Inserts for all 7 tables
INSERT INTO events (name, starts_at, ends_at, location_id) VALUES
(:name, :starts_at, :ends_at, :location_id),

INSERT INTO products (name, description, unit) VALUES 
(:name, :description, :unit);

INSERT INTO locations (name, street_address, has_parking, contact_information) 
VALUES
(:name, :street_address, :has_parking, :contact_information);

INSERT INTO people (full_name, email, phone_number, is_admin) VALUES
(:full_name, :email, :phone_number, :is_admin);

INSERT INTO products (name, description, unit) VALUES 
(:name, :description, :unit);

INSERT INTO stocked_products (vendor_id, product_id, unit_price_cent) VALUES
(:vendor_id, :product_id, :unit_price_cent);

INSERT INTO vendors_at_events (vendor_id, event_id) VALUES
(:vendor_id, :event_id);

INSERT INTO vendors (business_name, website_url, person_id) VALUES
(:business_name, :website_url, :person_id);

-- Updates for 1 table
UPDATE people SET
  full_name = :full_name,
  email = :email
  phone_number = :phone_number
  is_admin = :is_admin
WHERE people.person_id = :person_id

-- Deletes for 2 tables
-- TODO