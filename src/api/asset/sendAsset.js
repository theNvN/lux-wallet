import { signAndSendTx } from 'api/utils/tx';
import { useMutation } from 'react-query';
import web3 from 'scripts/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { areEqualAddresses } from 'utils/web3';

const sendAsset = async params => {
  const { accountAddress, from, to, amount } = params;

  const amountWei = web3.utils.toWei(`${amount}`, 'ether');
  const txData = {
    from,
    to,
    value: amountWei,
    gas: 30000,
  };

  // Assuming, for now, LYX is either transferred from account address or
  // related universal profile address.
  if (!areEqualAddresses(from, accountAddress)) {
    // Send from universal profile
    const up = new web3.eth.Contract(UniversalProfile.abi, from);
    const kmAddress = await up.methods.owner().call();
    const km = new web3.eth.Contract(KeyManager.abi, kmAddress);
    const payload = up.methods.execute(0, to, amountWei, '0x').encodeABI();
    const data = km.methods.execute(payload).encodeABI();
    txData.data = data;
    txData.gas = 300_000;
  }

  const data = await signAndSendTx(txData, accountAddress);

  return data;
};

export const useSendAsset = () => {
  return useMutation(params => sendAsset(params), {
    onSuccess: () => {},
  });
};