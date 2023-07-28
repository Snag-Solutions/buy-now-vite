## Usage

1. npm i buy-now-svelte@latest
2. import { BuyNowModal } from "buy-now-svelte";
3. Props to the Modal:
   - export let onOpenChange: () => void;
   - export let isOpen: boolean;
   - export let contractAddress: string;
   - export let tokenId: string;
   - export let connectedAccount: string;
   - export let networkId: NetworkChainIdf;
