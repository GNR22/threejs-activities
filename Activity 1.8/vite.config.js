const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
     root: '.',  
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },

    build: {
    outDir: 'dist',   // inside the root folder
    emptyOutDir: true,
    sourcemap: true
    }
}
