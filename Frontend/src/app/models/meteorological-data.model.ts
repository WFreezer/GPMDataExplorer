export interface MeteorologicalDataModel {
    id_filter: number;
    day: Date;
    nlat: number;
    nlon: number;
    nlayer: number;
    npix: number;
    npixPrecipitation: number;
    surfacePrecipitation: number;
    convectivePrecipitation: number;
    frozenPrecipitation: number;
    rainWaterPath: number;
    cloudWaterPath: number;
    iceWaterPath: number;
    rainWater: number;
    cloudWater: number;
    snow: number;
    graupel: number;
    latentHeating: number;
    surfaceTypeIndex: number;
    fractionQueality0: number;
    fractionQueality1: number;
    fractionQueality2: number;
    fractionQueality3: number;
  }