/**
 * Response from the ipwhois.app API
 */
export interface IpWhoisResponse {
  About_Us: string;
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  country_flag: string;
  country_capital: string;
  country_phone: string;
  country_neighbours: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  asn: string;
  org: string;
  isp: string;
  timezone: string;
  timezone_name: string;
  timezone_dstOffset: number;
  timezone_gmtOffset: number;
  timezone_gmt: string;
  currency: string;
  currency_code: string;
  currency_symbol: string;
  currency_rates: number;
  currency_plural: string;
}

/**
 * Error response when the API request fails
 */
export interface IpWhoisError {
  success: false;
  message: string;
}

/**
 * Options for the ipwhois function
 */
export interface IpWhoisOptions {
  /**
   * IP address to lookup. If not provided, returns info for the caller's IP
   */
  ip?: string;
  /**
   * Request timeout in milliseconds (default: 10000)
   */
  timeout?: number;
}
