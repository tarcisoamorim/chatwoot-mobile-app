// Type definitions for platform-specific audio converter
// Implementations are in audioConverter.android.ts and audioConverter.ios.ts

export function convertOggToWav(oggUrl: string): Promise<string | Error>;
export function convertAacToWav(inputPath: string): Promise<string>;
