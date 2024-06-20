-- Crear tabla session
CREATE TABLE session (
  session_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  created_at DATETIME,
  expiration DATETIME
);

-- Crear tabla radiometer
CREATE TABLE radiometer (
  radiometer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

-- Crear tabla satellite
CREATE TABLE satellite (
  satellite_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  radiometer_id INT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  shortname VARCHAR(255),
  FOREIGN KEY (radiometer_id) REFERENCES radiometer(radiometer_id)
);

-- Crear tabla product
CREATE TABLE product (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(50) ,
  radiometer_id INT,
  satellite_id INT,
  FOREIGN KEY (session_id) REFERENCES session(session_id),
  FOREIGN KEY (radiometer_id) REFERENCES radiometer(radiometer_id),
  FOREIGN KEY (satellite_id) REFERENCES satellite(satellite_id)
);
-- Crear tabla para seleccionar variables
CREATE TABLE variables_select (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Crear tabla para seleccionar layer
CREATE TABLE layer_values (
  id INT AUTO_INCREMENT PRIMARY KEY,
  value VARCHAR(10) 
);

-- Crear tabla filter
CREATE TABLE filter (
  id_filter INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  date_from DATE,
  date_to DATE,
  longitud_min DECIMAL,
  longitud_max DECIMAL,
  latitud_min DECIMAL,
  latitud_max DECIMAL,
  variable_ids VARCHAR(255),
  layer_ids VARCHAR(255),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);


-- Crear tabla meteorological_data
CREATE TABLE meteorological_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_filter INT,
  day DATE,
  nlat DECIMAL,
  nlon DECIMAL,
  nlayer DECIMAL,
  npix INT,
  npixPrecipitation INT,
  surfacePrecipitation DECIMAL,
  convectivePrecipitation DECIMAL,
  frozenPrecipitation DECIMAL,
  rainWaterPath DECIMAL,
  cloudWaterPath DECIMAL,
  iceWaterPath DECIMAL,
  rainWater DECIMAL,
  cloudWater DECIMAL,
  snow DECIMAL,
  graupel DECIMAL,
  latentHeating DECIMAL,
  surfaceTypeIndex INT,
  fractionQuality0 DECIMAL,
  fractionQuality1 DECIMAL,
  fractionQuality2 DECIMAL,
  fractionQuality3 DECIMAL,
  FOREIGN KEY (id_filter) REFERENCES filter(id_filter)
);



-- Insertar datos en tabla radiometer
INSERT INTO radiometer (name)
VALUES ('AMSR2'),
       ('ATMS'),
       ('GMI'),
       ('MHS'),
       ('SSMI/S'),
       ('TMI'),
       ('AMSR-E'),
       ('AMSU-B'),
       ('SSMI');


-- Insertar datos en tabla satellite

INSERT INTO satellite (shortname, name, radiometer_id, start_date, end_date, description) VALUES 
('GPM_3GPROFGCOMW1AMSR2_DAY.07','GCOMW1', 1,'2022-05-01', '2024-04-05', 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFGCOMW1AMSR2_DAY_CLIM.07','GCOMW1', 1,'2012-07-02', '2024-01-30', ''),
('GPM_3GPROFNOAA20ATMS_DAY.07','NOAA20', 2, '2022-05-01', '2024-03-25', 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFNOAA20ATMS_DAY_CLIM.07','NOAA20', 2, '2017-11-29', '2024-01-30',''),
('GPM_3GPROFNOAA21ATMS_DAY.07','NOAA21', 2,'2023-02-01', '2024-03-25', 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFNOAA21ATMS_DAY_CLIM.07','NOAA21', 2,'2023-02-01', '2024-01-30', ''),
('GPM_3GPROFNPPATMS_DAY.07','NPP', 2,'2022-05-01', '2024-03-25', 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFNPPATMS_DAY_CLIM.07','NPP', 2, '2011-11-08', '2024-01-30', ''),
('GPM_3GPROFGPMGMI_DAY.07','GMI', 3,'2014-03-04', '2024-04-06', 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFGPMGMI_DAY_CLIM.07','GMI', 3,'2014-03-04', '2024-01-30', ''),
('GPM_3GPROFNOAA19MHS_DAY.07','NOAA19 ', 4,'2022-05-01', '2024-03-28', 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFNOAA19MHS_DAY_CLIM.07','NOAA19 ', 4,'2009-02-12', '2024-01-30', ''),
('GPM_3GPROFNOAA18MHS_DAY.07','NOAA18', 4,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFNOAA18MHS_DAY_CLIM.07','NOAA18', 4,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFMETOPAMHS_DAY.07','METOPA', 4,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFMETOPAMHS_DAY_CLIM.07','METOPA', 4,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFMETOPBMHS_DAY.07','METOPB', 4,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFMETOPBMHS_DAY_CLIM.07','METOPB', 4,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFMETOPCMHS_DAY.07','METOPC', 4,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFMETOPCMHS_DAY_CLIM.07','METOPC', 4,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF16SSMIS_DAY.07','F16', 5,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFF16SSMIS_DAY_CLIM.07','F16', 5, NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF17SSMIS_DAY.07','F17', 5, NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFF17SSMIS_DAY_CLIM.07','F17', 5,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF18SSMIS_DAY.07','F18', 5,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFF18SSMIS_DAY_CLIM.07','F18', 5,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF19SSMIS_DAY.07','F19', 5,NULL,NULL, 'Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07'),
('GPM_3GPROFF19SSMIS_DAY_CLIM.07','F19', 5,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFAQUAAMSRE_DAY_CLIM.07','Aqua', 7,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFNOAA15AMSUB_DAY_CLIM.07','NOAA15', 8,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFNOAA16AMSUB_DAY_CLIM.07','NOAA16', 8,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFNOAA17AMSUB_DAY_CLIM.07','NOAA17', 8,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF08SSMI_DAY_CLIM.07','F08', 9,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF011SSMI_DAY_CLIM.07','F11', 9,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF13SSMI_DAY_CLIM.07','F13', 9,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF14SSMI_DAY_CLIM.07','F14', 9,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 '),
('GPM_3GPROFF15SSMI_DAY_CLIM.07','F15', 9,NULL,NULL, 'Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ');



INSERT INTO variables_select (value) VALUES
('cloudWater'),
('cloudWaterPath'),
('convectivePrecipitation'),
('fractionQuality0'),
('fractionQuality1'),
('fractionQuality2'),
('fractionQuality3'),
('frozenPrecipitation'),
('graupel'),
('iceWaterPath'),
('lat_bnds'),
('latentHeating'),
('layer_bnds'),
('lon_bnds'),
('npixPrecipitation'),
('npixTotal'),
('rainWater'),
('rainWaterPath'),
('snow'),
('surfacePrecipitation'),
('surfaceTypeIndex');



INSERT INTO layer_values (value) VALUES
('0.25'), ('0.75'), ('1.25'), ('1.75'), ('2.25'), ('2.75'), ('3.25'), ('3.75'), ('4.25'), ('4.75'),
('5.25'), ('5.75'), ('6.25'), ('6.75'), ('7.25'), ('7.75'), ('8.25'), ('8.75'), ('9.25'), ('9.75'),
('10.5'), ('11.5'), ('12.5'), ('13.5'), ('14.5'), ('15.5'), ('16.5'), ('17.5');

