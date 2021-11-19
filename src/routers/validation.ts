import { Address, AddressType, ValidatorPublicKey } from "@elrondnetwork/erdjs/out"
import e, { NextFunction, Request, Response } from "express"
import { validationResult, body, oneOf } from "express-validator"

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(422).json({
    errors: errors.array(),
  })
}

export const checkApproveBody = () => {
  return [
    body("nonce").isInt().isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14]).withMessage("please use a valid chain nonce."),
    body("privateKey").exists().withMessage("please provide a private key of the person whose nft you want to approve."),
    body("nft.uri").exists(),
    body("nft.native").exists(),
    body("nft.native.chainId").exists(),
    body("nft.native.tokenId").exists(),
    body("nft.native.contract").exists(),
    body("nft.native.owner").exists(),
    body("nft.native.uri").exists(),
  ]
}

export const checkChain = () => {
  return [
    body("chain").isIn(["web3", "elrond", "tron"]),
    body("nonce").isInt().isIn([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14]).withMessage("please use a valid chain nonce."),
    oneOf(
      [body("address").isEthereumAddress(),
      body("address").custom((e: string, _m) => e.startsWith("erd")),
      body("address").custom((e: string, _m) => e.startsWith("T"))
      ]),
  ]
}