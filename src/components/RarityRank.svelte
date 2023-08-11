<script lang="ts">
    export let rarityRank: number | null;
</script>

{#if !rarityRank}
    <span class="text-xs text-primary-text md:text-sm">-</span>
{:else}
    <div
        class="flex w-fit items-center rounded-md border border-separator border-solid bg-secondary px-2 py-[0.155rem] font-semibold text-primary-text"
    >
        <span class="mr-[6px] text-xs leading-none md:text-sm">
            {rarityRank}
        </span>
        <svg
            class="h-3 w-3 md:h-4 md:w-4"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_2350_15270)">
                <path
                    d="M15.2396 6.92601C14.501 6.33986 14.1243 5.43067 14.2322 4.49371C14.3027 3.88082 14.093 3.27916 13.6569 2.84314C13.2206 2.4069 12.619 2.19722 12.0062 2.26783C11.069 2.37555 10.1601 1.99914 9.57399 1.26047C9.19058 0.777156 8.6169 0.5 8.00005 0.5C7.38315 0.5 6.80948 0.777156 6.42601 1.26042C5.83986 1.99903 4.931 2.37555 3.99393 2.26789C3.38104 2.19711 2.77937 2.4069 2.34319 2.84308C1.90695 3.27916 1.69727 3.88082 1.76778 4.49382C1.87566 5.43062 1.49908 6.33981 0.760254 6.92607C0.277156 7.30953 0 7.88321 0 8.5C0 9.1168 0.277102 9.69047 0.760363 10.074C1.49908 10.6602 1.87566 11.5694 1.76778 12.5063C1.69727 13.1192 1.90695 13.7209 2.34308 14.1569C2.77937 14.5932 3.38147 14.8029 3.99376 14.7322C4.93067 14.6244 5.83986 15.0009 6.42601 15.7396C6.80942 16.2228 7.3831 16.5001 8.00005 16.5001C8.6169 16.5001 9.19058 16.2229 9.57404 15.7396C10.1602 15.001 11.0691 14.6246 12.0061 14.7322C12.6191 14.8026 13.2207 14.5932 13.6569 14.157C14.0931 13.7209 14.3028 13.1192 14.2323 12.5063C14.1244 11.5694 14.501 10.6602 15.2398 10.074C15.7229 9.69053 16.0001 9.11685 16.0001 8.5C16.0001 7.88315 15.7228 7.30953 15.2396 6.92601Z"
                    fill="#536DFE"
                />
                <g clip-path="url(#clip1_2350_15270)">
                    <path
                        d="M11.7657 6.95609L7.54534 11.1761C7.23282 11.4887 6.72586 11.4887 6.41305 11.1761L4.23448 8.9974C3.92184 8.68482 3.92184 8.1778 4.23448 7.86517C4.54718 7.55247 5.0541 7.55247 5.36666 7.86505L6.97936 9.47777L10.6333 5.82379C10.946 5.51109 11.453 5.51133 11.7656 5.82379C12.0781 6.13643 12.0781 6.64327 11.7657 6.95609Z"
                        fill="white"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_2350_15270">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                </clipPath>
                <clipPath id="clip1_2350_15270">
                    <rect width="8" height="8" fill="white" transform="translate(4 4.5)" />
                </clipPath>
            </defs>
        </svg>
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
