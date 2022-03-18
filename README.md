# Online Ticket System Frontend

Frontend for Online Ticket System

## Configuration

Following configurations are available on `/src/environments/environment.*.ts`

1. `baseApiUrl`: The base api url for backend APIs

## Running locally

Run following

```
npm i
ng serve -o
```

For IE

```
ng serve -c=es5
```

## Build

```
npm run build:prod
```

## Running unit tests

Run the test as below

```
npm run test:cov
```

This will generate coverage at `./coverage`

## Deployment

Run following

```bash
npm i
npm run build:prod
```
