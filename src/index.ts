import { Buffer } from "buffer";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";
import { ens_normalize } from "@adraffy/ens-normalize";

function normalize(name: string): string {
  return ens_normalize(name);
}

function namehash(name: string): string {
  let node: string =
    "0000000000000000000000000000000000000000000000000000000000000000";

  const s = name.split(".");
  for (let i = s.length - 1; i >= 0; i--) {
    const hash = bytesToHex(keccak_256(s[i]));
    node = bytesToHex(keccak_256(Buffer.from(node + hash, "HEX")));
  }

  return "0x" + node;
}

export { normalize, namehash };
