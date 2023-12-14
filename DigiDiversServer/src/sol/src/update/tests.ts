import { Nft, NftWithToken } from '@metaplex-foundation/js';
import { fetchDigisByWallet, fetchMaxDigiByWallet } from '../fetch';
import { getDigiExperience, getDigiLevel } from '../utils';
import { addXP } from './addXP';
import { MOBILE_ADDR_BASE64 } from '../../../constants';

async function main() {
    const digiList: Nft[] = await fetchDigisByWallet(MOBILE_ADDR_BASE64);

    console.log(digiList);

    // const oldLevel = getDigiLevel(digiList[0] as NftWithToken);
    // console.log(`old level: ${JSON.stringify(oldLevel)}`);

    // await addXP(digiList[0] as NftWithToken, 10);
    // const newDigiList: Nft[] = await fetchDigisByWallet(MOBILE_ADDR_BASE64);
    // const newLevel = getDigiLevel(newDigiList[0] as NftWithToken);
    // console.log(`new level: ${JSON.stringify(newLevel)}`);
    // addXP(digiList[0] as NftWithToken, 2);
}

main();
