import { base64ToBase58, getDigiExperience, getDigiLevel } from '../utils';
import { transferSolToUser } from './transferSol';
import { MOBILE_ADDR_BASE58, MOBILE_ADDR_BASE64, WALLET } from '../../../constants';

async function main() {
    console.log(MOBILE_ADDR_BASE58);

    const base58M = base64ToBase58(MOBILE_ADDR_BASE64);
    console.log(base58M); // 2BZpMwPyYyoHGPEGmtpv4fbwQ5qkzBT47U7o2gtaez9s

    console.log(`mobile address: ${MOBILE_ADDR_BASE58}`);

    await transferSolToUser(WALLET, MOBILE_ADDR_BASE58, 0.1);
}

main();
