import { CarImage } from "./carImage";

export interface CarDto {
    carId: number;
    brandName: string;
    colorName: string;
    modelYear: number;
    carImage:CarImage[];
    dailyPrice: number;
    description: string;
    carFindex: number;
}