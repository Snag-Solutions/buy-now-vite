export type NetworkChainIdf =
    | 'mainnet'
    | 'goerli'
    | 'optimism'
    | 'optimismGoerli'
    | 'polygon'
    | 'polygonMumbai'
    | 'bsc'
    | 'bscTestnet'
    | 'arbitrum'
    | 'arbitrumGoerli'
    | 'avalanche'
    | 'avalancheFuji'
    | 'fantom'
    | 'fantomTestnet';

type ChainIdByNetwork = {
    [key in NetworkChainIdf]: number;
};

export const ChainIdByNetwork = {
    mainnet: 1 as const,
    goerli: 5 as const,
    optimism: 10 as const,
    optimismGoerli: 420 as const,
    polygon: 137 as const,
    polygonMumbai: 80001 as const,
    bsc: 56 as const,
    bscTestnet: 97 as const,
    arbitrum: 42161 as const,
    arbitrumGoerli: 421613 as const,
    avalanche: 43114 as const,
    fantom: 250 as const,
    fantomTestnet: 4002 as const,
    avalancheFuji: 43113 as const,
};

export const ChainNameByNetwork: { [key in NetworkChainIdf]: string } = {
    mainnet: 'Ethereum Mainnet',
    goerli: 'Ethereum Goerli',
    optimism: 'Optimism',
    optimismGoerli: 'Optimism Goerli',
    polygon: 'Polygon Mainnet',
    polygonMumbai: 'Polygon Mumbai Testnet',
    bsc: 'Binance Smart Chain',
    bscTestnet: 'Binance Smart Chain Testnet',
    arbitrum: 'Arbitrum',
    arbitrumGoerli: 'Arbitrum Goerli',
    avalanche: 'Avalanche',
    avalancheFuji: 'Avalanche Fuji Testnet',
    fantom: 'Fantom',
    fantomTestnet: 'Fantom Testnet',
};

export type NetworkChain = {
    id: number;
    name: string;
    network: NetworkChainIdf;
    icon: string;
    coloredIcon?: string;
};

export const GoerliTestnetChain: NetworkChain = {
    id: ChainIdByNetwork.goerli,
    name: ChainNameByNetwork.goerli,
    network: 'goerli',
    icon: '/eth.svg',
};

export const OptimismChain: NetworkChain = {
    id: ChainIdByNetwork.optimism,
    name: ChainNameByNetwork.optimism,
    network: 'optimism',
    icon: '/eth.svg',
};

export const OptimismGoerliChain: NetworkChain = {
    id: ChainIdByNetwork.optimismGoerli,
    name: ChainNameByNetwork.optimismGoerli,
    network: 'optimismGoerli',
    icon: '/eth.svg',
};

export const EthereumMainnetChain: NetworkChain = {
    id: ChainIdByNetwork.mainnet,
    name: ChainNameByNetwork.mainnet,
    network: 'mainnet',
    icon: '/eth.svg',
};

export const PolygonChain: NetworkChain = {
    id: ChainIdByNetwork.polygon,
    name: ChainNameByNetwork.polygon,
    network: 'polygon',
    icon: '/icons/polygon.svg',
    coloredIcon: '/icons/polygon-colored.svg',
};

export const PolygonMumbaiChain: NetworkChain = {
    id: ChainIdByNetwork.polygonMumbai,
    name: ChainNameByNetwork.polygonMumbai,
    network: 'polygonMumbai',
    icon: '/icons/polygon.svg',
    coloredIcon: '/icons/polygon-colored.svg',
};

export const BinanceChain: NetworkChain = {
    id: ChainIdByNetwork.bsc,
    name: ChainNameByNetwork.bsc,
    network: 'bsc',
    icon: '/icons/binance.svg',
    coloredIcon: '/icons/binance-colored.svg',
};

export const ArbitumChain: NetworkChain = {
    id: ChainIdByNetwork.arbitrum,
    name: ChainNameByNetwork.arbitrum,
    network: 'arbitrum',
    icon: '/icons/arbitrum.svg',
};

export const AvalancheChain: NetworkChain = {
    id: ChainIdByNetwork.avalanche,
    name: ChainNameByNetwork.avalanche,
    network: 'avalanche',
    icon: '/icons/avalanche.svg',
    coloredIcon: '/icons/avalanche-colored.svg',
};

export const AllNetworkChains = [
    GoerliTestnetChain,
    EthereumMainnetChain,
    PolygonChain,
    PolygonMumbaiChain,
    BinanceChain,
    ArbitumChain,
    AvalancheChain,
    OptimismChain,
    OptimismGoerliChain,
];
