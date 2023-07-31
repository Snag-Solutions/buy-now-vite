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
  import "./BuyNowModal.css";

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
    <div slot="body">
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
              <div class="">
                <div class="flex gap-6">
                  <img
                    class="h-24 w-24 rounded"
                    src={tokenListing.image}
                    alt={tokenListing.name}
                  />

                  <div
                    class="flex basis-4/5 flex-col justify-between justify-items-start py-2"
                  >
                    <h3 class="text-xl font-semibold text-primary-text">
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

                <div class="mt-6 border-t-[1px] border-separator pt-6">
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
                    class="ml-0.5 font-semibold underline"
                    href="https://snagsolutions.io/terms-and-conditions"
                    >Terms and conditions</a
                  >.
                </div>
              </div>
            {:else}
              <div class="flex flex-col gap-6">
                <div class="flex gap-6">
                  <img
                    class="h-24 w-24 rounded"
                    src={tokenListing.image}
                    alt={tokenListing.name}
                  />
                  <div class="flex basis-4/5 flex-col justify-items-start py-2">
                    <h3 class="text-xl font-semibold text-primary-text">
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
          <div class="flex flex-col gap-8">
            <div class="flex flex-row items-center gap-6">
              {#if buyListingState === BuyListingState.Created}
                <SpinnerIcon className={"h-10 w-10"} />
              {:else}
                <CheckIcon className="h-10 w-10" />
              {/if}

              <div class="flex flex-col justify-between text-primary-text">
                <div class="text-base font-semibold sm:text-xl">
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
          <div class="flex-grow overflow-y-auto text-primary-text">
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
          <div class="flex flex-row items-center gap-2 mr-auto">
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
