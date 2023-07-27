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
        class="fixed inset-0 w-screen h-s creen z-[100] flex items-center justify-center"
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
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-10"
            style={`max-width: ${maxWidth};`}
        >
            <div
                class="sticky top-0 z-20 flex h-[60px] font-semibold items-center justify-between border-b border-separator px-4 py-[22px] sm:h-20 sm:px-8 sm:py-6 sm:text-2xl"
            >
                <slot name="header" />
            </div>

            <div class="flex-grow overflow-y-auto px-4 py-6 text-primary-text sm:p-8">
                <slot name="body" />
            </div>

            {#if $$slots.footer}
                <div
                    class="footer sm:h[81px] sticky bottom-0 flex h-[73px] w-full flex-row items-center justify-between gap-4 border-t border-separator p-4 sm:h-20 sm:justify-end sm:px-8 sm:py-[20px]"
                >
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .footer:empty {
        display: none;
    }
</style>
