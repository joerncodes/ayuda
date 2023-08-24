<div align="center">
    <h1>¡Ayuda!</h1>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
  - [Contributors](#contributors)
  - [Built with](#built-with)
- [Installation](#installation)
- [Commands](#commands)
  - [`prettier`](#prettier)
  - [`eslint`](#eslint)
  - [`package`](#package)
    - [`increase-version`](#increase-version)

## About

¡Ayuda! is a CLI tool that helps you with common operations you typically encounter when working with Typescript or Node projects. See [**Commands**](#commands) for a list of possible commands.

### Contributors

| Image             | Name                     | E-Mail                            |
| ----------------- | ------------------------ | --------------------------------- |
| ![][joern-avatar] | [Jörn Meyer][joern-link] | [mail@joern.art]joern-link-email] |

### Built with

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Installation

This tool is best installed globally, for example by running:

`npm install -g ayuda`

## Commands

### `prettier`

The `prettier` command:

- adds the necessary dependencies for `prettier` to your `package.json`
- provides example `.prettierignore` and `.prettierrc` files
- adds a `prettier` script to your `package.json`'s `script` section

### `eslint`

- adds the necessary dependencies for `eslint` to your `package.json`
- provides example `.eslintrc.json` file
- adds a `eslint:fix` script to your `package.json`'s `script` section

### `package`

Provides the following subcommands:

#### `increase-version`

Increases your `package.json`'s version number by asking you what type of change you with to public (major, minor, patch...) and increasing your `semver` accordingly.

[joern-avatar]: https://joern.url.lol/avatar-100-round
[joern-link]: https://joern.url.lol/🧑‍💻
[joern-link-email]: mailto:mail@joern.art
