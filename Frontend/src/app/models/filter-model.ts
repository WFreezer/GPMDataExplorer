export interface FilterModel {
    session_id: string;
    date_from: Date;
    date_to: Date;
    longitud_min: number;
    longitud_max: number;
    latitud_min: number;
    latitud_max: number;
    variables_select: VariablesSelectType;
    layer: LayerType;
}

// Definir el tipo para variables_select
type VariablesSelectType = 
    | 'cloudWater'
    | 'cloudWaterPath'
    | 'convectivePrecipitation'
    | 'fractionQuality0'
    | 'fractionQuality1'
    | 'fractionQuality2'
    | 'fractionQuality3'
    | 'frozenPrecipitation'
    | 'graupel'
    | 'iceWaterPath'
    | 'lat_bnds'
    | 'latentHeating'
    | 'layer_bnds'
    | 'lon_bnds'
    | 'npixPrecipitation'
    | 'npixTotal'
    | 'rainWater'
    | 'rainWaterPath'
    | 'snow'
    | 'surfacePrecipitation'
    | 'surfaceTypeIndex';

// Definir el tipo para layer
type LayerType = 
    | 0.25
    | 0.75
    | 1.25
    | 1.75
    | 2.25
    | 2.75
    | 3.25
    | 3.75
    | 4.25
    | 4.75
    | 5.25
    | 5.75
    | 6.25
    | 6.75
    | 7.25
    | 7.75
    | 8.25
    | 8.75
    | 9.25
    | 9.75
    | 10.5
    | 11.5
    | 12.5
    | 13.5
    | 14.5
    | 15.5
    | 16.5
    | 17.5;
