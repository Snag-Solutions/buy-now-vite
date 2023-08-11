<script lang="ts">
  import { createClient, type Execute } from "@reservoir0x/reservoir-sdk";
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import axios from "axios";
  import { Button, Modal, RarityRank } from "./components";
  import {
    BuyListingState,
    convertReservoirToken,
    type Token,
  } from "./types/generic";
  import { formatAmount, formatDollar } from "./lib/numbers";
  import { adaptEthersSigner } from "@reservoir0x/ethers-wallet-adapter";
  import {
    AllNetworkChains,
    ChainIdByNetwork,
    ChainNameByNetwork,
    EthereumMainnetChain,
    type NetworkChainIdf,
  } from "./types/chain";
  import {
    CheckIcon,
    ExternalLinkIcon,
    SpinnerIcon,
    TwitterIcon,
  } from "./icons";

  export let onOpenChange: () => void;
  export let isOpen: boolean;
  export let contractAddress: string;
  export let tokenId: string;
  export let connectedAccount: string | null;
  export let networkId: NetworkChainIdf;

  let provider: ethers.providers.Web3Provider | null = null;

  if (typeof window !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } else {
    console.log("This is server side. window object does not exist.");
  }

  let tokenListing: Token | null;
  let buyListingState: BuyListingState | null = null;
  let balanceInEther: string;
  let chainId: number | null = null;
  let errors: string[] = [];
  let buyTxHash: string | undefined;
  let isLoadingToken = false;
  let apiUrl: string = "https://api.reservoir.tools";
  let shareLink = "https://twitter.com/intent/tweet?text=Letsgoo";

  $: if (chainId === ChainIdByNetwork[networkId]) {
    getBalance();

    if (chainId === 1) {
      apiUrl = "https://api.reservoir.tools";
    } else if (chainId === 137) {
      apiUrl = "https://api-polygon.reservoir.tools";
    }

    if (isOpen) {
      fetchToken();
    }
  }

  $: if (provider) {
    const getChainId = async () => {
      const res = await provider.getNetwork();
      chainId = res.chainId;
    };
    getChainId();
  }

  onMount(async () => {
    if (typeof window !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        connectedAccount = accounts[0];
      });

      window.ethereum.on("chainChanged", (res: string) => {
        chainId = Number(res);
      });
    } else {
      console.log("This is server side. window object does not exist.");
    }
  });

  const fetchToken = async () => {
    isLoadingToken = true;
    const { data } = await axios.get(
      `${apiUrl}/tokens/v6?tokenSetId=token:${contractAddress}:${tokenId}`
    );

    if (data.tokens) {
      tokenListing = convertReservoirToken(data.tokens);
    }
    isLoadingToken = false;
  };

  const getBalance = async () => {
    if (connectedAccount) {
      const balance = await provider.getBalance(connectedAccount);
      balanceInEther = ethers.utils.formatEther(balance);
    }
  };

  const buyToken = async () => {
    const signer = provider.getSigner();
    const wallet = adaptEthersSigner(signer);

    const client = createClient({
      chains: AllNetworkChains.map(({ id }) => {
        return {
          active: chainId === id,
          id,
          baseApiUrl: apiUrl,
          default: EthereumMainnetChain.id === id,
        };
      }),
    });

    buyListingState = BuyListingState.Created;

    try {
      errors = [];
      await client.actions.buyToken({
        items: [{ token: `${contractAddress}:${tokenId}` }],
        wallet,
        onProgress: (steps: Execute["steps"]) => {
          if (steps?.[1]?.items?.[0]?.status === "complete") {
            buyTxHash = steps?.[1]?.items?.[0]?.txHash ?? undefined;
          }
          const newErrors: string[] = [];
          for (let step of steps) {
            if (step.error) {
              newErrors.push(step.error);
            }
            if (step.items) {
              for (let item of step.items) {
                if (item.error) {
                  newErrors.push(item.error);
                }
              }
            }
          }
          errors = [...errors, ...newErrors];
        },
      });
      buyListingState = BuyListingState.Success;
    } catch (error: any) {
      let newError = error?.message ?? "Something went wrong.";
      if (error?.code === 4001) {
        newError = "You have canceled the transaction.";
      } else if (error.message.includes(400)) {
        newError =
          "Something went wrong. Make sure you have enough ETH in your wallet.";
      }

      errors = [...errors, newError];
    }
  };

  const modalTitle = (() => {
    if (!buyListingState) {
      return "Purchase an item";
    } else if (buyListingState === BuyListingState.Success) {
      return "Your purchase succeeded!";
    } else {
      return "Complete your purchase";
    }
  })();
</script>

{#if isOpen}
  <Modal
    on:close={() => {
      buyListingState = null;
      errors = [];
      onOpenChange();
    }}
    modalOpen={isOpen}
  >
    <svelte:fragment slot="header">
      {modalTitle}
    </svelte:fragment>
    <div class="font-custom text-base" slot="body">
      {#if chainId !== ChainIdByNetwork[networkId]}<span
          >Wrong network, make sure you are connected to {ChainNameByNetwork[
            networkId
          ]}</span
        >{:else}
        {#if errors.length > 0}
          {#each errors.filter((value, index, array) => array.indexOf(value) === index) as message}
            <span>{message}</span>
          {/each}
        {/if}
        {#if !buyListingState}
          {#if tokenListing}
            {#if tokenListing?.reservoirListing}
              <div class="box-border border-0 border-solid border-separator">
                <div class="flex gap-6">
                  <img
                    class="h-24 w-24 rounded"
                    src={tokenListing.image}
                    alt={tokenListing.name}
                  />

                  <div
                    class="flex basis-4/5 flex-col justify-between justify-items-start py-2"
                  >
                    <h3 class="text-xl m-0 font-semibold text-primary-text">
                      {tokenListing.name}
                    </h3>

                    <RarityRank rarityRank={tokenListing.rarityRank} />

                    <div class="grow-0 text-2xl">
                      <span class="flex flex-row items-center"
                        ><span class="text-primary-text font-semibold"
                          >{formatAmount(
                            `${tokenListing?.reservoirListing?.price.amount.decimal}`,
                            4
                          )}</span
                        ><img
                          src={`${apiUrl}/redirect/currency/${tokenListing?.reservoirListing?.price.currency.contract}/icon/v1`}
                          class="ml-1 h-4 rounded-full"
                          alt="Currency icon for listing"
                        /><span
                          class="text-secondary-text ml-2 align-middle text-lg font-semibold"
                          >{formatDollar(
                            tokenListing?.reservoirListing?.price.amount.usd ??
                              0
                          )}</span
                        ></span
                      >
                    </div>
                  </div>
                </div>

                <div class="mt-6 border-0 border-t-[1px] border-separator border-solid pt-6">
                  <div class="flex flex-row items-center gap-2">
                    <img
                      src={tokenListing?.reservoirListing?.sourceIcon}
                      class="h-6 w-6"
                      alt={`Original listing on ${tokenListing?.reservoirListing?.source}`}
                    />
                    <div class="text-primary-text">
                      Original listing on
                      <p class="inline capitalize">
                        {tokenListing?.reservoirListing?.source}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-5 text-xs text-secondary-text">
                  By connecting your wallet and using the marketplace, you agree
                  to our technology partner, Snag Solutions,<a
                    target="_blank"
                    rel="noreferrer"
                    class="ml-0.5 font-semibold underline text-primary-text"
                    href="https://snagsolutions.io/terms-and-conditions"
                    >Terms and conditions</a
                  >.
                </div>
              </div>
            {:else}
              <div class="flex flex-col gap-6 box-border border-0 border-solid border-separator">
                <div class="flex gap-6">
                  <img
                    class="h-24 w-24 rounded"
                    src={tokenListing.image}
                    alt={tokenListing.name}
                  />
                  <div class="flex basis-4/5 flex-col justify-items-start py-2">
                    <h3 class="text-xl m-0 font-semibold text-primary-text">
                      {tokenListing.name}
                    </h3>

                    <RarityRank rarityRank={tokenListing.rarityRank} />
                  </div>
                </div>

                <div>Token is not available to buy anymore</div>
              </div>
            {/if}
          {:else if isLoadingToken}
            <SpinnerIcon className="fill-primary h-10 w-10" />
          {/if}
        {/if}

        {#if buyListingState && buyListingState !== BuyListingState.Success}
          <div class="flex flex-col gap-8 box-border border-0 border-solid border-separator">
            <div class="flex flex-row items-center gap-6">
              {#if buyListingState === BuyListingState.Created}
                <SpinnerIcon className={"h-10 w-10"} />
              {:else}
                <CheckIcon className="h-10 w-10" />
              {/if}

              <div class="flex flex-col justify-between text-primary-text">
                <div class="font-custom text-base font-semibold sm:text-xl">
                  Confirm purchase
                </div>
                <div class="text-sm">
                  Waiting for your transaction confirmation in your wallet.
                </div>
              </div>
            </div>
          </div>
        {/if}

        {#if buyListingState === BuyListingState.Success}
          <div class="flex-grow overflow-y-auto text-primary-text box-border border-0 border-solid border-separator">
            <div class="flex flex-col items-center gap-6 sm:gap-8">
              <div
                class="relative h-[128px] w-[128px] sm:h-[256px] sm:w-[256px]"
              >
                <div class="media-frame rounded-xl border-4 border-success">
                  <div class="relative h-0 overflow-hidden bg-black pt-[100%]">
                    <img
                      src={tokenListing?.image}
                      alt={tokenListing?.name}
                      class="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 z-0 object-contain"
                      style="height: 100%; width: auto;"
                    />
                  </div>
                  <CheckIcon
                    className="absolute inset-x-1/2 bottom-[4px] -translate-x-1/2 translate-y-1/2 rounded-full bg-success fill-white h-11 w-11"
                  />
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${buyTxHash}`}
                target="_blank"
                class="flex flex-row items-center gap-2 text-primary-text"
              >
                <div class="font-semibold">View on Explorer</div>
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
              <div class="flex w-full flex-row gap-3 sm:w-auto">
                <Button
                  onClick={onOpenChange}
                  className="flex w-full justify-center px-6 py-2.5 leading-5 sm:w-auto"
                  >Close</Button
                >

                <Button
                  type="link"
                  className="px-6 py-2.5 leading-5 sm:w-auto bg-[#34A2F2]"
                  href={shareLink}
                  ><span
                    class="flex flex-row items-center gap-2 text-[#ffffff]"
                  >
                    <TwitterIcon className="h-5 w-5" />
                    <span>Share</span>
                  </span></Button
                >
              </div>
            </div>
          </div>
        {/if}
      {/if}
    </div>
    <svelte:fragment slot="footer">
      {#if !buyListingState && chainId === ChainIdByNetwork[networkId]}
        {#if connectedAccount}
          <div class="flex flex-row items-center gap-2 mr-auto text-base font-custom">
            <div class="text-sm font-semibold uppercase text-secondary-text">
              Your balance
            </div>
            <div class="text-sm font-normal">
              <span class="flex flex-row items-center"
                ><span class="text-primary-text font-semibold"
                  >{formatAmount(balanceInEther, 2)}</span
                ><img
                  src={`${apiUrl}/redirect/currency/0x0000000000000000000000000000000000000000/icon/v1`}
                  class="ml-1 h-4 rounded-full"
                  alt="Currency Icon for balance"
                /></span
              >
            </div>
          </div>
        {/if}
        <Button
          onClick={buyToken}
          disabled={!connectedAccount ||
            buyListingState === BuyListingState.Created}
          className="border-0 px-6 py-2.5 leading-5 md:w-auto"
          isPrimary>Checkout</Button
        >
      {/if}
    </svelte:fragment>
  </Modal>
{/if}
<style>
.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.sticky {
  position: sticky;
}

.inset-0 {
  inset: 0px;
}

.inset-x-1\/2 {
  left: 50%;
  right: 50%;
}

.bottom-0 {
  bottom: 0px;
}

.bottom-\[4px\] {
  bottom: 4px;
}

.left-2\/4 {
  left: 50%;
}

.top-0 {
  top: 0px;
}

.top-2\/4 {
  top: 50%;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.z-\[100\] {
  z-index: 100;
}

.m-0 {
  margin: 0px;
}

.ml-0 {
  margin-left: 0px;
}

.ml-0\.5 {
  margin-left: 0.125rem;
}

.ml-1 {
  margin-left: 0.25rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mr-\[6px\] {
  margin-right: 6px;
}

.mr-auto {
  margin-right: auto;
}

.mt-5 {
  margin-top: 1.25rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.box-border {
  box-sizing: border-box;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.h-0 {
  height: 0px;
}

.h-10 {
  height: 2.5rem;
}

.h-11 {
  height: 2.75rem;
}

.h-24 {
  height: 6rem;
}

.h-3 {
  height: 0.75rem;
}

.h-4 {
  height: 1rem;
}

.h-5 {
  height: 1.25rem;
}

.h-6 {
  height: 1.5rem;
}

.h-\[128px\] {
  height: 128px;
}

.h-\[60px\] {
  height: 60px;
}

.h-\[73px\] {
  height: 73px;
}

.h-fit {
  height: -moz-fit-content;
  height: fit-content;
}

.w-10 {
  width: 2.5rem;
}

.w-11 {
  width: 2.75rem;
}

.w-24 {
  width: 6rem;
}

.w-3 {
  width: 0.75rem;
}

.w-4 {
  width: 1rem;
}

.w-5 {
  width: 1.25rem;
}

.w-6 {
  width: 1.5rem;
}

.w-\[128px\] {
  width: 128px;
}

.w-fit {
  width: -moz-fit-content;
  width: fit-content;
}

.w-full {
  width: 100%;
}

.w-screen {
  width: 100vw;
}

.flex-grow {
  flex-grow: 1;
}

.grow-0 {
  flex-grow: 0;
}

.basis-4\/5 {
  flex-basis: 80%;
}

.-translate-x-1\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.-translate-x-2\/4 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.-translate-y-2\/4 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.translate-y-1\/2 {
  --tw-translate-y: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.cursor-pointer {
  cursor: pointer;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-items-start {
  justify-items: start;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-8 {
  gap: 2rem;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.border {
  border-width: 1px;
}

.border-0 {
  border-width: 0px;
}

.border-4 {
  border-width: 4px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-t {
  border-top-width: 1px;
}

.border-t-\[1px\] {
  border-top-width: 1px;
}

.border-solid {
  border-style: solid;
}

.border-separator {
  --tw-border-opacity: 1;
  border-color: rgb(238 246 250 / var(--tw-border-opacity));
}

.border-success {
  --tw-border-opacity: 1;
  border-color: rgb(76 175 80 / var(--tw-border-opacity));
}

.border-transparent {
  border-color: transparent;
}

.bg-\[\#34A2F2\] {
  --tw-bg-opacity: 1;
  background-color: rgb(52 162 242 / var(--tw-bg-opacity));
}

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(134 170 249 / var(--tw-bg-opacity));
}

.bg-secondary {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-success {
  --tw-bg-opacity: 1;
  background-color: rgb(76 175 80 / var(--tw-bg-opacity));
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.fill-primary {
  fill: #86AAF9;
}

.fill-white {
  fill: #fff;
}

.object-contain {
  -o-object-fit: contain;
     object-fit: contain;
}

.p-4 {
  padding: 1rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-2\.5 {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.py-\[0\.155rem\] {
  padding-top: 0.155rem;
  padding-bottom: 0.155rem;
}

.py-\[22px\] {
  padding-top: 22px;
  padding-bottom: 22px;
}

.pt-6 {
  padding-top: 1.5rem;
}

.pt-\[100\%\] {
  padding-top: 100%;
}

.text-left {
  text-align: left;
}

.align-middle {
  vertical-align: middle;
}

.font-custom {
  font-family: Inter;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-normal {
  font-weight: 400;
}

.font-semibold {
  font-weight: 600;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.leading-5 {
  line-height: 1.25rem;
}

.leading-none {
  line-height: 1;
}

.text-\[\#ffffff\] {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-over-text {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-primary-text {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

.text-secondary-text {
  --tw-text-opacity: 1;
  color: rgb(69 69 69 / var(--tw-text-opacity));
}

.underline {
  text-decoration-line: underline;
}

.opacity-50 {
  opacity: 0.5;
}

.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

@font-face {
  font-family: "Inter";

  src: url("fonts/inter.woff") format("woff");
}

.disabled\:pointer-events-none:disabled {
  pointer-events: none;
}

.disabled\:cursor-default:disabled {
  cursor: default;
}

.disabled\:text-over-text:disabled {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

@media (min-width: 640px) {
  .sm\:h-20 {
    height: 5rem;
  }

  .sm\:h-\[256px\] {
    height: 256px;
  }

  .sm\:w-\[256px\] {
    width: 256px;
  }

  .sm\:w-auto {
    width: auto;
  }

  .sm\:w-full {
    width: 100%;
  }

  .sm\:max-w-lg {
    max-width: 32rem;
  }

  .sm\:justify-end {
    justify-content: flex-end;
  }

  .sm\:gap-8 {
    gap: 2rem;
  }

  .sm\:p-8 {
    padding: 2rem;
  }

  .sm\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .sm\:py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .sm\:py-\[20px\] {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .sm\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .sm\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}

@media (min-width: 768px) {
  .md\:h-4 {
    height: 1rem;
  }

  .md\:w-4 {
    width: 1rem;
  }

  .md\:w-auto {
    width: auto;
  }

  .md\:text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
