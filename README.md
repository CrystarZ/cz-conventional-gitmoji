# cz-conventional-gitmoji

> Conventional commits with gitmojis

## Install

```bash
# clone this repository
git clone https://github.com/CrystarZ/cz-conventional-gitmoji.git

cd cz-conventional-gitmoji

# install
npm install
npm -g install .
```

- Globally

  ```bash
  echo '{ "path": "cz-conventional-gitmoji" }' > ~/.czrc
  ```

- Locally

  Add this to your `package.json`:

  ```json
  "config": {
    "commitizen": {
      "path": "cz-conventional-gitmoji"
    }
  }
  ```

## Usage

```sh
git cz
```
