import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { serve } from "@hono/node-server";
import { db } from "../db";

const app = new Hono();

app.use('*', cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type'],
}))

app.get("/get", async (c) => {
    const result = await db.execute("select 1");
    return c.json(result)
});

serve({
    fetch: app.fetch,
    port: 3000,
});

console.log("✅ Hono server running at http://localhost:3000");