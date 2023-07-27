<script lang="ts">
    export let disabled = false;
    export let onClick: (() => void) | undefined = undefined;
    export let className: string = '';
    export let isPrimary = false;
    export let type: 'button' | 'link' = 'button';
    export let href = '';

    const classNameToUse = [
        'pill-button',
        isPrimary ? 'primary-pill-button' : 'secondary-pill-button',
        'cursor-pointer whitespace-nowrap rounded-full border border-solid font-semibold outline-none transition disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 h-fit',
        isPrimary ? 'bg-primary hover:bg-primary-hover' : 'bg-secondary hover:bg-secondary-hover',
        isPrimary ? 'border-transparent' : 'border-separator',
        isPrimary ? 'text-over-text disabled:text-over-text' : 'text-primary-text',
        className,
    ].join(' ');
</script>

{#if type === 'button'}
    <button on:click={onClick} type="button" class={classNameToUse} {disabled}>
        <slot />
    </button>
{:else}
    <a on:click={onClick} class={classNameToUse} target="_blank" rel="noreferrer" {href}>
        <slot /></a
    >
{/if}
