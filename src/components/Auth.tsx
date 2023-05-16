"use client"

import { useState, useEffect, useRef } from "react";
import SocialLogin from "@biconomy/web3-auth/dist/src/SocialLogin";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { ethers } from "ethers";

function Auth() {

    const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
    const [interval, enableInterval] = useState<boolean>(false);
    const sdkRef = useRef<SocialLogin | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let configureLogin: any
        if (interval) {
            configureLogin = setInterval(() => {
                if (!!sdkRef.current?.provider) {
                    setupSmartAccount()
                    clearInterval(configureLogin)
                }
            }, 1000);
        }
    }, [interval]);

    async function login() {
        if (!sdkRef.current) {
            const socialLoginSDK = new SocialLogin()
            await socialLoginSDK.init({
                chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET)
            })
            sdkRef.current = socialLoginSDK
        }
        if (!sdkRef.current.provider) {
            sdkRef.current.showWallet()
            enableInterval(true)
        } else {
            setupSmartAccount()
        }
    };

    async function setupSmartAccount() {
        if (!sdkRef?.current?.provider) return
        setLoading(true)
        sdkRef.current.hideWallet()
        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )
        try {
            const smartAccount = new SmartAccount(web3Provider, {
                activeNetworkId: ChainId.POLYGON_MAINNET,
                supportedNetworksIds: [ChainId.POLYGON_MAINNET],
            });
            await smartAccount.init()
            setSmartAccount(smartAccount)
            setLoading(false)
        } catch (err) {
            console.log("error setting up smart account:", err);
        }
    };

    const logout = async () => {
        if (!sdkRef.current) {
            console.error("Web3Modal not initialized")
            return
        }
        await sdkRef.current.logout()
        sdkRef.current.hideWallet()
        setSmartAccount(null)
        enableInterval(false)
    }

    return (
        <div className="">
            <h1 className="">Web3 Auth</h1>
            <h2 className="">With Biconomy</h2>
            {
                !smartAccount && !loading && <button onClick={login}>Login</button>
            }
            {
                loading && <p>Loading Account details...</p>
            }
            {
                !!smartAccount && (
                    <div>
                        <h3>Account address:</h3>
                        <p>{smartAccount.address}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                )
            }
        </div>
    )
}

export default Auth