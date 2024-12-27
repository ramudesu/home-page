# ShirokumaPower HomePage Sample

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18.3.1-blue.svg?style=flat" alt="react" title="React" />
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn-latest-black.svg?style=flat" alt="shadcn" title="Shadcn" />
</p>

## Table of Contents

- [System requirements](#system-requirements)
- [Production && Domains](#production-and-domains)
- [Setup and Configuration](#setup-and-configuration)
- [Possible encounter errors](#possible-encounter-errors)

## System requirements

<a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node-18.x.x-green.svg?style=flat" alt="node" title="Node" />
<a href="https://bun.sh/"><img src="https://img.shields.io/badge/Bun-1.1.x-white.svg?style=flat" alt="bun" title="Bun" />

## Production && Domains

- To access the sample, go to: `http://localhost:5173`

If you can't access the domain, you can:

1. Check if there are any other projects that use the same domain
2. Check the package.json file, make sure to use the specified port in this command (if exists): `"build": "tsc -b && vite build"`

## Setup and Configuration

If you want to use **make** command, make sure to download the make package first:

After cloning the project, run the following command:

1. **Install the packages**: `bun install` or `bun i` or `make devinstall`.
2. **Start the development environment**: `make devrun` or `bun run dev`.
