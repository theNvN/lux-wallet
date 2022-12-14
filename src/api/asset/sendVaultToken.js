import { useMutation } from 'react-query';
import { sendSignedTx } from 'api/utils/tx';
import web3 from 'lib/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import useSentTxStore from 'hooks/useSentTxStore';
import { logError } from 'utils/logger';
import { QueryKey, useInvalidateQuery } from 'api/utils/query';

/**
 * Send LSP7 Digital Asset (token) from vault address
 */
const sendVaultToken = async params => {
  const { accountAddress, upAddress, from, to, tokenAddress, amount, force } = params;
  const amountWei = web3.utils.toWei(`${amount}`, 'ether');

  // Expect `from` to be vault
  const vaultAddress = from;

  // Contracts
  const up = new web3.eth.Contract(UniversalProfile.abi, upAddress);
  const vault = new web3.eth.Contract(Vault.abi, vaultAddress);
  const token = new web3.eth.Contract(DigitalAsset.abi, tokenAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const tokenPayload = await token.methods
    .transfer(vaultAddress, to, amountWei, !!force, '0x')
    .encodeABI();
  const vaultPayload = await vault.methods.execute(0, tokenAddress, 0, tokenPayload).encodeABI();
  const upPayload = await up.methods.execute(0, vaultAddress, 0, vaultPayload).encodeABI();
  const txPayload = await km.methods.execute(upPayload).encodeABI();

  const txData = {
    from: accountAddress,
    to: kmAddress,
    data: txPayload,
    gas: 600_000,
  };

  const data = await sendSignedTx(txData, accountAddress);
  return data;
};

export const useSendVaultToken = ({ accountAddress }) => {
  const { invalidateQueries } = useInvalidateQuery();
  const { storeSentTx } = useSentTxStore({ accountAddress });
  return useMutation(params => sendVaultToken(params), {
    onSuccess: tx => {
      storeSentTx(tx);
      invalidateQueries([QueryKey.ASSET_DATA]);
    },
    onError: logError,
  });
};
