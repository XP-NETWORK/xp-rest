# XP Network Rest API

### This is the repository that holds the code for the REST API interface to XP.network's Bridge and Minting Platform.

Available Features:

- [x] Listing NFTs
- [x] Transaction Fee Estimation
- [x] Approval of NFTs
- [x] Transfer of NFTs
- [x] Minting NFTs

<hr/>

## Blockchain nonces to be used below:

|   Chain   | Nonce |
| :-------: | :---: |
|  Elrond   |   2   |
|   HECO    |   3   |
|    BSC    |   4   |
| Ethereum  |   5   |
| Avalanche |   6   |
|  Polygon  |   7   |
|   Tron    |   9   |
|   xDai    |  14   |

<hr/>

## 1. List NFTs

<gr>This endpoint allows to list NFT's owned by an address.<br/>
Mainnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/lister/listNfts`<br/>
Testnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/testnet/lister/listNfts`<br/>
<gr>Content-Type:</gr> <g>application/json<br/>

### Body template:

```typescript
interface ListRequest {
  chain: string; // One of the following: "web3" | "elrond" | "tron"
  nonce: number; // The nonce of the chain of interest (see nonces above)
  address: string; // Web3 | Tron | Elrond Address
}
```

### Example Request Body (web3):

```json
{
  "chain": "web3",
  "nonce": 4,
  "address": "0x0d7df42014064a163DfDA404253fa9f6883b9187"
}
```

### Example output (web3):

```json
[
  {
    "uri": "https://meta.polkamon.com/meta?id=10003252944",
    "native": {
      "chainId": 4,
      "tokenId": 10003252944,
      "owner": "0x0d7df42014064a163dfda404253fa9f6883b9187",
      "contract": "0x85F0e02cb992aa1F9F47112F815F519EF1A59E2D",
      "uri": "https://meta.polkamon.com/meta?id=10003252944"
    }
  }
]
```

### Example Request Body (Elrond):

```json
{
  "chain": "elrond",
  "nonce": 2,
  "address": "erd1mgz6e4pe233hg9795ld542kl5vukqyq55008720qnqtq8uqeksmszfd5gu"
}
```

### Example output (Elrond):

```json
[
  {
    "uri": "ipfs://bafyreidvtziij7ja736fncy7nqpb4hmawwhgxqdpcnig6youhe4em3xwza/metadata.json",
    "native": {
      "balance": 1,
      "creator": "erd1ywhyuhzpz9ve0ql9x88m70x086jm3dseqd4fsjys6k9dn7w06zwq6juf6e",
      "tokenIdentifier": "MEME-eaf5b5-05",
      "attributes": ["ZGVzY3JpcHRpb246"],
      "name": "Elrond Meme 4",
      "uris": [
        "aHR0cHM6Ly9kd2ViLmxpbmsvaXBmcy9iYWZ5YmVpZzJ3cmgybm95amM1aTRmNHhuZ3d3cXR2N21oYnNlcmx4dmR0dTY1dXNqY3kzc2Z0NzN6dS9sdWFmNWRyaDYxbzIxLm1wNA==",
        "aXBmczovL2JhZnlyZWlkdnR6aWlqN2phNzM2Zm5jeTducXBiNGhtYXd3aGd4cWRwY25pZzZ5b3VoZTRlbTN4d3phL21ldGFkYXRhLmpzb24="
      ],
      "nonce": 5,
      "royalties": "1500"
    }
  }
]
```

<hr/>

## 2. Estimate Transaction Fees

<gr>This endpoint allows to estimate the TX fees to inform the user accordingly.<br/>
Mainnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/estimator/estimate`<br/>
Testnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/testnet/estimator/estimate`<br/>
<gr>Content-Type:</gr> <g>application/json<br/>

### The interface the request body is validated with:

````javascript
interface EstimateRequest {
  fromNonce: number; // Nonce of the Origin Chain
  toNonce: number; // Nonce of the Destination Chain
  receiver: string; // Address of the Receiver
  // To get this, we need to get the NFT info from the Origin Chain using the ```/lister/listNfts``` endpoint.
  nft: {
    uri: string, // URI of the NFT
    native: EthNftInfo | EsdtNftInfo,
  };
}
````

### Example Request Body (for a web3 chain):

```json
{
  "fromNonce": 7,
  "toNonce": 4,
  "receiver": "0x0d7df42014064a163dfda404253fa9f6883b9187",
  "nft": {
    "uri": "https://portal.neondistrict.io/api/getNft/158456328035348522151700252068",
    "native": {
      "chainId": "7",
      "tokenId": "158456328035348522151700252068",
      "owner": "0x0d7df42014064a163dfda404253fa9f6883b9187",
      "contract": "0x7227e371540CF7b8e512544Ba6871472031F3335",
      "uri": "https://portal.neondistrict.io/api/getNft/158456328035348522151700252068"
    }
  }
}
```

### Expected Output (Web3):

```json
{
  "fees": "7780327168864218"
}
```

### Example Request Body (for Elrond):

```json
{
  "fromNonce": 2,
  "toNonce": 14,
  "receiver": "0x0d7df42014064a163dfda404253fa9f6883b9187",
  "nft": {
    "uri": "ipfs://bafyreidvtziij7ja736fncy7nqpb4hmawwhgxqdpcnig6youhe4em3xwza/metadata.json",
    "native": {
      "balance": 1,
      "creator": "erd1ywhyuhzpz9ve0ql9x88m70x086jm3dseqd4fsjys6k9dn7w06zwq6juf6e",
      "tokenIdentifier": "MEME-eaf5b5-05",
      "attributes": ["ZGVzY3JpcHRpb246"],
      "name": "Elrond Meme 4",
      "uris": [
        "aHR0cHM6Ly9kd2ViLmxpbmsvaXBmcy9iYWZ5YmVpZzJ3cmgybm95amM1aTRmNHhuZ3d3cXR2N21oYnNlcmx4dmR0dTY1dXNqY3kzc2Z0NzN6dS9sdWFmNWRyaDYxbzIxLm1wNA==",
        "aXBmczovL2JhZnlyZWlkdnR6aWlqN2phNzM2Zm5jeTducXBiNGhtYXd3aGd4cWRwY25pZzZ5b3VoZTRlbTN4d3phL21ldGFkYXRhLmpzb24="
      ],
      "nonce": 5,
      "royalties": "1500"
    }
  }
}
```

### Expected Output (Elrond):

```json
{
  "fees": "52329152319843"
}
```

<hr/>

## 3. Approve the trasnaction with the NFTs

<gr>This endpoint is for approving NFT's owned by an address.<br/>
Mainnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/approve/transfer`<br/>
Testnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/testnet/approve/transfer`<br/>
<gr>Content-Type:</gr> <g>application/json<br/>

It returns an unsigned TX for the user to sign it on the user machine. <br>

### The interface the request body is validated with:

```typescript
interface ApproveRequest {
  uri: string; // URI of the NFT metadata
  sender: string; // the PK of the NFT Owner
  nonce: number; // The chain nonce (see table above)
  txFees: string; // The result of the Estimation request
  nft: {
    native: {
      chainId: number; // The chain nonce (see table above)
      tokenId: string; // The ID of the NFT inside its smart contract
      owner: string; // The PK of the NFT Owner
      contract: string; // The address/PK of the NFT smart contract
      uri: string; // URI of the NFT metadata
    };
  };
}
```

### Example Request Body (for a web3 chain):

```json
{
  "sender": "0x0d7df42014064a163DfDA404253fa9f6883b9187",
  "nonce": 4,
  "txFees": "37070925765272",
  "nft": {
    "uri": "https://meta.polkamon.com/meta?id=10003252944",
    "native": {
      "chainId": "4",
      "tokenId": "10003252944",
      "owner": "0x0d7df42014064a163dfda404253fa9f6883b9187",
      "contract": "0x85F0e02cb992aa1F9F47112F815F519EF1A59E2D",
      "uri": "https://meta.polkamon.com/meta?id=10003252944"
    }
  }
}
```

It returns { } in case this TX has been approved before.<br>

### Example Request Body (for Elrond):

```json
{
  "sender": "erd1mgz6e4pe233hg9795ld542kl5vukqyq55008720qnqtq8uqeksmszfd5gu",
  "nonce": 2,
  "txFees": "52329152319843",
  "nft": {
    "uri": "ipfs://bafyreidvtziij7ja736fncy7nqpb4hmawwhgxqdpcnig6youhe4em3xwza/metadata.json",
    "native": {
      "balance": 1,
      "creator": "erd1ywhyuhzpz9ve0ql9x88m70x086jm3dseqd4fsjys6k9dn7w06zwq6juf6e",
      "tokenIdentifier": "MEME-eaf5b5-05",
      "attributes": ["ZGVzY3JpcHRpb246"],
      "name": "Elrond Meme 4",
      "uris": [
        "aHR0cHM6Ly9kd2ViLmxpbmsvaXBmcy9iYWZ5YmVpZzJ3cmgybm95amM1aTRmNHhuZ3d3cXR2N21oYnNlcmx4dmR0dTY1dXNqY3kzc2Z0NzN6dS9sdWFmNWRyaDYxbzIxLm1wNA==",
        "aXBmczovL2JhZnlyZWlkdnR6aWlqN2phNzM2Zm5jeTducXBiNGhtYXd3aGd4cWRwY25pZzZ5b3VoZTRlbTN4d3phL21ldGFkYXRhLmpzb24="
      ],
      "nonce": 5,
      "royalties": "1500"
    }
  }
}
```

### Example output (Elrond):

```json
{
  "result": {
    "nonce": 0,
    "value": "52329152319843",
    "receiver": "erd1qqqqqqqqqqqqqpgqkkcsf8aky3vn057086cgnps768ann7nfp7tqxppx53",
    "sender": "erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu",
    "gasPrice": 1000000000,
    "gasLimit": 50000000,
    "data": "d3JhcEVnbGQ=",
    "chainID": "1",
    "version": 1
  }
}
```

It returns { } in case this TX has been approved before.<br>

<hr/>

## 4. Transfer NFTs

<gr>This endpoint is for transferring NFT's owned by an address to another chain.<br/>
Mainnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/transfer/transfer`<br/>
Testnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/testnet/transfer/transfer`<br/>
<gr>Content-Type:</gr> <g>application/json<br/>

It returns an unsigned TX for the user to sign it on the user machine. <br>

### The interface the request body is validated with:

````javascript
interface TransferRequest {
  fromNonce: number; // Nonce of the Origin Chain
  toNonce: number; // Nonce of the Destination Chain
  sender: string; // The PK of the NFT Owner
  receiver: string; // Address of the Receiver
  // To get this, we need to get the NFT info from the Origin Chain using the ```/lister/listNfts``` endpoint.
  nft: {
    uri: string, // URI of the NFT
    native: EthNftInfo | EsdtNftInfo,
  };
}
````

### Example Request Body (for a web3 chain):

```json
{
  "fromNonce": 7,
  "toNonce": 14,
  "sender": "0x0d7df42014064a163dfda404253fa9f6883b9187",
  "receiver": "0x0d7df42014064a163dfda404253fa9f6883b9187",
  "nft": {
    "uri": "https://wnfts.xp.network/w/619f4021fef0c5c88d0a3480",
    "native": {
      "chainId": "7",
      "tokenId": "30",
      "owner": "0x0d7df42014064a163dfda404253fa9f6883b9187",
      "contract": "0xc69ECD37122A9b5FD7e62bC229d478BB83063C9d",
      "uri": "https://wnfts.xp.network/w/619f4021fef0c5c88d0a3480"
    }
  }
}
```

### Expected output (example for web3):

```json
{
  "data": "0x453290190000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000002a30783064376466343230313430363461313633646664613430343235336661396636383833623931383700000000000000000000000000000000000000000000",
  "to": "0x2f072879411503580B8974A221bf76638C50a82a",
  "value": {
    "type": "BigNumber",
    "hex": "0x1e953c55301030"
  }
}
```

### Example Request Body (for Elrond):

```json
{
  "fromNonce": 2,
  "toNonce": 14,
  "sender": "erd1mgz6e4pe233hg9795ld542kl5vukqyq55008720qnqtq8uqeksmszfd5gu",
  "receiver": "0x0d7df42014064a163dfda404253fa9f6883b9187",
  "nft": {
    "uri": "ipfs://bafyreidvtziij7ja736fncy7nqpb4hmawwhgxqdpcnig6youhe4em3xwza/metadata.json",
    "native": {
      "balance": 1,
      "creator": "erd1ywhyuhzpz9ve0ql9x88m70x086jm3dseqd4fsjys6k9dn7w06zwq6juf6e",
      "tokenIdentifier": "MEME-eaf5b5-05",
      "attributes": ["ZGVzY3JpcHRpb246"],
      "name": "Elrond Meme 4",
      "uris": [
        "aHR0cHM6Ly9kd2ViLmxpbmsvaXBmcy9iYWZ5YmVpZzJ3cmgybm95amM1aTRmNHhuZ3d3cXR2N21oYnNlcmx4dmR0dTY1dXNqY3kzc2Z0NzN6dS9sdWFmNWRyaDYxbzIxLm1wNA==",
        "aXBmczovL2JhZnlyZWlkdnR6aWlqN2phNzM2Zm5jeTducXBiNGhtYXd3aGd4cWRwY25pZzZ5b3VoZTRlbTN4d3phL21ldGFkYXRhLmpzb24="
      ],
      "nonce": 5,
      "royalties": "1500"
    }
  }
}
```

### Expected output (example for Elrond):

```json
{
  "nonce": 0,
  "value": "0",
  "receiver": "erd1mgz6e4pe233hg9795ld542kl5vukqyq55008720qnqtq8uqeksmszfd5gu",
  "sender": "erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu",
  "gasPrice": 1000000000,
  "gasLimit": 70000000,
  "data": "TXVsdGlFU0RUTkZUVHJhbnNmZXJAMDAwMDAwMDAwMDAwMDAwMDA1MDBjZDZmMGJhZTM1ZTJkZTdhMzczYjA1OTQ4NTdmZjgxNGZiM2IzOGY1MGY5NkAwMkA0ZDQ1NGQ0NTJkNjU2MTY2MzU2MjM1QDA1QDAxQDU3NDU0NzRjNDQyZDM2MzgzMjMzNjMzMUBAMzg5NTQ5ZDBlYzNkQDY2NzI2NTY1N2E2NTUzNjU2ZTY0NGU2Njc0QDBlQDMwNzgzMDY0Mzc2NDY2MzQzMjMwMzEzNDMwMzYzNDYxMzEzNjMzNjQ2NjY0NjEzNDMwMzQzMjM1MzM2NjYxMzk2NjM2MzgzODMzNjIzOTMxMzgzNw==",
  "chainID": "1",
  "version": 1
}
```

<hr/>

## 6. Minting NFTs (Optional)

<gr>This endpoint is for minting NFT's owned by an address.<br/>
Mainnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/minter/mint`<br/>
Testnet:<br/>
</gr>
<gr><r>POST</r> : `https://<IP>/testnet/minter/mint`<br/>
<gr>Content-Type:</gr> <g>application/json<br/>

### The interface the request body is validated with:

```javascript
interface MintRequest {
  sender:                string;             // The PK of the TX fee payer & future NFT Owner
  nonce:                 number;             // Nonce of the chain (see the table above)
  nft: {
    readonly contract?:  string;             // NFT Minting Contract address. Required for Web3 chains.
    readonly uris:       string[];           // Must for All Nfts. Length should be one.
    readonly identifier?:string;             // Identifier of the ESDT. Must for Elrond.
    readonly quantity?:  number | undefined; // Quantity of the NFT. (Only for Elrond).
    readonly name?:      string;             // Name of the NFT (Only for Elrond).
    readonly royalties?: number | undefined; // Royalties of an NFT (Only for Elrond).
    readonly hash?:      string | undefined; // (Only for Elrond).
    readonly attrs:      string | undefined; // (Only for Elrond).
}
}
```

### Example Request Body (for web3):

```json
{
  "chain": "web3",
  "sender": "0x0d7df42014064a163dfda404253fa9f6883b9187",
  "nonce": 5,
  "nft": {
    "name": "unit-test",
    "contract": "0xde5Cc515Bf51DE196f1DaF30e1EDcF379064130f",
    "uris": ["https://meta.polkamon.com/meta?id=10003252944"]
  }
}
```

### Example output:

```json
{
  "txHash": "0x3a9c4e40a48b7cd3216a9a9c9aaada1a7fcdd4ab24ba27592dce57f4dd90a61e"
}
```

To check the transaction on the blockchain, go to the explorer of the chain:

```bash
curl -H "Content-Type: application/json" -X GET https://ropsten.etherscan.io/tx/0x3a9c4e40a48b7cd3216a9a9c9aaada1a7fcdd4ab24ba27592dce57f4dd90a61e
```

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
