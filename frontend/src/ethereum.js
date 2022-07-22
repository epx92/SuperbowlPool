import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import SuperBowlPool from './contracts/SuperBowlPool.json';
// Alert library to show cool alerts based on errors
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure();
const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' })
      const networkId = await provider.request({ method: 'net_version' })
      // if (networkId !== '56') {
      //   toast.error("Please connect to the Binance Smart Chain to use our dApp!")
      // }
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const superbowl = new Contract(
        SuperBowlPool.networks['97'].address,
        SuperBowlPool.abi,
        signer);
      resolve({superbowl});
      return;

    }
    reject("install metamask");
  });

export default getBlockchain;


