import RNFS from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import * as Sentry from '@sentry/react-native';

/**
 * Converts OGG audio file to WAV format for playback on Android
 * Downloads remote OGG file, converts using FFmpeg, returns local WAV path
 *
 * @param oggUrl - Remote URL of OGG audio file
 * @returns Promise with local WAV file path or Error
 */
export const convertOggToWav = async (oggUrl: string): Promise<string | Error> => {
  const tempOggPath = `${RNFS.CachesDirectoryPath}/temp.ogg`;
  const fileName = `converted_${Date.now()}.wav`;
  const outputPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

  try {
    // Download the OGG file and wait for completion
    const downloadResult = await RNFS.downloadFile({ fromUrl: oggUrl, toFile: tempOggPath })
      .promise;

    // Verify download was successful
    if (downloadResult.statusCode !== 200) {
      Sentry.captureException(
        new Error(`Download failed with status ${downloadResult.statusCode}`),
      );
      throw new Error(`Download failed with status ${downloadResult.statusCode}`);
    }

    // Verify file exists before conversion
    const fileExists = await RNFS.exists(tempOggPath);
    if (!fileExists) {
      throw new Error('Downloaded file not found');
    }

    // Convert OGG to WAV using FFmpeg
    // -i: input file
    // -vn: disable video (audio only)
    // -y: overwrite output file if exists
    // -ar 44100: audio sample rate 44.1kHz
    // -ac 2: stereo audio (2 channels)
    // -c:a pcm_s16le: PCM signed 16-bit little-endian codec
    await FFmpegKit.execute(
      `-i "${tempOggPath}" -vn -y -ar 44100 -ac 2 -c:a pcm_s16le "${outputPath}"`,
    );

    // Clean up the temporary OGG file
    if (await RNFS.exists(tempOggPath)) {
      await RNFS.unlink(tempOggPath);
    }

    // Verify output file exists
    const outputExists = await RNFS.exists(outputPath);
    if (!outputExists) {
      throw new Error('Conversion failed - output file not found');
    }

    return `file://${outputPath}`;
  } catch (error) {
    Sentry.captureException(error);
    return error as Error;
  }
};

/**
 * Converts AAC audio file to WAV format for playback on Android
 * Used for recorded audio messages from AudioRecorder component
 *
 * @param inputPath - Local path to AAC audio file
 * @returns Promise with local WAV file path
 */
export const convertAacToWav = async (inputPath: string): Promise<string> => {
  try {
    const fileName = `converted_${Date.now()}.wav`;
    const outputPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

    // Convert AAC to WAV using FFmpeg with same settings as OGG conversion
    await FFmpegKit.execute(
      `-i "${inputPath}" -vn -y -ar 44100 -ac 2 -c:a pcm_s16le "${outputPath}"`,
    );

    const outputExists = await RNFS.exists(outputPath);
    if (!outputExists) {
      throw new Error('Conversion failed - output file not found');
    }

    return outputPath; // Return without file:// prefix for consistency with iOS
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};
