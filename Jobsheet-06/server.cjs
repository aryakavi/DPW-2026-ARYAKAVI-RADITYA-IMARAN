const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = __dirname;
const port = Number(process.argv[2] || 8000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error("Port harus bilangan bulat 1–65535. Contoh: node server.cjs 8001");
    process.exit(1);
}

const mime = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/plain; charset=utf-8"
};

const server = http.createServer(async function (req, res) {
    if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405, { Allow: "GET, HEAD" });
        res.end("Method tidak didukung.");
        return;
    }

    try {
        const url = new URL(req.url, "http://127.0.0.1");
        let pathname = decodeURIComponent(url.pathname);
        if (pathname.includes("\0")) {
            res.writeHead(400);
            res.end("URL tidak valid.");
            return;
        }
        if (pathname.endsWith("/")) pathname += "index.html";
        const filePath = path.resolve(root, "." + pathname);
        const relative = path.relative(root, filePath);
        if (relative === ".." || relative.startsWith(".." + path.sep) || path.isAbsolute(relative)) {
            res.writeHead(403);
            res.end("Akses di luar folder bab ditolak.");
            return;
        }
        const content = await fs.readFile(filePath);
        res.writeHead(200, {
            "Content-Type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream",
            "Cache-Control": "no-store"
        });
        res.end(req.method === "HEAD" ? undefined : content);
    } catch (err) {
        const status = err instanceof URIError ? 400 : ["ENOENT", "ENOTDIR", "EISDIR"].includes(err.code) ? 404 : 500;
        res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(status === 404 ? "File tidak ditemukan." : "Permintaan gagal diproses.");
    }
});

server.on("error", function (err) {
    console.error(err.code === "EADDRINUSE"
        ? "Port sudah dipakai. Coba: node server.cjs 8001"
        : "Server gagal: " + err.message);
    process.exitCode = 1;
});

server.listen(port, "127.0.0.1", function () {
    console.log("Jobsheet 6: http://127.0.0.1:" + port + "/index.html");
    console.log("Root: " + root + " — hentikan dengan Ctrl+C.");
});
