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
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-10"
            style={`max-width: ${maxWidth};`}
        >
            <div
                class="sticky top-0 z-20 flex h-[60px] font-semibold items-center justify-between border-b border-separator border-solid px-4 py-[22px] sm:h-20 sm:px-8 sm:py-6 sm:text-2xl box-border border-solid font-custom"
            >
                <slot name="header" />
            </div>

            <div class="flex-grow overflow-y-auto px-4 py-6 text-primary-text sm:p-8 box-border border-0 border-solid border-separator font-custom">
                <slot name="body" />
            </div>

            {#if $$slots.footer}
                <div
                    class="footer sm:h[81px] sticky bottom-0 flex h-[73px] w-full flex-row items-center justify-between gap-4 border-t p-4 sm:h-20 sm:justify-end sm:px-8 sm:py-[20px] box-border border-0 border-solid border-separator font-custom"
                >
                    <slot name="footer" />
                </div>
            {/if}
        </div>
    </div>
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
