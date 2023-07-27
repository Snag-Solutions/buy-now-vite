<script lang="ts">
  import { onMount } from "svelte";
  import BuyNowModal from "./BuyNowModal.svelte";
  import { ethers } from "ethers";

  let showModal = false;
  let connectedAccount: string;

  function onOpenChange() {
    showModal = !showModal;
  }

  onMount(() => {
    connectWallet();
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        connectedAccount = await signer.getAddress();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("You need to install a browser wallett");
    }
  }
</script>

<button class="text-red" on:click={onOpenChange}>Show Modal</button>

<BuyNowModal
  isOpen={showModal}
  contractAddress={"0x84047392538009c3d3da0aa76a098b44e1ea5771"}
  tokenId={"32"}
  networkId={"polygon"}
  {onOpenChange}
  {connectedAccount}
/>
