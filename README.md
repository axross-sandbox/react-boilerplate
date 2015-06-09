# React Boilerplate

React Boilerplateは、Single Page Applicationの開発に適したFront-end Templateです。このBoilerplateはReact.jsを中核として構成されており、スケールすることを前提に作られています。

## Features

- Scalable, Robust, Testable
- ES6に対応
- プロダクション向けのいくつかのnpm packagesを含んでいます。新しいPackageの追加も簡単にできます。
    - [axross/bemmer](https://github.com/axross/bemmer)
    - [petkaantonov/bluebird](https://github.com/petkaantonov/bluebird)
    - [ftlabs/fastclick](https://github.com/ftlabs/fastclick)
    - [matthew-andrews/isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
    - [moment/moment](https://github.com/moment/moment/)
    - [facebook/react](https://github.com/facebook/react)
    - [rackt/react-router](https://github.com/rackt/react-router)
    - [spoike/reflux](https://github.com/spoike/refluxjs)
    - [jonathantneal/sanitize.css](https://github.com/jonathantneal/sanitize.css)
- テストの準備ができています。
- 含まれているnpm packageはバージョン管理がしやすい形に構成されています。
- マシンへの依存が少ないよう構成されています。

## Requirement

- >= Node.js v0.12.2

## Quick start

### Installation

```
npm i
```

必要なPackageはすべて`package.json`に記載されています。`npm i`により、それに沿ってPackageがインストールされます。

### Tasks

すべてのタスクはgulpで管理されています。ですが、gulpのグローバルインストールは不要です。

#### Building

```
$ npm run build
```

JavaScriptファイルとlessファイルをトランスパイルし、`public/`以下に配置します。`NODE_ENV=production npm run build`とすることで、プロダクション向けにトランスパイルされます。その場合、すべてのSourcemapが除かれ、JavaScriptとCSSはUglify/Minifyされます。

#### Watching and building

```
$ npm run watch
```

JavaScriptファイルとlessファイルの監視を開始するとともに、フロントエンドサーバーを起動します。ソースファイルが更新される度にビルドされ、フロントエンドサーバーが配信するJavaScriptファイルとCSSファイルは最新であることが保たれます。

#### Testing

```
$ npm test
```

JavaScriptのユニットテストを行います。

#### Watching and building

```
$ npm run tdd
```

JavaScriptファイルの監視を開始し、ソースファイルが更新される度にテストします。
