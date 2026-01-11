import { IpWhoisResponse, IpWhoisError, IpWhoisOptions } from "./types";

const BASE_URL = "https://ipwhois.app/json";

/**
 * Fetches IP geolocation information from ipwhois.app API
 *
 * @param options - Optional configuration
 * @returns Promise resolving to IP geolocation data
 * @throws Error if the API request fails or returns an error
 *
 * @example
 * ```typescript
 * // Get info for current IP
 * const info = await ipwhois();
 *
 * // Get info for specific IP
 * const info = await ipwhois({ ip: '8.8.8.8' });
 * ```
 */
export async function ipwhois(
  options?: IpWhoisOptions
): Promise<IpWhoisResponse> {
  const { ip, timeout = 10000 } = options || {};

  // Build URL
  const url = ip ? `${BASE_URL}/${ip}` : BASE_URL;

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Make request using native fetch (available in Node 20+)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "ipwhois-node-module/1.0.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON response
    const data = (await response.json()) as IpWhoisResponse | IpWhoisError;

    // Check if the API returned an error
    if ("success" in data && data.success === false) {
      throw new Error(
        (data as IpWhoisError).message || "API returned an error"
      );
    }

    return data as IpWhoisResponse;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
}

/**
 * Fetches IP geolocation information for a specific IP address
 *
 * @param ip - IP address to lookup
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving to IP geolocation data
 *
 * @example
 * ```typescript
 * const info = await getIpInfo('8.8.8.8');
 * console.log(info.country); // "United States"
 * ```
 */
export async function getIpInfo(
  ip: string,
  timeout?: number
): Promise<IpWhoisResponse> {
  return ipwhois({ ip, timeout });
}

/**
 * Fetches IP geolocation information for the caller's IP address
 *
 * @param timeout - Optional timeout in milliseconds
 * @returns Promise resolving to IP geolocation data
 *
 * @example
 * ```typescript
 * const info = await getMyIpInfo();
 * console.log(info.ip); // Your IP address
 * ```
 */
export async function getMyIpInfo(timeout?: number): Promise<IpWhoisResponse> {
  return ipwhois({ timeout });
}

// Export types
export type { IpWhoisResponse, IpWhoisError, IpWhoisOptions } from "./types";

// Default export
export default ipwhois;
