export interface Seller {
    sellerId?: number;
    sellerName: string;
    sellerContactNo: string;
    sellerEmail: string;
    sellerCompanyName: string;
    sellerDate?: Date;
}
export interface SellerProduct {
    sellerProductId?: number,
    sellerId: number,
    productId: number,
    sellerProductDate?: Date
}
export interface SellerAddress {
    sellerAddressId ?: number,
    sellerId : number,
    sellerAddress1 : string,
    sellerCityId : number
}
export interface SellerDeliverable{
    sellerDeliverableId ?: number,
    sellerId : number,
    cityId : number,
    deliverableDate ?: Date
}