# NEAR Protocol wallet powered by [micro-agi](https://github.com/microchipgnu/micro-agi)

This project is an example of a NEAR autonomous agent, leveraging the capabilities of [micro-agi](https://github.com/microchipgnu/micro-agi), a framework for building artificial intelligent teams and agents.



⭐️ Give [micro-agi](https://github.com/microchipgnu/micro-agi) a star.

![](/assets/banner.png)

---

## Features

- Autonomous interaction with the NEAR blockchain.
- Intelligent decision-making capabilities using [micro-agi](https://github.com/microchipgnu/micro-agi)

## Quick Start

To get started with this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/microchipgnu/near-autonomous-wallet.git
cd near-autonomous-wallet
bun install
bun run start
```

## Prerequisites

- [Bun](https://bun.sh/) 
- [Ollama](https://ollama.ai/)
    - Install [Ollama](https://ollama.ai/) and [OpenHermes](https://ollama.com/library/openhermes)
- A [NEAR account](https://wallet.near.org)

## Environment Variables

```
OPENAI_API_BASE=http://127.0.0.1:11434/v1
OPENAI_API_KEY=ollama-no-need-api-key

NEAR_ACCOUNT_ID=
NEAR_ACCOUNT_FULL_ACCESS_KEY=
```

---

This example is based on the [micro-agi starter](https://github.com/microchipgnu/micro-agi-starter). 