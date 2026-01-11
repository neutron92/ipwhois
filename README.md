# IPWhois Node Module

A lightweight Node.js module for fetching IP geolocation information using the [ipwhois.app](https://ipwhois.app) API.

## Features

- 🚀 Simple and easy to use
- 📦 Zero dependencies (uses native Node.js fetch)
- 🔒 TypeScript support with full type definitions
- ⚡ Works with Node.js 20+
- 🌍 Get geolocation info for any IP or your current IP
- ⏱️ Configurable timeout support

## Installation

```bash
npm install
npm run build
```

## Usage

### JavaScript (CommonJS)

```javascript
const { ipwhois, getIpInfo, getMyIpInfo } = require("ipwhois");

// Get info for your current IP
async function example1() {
  const info = await getMyIpInfo();
  console.log(info);
}

// Get info for a specific IP
async function example2() {
  const info = await getIpInfo("8.8.8.8");
  console.log(info.country); // "United States"
  console.log(info.city); // "Mountain View"
}

// Using the main function with options
async function example3() {
  const info = await ipwhois({
    ip: "1.1.1.1",
    timeout: 5000,
  });
  console.log(info);
}
```

### TypeScript

```typescript
import { ipwhois, getIpInfo, getMyIpInfo, IpWhoisResponse } from "ipwhois";

// Get info for your current IP
const myInfo: IpWhoisResponse = await getMyIpInfo();

// Get info for a specific IP
const googleDns: IpWhoisResponse = await getIpInfo("8.8.8.8");

// With options
const info: IpWhoisResponse = await ipwhois({
  ip: "1.1.1.1",
  timeout: 10000,
});
```

## API

### `ipwhois(options?)`

Main function to fetch IP geolocation information.

**Parameters:**

- `options` (optional): Configuration object
  - `ip` (string, optional): IP address to lookup. If not provided, returns info for your current IP
  - `timeout` (number, optional): Request timeout in milliseconds (default: 10000)

**Returns:** `Promise<IpWhoisResponse>`

### `getIpInfo(ip, timeout?)`

Convenience function to fetch info for a specific IP address.

**Parameters:**

- `ip` (string): IP address to lookup
- `timeout` (number, optional): Request timeout in milliseconds

**Returns:** `Promise<IpWhoisResponse>`

### `getMyIpInfo(timeout?)`

Convenience function to fetch info for your current IP address.

**Parameters:**

- `timeout` (number, optional): Request timeout in milliseconds

**Returns:** `Promise<IpWhoisResponse>`

## Response Format

```typescript
{
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
```

## Example Response

```json
{
  "About_Us": "https://ipwhois.io",
  "ip": "8.8.8.8",
  "success": true,
  "type": "IPv4",
  "continent": "North America",
  "continent_code": "NA",
  "country": "United States",
  "country_code": "US",
  "country_flag": "https://cdn.ipwhois.io/flags/us.svg",
  "country_capital": "Washington",
  "country_phone": "+1",
  "country_neighbours": "CA,MX",
  "region": "California",
  "city": "Mountain View",
  "latitude": 37.405992,
  "longitude": -122.078515,
  "asn": "AS15169",
  "org": "Google LLC",
  "isp": "Google LLC",
  "timezone": "America/Los_Angeles",
  "timezone_name": "PST",
  "timezone_dstOffset": 3600,
  "timezone_gmtOffset": -28800,
  "timezone_gmt": "-08:00",
  "currency": "US Dollar",
  "currency_code": "USD",
  "currency_symbol": "$",
  "currency_rates": 1,
  "currency_plural": "US dollars"
}
```

## Error Handling

```javascript
try {
  const info = await getIpInfo("8.8.8.8");
  console.log(info);
} catch (error) {
  console.error("Error:", error.message);
}
```

## Running Tests

```bash
npm test
```

## Requirements

- Node.js 22 or higher (for native fetch support)

## License

MIT

## Credits

This module uses the [ipwhois.app](https://ipwhois.app) API.
