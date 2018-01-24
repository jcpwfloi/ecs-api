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

## Usage

```javascript
var ECS = require('alicloud-ecs-api');
var client = new ECS();

client.request{
  // Actions here
}).then((body) => {
  JSON.parse(body);
});
```
