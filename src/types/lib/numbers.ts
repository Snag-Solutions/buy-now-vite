import type { Price } from '../types/generic';

export const { format: formatDollar } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function formatNumber(amount: number | null | undefined, maximumFractionDigits: number = 2) {
    const { format } = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: maximumFractionDigits,
    });
    if (!amount && amount !== 0) {
        return '-';
    }
    return format(amount);
}

/**
 *  Convert ETH values to human readable formats
 * @param amount An ETH amount
 * @param maximumFractionDigits Number of decimal digits
 * @returns returns the ETH value as a `string` or `-` if the amount is `null` or `undefined`
 */

export function formatAmount(amount: string | null | undefined, maximumFractionDigits: number) {
    if (typeof amount === 'undefined' || amount === null) return '-';

    // if the amount is greater than 1000 use compact notation with short
    // compact display in the Intl.NumberFormat options, this will cause
    // browsers to show 1,000 as 1K, 1,000,000 as 1M, etc... but had the
    // undesired property of rounding small numbers like 1.4345 to the
    // hundredths place in Safari browser
    const options =
        +amount >= 1000
            ? {
                  maximumFractionDigits,
                  notation: 'compact' as const,
                  compactDisplay: 'short' as const,
              }
            : {
                  maximumFractionDigits,
              };

    return new Intl.NumberFormat('en-US', options).format(+amount);
}

export function priceToDecimal(price?: Price) {
    return +(price?.amount?.raw ?? 0) / Math.pow(10, price?.currency?.decimals || 0);
}

// 10.2 with 3 decimals => "10200"
export function decimalToRaw(decimal: number, exponent: number) {
    return (decimal * Math.pow(10, exponent)).toString();
}

export function formatDollarsFromEth(amount: number | null, ethToUsd: number | null) {
    if (!amount || !ethToUsd) return null;

    return formatDollar(ethToUsd * amount);
}
