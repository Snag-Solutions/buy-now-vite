declare module "buy-now-svelte" {
  import { SvelteComponentTyped } from "svelte";

  export type NetworkChainIdf =
    | "mainnet"
    | "goerli"
    | "optimism"
    | "optimismGoerli"
    | "polygon"
    | "polygonMumbai"
    | "bsc"
    | "bscTestnet"
    | "arbitrum"
    | "arbitrumGoerli"
    | "avalanche"
    | "avalancheFuji"
    | "fantom"
    | "fantomTestnet";

  interface BuyNowModalProps {
    onOpenChange: () => void;
    isOpen: boolean;
    contractAddress: string;
    tokenId: string;
    connectedAccount: string | null;
    networkId: NetworkChainIdf;
  }

  export class BuyNowModal extends SvelteComponentTyped<BuyNowModalProps> {}
}
