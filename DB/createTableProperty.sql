SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS property;

CREATE TABLE IF NOT EXISTS property (
    URL VARCHAR(200) NOT NULL,
    market_date DATE NOT NULL,
    sold boolean DEFAULT false,
    location_country VARCHAR(50) NOT NULL,           
    location_city VARCHAR(50) NOT NULL,
    location_address VARCHAR(100) NOT NULL,         
    location_coordinates_lat float,        
    location_coordinates_lng float,          
    size_parcelm2 float,          
    size_grossm2 float,           
    size_netm2 float,        
    size_rooms float NOT NULL,           
    price_value float NOT NULL,          
    price_currency VARCHAR(3) NOT NULL,           
    title VARCHAR(100),          
    description text,         
    images text,     
    PRIMARY KEY (URL)
);       
     
SET FOREIGN_KEY_CHECKS=1;
