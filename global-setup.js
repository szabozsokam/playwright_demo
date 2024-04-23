// @ts-check
import defineConfig from "./playwright.config"

async function globalSetup(defineConfig){
    // insert here login process
    // env variables can be declared here (format: process.env.VARNAME)
    // use env vars inside test(), e.g.: 
        //     const { FOO, BAR } = process.env;
        //     expect(FOO).toEqual('some data');
}

export default globalSetup;