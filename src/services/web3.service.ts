/**
 * Module dependencies.
 */

import { Subscription } from "web3-core-subscriptions";
import { BlockHeader } from "web3-eth";
import Web3 from 'web3';
import { TransactionService } from "./transaction.service";
import { Logger } from "../config";

/**
 * Constants.
 */

const DEFAULT_SUBTRACT_NUM_OF_BLOCKS = 5760; // 24 hours worth of blocks assuming 15s block times.
const ABI = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}] as any[];
const contractAddress = process.env.DAI_CONTRACT_ADDRESS;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_NODE_ENDPOINT));
const web3ws = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_NODE_WS_ENDPOINT));

const getLast24hBlocks = async () => {
  const fromBlock = web3.utils.toHex(await web3.eth.getBlockNumber() - DEFAULT_SUBTRACT_NUM_OF_BLOCKS); 
  const contract = new web3.eth.Contract(ABI, contractAddress);

  const filterOptions = {
    fromBlock,
    toBlock: 'latest',
    filter: {
      to: contractAddress
    }
  }
  
  const events = await contract.getPastEvents('Transfer', filterOptions);
  
  if (events) {
    for (const event of events) {
      try {
        await getBlock(event.blockNumber);
      } catch (error) {
        Logger.error('Occur an error getting new blocks...');
      }
    }
  }  
}

const subscribe = async () => {
  const subscription = await web3ws.eth.subscribe('newBlockHeaders', async (err, res) => {
    if (err) {
      Logger.error('Occur an error on websocket subscription...');
    }
    await watchBlocks(subscription);
  })
}

const watchBlocks = async (subscription: Subscription<BlockHeader>) => {
  Logger.info('Check new blocks...');
  await subscription.on('data', (block) => {
    setTimeout(async () => {
      try {
        await getBlock(block.number);
      } catch (error) {
        Logger.error('Occur an error getting new blocks...');
      }
    }, 30000)
  })
}

const getBlock = async (blockNumber: number) => {
  const block = await web3.eth.getBlock(blockNumber, true);
  if (block) {
    const transactions = block.transactions.filter((tx) => tx.to === contractAddress || tx.from === contractAddress);
    if (transactions.length > 0) {
      for (const transaction of transactions) {
        const [balanceFrom, balanceTo] = await Promise.all([
          await web3.eth.getBalance(transaction.from),
          await web3.eth.getBalance(transaction.to)
        ])

        const transactionMapper = {
          ...transaction,
          balanceAddressFrom: await web3.utils.fromWei(balanceFrom, 'ether'),
          balanceAddressTo: await web3.utils.fromWei(balanceTo, 'ether')
        }
        Logger.info('The transaction was successfully added...')
        await TransactionService.createTransaction(transactionMapper);        
      }
    }
  }
}

/**
 * Export `Web3Service`.
 */

export const Web3Service = {
  getLast24hBlocks,
  subscribe
}