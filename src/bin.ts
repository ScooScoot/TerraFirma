#!/usr/bin/env node
import TerrariumServer from "./lib/Server";

(async function () {
	let args = process.argv;
	args.shift();
	args.shift();

	let [destinationAddress, destinationPort] = args[0]
		? args[0].split(":")
		: ["127.0.0.1", "7777"];
	let [listenAddress, listenPort] = args[1]
		? args[1].split(":")
		: ["0.0.0.0", "7778"];

	let server = new TerrariumServer();
	console.log("Starting Terrarium.");
	await server.start(
		parseInt(destinationPort),
		destinationAddress,
		parseInt(listenPort),
		listenAddress
	);
	console.log("Terrarium ready");
	server.on("connection", (client) => {
		console.log(`${client.remoteAddress}:${client.remotePort} connected.`);
		client.on("close", () => {
			console.log(`${client.remoteAddress}${client.remotePort} disconnected.`);
		});
	});
})();
