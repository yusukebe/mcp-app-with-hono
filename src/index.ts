import { Hono } from 'hono'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/server'
import { mcpServer } from './mcp-server'

const app = new Hono()

const transport = new WebStandardStreamableHTTPServerTransport()

app.all('/mcp', async (c) => {
  if (!mcpServer.isConnected()) {
    await mcpServer.connect(transport)
  }
  return transport.handleRequest(c.req.raw)
})

export default app
