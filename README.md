## Usage

1. `npm i buy-now-svelte@latest`
2. Import the component asynchronously:

   ```js
   <script>
      import type { BuyNowModal } from "buy-now-svelte";
      import "buy-now-svelte/dist/style.css";

      let BuyNow: typeof BuyNowModal;

      onMount(async () => {
         const module = await import("buy-now-svelte");
         BuyNow = module.BuyNowModal;
      });
   </script>

   <svelte:component
      this={BuyNow}
      isOpen={showModal}
      contractAddress={"0x84047392538009c3d3da0aa76a098b44e1ea5771"}
      tokenId={"32"}
      networkId={"polygon"}
      {onOpenChange}
      {connectedAccount}
   />
   ```

3. Props to the Modal:
   - onOpenChange: () => void;
   - isOpen: boolean;
   - contractAddress: string;
   - tokenId: string;
   - connectedAccount: string | null;
   - networkId: "polygon" | "mainnet";
