-- Database name
CREATE DATABASE tastytreats;

-- Document your create tables SQL here

CREATE TABLE treats (
	id SERIAL PRIMARY KEY,
	name VARCHAR(25),
	description VARCHAR(255),
	pic VARCHAR(1000)
);

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');

INSERT INTO treats (name, description, pic)
VALUES ($1, $2, $3);

SELECT * FROM "treats";
