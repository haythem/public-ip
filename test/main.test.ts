import * as core from '@actions/core';
import { HttpClient } from '@actions/http-client';

import { run } from '../src/main';

describe('Public IP', () => {

  beforeAll(() => {
    jest.mock('@actions/http-client');
    jest.spyOn(core, 'info');
    jest.spyOn(core, 'getInput').mockReturnValue('6');
    jest.spyOn(core, 'setFailed');
    jest.spyOn(core, 'setOutput');
  });

  afterEach(() => jest.resetAllMocks());

  test('Return public ip address', async () => {
    HttpClient.prototype.getJson = jest.fn()
      .mockResolvedValue({ statusCode: 200, result: { ip: '1.2.3.4' } });

    await run();

    expect(HttpClient.prototype.getJson).toHaveBeenCalled();
    expect(core.getInput).toHaveBeenCalledWith('maxRetries');
    expect(core.getInput).toHaveReturnedWith('6');
    expect(core.setOutput).toHaveBeenCalledTimes(2);
    expect(core.setOutput).toHaveBeenCalledWith('ipv4', '1.2.3.4');
    expect(core.setOutput).toHaveBeenCalledWith('ipv6', '1.2.3.4');
  });

  test('Fail when ipify does not respond', async () => {
    HttpClient.prototype.getJson = jest.fn()
      .mockRejectedValue({ statusCode: 500 });

    await run();

    expect(HttpClient.prototype.getJson).toHaveBeenCalled();
    expect(core.setFailed).toHaveBeenCalled();
  });
});
