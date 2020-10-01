import * as core from '@actions/core';
import { HttpClient } from '@actions/http-client';

/**
 * Action bootstrapper.
 *
 * @export
 */
export async function run(): Promise<void> {
  const maxRetries = parseInt(core.getInput('maxRetries'), 10);

  const http = new HttpClient('haythem/public-ip', undefined, { allowRetries: true, maxRetries: maxRetries });

  try {
    const ip = await http.getJson<IPResponse>('https://api64.ipify.org?format=json');

    core.setOutput('ip', ip.result.ip);
    // Kept for backward compatibility
    core.setOutput('ipv4', ip.result.ip);
    core.setOutput('ipv6', ip.result.ip);

    core.info(`ip: ${ip.result.ip}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

/**
 * IPify Response.
 *
 * @see https://www.ipify.org/
 */
interface IPResponse {
  ip: string;
}

run();
