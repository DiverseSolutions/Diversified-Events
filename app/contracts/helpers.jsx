import { ethers } from "ethers";

async function getContractEssentials() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  await ethereum.request({ method: "eth_requestAccounts" });

  return { provider, signer };
}

function parse(amount, decimal) {
  return ethers.utils.parseUnits(amount.toString(), decimal);
}

function parse18(amount) {
  return ethers.utils.parseUnits(amount.toString(), 18);
}

function format(amount, decimal) {
  return ethers.utils.formatUnits(amount.toString(), decimal);
}

function format18(amount) {
  return ethers.utils.formatUnits(amount.toString(), 18);
}

export { parse, parse18, format, format18, getContractEssentials };
