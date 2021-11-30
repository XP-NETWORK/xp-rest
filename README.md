# XP Network Rest API

### This is the repository that holds the code for the REST API interface to XP.network's Bridge and Minting Platform.

Features Available :-

- [x] Approval of NFTs
- [x] Transfer of NFTs
- [x] Minting NFTs
- [x] Listing NFTs

## Listing NFTs

This endpoint is for listing NFT's owned by an address.
Endpoint :- `/lister/listNfts`
Body :-

```javascript
interface ListRequest {
  chain: string; // "web3" / "elrond" / "tron"
  nonce: number; // The nonce of the chain on which you have the NFTs.
  address: string; // Web3/Tron/Elrond Address
}
```

## Minting NFTs

This endpoint is for minting NFT's owned by an address.

- This endpoint requires your private key.

Endpoint :- `/minter/mint`
Body :-

```javascript
interface MintRequest {
  chain: string; // Name of the Chain :- web3/elrond/tron
  nonce: number; // Nonce of the chain i.e 2,3.
  privateKey: string; // Private key to mint the NFTs to.
  nft: {
    readonly contract?: string; // Contract of the Address you want to mint the NFTs on. Required for Web3.
    readonly uris: string[]; // Must for All Nfts. Length should be one.
    readonly identifier?: string; // Identifier of the ESDT. Must for Elrond.
    readonly quantity?: number | undefined; // Quantity of the NFT. (Only for Elrond).
    readonly name?: string; // Name of the NFT (Only for Elrond).
    readonly royalties?: number | undefined; // Royalties of an NFT (Only for Elrond).
    readonly hash?: string | undefined; // (Only for Elrond).
    readonly attrs: string | undefined; // (Only for Elrond).
}
}
```

## Approve NFTs

This endpoint is for approving NFT's owned by an address.

- This endpoint requires your private key.

Endpoint :- `/approve/transfer`
Body :-

```javascript
interface ApproveRequest {
  nft: {
      readonly uri: string;
      readonly native: {
        chainId: string;
        tokenId: string;
        owner: string;
        uri: string;
        contract: string;
    };
  };
  privateKey: string;
  nonce: number;
}

```

## Transfer NFTs

This endpoint is for transferring NFT's owned by an address to another chain.

- This endpoint requires your private key.

Endpoint :- `/transfer/transfer`
Body :-

````javascript
interface TransferRequest {
  fromNonce: number; // Nonce of the Origin Chain
  chain: string; // web3 only for now.
  toNonce: number; // Nonce of the Destination Chain
  receiver: string; // Address of the Receiver
  sender: string; // Sender of the NFT
  // To get this, we need to get the NFT info from the Origin Chain using the ```/lister/listNfts``` endpoint.
  nft: {
    uri: string, // URI of the NFT
    native: EthNftInfo, // Check the source code for these types.
  };
}
````

## Troubleshooting

- In case you're using the library in a console application and getting errors, go to:
- node_modules/xpnet-nft-list/dist/nft-list/model/moralis/MoralisNftListService.js

Now your line #7 looks like this (to be used in the FE):

```javascript
7   const moralis_1 = __importDefault(require("moralis"));
```

Change it like so (for BE usage):

```javascript
7   const moralis_1 = __importDefault(require("moralis/node"));
```
