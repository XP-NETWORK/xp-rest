import approveRouter from "./approve";
import estimateRouter from "./estimate";
import listerRouter from "./lister";
import mintRouter from "./minter";
import transferRouter from "./transfer";

export const minter = mintRouter;
export const transfer = transferRouter;
export const lister = listerRouter;
export const approve = approveRouter;
export const estimate = estimateRouter;
