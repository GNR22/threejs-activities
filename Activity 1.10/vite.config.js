const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default {
    root: '.',        // index.html is in root
    base: './',       // relative paths for Vercel deployment
    server: {
        host: true,
        open: !isCodeSandbox
    },
    build: {
        outDir: 'dist',    // Vercel deploys dist
        emptyOutDir: true,
        sourcemap: true
    }
};
