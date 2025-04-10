import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Assuming users from Vancouver campus
const UBC_GRADES_API_BASE = "https://ubcgrades.com/api/v3";
const USER_AGENT = "mcp/1.0.0"

// Create server instance
const server = new McpServer({
  name: "mcp-ubc-advising",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

export interface UBCGradesCourseSummaryResponse {
    average?: number;
    average_past_5_yrs?: number;
    campus?: string;
    course?: string;
    course_title?: string;
    detail?: string;
    faculty_title?: string;
    max_course_avg?: number;
    min_course_avg?: number;
    subject?: string;
    subject_title?: string;
  }
  
  

async function makeUBCGradesRequest<T>(url: string): Promise<T | null> {
    const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error) {
        console.error("Error making UBCGrades request: ", error);
        return null;
    }
}

server.tool(
    "get-subject-course-ubc-grades",
    "Get grades for a particular subject and course at UBC",
    {
        subject: z.string().length(4).describe("Four letter subject code (e.g. CPSC, MATH, DSCI, WRDS)"),
        course: z.string().refine((val) => val.length === 3 || val.length === 4).describe("Three or four character course code (e.g. 100, 110, 121, 210, 311, 436N)"),
    },
    async ({ subject, course }) => {
        const subjectCode = subject.toUpperCase();
        const courseCode = course.toUpperCase();
        
        const url = `${UBC_GRADES_API_BASE}/course-statistics/${subjectCode}/${courseCode}`;
        const data = await makeUBCGradesRequest<UBCGradesCourseSummaryResponse[]>(url);

        if (!data) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve data, data may not exist!",
                    },
                ],
            };
        }

        if (data.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: `No data for ${subjectCode} ${courseCode}`,
                    },
                ],
            };
        }

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data)
                }
            ]
        };
    }
)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server running on stdio");
  }
  
main().catch((error) => {
    console.error("Fatal error in main():", error);
});