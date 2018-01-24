# Aliyun ECS API

## Installation

### Yarn

```bash
yarn install
```

### NPM

```bash
npm install
```

## Configuration

```bash
mv config.json.sample config.json
```

## Usage

```javascript
var ECS = require('@alicloud/ecs');
var client = new ECS();

client.request{
  // Actions here
}).then((body) => {
  JSON.parse(body);
});
```
