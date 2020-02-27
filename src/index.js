const ethers = require("ethers");
const fs = require("fs");

const url = process.env.URL || "http://localhost:8545";
const out = process.env.OUT || "eth_syncing.csv";

console.log({ url, out });

const provider = new ethers.providers.JsonRpcProvider(url);

async function recordEthSyncing() {
  const data = await provider.send("eth_syncing", []);
  // { currentBlock: '0x91e9b7',
  //    highestBlock: '0x91ea25',
  //    knownStates: '0xd95f03f',
  //    pulledStates: '0xd95bd32',
  //    startingBlock: '0x0' }
  const line = [
    Date.now(),
    data ? parseInt(data.currentBlock, 16) : 0,
    data ? parseInt(data.highestBlock, 16) : 0,
    data ? parseInt(data.knownStates, 16) : 0,
    data ? parseInt(data.pulledStates, 16) : 0,
    data ? parseInt(data.startingBlock, 16) : 0
  ].join(",");

  if (!fs.existsSync(out)) {
    fs.writeFileSync(
      out,
      [
        "timestamp",
        "currentBlock",
        "highestBlock",
        "knownStates",
        "pulledStates",
        "startingBlock"
      ].join(",")
    );
  }

  const fileData = fs.readFileSync(out, "utf8");
  fs.writeFileSync(out, fileData + "\n" + line);
}

(async function() {
  while (true) {
    try {
      recordEthSyncing().catch(console.error);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(e);
    }
  }
})();
