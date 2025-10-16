export default {
  root: "src",
  publicDir: "../public",
  base: "./", // <– das ist entscheidend!
  build: {
    outDir: "../../www",
    emptyOutDir: true,
  },
  server: {
    // Port 5173 wird verwendet, aber die Anfragen werden umgeleitet
    proxy: {
      // Wenn das Frontend 'http://localhost:5173/api/barcode' aufruft...
      "/api": {
        // ...leite die Anfrage an dieses Ziel weiter:
        target: "http://192.168.2.130",
        // Der 'origin' Header der Anfrage wird auf den Ziel-URL gesetzt (wichtig für einige Backends)
        changeOrigin: true,
        // Optional: Umschreiben des Pfades (entfernt /api vom Anfang der URL, falls nötig)
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
};
