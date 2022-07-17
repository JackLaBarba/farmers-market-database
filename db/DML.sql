-- tokens starting with : indicate a value supplied by the backend programming
-- language.

-- Selects for all 7 tables
-- TODO

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
-- TODO

-- Deletes for 2 tables
-- TODO