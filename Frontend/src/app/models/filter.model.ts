export interface Filter {
    id_filter: number;
    product_id: number;
    date_from: Date;
    date_to: Date;
    longitud_min: number;
    longitud_max: number;
    latitud_min: number;
    latitud_max: number;
    variable_ids: string;
    layer_ids: string;
  }
  