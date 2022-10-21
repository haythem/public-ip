# Public IP

> Queries the GitHub actions runner's public IP address using [ipify](https://www.ipify.org/)

### Motivation
GitHub actions shared runners are hosted in **Azure** (Windows & Linux) and **Mac Stadium** for macOS, so whitelisting all these infrastructures can be difficult and needs to be updated every once in a while.

[GitHub Help](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners)

This action allows you to whitelist the runner's address and remove it once the pipeline finishes.

## Usage

### Inputs

* `maxRetries` - How many retries on the ipify API before failing. Default: `5`

### Outputs

* `ipv4` - Public IPv4 of the runner
* `ipv6` - Public IPv6 of the runner. If not available the `ipv4` will be returned


### Example workflow

```yaml
name: Public IP

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Public IP
      id: ip
      uses: haythem/public-ip@v1.3

    - name: Print Public IP
      run: |
        echo ${{ steps.ip.outputs.ipv4 }}
        echo ${{ steps.ip.outputs.ipv6 }}
```

## Contributing
We would love for you to contribute to `haythem/public-ip`, pull requests are welcome !

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
