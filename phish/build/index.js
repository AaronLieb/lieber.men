"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("./db");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/../public/phishing.html'));
});
app.get('/api/leaderboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, db_1.query)("SELECT Links.createdBy as user, count(Clicks.userName) numClicks FROM Clicks INNER JOIN Links ON Links.name = Clicks.linkName GROUP BY Links.createdBy ORDER BY count(Clicks.userName) DESC;", []).catch((e) => { });
    res.json(data);
}));
app.post('/generate_url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    body.url = encodeURIComponent(body.url);
    yield (0, db_1.query)("INSERT INTO Users (name) VALUES (?);", [body.name]).catch((e) => { });
    yield (0, db_1.query)("INSERT INTO Links (name, createdBy) VALUES (?, ?);", [body.url, body.name]).catch((e) => {
        res.status(400).send("Link already exists");
    });
    if (res.headersSent)
        return;
    res.json({
        url: `aaron.lieber.men/sus/${body.url}`
    });
}));
app.get('/sus/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.pass && req.cookies.pass === process.env.PHISHING_PASSWORD) {
        yield (0, db_1.query)("INSERT INTO Clicks (userName, linkName) VALUES ('Aaron', ?);", [req.params.id]);
    }
    res.sendFile(path_1.default.join(__dirname + '/../public/youJustGotPhished.html'));
}));
app.use(express_1.default.static('public', { extensions: ['html'] }));
const httpServer = http_1.default.createServer(app);
httpServer.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
