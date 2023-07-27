import type { paths } from '@reservoir0x/reservoir-sdk';

export enum BuyListingState {
    Created = 'bl_created',
    Submitted = 'bl_submitted',
    Completed = 'bl_completed',
    Success = 'bl_success',
}

export type CurrencySymbol = 'ETH' | 'WETH';

export type Currency = {
    contract: string;
    name: string;
    symbol: CurrencySymbol;
    decimals: number;
    imageSource?: string;
    erc20ToUsd?: number;
};

export type Price = {
    currency: Currency;
    amount: {
        raw: string;
        decimal: number;
        usd: number;
        native: number;
    };
};

export type Token = {
    tokenId: string;
    collectionId: string;
    image: string | null;
    name: string;
    isFlagged?: boolean;
    kind: string | null;
    ownerAddress: string | null;
    ownerOnSaleCount?: number;
    price: Price | null;
    rarityRank: number | null;
    reservoirListing?: {
        orderId?: string | null;
        source: string | null;
        sourceLink: string | null;
        price: Price;
        sourceIcon?: string | null;
        duration?: {
            // this isn't populated on all endpoints.
            startTimeInSeconds: number;
            endTimeInSeconds: number | null;
        } | null;
    } | null;
    media?: string;
    amountInOwnership?: number;
    description?: string;
    topTraitFloor?: number;
};

export const convertReservoirToken = (
    tokens: paths['/tokens/v6']['get']['responses']['200']['schema']['tokens'],
): Token | null => {
    const token = tokens?.length === 1 ? tokens[0] : null;

    if (!token) {
        return null;
    }

    let reservoirListing = null;
    const tokenId = token?.token?.tokenId || '';
    const price = token.market?.floorAsk?.price as any;
    if (price) {
        reservoirListing = {
            source: token.market?.floorAsk?.source?.name as string,
            sourceLink: token.market?.floorAsk?.source?.url as string,
            sourceIcon: token.market?.floorAsk?.source?.icon as string,
            price,
        };
    }

    return {
        collectionId: token.token?.collection?.id?.toLowerCase() ?? '',
        tokenId: tokenId,
        kind: token.token?.kind ?? null,
        name: token?.token?.name ?? `Token #${tokenId}`,
        ownerAddress: token?.token?.owner ?? null,
        image: token?.token?.image ?? null,
        price: reservoirListing?.price ?? null,
        reservoirListing: reservoirListing,
        rarityRank: token?.token?.rarityRank || null,
        media: token?.token?.media,
        isFlagged: token?.token?.isFlagged,
        description: token?.token?.description,
    };
};
