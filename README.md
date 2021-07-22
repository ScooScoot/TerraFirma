# TerraFirma

## What it does
TerraFirma is a cross-play proxy for Terraria, allowing players using the PC edition to connect to a mobile edition server.

## Installation
```
npm install terrafirma
```

## Usage
```
terrafirma -l bindAddressAndPort -d destinationAddressAndPort
```
For example:
```
terrafirma -l 0.0.0.0:1234 -d 127.0.0.1:7777
```
will allow PC clients to join the mobile server running on port 7777 by connecting to port 1234.

Alternatively you can just run:
```
terrafirma
```
Which will start the program in the same way as running:
```
terrafirma -l 0.0.0.0:7778 -d 127.0.0.1:7777
```

## Problems
-Pressure plates do not work

## ToDo
-Add an API