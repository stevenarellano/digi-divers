export type DigiInfo = {
    name: string;
    attributes: NftAttributes;
    imageUrl: string;
    symbol: string;
};

export type GetNFTResponse = {
    totalDigis: number;
    maxDigi: DigiInfo;
};

export interface NftAttributes {
    Level: string;
    Rating: string;
    Experience: string;
}

export interface JsonAttribute {
    trait_type: string;
    value: string | number;
}
