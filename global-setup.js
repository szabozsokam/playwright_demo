// @ts-check
import defineConfig from "./playwright.config"

async function globalSetup(defineConfig){
    // insert here login process
    // env variables (format: process.env.VARNAME) can be declared here
    // env vars are available inside test(), eg: 
        //     const { FOO, BAR } = process.env;
        //     expect(FOO).toEqual('some data');
}

export default globalSetup;