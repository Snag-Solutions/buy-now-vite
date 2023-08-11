<!-- Modal.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let maxWidth: string = '600px';
    export let modalOpen = false;

    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }
</script>

{#if modalOpen}
    <div
        class="fixed inset-0 w-screen h-s creen z-[100] flex items-center justify-center text-base font-custom box-border border-0 border-solid border-separator"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <!-- The overlay/backdrop. It captures all clicks and makes background unclickable. -->
        <div
            class="absolute inset-0 bg-black opacity-50"
            on:click={close}
            role="button"
            tabindex={1}
            on:keypress={close}
        />
        <div
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all z-10 w-full max-w-lg"
            style={`max-width: ${maxWidth};`}
        >
            <div
                class="text-2xl px-8 py-6 sticky top-0 z-20 flex h-20 font-semibold items-center justify-between border-b border-separator border-solid box-border border-solid font-custom"
            >
                <slot name="header" />
            </div>
            <div class="flex-grow overflow-y-auto p-8 text-primary-text box-border border-0 border-solid border-separator font-custom">
                <slot name="body" />
            </div>

            {#if $$slots.footer}
                <div
                    class="footer  sticky bottom-0 flex w-full flex-row items-center gap-4 border-t h-20 justify-end px-8 py-[20px] box-border border-0 border-solid border-separator font-custom"
                >
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
{/if}
<style src="../BuyNowModal.css"></style>
