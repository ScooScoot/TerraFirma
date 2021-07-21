# TerraFirma

## What it does
TerraFirma is a cross-play proxy for Terraria, allowing players using the PC edition to connect to a mobile edition server.

## Installation
```
npm install terrafirma
```

## Usage
```
terrafirma listeningAddress:listeningPort destinationAddress:destinationPort
```
For example:
```
terrafirma 0.0.0.0:1234 localhost:7777
```

Alternatively you can just run
```
terrafirma
```
Which will start the program in the same way as running
```
terrafirma 0.0.0.0:7778 localhost:7777
```