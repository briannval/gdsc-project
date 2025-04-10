import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Assuming users from Vancouver campus
const NWS_API_BASE = "https://ubcgrades.com/api/v3/grades/UBCV";

// Create server instance
const server = new McpServer({
  name: "mcp-ubc-advising",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});