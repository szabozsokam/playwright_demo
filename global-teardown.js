// @ts-check
import defineConfig from "./playwright.config"

async function globalTeardown( defineConfig ) {
    // insert here action after all test run finished
};

export default globalTeardown;