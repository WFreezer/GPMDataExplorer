CREATE TABLE session (
  session_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  created_at DATETIME,
  expiration DATETIME
);

CREATE TABLE radiometer (
  radiometer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE satellite (
  satellite_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  radiometer_id INT,
  FOREIGN KEY (radiometer_id) REFERENCES radiometer(radiometer_id)
);

CREATE TABLE product (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(50) ,
  radiometer_id INT,
  satellite_id INT,
  FOREIGN KEY (session_id) REFERENCES session(session_id),
  FOREIGN KEY (radiometer_id) REFERENCES radiometer(radiometer_id),
  FOREIGN KEY (satellite_id) REFERENCES satellite(satellite_id)
);

CREATE TABLE filter (
  id_filter INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  date_from DATE,
  date_to DATE,
  longitud_min DECIMAL,
  longitud_max DECIMAL,
  latitud_min DECIMAL,
  latitud_max DECIMAL,
  variables_select ENUM('value1', 'value2', 'value3'),
  layer ENUM('value1', 'value2', 'value3'),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE meteorological_data (
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
  fractionQueality0 DECIMAL,
  fractionQueality1 DECIMAL,
  fractionQueality2 DECIMAL,
  fractionQueality3 DECIMAL,
  PRIMARY KEY (id_filter, day),
  FOREIGN KEY (id_filter) REFERENCES filter(id_filter)
);

ALTER TABLE satellite ADD COLUMN description TEXT;
ALTER TABLE satellite ADD COLUMN shortname VARCHAR(255);

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


INSERT INTO satellite (shortname, name, radiometer_id, description) VALUES 
('GPM_3GPROFGCOMW1AMSR2_DAY','GCOM-W1: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 1, '3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFGCOMW1AMSR2_DAY_CLIM','GCOM-W1: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 1, 'The "CLIM" products differ from their "regular" counterparts (without the "CLIM" in the name) by the ancillary data they use. They are Climate-Reference products, which requires homogeneous ancillary data over the climate time series. Hence, the ECMWF-Interim (European Centre for Medium-Range Weather Forecasts, 2-3 months lag behind the regular production) reanalysis is used as ancillary data to derive surface and atmospheric conditions required by the GPROF algorithm for the "CLIM" output. The GPROF databases are also adjusted accordingly for these climate-referenced retrievals. 3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFNOAA20ATMS_DAY','NOAA-20: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 2, '3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFNOAA20ATMS_DAY_CLIM','NOAA-20: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 2, 'The "CLIM" products differ from their "regular" counterparts (without the "CLIM" in the name) by the ancillary data they use. They are Climate-Reference products, which requires homogeneous ancillary data over the climate time series. Hence, the ECMWF-Interim (European Centre for Medium-Range Weather Forecasts, 2-3 months lag behind the regular production) reanalysis is used as ancillary data to derive surface and atmospheric conditions required by the GPROF algorithm for the "CLIM" output. The GPROF databases are also adjusted accordingly for these climate-referenced retrievals. 3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere'),
('GPM_3GPROFNOAA21ATMS_DAY','NOAA-21: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 2, '3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFNOAA21ATMS_DAY_CLIM','NOAA-21: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 2, 'The "CLIM" products differ from their "regular" counterparts (without the "CLIM" in the name) by the ancillary data they use. They are Climate-Reference products, which requires homogeneous ancillary data over the climate time series. Hence, the ECMWF-Interim (European Centre for Medium-Range Weather Forecasts, 2-3 months lag behind the regular production) reanalysis is used as ancillary data to derive surface and atmospheric conditions required by the GPROF algorithm for the "CLIM" output. The GPROF databases are also adjusted accordingly for these climate-referenced retrievals. 3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere'),
('GPM_3GPROFNPPATMS_DAY','SUOMI-NPP: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 2, '3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFNPPATMS_DAY_CLIM','SUOMI-NPP: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 2, 'The "CLIM" products differ from their "regular" counterparts (without the "CLIM" in the name) by the ancillary data they use. They are Climate-Reference products, which requires homogeneous ancillary data over the climate time series. Hence, the ECMWF-Interim (European Centre for Medium-Range Weather Forecasts, 2-3 months lag behind the regular production) reanalysis is used as ancillary data to derive surface and atmospheric conditions required by the GPROF algorithm for the "CLIM" output. The GPROF databases are also adjusted accordingly for these climate-referenced retrievals. 3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere'),
('GPM_3GPROFGPMGMI_DAY','GMI: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 3, '3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFGPMGMI_DAY_CLIM','GMI: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 3, 'The "CLIM" products differ from their "regular" counterparts (without the "CLIM" in the name) by the ancillary data they use. They are Climate-Reference products, which requires homogeneous ancillary data over the climate time series. Hence, the ECMWF-Interim (European Centre for Medium-Range Weather Forecasts, 2-3 months lag behind the regular production) reanalysis is used as ancillary data to derive surface and atmospheric conditions required by the GPROF algorithm for the "CLIM" output. The GPROF databases are also adjusted accordingly for these climate-referenced retrievals. 3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere'),
('GPM_3GPROFNOAA19MHS_DAY','NOAA19: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 4, '3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere.'),
('GPM_3GPROFNOAA19MHS_DAY_CLIM','NOAA19: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07 ', 4, 'The "CLIM" products differ from their "regular" counterparts (without the "CLIM" in the name) by the ancillary data they use. They are Climate-Reference products, which requires homogeneous ancillary data over the climate time series. Hence, the ECMWF-Interim (European Centre for Medium-Range Weather Forecasts, 2-3 months lag behind the regular production) reanalysis is used as ancillary data to derive surface and atmospheric conditions required by the GPROF algorithm for the "CLIM" output. The GPROF databases are also adjusted accordingly for these climate-referenced retrievals. 3GPROF products provide global gridded monthly/daily precipitation averages from multiple satellites that can be used for climate studies. The 3GPROF products are based on retrievals from high-quality microwave sensors, which are sensitive to liquid and ice-phase precipitation hydrometeors in the atmosphere'),
('GPM_3GPROFNOAA18MHS_DAY','NOAA18: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V05', 4, ''),
('GPM_3GPROFNOAA18MHS_DAY_CLIM','NOAA18: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 4, ''),
('GPM_3GPROFMETOPAMHS_DAY','METOP-A: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V05', 4, ''),
('GPM_3GPROFMETOPAMHS_DAY_CLIM','METOP-A: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 4, ''),
('GPM_3GPROFMETOPBMHS_DAY','METOP-B: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 4, ''),
('GPM_3GPROFMETOPBMHS_DAY_CLIM','METOP-B: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 4, ''),
('GPM_3GPROFMETOPCMHS_DAY','METOP-C: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 4, ''),
('GPM_3GPROFMETOPCMHS_DAY_CLIM','METOP-C: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 4, ''),
('GPM_3GPROFF16SSMIS_DAY','F16: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFF16SSMIS_DAY_CLIM','F16: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFF17SSMIS_DAY','F17: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFF17SSMIS_DAY_CLIM','F17: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFF18SSMIS_DAY','F18: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFF18SSMIS_DAY_CLIM','F18: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFF19SSMIS_DAY','F19: Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V05', 5, ''),
('GPM_3GPROFF19SSMIS_DAY_CLIM','F19: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 5, ''),
('GPM_3GPROFTRMMTMI_DAY_CLIM','TRMM: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 6, ''),
('GPM_3GPROFAQUAAMSRE_DAY_CLIM','Aqua: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 7, ''),
('GPM_3GPROFNOAA15AMSUB_DAY_CLIM','NOAA15: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 8, ''),
('GPM_3GPROFNOAA16AMSUB_DAY_CLIM','NOAA16: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 8, ''),
('GPM_3GPROFNOAA17AMSUB_DAY_CLIM','NOAA17: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 8, ''),
('GPM_3GPROFF08SSMI_DAY_CLIM','F08: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 9, ''),
('GPM_3GPROFF011SSMI_DAY_CLIM','F11: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 9, ''),
('GPM_3GPROFF13SSMI_DAY_CLIM','F13: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 9, ''),
('GPM_3GPROFF14SSMI_DAY_CLIM','F14: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 9, ''),
('GPM_3GPROFF15SSMI_DAY_CLIM','F15: Climate-based Radiometer Precipitation Profiling L3 1 day 0.25 degree x 0.25 degree V07', 9, '');

