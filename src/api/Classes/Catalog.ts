
export class Catalog{
    id:number;
    title:string;
    description:string;
    thumbnail:string;
    images:CatalogImage[];
}

export class CatalogImage{
    id:number;
    path:string;
}