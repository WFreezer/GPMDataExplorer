// product-model.ts
export interface ProductModel {
    product_id: number;
    session_id: string;
    radiometer: 'GPI'; // Un único radiómetro disponible
    satellite: 'GPM'; // Un único satélite asociado al radiómetro 'GPI'
  }
  