import { NextFunction, Request, Response } from "express";
import { validationResult, body, oneOf } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    errors: errors.array(),
  });
};

export const checkApproveBody = () => {
  return [
    body("nonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    body("privateKey")
      .exists()
      .withMessage(
        "please provide a private key of the person whose nft you want to approve.",
      ),
    body("nft").exists().isObject(),
    body("txFees").exists(),
  ];
};

export const checkList = () => {
  return [
    body("chain", "type of the chain which can be web3/elrond/tron").isIn([
      "web3",
      "elrond",
      "tron",
    ]),
    body("nonce", "please use a valid chain nonce.").isIn([
      2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14,
    ]),
    oneOf(
      [
        body("address").isEthereumAddress(),
        body("address").custom((e: string, _m) => e?.startsWith("erd")),
        body("address").custom((e: string, _m) => e?.startsWith("T")),
      ],
      "please provide a valid address.",
    ),
  ];
};

export const checkMint = () => {
  return [
    body("chain").isIn(["web3", "elrond", "tron"]),
    body("nonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    body("privateKey")
      .isString()
      .withMessage(
        "please provide a private key of the person to whom you want to mint the nft to",
      ),
    oneOf([
      body(
        "nft.contract",
        "if your chain is web3, please pass the contract address",
      )
        .exists()
        .isEthereumAddress(),
      body(
        "nft.identifier",
        "if your chain is elrond, please pass the ESDT identifier.",
      )
        .exists()
        .isString(),
    ]),
    body("nft.name").exists(),
  ];
};

export const checkTransfer = () => {
  return [
    body("fromNonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    body("toNonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    body("chain", "only supports web3 or elrond right now")
      .exists()
      .isIn(["web3", "elrond"]),
    body("sender", "address of the receiver is a required field").exists(),
    oneOf([
      body("receiver").isEthereumAddress(),
      body("receiver").custom((e: string, _m) => e?.startsWith("erd") ?? false),
      body("receiver").custom((e: string, _m) => e?.startsWith("T") ?? false),
    ]),
    body("nft").exists().isObject(),
  ];
};

export const checkEstimate = () => {
  return [
    body("fromNonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    body("toNonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    oneOf([
      body("receiver").isEthereumAddress(),
      body("receiver").custom((e: string, _m) => e?.startsWith("erd") ?? false),
      body("receiver").custom((e: string, _m) => e?.startsWith("T") ?? false),
    ]),
    body("nft").exists().isObject(),
  ];
};
