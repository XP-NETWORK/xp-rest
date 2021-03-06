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
      .isIn([2, 3, 4, 5, 6, 7, 8, 11, 12, 14, 9])
      .withMessage("please use a valid chain nonce."),
    body("sender", "address of the sender").exists(),
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
    body("nonce")
      .isInt()
      .isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14])
      .withMessage("please use a valid chain nonce."),
    body("sender").isString(),
    oneOf([
      body(
        "nft.contract",
        "if your chain is web3, please pass the contract address",
      ).exists(),
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
