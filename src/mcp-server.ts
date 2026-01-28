import { McpServer } from '@modelcontextprotocol/server'
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server'
import html from '../dist/index.html'

export const mcpServer = new McpServer({
  name: 'simple-server',
  version: '0.0.1'
})

const resourceUri = 'ui://get-time'

registerAppTool(
  mcpServer,
  'get-time',
  {
    title: 'Get Time',
    description: 'Returns the current server time.',
    inputSchema: {},
    _meta: { ui: { resourceUri } }
  },
  async () => {
    const time = new Date().toISOString()
    return { content: [{ type: 'text', text: time }] }
  }
)

registerAppResource(mcpServer, resourceUri, resourceUri, { mimeType: RESOURCE_MIME_TYPE }, async () => {
  return {
    contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html }]
  }
})
