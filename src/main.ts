import * as core from '@actions/core';
import { HttpClient } from '@actions/http-client';

/**
 * Action bootstrapper.
 *
 * @export
 */
export async function run(): Promise<void> {
  const maxRetries = parseInt(core.getInput('maxRetries'), 10);

  const http = new HttpClient('scotgovcbad/public-ip', undefined, { allowRetries: true, maxRetries: maxRetries });

  try {
    const ipv4 = await http.getJson<IPResponse>('https://api.ipify.org?format=json');
    //const ipv6 = await http.getJson<IPResponse>('https://api6.ipify.org?format=json');

    core.setOutput('ipv4', ipv4.result.ip);
    //core.setOutput('ipv6', ipv6.result.ip);

    core.info(`ipv4: ${ipv4.result.ip}`);
    //core.info(`ipv6: ${ipv6.result.ip}`);
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
