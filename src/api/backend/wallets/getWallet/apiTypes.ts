/* eslint-disable @typescript-eslint/no-empty-object-type */
import { GetWalletRequestApi, GetWalletResponseApi } from "./apiTypes.server";

export interface GetWalletRequest extends GetWalletRequestApi {}

export type GetWalletResponse = GetWalletResponseApi | null;
