#!/usr/bin/env node
import TerrariumServer from "./lib/Server";
import CliParser from "./lib/CliParser";

(async function () {
	let args = process.argv;
	args.shift();
	args.shift();

	let parser = new CliParser(args);

	let [destinationAddress, destinationPort] = parser.get("-d")?.split(":") || [
		"127.0.0.1",
		"7777",
	];
	let [listenAddress, listenPort] = parser.get("-l")?.split(":") || [
		"0.0.0.0",
		"7778",
	];

	let server = new TerrariumServer();
	console.log("Starting TerraFirma.");
	await server.start(
		parseInt(destinationPort),
		destinationAddress,
		parseInt(listenPort),
		listenAddress
	);
	console.log(`TerraFirma ready on ${listenAddress}:${listenPort}`);
	server.on("connection", (client) => {
		console.log(`${client.remoteAddress}:${client.remotePort} connected.`);
		client.on("close", () => {
			console.log(`${client.remoteAddress}${client.remotePort} disconnected.`);
		});
	});
})();
