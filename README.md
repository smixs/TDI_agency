# Task Master

### by [@eyaltoledano](https://x.com/eyaltoledano)

A task management system for AI-driven development with Claude, designed to work seamlessly with Cursor AI.

## Requirements

- Node.js 14.0.0 or higher
- Anthropic API key (Claude API)
- Anthropic SDK version 0.39.0 or higher
- OpenAI SDK (for Perplexity API integration, optional)

## Configuration

The script can be configured through environment variables in a `.env` file at the root of the project:

### Required Configuration

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude

### Optional Configuration

- `MODEL`: Specify which Claude model to use (default: "claude-3-7-sonnet-20250219")
- `MAX_TOKENS`: Maximum tokens for model responses (default: 4000)
- `TEMPERATURE`: Temperature for model responses (default: 0.7)
- `PERPLEXITY_API_KEY`: Your Perplexity API key for research-backed subtask generation
- `PERPLEXITY_MODEL`: Specify which Perplexity model to use (default: "sonar-medium-online")
- `DEBUG`: Enable debug logging (default: false)
- `LOG_LEVEL`: Log level - debug, info, warn, error (default: info)
- `DEFAULT_SUBTASKS`: Default number of subtasks when expanding (default: 3)
- `DEFAULT_PRIORITY`: Default priority for generated tasks (default: medium)
- `PROJECT_NAME`: Override default project name in tasks.json
- `PROJECT_VERSION`: Override default version in tasks.json

## Installation

```bash
# Install globally
npm install -g task-master-ai

# OR install locally within your project
npm install task-master-ai
```

### Initialize a new project

```bash
# If installed globally
task-master init

# If installed locally
npx task-master-init
```

This will prompt you for project details and set up a new project with the necessary files and structure.

### Important Notes

1. **ES Modules Configuration:**

   - This project uses ES Modules (ESM) instead of CommonJS.
   - This is set via `"type": "module"` in your package.json.
   - Use `import/export` syntax instead of `require()`.
   - Files should use `.js` or `.mjs` extensions.
   - To use a CommonJS module, either:
     - Rename it with `.cjs` extension
     - Use `await import()` for dynamic imports
   - If you need CommonJS throughout your project, remove `"type": "module"` from package.json, but Task Master scripts expect ESM.

2. The Anthropic SDK version should be 0.39.0 or higher.

## Quick Start with Global Commands

After installing the package globally, you can use these CLI commands from any directory:

```bash
# Initialize a new project
task-master init

# Parse a PRD and generate tasks
task-master parse-prd your-prd.txt

# List all tasks
task-master list

# Show the next task to work on
task-master next

# Generate task files
task-master generate
```

## Troubleshooting

### If `task-master init` doesn't respond:

Try running it with Node directly:

```bash
node node_modules/claude-task-master/scripts/init.js
```

Or clone the repository and run:

```bash
git clone https://github.com/eyaltoledano/claude-task-master.git
cd claude-task-master
node scripts/init.js
```

## Task Structure

Tasks in tasks.json have the following structure:

- `id`: Unique identifier for the task (Example: `1`)
- `title`: Brief, descriptive title of the task (Example: `"Initialize Repo"`)
- `description`: Concise description of what the task involves (Example: `"Create a new repository, set up initial structure."`)
- `status`: Current state of the task (Example: `"pending"`, `"done"`, `"deferred"`)
- `dependencies`: IDs of tasks that must be completed before this task (Example: `[1, 2]`)
  - Dependencies are displayed with status indicators (✅ for completed, ⏱️ for pending)
  - This helps quickly identify which prerequisite tasks are blocking work
- `priority`: Importance level of the task (Example: `"high"`, `"medium"`, `"low"`)
- `details`: In-depth implementation instructions (Example: `"Use GitHub client ID/secret, handle callback, set session token."`)
- `testStrategy`: Verification approach (Example: `"Deploy and call endpoint to confirm 'Hello World' response."`)
- `subtasks`: List of smaller, more specific tasks that make up the main task (Example: `[{"id": 1, "title": "Configure OAuth", ...}]`)

## Integrating with Cursor AI

Claude Task Master is designed to work seamlessly with [Cursor AI](https://www.cursor.so/), providing a structured workflow for AI-driven development.

### Setup with Cursor

1. After initializing your project, open it in Cursor
2. The `.cursor/rules/dev_workflow.mdc` file is automatically loaded by Cursor, providing the AI with knowledge about the task management system
3. Place your PRD document in the `scripts/` directory (e.g., `scripts/prd.txt`)
4. Open Cursor's AI chat and switch to Agent mode

### Setting up MCP in Cursor

To enable enhanced task management capabilities directly within Cursor using the Model Control Protocol (MCP):

1. Go to Cursor settings
2. Navigate to the MCP section
3. Click on "Add New MCP Server"
4. Configure with the following details:
   - Name: "Task Master"
   - Type: "Command"
   - Command: "npx -y task-master-mcp"
5. Save the settings

Once configured, you can interact with Task Master's task management commands directly through Cursor's interface, providing a more integrated experience.

### Initial Task Generation

In Cursor's AI chat, instruct the agent to generate tasks from your PRD:

```
Please use the task-master parse-prd command to generate tasks from my PRD. The PRD is located at scripts/prd.txt.
```

The agent will execute:

```bash
task-master parse-prd scripts/prd.txt
```

This will:

- Parse your PRD document
- Generate a structured `tasks.json` file with tasks, dependencies, priorities, and test strategies
- The agent will understand this process due to the Cursor rules

### Generate Individual Task Files

Next, ask the agent to generate individual task files:

```
Please generate individual task files from tasks.json
```

The agent will execute:

```bash
task-master generate
```

This creates individual task files in the `tasks/` directory (e.g., `task_001.txt`, `task_002.txt`), making it easier to reference specific tasks.

## AI-Driven Development Workflow

The Cursor agent is pre-configured (via the rules file) to follow this workflow:

### 1. Task Discovery and Selection

Ask the agent to list available tasks:

```
What tasks are available to work on next?
```

The agent will:

- Run `task-master list` to see all tasks
- Run `task-master next` to determine the next task to work on
- Analyze dependencies to determine which tasks are ready to be worked on
- Prioritize tasks based on priority level and ID order
- Suggest the next task(s) to implement

### 2. Task Implementation

When implementing a task, the agent will:

- Reference the task's details section for implementation specifics
- Consider dependencies on previous tasks
- Follow the project's coding standards
- Create appropriate tests based on the task's testStrategy

You can ask:

```
Let's implement task 3. What does it involve?
```

### 3. Task Verification

Before marking a task as complete, verify it according to:

- The task's specified testStrategy
- Any automated tests in the codebase
- Manual verification if required

### 4. Task Completion

When a task is completed, tell the agent:

```
Task 3 is now complete. Please update its status.
```

The agent will execute:

```bash
task-master set-status --id=3 --status=done
```

### 5. Handling Implementation Drift

If during implementation, you discover that:

- The current approach differs significantly from what was planned
- Future tasks need to be modified due to current implementation choices
- New dependencies or requirements have emerged

Tell the agent:

```
We've changed our approach. We're now using Express instead of Fastify. Please update all future tasks to reflect this change.
```

The agent will execute:

```bash
task-master update --from=4 --prompt="Now we are using Express instead of Fastify."
```

This will rewrite or re-scope subsequent tasks in tasks.json while preserving completed work.

### 6. Breaking Down Complex Tasks

For complex tasks that need more granularity:

```
Task 5 seems complex. Can you break it down into subtasks?
```

The agent will execute:

```bash
task-master expand --id=5 --num=3
```

You can provide additional context:

```
Please break down task 5 with a focus on security considerations.
```

The agent will execute:

```bash
task-master expand --id=5 --prompt="Focus on security aspects"
```

You can also expand all pending tasks:

```
Please break down all pending tasks into subtasks.
```

The agent will execute:

```bash
task-master expand --all
```

For research-backed subtask generation using Perplexity AI:

```
Please break down task 5 using research-backed generation.
```

The agent will execute:

```bash
task-master expand --id=5 --research
```

## Command Reference

Here's a comprehensive reference of all available commands:

### Parse PRD

```bash
# Parse a PRD file and generate tasks
task-master parse-prd <prd-file.txt>

# Limit the number of tasks generated
task-master parse-prd <prd-file.txt> --num-tasks=10
```

### List Tasks

```bash
# List all tasks
task-master list

# List tasks with a specific status
task-master list --status=<status>

# List tasks with subtasks
task-master list --with-subtasks

# List tasks with a specific status and include subtasks
task-master list --status=<status> --with-subtasks
```

### Show Next Task

```bash
# Show the next task to work on based on dependencies and status
task-master next
```

### Show Specific Task

```bash
# Show details of a specific task
task-master show <id>
# or
task-master show --id=<id>

# View a specific subtask (e.g., subtask 2 of task 1)
task-master show 1.2
```

### Update Tasks

```bash
# Update tasks from a specific ID and provide context
task-master update --from=<id> --prompt="<prompt>"
```

### Generate Task Files

```bash
# Generate individual task files from tasks.json
task-master generate
```

### Set Task Status

```bash
# Set status of a single task
task-master set-status --id=<id> --status=<status>

# Set status for multiple tasks
task-master set-status --id=1,2,3 --status=<status>

# Set status for subtasks
task-master set-status --id=1.1,1.2 --status=<status>
```

When marking a task as "done", all of its subtasks will automatically be marked as "done" as well.

### Expand Tasks

```bash
# Expand a specific task with subtasks
task-master expand --id=<id> --num=<number>

# Expand with additional context
task-master expand --id=<id> --prompt="<context>"

# Expand all pending tasks
task-master expand --all

# Force regeneration of subtasks for tasks that already have them
task-master expand --all --force

# Research-backed subtask generation for a specific task
task-master expand --id=<id> --research

# Research-backed generation for all tasks
task-master expand --all --research
```

### Clear Subtasks

```bash
# Clear subtasks from a specific task
task-master clear-subtasks --id=<id>

# Clear subtasks from multiple tasks
task-master clear-subtasks --id=1,2,3

# Clear subtasks from all tasks
task-master clear-subtasks --all
```

### Analyze Task Complexity

```bash
# Analyze complexity of all tasks
task-master analyze-complexity

# Save report to a custom location
task-master analyze-complexity --output=my-report.json

# Use a specific LLM model
task-master analyze-complexity --model=claude-3-opus-20240229

# Set a custom complexity threshold (1-10)
task-master analyze-complexity --threshold=6

# Use an alternative tasks file
task-master analyze-complexity --file=custom-tasks.json

# Use Perplexity AI for research-backed complexity analysis
task-master analyze-complexity --research
```

### View Complexity Report

```bash
# Display the task complexity analysis report
task-master complexity-report

# View a report at a custom location
task-master complexity-report --file=my-report.json
```

### Managing Task Dependencies

```bash
# Add a dependency to a task
task-master add-dependency --id=<id> --depends-on=<id>

# Remove a dependency from a task
task-master remove-dependency --id=<id> --depends-on=<id>

# Validate dependencies without fixing them
task-master validate-dependencies

# Find and fix invalid dependencies automatically
task-master fix-dependencies
```

### Add a New Task

```bash
# Add a new task using AI
task-master add-task --prompt="Description of the new task"

# Add a task with dependencies
task-master add-task --prompt="Description" --dependencies=1,2,3

# Add a task with priority
task-master add-task --prompt="Description" --priority=high
```

## Feature Details

### Analyzing Task Complexity

The `analyze-complexity` command:

- Analyzes each task using AI to assess its complexity on a scale of 1-10
- Recommends optimal number of subtasks based on configured DEFAULT_SUBTASKS
- Generates tailored prompts for expanding each task
- Creates a comprehensive JSON report with ready-to-use commands
- Saves the report to scripts/task-complexity-report.json by default

The generated report contains:

- Complexity analysis for each task (scored 1-10)
- Recommended number of subtasks based on complexity
- AI-generated expansion prompts customized for each task
- Ready-to-run expansion commands directly within each task analysis

### Viewing Complexity Report

The `complexity-report` command:

- Displays a formatted, easy-to-read version of the complexity analysis report
- Shows tasks organized by complexity score (highest to lowest)
- Provides complexity distribution statistics (low, medium, high)
- Highlights tasks recommended for expansion based on threshold score
- Includes ready-to-use expansion commands for each complex task
- If no report exists, offers to generate one on the spot

### Smart Task Expansion

The `expand` command automatically checks for and uses the complexity report:

When a complexity report exists:

- Tasks are automatically expanded using the recommended subtask count and prompts
- When expanding all tasks, they're processed in order of complexity (highest first)
- Research-backed generation is preserved from the complexity analysis
- You can still override recommendations with explicit command-line options

Example workflow:

```bash
# Generate the complexity analysis report with research capabilities
task-master analyze-complexity --research

# Review the report in a readable format
task-master complexity-report

# Expand tasks using the optimized recommendations
task-master expand --id=8
# or expand all tasks
task-master expand --all
```

### Finding the Next Task

The `next` command:

- Identifies tasks that are pending/in-progress and have all dependencies satisfied
- Prioritizes tasks by priority level, dependency count, and task ID
- Displays comprehensive information about the selected task:
  - Basic task details (ID, title, priority, dependencies)
  - Implementation details
  - Subtasks (if they exist)
- Provides contextual suggested actions:
  - Command to mark the task as in-progress
  - Command to mark the task as done
  - Commands for working with subtasks

### Viewing Specific Task Details

The `show` command:

- Displays comprehensive details about a specific task or subtask
- Shows task status, priority, dependencies, and detailed implementation notes
- For parent tasks, displays all subtasks and their status
- For subtasks, shows parent task relationship
- Provides contextual action suggestions based on the task's state
- Works with both regular tasks and subtasks (using the format taskId.subtaskId)

## Best Practices for AI-Driven Development

1. **Start with a detailed PRD**: The more detailed your PRD, the better the generated tasks will be.

2. **Review generated tasks**: After parsing the PRD, review the tasks to ensure they make sense and have appropriate dependencies.

3. **Analyze task complexity**: Use the complexity analysis feature to identify which tasks should be broken down further.

4. **Follow the dependency chain**: Always respect task dependencies - the Cursor agent will help with this.

5. **Update as you go**: If your implementation diverges from the plan, use the update command to keep future tasks aligned with your current approach.

6. **Break down complex tasks**: Use the expand command to break down complex tasks into manageable subtasks.

7. **Regenerate task files**: After any updates to tasks.json, regenerate the task files to keep them in sync.

8. **Communicate context to the agent**: When asking the Cursor agent to help with a task, provide context about what you're trying to achieve.

9. **Validate dependencies**: Periodically run the validate-dependencies command to check for invalid or circular dependencies.

## Example Cursor AI Interactions

### Starting a new project

```
I've just initialized a new project with Claude Task Master. I have a PRD at scripts/prd.txt.
Can you help me parse it and set up the initial tasks?
```

### Working on tasks

```
What's the next task I should work on? Please consider dependencies and priorities.
```

### Implementing a specific task

```
I'd like to implement task 4. Can you help me understand what needs to be done and how to approach it?
```

### Managing subtasks

```
I need to regenerate the subtasks for task 3 with a different approach. Can you help me clear and regenerate them?
```

### Handling changes

```
We've decided to use MongoDB instead of PostgreSQL. Can you update all future tasks to reflect this change?
```

### Completing work

```
I've finished implementing the authentication system described in task 2. All tests are passing.
Please mark it as complete and tell me what I should work on next.
```

### Analyzing complexity

```
Can you analyze the complexity of our tasks to help me understand which ones need to be broken down further?
```

### Viewing complexity report

```
Can you show me the complexity report in a more readable format?
```



```
TDI_agency
├─ .bolt
│  ├─ config.json
│  ├─ ignore
│  └─ prompt
├─ .cursor
│  ├─ mcp.json
│  └─ rules
│     ├─ cursor_rules.mdc
│     ├─ dev_workflow.mdc
│     ├─ self_improve.mdc
│     └─ taskmaster.mdc
├─ .cursorindexingignore
├─ .eslintrc.json
├─ .next
│  ├─ app-build-manifest.json
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ swc
│  │  │  └─ plugins
│  │  │     └─ v7_macos_aarch64_0.102.1
│  │  └─ webpack
│  │     ├─ client-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-development
│  │        ├─ 0.pack.gz
│  │        ├─ 1.pack.gz
│  │        ├─ index.pack.gz
│  │        └─ index.pack.gz.old
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server
│  │  ├─ app
│  │  │  ├─ page.js
│  │  │  └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  ├─ vendor-chunks
│  │  │  ├─ @radix-ui+primitive@1.1.2.js
│  │  │  ├─ @radix-ui+react-compose-refs@1.1.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-context@1.1.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-dialog@1.1.10_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-dismissable-layer@1.1.7_@types+react-dom@18.2.7_@types+react@18.2.22_re_9c2218fa26cd728fedbc3936242a964a.js
│  │  │  ├─ @radix-ui+react-focus-guards@1.1.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-focus-scope@1.1.4_@types+react-dom@18.2.7_@types+react@18.2.22_react-do_2b18e49073786ae933ffe024906a1345.js
│  │  │  ├─ @radix-ui+react-id@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-portal@1.1.6_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-presence@1.1.3_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-primitive@2.1.0_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-slot@1.2.0_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-callback-ref@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-controllable-state@1.2.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-effect-event@0.0.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-escape-keydown@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-layout-effect@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @swc+helpers@0.5.2.js
│  │  │  ├─ aria-hidden@1.2.4.js
│  │  │  ├─ class-variance-authority@0.7.1.js
│  │  │  ├─ clsx@2.1.1.js
│  │  │  ├─ detect-node-es@1.1.0.js
│  │  │  ├─ framer-motion@12.7.4_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ get-nonce@1.0.1.js
│  │  │  ├─ lucide-react@0.446.0_react@18.2.0.js
│  │  │  ├─ motion-dom@12.7.4.js
│  │  │  ├─ motion-utils@12.7.2.js
│  │  │  ├─ next@13.5.1_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ react-remove-scroll-bar@2.3.8_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ react-remove-scroll@2.6.3_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ react-style-singleton@2.2.3_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ tailwind-merge@2.6.0.js
│  │  │  ├─ tslib@2.8.1.js
│  │  │  ├─ use-callback-ref@1.3.3_@types+react@18.2.22_react@18.2.0.js
│  │  │  └─ use-sidecar@1.1.3_@types+react@18.2.22_react@18.2.0.js
│  │  └─ webpack-runtime.js
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ app
│  │  │  │  ├─ layout.js
│  │  │  │  └─ page.js
│  │  │  ├─ app-pages-internals.js
│  │  │  ├─ main-app.js
│  │  │  ├─ polyfills.js
│  │  │  └─ webpack.js
│  │  ├─ css
│  │  │  └─ app
│  │  │     └─ layout.css
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media
│  │  │  ├─ 26a46d62cd723877-s.woff2
│  │  │  ├─ 55c55f0601d81cf3-s.woff2
│  │  │  ├─ 581909926a08bbc8-s.woff2
│  │  │  ├─ 6d93bde91c0c2823-s.woff2
│  │  │  ├─ 97e0cb1ae144a2a9-s.woff2
│  │  │  ├─ a34f9d1faa5f3315-s.p.woff2
│  │  │  └─ df0a9ae256c0569c-s.woff2
│  │  └─ webpack
│  │     ├─ 24565e307e93fb67.webpack.hot-update.json
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ app
│  │     │  └─ layout.24565e307e93fb67.hot-update.js
│  │     └─ webpack.24565e307e93fb67.hot-update.js
│  ├─ trace
│  └─ types
│     ├─ app
│     │  ├─ layout.ts
│     │  └─ page.ts
│     └─ package.json
├─ .specstory
│  ├─ .what-is-this.md
│  └─ history
│     ├─ 2025-04-13_09-17-анализ-задач-с-помощью-mcp.md
│     └─ 2025-04-14_01-35-создание-адаптивного-футера-для-проекта.md
├─ .windsurfrules
├─ PRD
│  ├─ task_001.txt
│  ├─ task_002.txt
│  ├─ task_003.txt
│  ├─ task_004.txt
│  ├─ task_005.txt
│  ├─ task_006.txt
│  ├─ task_007.txt
│  ├─ task_008.txt
│  ├─ task_009.txt
│  └─ task_010.txt
├─ README.md
├─ app
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ privacy-policy
│  │  └─ page.tsx
│  └─ terms-of-service
│     └─ page.tsx
├─ components
│  ├─ about-tdi.tsx
│  ├─ animate-on-scroll.tsx
│  ├─ back-to-top.tsx
│  ├─ client-logos.tsx
│  ├─ contact-info.tsx
│  ├─ feature-card.tsx
│  ├─ footer.tsx
│  ├─ header.tsx
│  ├─ hero-section.tsx
│  ├─ market-challenge.tsx
│  ├─ results-section.tsx
│  ├─ service-card.tsx
│  ├─ services-grid.tsx
│  ├─ services-section.tsx
│  └─ ui
│     ├─ accordion.tsx
│     ├─ alert-dialog.tsx
│     ├─ alert.tsx
│     ├─ aspect-ratio.tsx
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ breadcrumb.tsx
│     ├─ button.tsx
│     ├─ calendar.tsx
│     ├─ card.tsx
│     ├─ carousel.tsx
│     ├─ chart.tsx
│     ├─ checkbox.tsx
│     ├─ collapsible.tsx
│     ├─ command.tsx
│     ├─ context-menu.tsx
│     ├─ dialog.tsx
│     ├─ drawer.tsx
│     ├─ dropdown-menu.tsx
│     ├─ form.tsx
│     ├─ hover-card.tsx
│     ├─ input-otp.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ menubar.tsx
│     ├─ navigation-menu.tsx
│     ├─ pagination.tsx
│     ├─ popover.tsx
│     ├─ progress.tsx
│     ├─ radio-group.tsx
│     ├─ resizable.tsx
│     ├─ scroll-area.tsx
│     ├─ select.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ skeleton.tsx
│     ├─ slider.tsx
│     ├─ sonner.tsx
│     ├─ switch.tsx
│     ├─ table.tsx
│     ├─ tabs.tsx
│     ├─ textarea.tsx
│     ├─ toast.tsx
│     ├─ toaster.tsx
│     ├─ toggle-group.tsx
│     ├─ toggle.tsx
│     └─ tooltip.tsx
├─ components.json
├─ hooks
│  └─ use-toast.ts
├─ lib
│  └─ utils.ts
├─ next.config.cjs
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.cjs
├─ prd.md
├─ public
│  └─ images
│     ├─ hero-pattern.svg
│     └─ tdi-logo.svg
├─ scripts
│  ├─ README.md
│  ├─ dev.js
│  ├─ example_prd.txt
│  └─ task-complexity-report.json
├─ tailwind.config.ts
├─ tasks
│  ├─ task_001.txt
│  ├─ task_002.txt
│  ├─ task_003.txt
│  ├─ task_004.txt
│  ├─ task_005.txt
│  ├─ task_006.txt
│  ├─ task_007.txt
│  ├─ task_008.txt
│  ├─ task_009.txt
│  └─ task_010.txt
└─ tsconfig.json

```
```
TDI_agency
├─ .bolt
│  ├─ config.json
│  ├─ ignore
│  └─ prompt
├─ .cursor
│  ├─ mcp.json
│  └─ rules
│     ├─ cursor_rules.mdc
│     ├─ dev_workflow.mdc
│     ├─ self_improve.mdc
│     └─ taskmaster.mdc
├─ .cursorindexingignore
├─ .eslintrc.json
├─ .next
│  ├─ app-build-manifest.json
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ swc
│  │  │  └─ plugins
│  │  │     └─ v7_macos_aarch64_0.102.1
│  │  └─ webpack
│  │     ├─ client-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 10.pack.gz
│  │     │  ├─ 11.pack.gz
│  │     │  ├─ 12.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ 9.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ client-development-fallback
│  │     │  ├─ 0.pack.gz
│  │     │  └─ index.pack.gz
│  │     └─ server-development
│  │        ├─ 0.pack.gz
│  │        ├─ 1.pack.gz
│  │        ├─ 10.pack.gz
│  │        ├─ 11.pack.gz
│  │        ├─ 12.pack.gz
│  │        ├─ 2.pack.gz
│  │        ├─ 3.pack.gz
│  │        ├─ 4.pack.gz
│  │        ├─ 5.pack.gz
│  │        ├─ 6.pack.gz
│  │        ├─ 7.pack.gz
│  │        ├─ 8.pack.gz
│  │        ├─ 9.pack.gz
│  │        ├─ index.pack.gz
│  │        └─ index.pack.gz.old
│  ├─ fallback-build-manifest.json
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server
│  │  ├─ _error.js
│  │  ├─ _ssr_components_ui_pixel-canvas_tsx.js
│  │  ├─ app
│  │  │  ├─ _not-found_client-reference-manifest.js
│  │  │  ├─ not-found.js
│  │  │  ├─ not-found_client-reference-manifest.js
│  │  │  ├─ page.js
│  │  │  └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ _app.js
│  │  │  ├─ _document.js
│  │  │  └─ _error.js
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  ├─ vendor-chunks
│  │  │  ├─ @radix-ui+primitive@1.1.2.js
│  │  │  ├─ @radix-ui+react-compose-refs@1.1.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-context@1.1.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-dialog@1.1.10_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-dismissable-layer@1.1.7_@types+react-dom@18.2.7_@types+react@18.2.22_re_9c2218fa26cd728fedbc3936242a964a.js
│  │  │  ├─ @radix-ui+react-focus-guards@1.1.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-focus-scope@1.1.4_@types+react-dom@18.2.7_@types+react@18.2.22_react-do_2b18e49073786ae933ffe024906a1345.js
│  │  │  ├─ @radix-ui+react-id@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-portal@1.1.6_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-presence@1.1.3_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-primitive@2.1.0_@types+react-dom@18.2.7_@types+react@18.2.22_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ @radix-ui+react-slot@1.2.0_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-callback-ref@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-controllable-state@1.2.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-effect-event@0.0.2_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-escape-keydown@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @radix-ui+react-use-layout-effect@1.1.1_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ @swc+helpers@0.5.2.js
│  │  │  ├─ aria-hidden@1.2.4.js
│  │  │  ├─ class-variance-authority@0.7.1.js
│  │  │  ├─ clsx@2.1.1.js
│  │  │  ├─ detect-node-es@1.1.0.js
│  │  │  ├─ framer-motion@12.7.4_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ get-nonce@1.0.1.js
│  │  │  ├─ lucide-react@0.446.0_react@18.2.0.js
│  │  │  ├─ motion-dom@12.7.4.js
│  │  │  ├─ motion-utils@12.7.2.js
│  │  │  ├─ next@13.5.1_react-dom@18.2.0_react@18.2.0__react@18.2.0.js
│  │  │  ├─ react-remove-scroll-bar@2.3.8_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ react-remove-scroll@2.6.3_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ react-style-singleton@2.2.3_@types+react@18.2.22_react@18.2.0.js
│  │  │  ├─ tailwind-merge@2.6.0.js
│  │  │  ├─ tslib@2.8.1.js
│  │  │  ├─ use-callback-ref@1.3.3_@types+react@18.2.22_react@18.2.0.js
│  │  │  └─ use-sidecar@1.1.3_@types+react@18.2.22_react@18.2.0.js
│  │  └─ webpack-runtime.js
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ _app-pages-browser_components_ui_pixel-canvas_tsx.js
│  │  │  ├─ _error.js
│  │  │  ├─ app
│  │  │  │  ├─ layout.js
│  │  │  │  ├─ not-found.js
│  │  │  │  └─ page.js
│  │  │  ├─ app-pages-internals.js
│  │  │  ├─ fallback
│  │  │  │  ├─ amp.js
│  │  │  │  ├─ main.js
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ _app.js
│  │  │  │  │  └─ _error.js
│  │  │  │  ├─ react-refresh.js
│  │  │  │  └─ webpack.js
│  │  │  ├─ main-app.js
│  │  │  ├─ main.js
│  │  │  ├─ pages
│  │  │  │  ├─ _app.js
│  │  │  │  └─ _error.js
│  │  │  ├─ polyfills.js
│  │  │  ├─ react-refresh.js
│  │  │  └─ webpack.js
│  │  ├─ css
│  │  │  └─ app
│  │  │     └─ layout.css
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media
│  │  │  ├─ 26a46d62cd723877-s.woff2
│  │  │  ├─ 55c55f0601d81cf3-s.woff2
│  │  │  ├─ 581909926a08bbc8-s.woff2
│  │  │  ├─ 6d93bde91c0c2823-s.woff2
│  │  │  ├─ 97e0cb1ae144a2a9-s.woff2
│  │  │  ├─ a34f9d1faa5f3315-s.p.woff2
│  │  │  └─ df0a9ae256c0569c-s.woff2
│  │  └─ webpack
│  │     ├─ 084b0545f5550429.webpack.hot-update.json
│  │     ├─ 0a7650fd3aded61d.webpack.hot-update.json
│  │     ├─ 168e9ab149abeeb4.webpack.hot-update.json
│  │     ├─ 2e62eb862bde1af7.webpack.hot-update.json
│  │     ├─ 3606c55c1a0be7d8.webpack.hot-update.json
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ 7017f576eaa6800e.webpack.hot-update.json
│  │     ├─ 7579b88e9af66e86.webpack.hot-update.json
│  │     ├─ 8f067d15fb89298b.webpack.hot-update.json
│  │     ├─ _app-pages-browser_components_ui_pixel-canvas_tsx.3606c55c1a0be7d8.hot-update.js
│  │     ├─ a87f8f18451f9fe0.webpack.hot-update.json
│  │     ├─ app
│  │     │  ├─ layout.084b0545f5550429.hot-update.js
│  │     │  ├─ layout.0a7650fd3aded61d.hot-update.js
│  │     │  ├─ layout.168e9ab149abeeb4.hot-update.js
│  │     │  ├─ layout.2e62eb862bde1af7.hot-update.js
│  │     │  ├─ layout.3606c55c1a0be7d8.hot-update.js
│  │     │  ├─ layout.7017f576eaa6800e.hot-update.js
│  │     │  ├─ layout.7579b88e9af66e86.hot-update.js
│  │     │  ├─ layout.a87f8f18451f9fe0.hot-update.js
│  │     │  ├─ layout.c3b81223a56faaf2.hot-update.js
│  │     │  ├─ layout.c7fbe99f316b09a9.hot-update.js
│  │     │  ├─ layout.ca6c62cc74a1dbfa.hot-update.js
│  │     │  └─ page.3606c55c1a0be7d8.hot-update.js
│  │     ├─ c3b81223a56faaf2.webpack.hot-update.json
│  │     ├─ c7fbe99f316b09a9.webpack.hot-update.json
│  │     ├─ ca6c62cc74a1dbfa.webpack.hot-update.json
│  │     ├─ de66e70f9251a3ad.webpack.hot-update.json
│  │     ├─ webpack.084b0545f5550429.hot-update.js
│  │     ├─ webpack.0a7650fd3aded61d.hot-update.js
│  │     ├─ webpack.168e9ab149abeeb4.hot-update.js
│  │     ├─ webpack.2e62eb862bde1af7.hot-update.js
│  │     ├─ webpack.3606c55c1a0be7d8.hot-update.js
│  │     ├─ webpack.7017f576eaa6800e.hot-update.js
│  │     ├─ webpack.7579b88e9af66e86.hot-update.js
│  │     ├─ webpack.8f067d15fb89298b.hot-update.js
│  │     ├─ webpack.a87f8f18451f9fe0.hot-update.js
│  │     ├─ webpack.c3b81223a56faaf2.hot-update.js
│  │     ├─ webpack.c7fbe99f316b09a9.hot-update.js
│  │     ├─ webpack.ca6c62cc74a1dbfa.hot-update.js
│  │     └─ webpack.de66e70f9251a3ad.hot-update.js
│  ├─ trace
│  └─ types
│     ├─ app
│     │  ├─ layout.ts
│     │  └─ page.ts
│     └─ package.json
├─ .specstory
│  ├─ .what-is-this.md
│  └─ history
│     ├─ 2025-04-13_09-17-анализ-задач-с-помощью-mcp.md
│     ├─ 2025-04-14_01-35-создание-адаптивного-футера-для-проекта.md
│     ├─ 2025-04-19_07-31-обзор-задач-и-план-действий-по-проекту.md
│     ├─ 2025-04-19_08-21-обновление-цветовой-палитры-для-tdi-group.md
│     ├─ 2025-04-20_03-49-implementing-dynamic-hero-section-with-animation.md
│     ├─ 2025-04-20_04-23-оптимизация-дизайна-сайта-с-акцентными-элементами.md
│     └─ 2025-04-20_04-50-интеграция-анимации-пикселей-в-servicecard.md
├─ .windsurfrules
├─ PRD
│  ├─ task_001.txt
│  ├─ task_002.txt
│  ├─ task_003.txt
│  ├─ task_004.txt
│  ├─ task_005.txt
│  ├─ task_006.txt
│  ├─ task_007.txt
│  ├─ task_008.txt
│  ├─ task_009.txt
│  └─ task_010.txt
├─ README.md
├─ app
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ privacy-policy
│  │  └─ page.tsx
│  └─ terms-of-service
│     └─ page.tsx
├─ components
│  ├─ about-tdi.tsx
│  ├─ animate-on-scroll.tsx
│  ├─ back-to-top.tsx
│  ├─ client-logos.tsx
│  ├─ contact-info.tsx
│  ├─ feature-card.tsx
│  ├─ footer.tsx
│  ├─ header.tsx
│  ├─ hero-geometric.tsx
│  ├─ hero-section.tsx
│  ├─ market-challenge.tsx
│  ├─ our-process.tsx
│  ├─ results-section.tsx
│  ├─ section-title.tsx
│  ├─ service-card.tsx
│  ├─ services-grid.tsx
│  ├─ services-section.tsx
│  ├─ ui
│  │  ├─ accordion.tsx
│  │  ├─ alert-dialog.tsx
│  │  ├─ alert.tsx
│  │  ├─ aspect-ratio.tsx
│  │  ├─ avatar.tsx
│  │  ├─ badge.tsx
│  │  ├─ breadcrumb.tsx
│  │  ├─ button.tsx
│  │  ├─ calendar.tsx
│  │  ├─ card.tsx
│  │  ├─ carousel.tsx
│  │  ├─ chart.tsx
│  │  ├─ checkbox.tsx
│  │  ├─ collapsible.tsx
│  │  ├─ command.tsx
│  │  ├─ context-menu.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ elegant-shape.tsx
│  │  ├─ form.tsx
│  │  ├─ hover-card.tsx
│  │  ├─ input-otp.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  ├─ menubar.tsx
│  │  ├─ navigation-menu.tsx
│  │  ├─ pagination.tsx
│  │  ├─ pixel-canvas.tsx
│  │  ├─ popover.tsx
│  │  ├─ progress.tsx
│  │  ├─ radio-group.tsx
│  │  ├─ resizable.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ select.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ slider.tsx
│  │  ├─ sonner.tsx
│  │  ├─ switch.tsx
│  │  ├─ table.tsx
│  │  ├─ tabs.tsx
│  │  ├─ textarea.tsx
│  │  ├─ toast.tsx
│  │  ├─ toaster.tsx
│  │  ├─ toggle-group.tsx
│  │  ├─ toggle.tsx
│  │  └─ tooltip.tsx
│  └─ why-tdi.tsx
├─ components.json
├─ hooks
│  └─ use-toast.ts
├─ lib
│  └─ utils.ts
├─ next.config.cjs
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.cjs
├─ prd.md
├─ public
│  ├─ images
│  │  ├─ clients
│  │  │  ├─ airbnb-logo.svg
│  │  │  ├─ amazon-logo.svg
│  │  │  ├─ dropbox-logo.svg
│  │  │  ├─ shopify-logo.svg
│  │  │  └─ slack-logo.svg
│  │  ├─ hero-pattern.svg
│  │  └─ tdi-logo.svg
│  ├─ robots.txt
│  └─ sitemap.xml
├─ scripts
│  ├─ README.md
│  ├─ dev.js
│  ├─ example_prd.txt
│  └─ task-complexity-report.json
├─ tailwind.config.ts
├─ tasks
│  ├─ task_001.txt
│  ├─ task_002.txt
│  ├─ task_003.txt
│  ├─ task_004.txt
│  ├─ task_005.txt
│  ├─ task_006.txt
│  ├─ task_007.txt
│  ├─ task_008.txt
│  ├─ task_009.txt
│  └─ task_010.txt
└─ tsconfig.json

```
```
TDI_agency
├─ .eslintrc.json
├─ .next
│  ├─ app-build-manifest.json
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ eslint
│  │  │  └─ .cache_1toplnq
│  │  ├─ next-minimal-server.js.nft.json
│  │  ├─ next-server.js.nft.json
│  │  ├─ swc
│  │  │  └─ plugins
│  │  │     └─ v7_macos_aarch64_0.102.1
│  │  └─ webpack
│  │     ├─ client-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     ├─ client-development-fallback
│  │     │  ├─ 0.pack.gz
│  │     │  └─ index.pack.gz
│  │     ├─ client-production
│  │     │  ├─ 0.pack
│  │     │  └─ index.pack
│  │     ├─ server-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-production
│  │        ├─ 0.pack
│  │        └─ index.pack
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server
│  │  ├─ _ssr_components_ui_pixel-canvas_tsx.js
│  │  ├─ app
│  │  │  ├─ page.js
│  │  │  └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  ├─ vendor-chunks
│  │  │  ├─ @radix-ui.js
│  │  │  ├─ @swc.js
│  │  │  ├─ aria-hidden.js
│  │  │  ├─ class-variance-authority.js
│  │  │  ├─ clsx.js
│  │  │  ├─ detect-node-es.js
│  │  │  ├─ framer-motion.js
│  │  │  ├─ get-nonce.js
│  │  │  ├─ lucide-react.js
│  │  │  ├─ motion-dom.js
│  │  │  ├─ motion-utils.js
│  │  │  ├─ next.js
│  │  │  ├─ react-remove-scroll-bar.js
│  │  │  ├─ react-remove-scroll.js
│  │  │  ├─ react-style-singleton.js
│  │  │  ├─ tailwind-merge.js
│  │  │  ├─ tslib.js
│  │  │  ├─ use-callback-ref.js
│  │  │  └─ use-sidecar.js
│  │  └─ webpack-runtime.js
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ _app-pages-browser_components_ui_pixel-canvas_tsx.js
│  │  │  ├─ app
│  │  │  │  ├─ layout.js
│  │  │  │  └─ page.js
│  │  │  ├─ app-pages-internals.js
│  │  │  ├─ main-app.js
│  │  │  ├─ polyfills.js
│  │  │  └─ webpack.js
│  │  ├─ css
│  │  │  └─ app
│  │  │     └─ layout.css
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media
│  │  │  ├─ 26a46d62cd723877-s.woff2
│  │  │  ├─ 55c55f0601d81cf3-s.woff2
│  │  │  ├─ 581909926a08bbc8-s.woff2
│  │  │  ├─ 6d93bde91c0c2823-s.woff2
│  │  │  ├─ 97e0cb1ae144a2a9-s.woff2
│  │  │  ├─ a34f9d1faa5f3315-s.p.woff2
│  │  │  └─ df0a9ae256c0569c-s.woff2
│  │  └─ webpack
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ app
│  │     │  └─ layout.e6bb5a8befd8f904.hot-update.js
│  │     ├─ e6bb5a8befd8f904.webpack.hot-update.json
│  │     └─ webpack.e6bb5a8befd8f904.hot-update.js
│  ├─ trace
│  └─ types
│     ├─ app
│     │  ├─ layout.ts
│     │  └─ page.ts
│     └─ package.json
├─ PRD
│  ├─ task_001.txt
│  ├─ task_002.txt
│  ├─ task_003.txt
│  ├─ task_004.txt
│  ├─ task_005.txt
│  ├─ task_006.txt
│  ├─ task_007.txt
│  ├─ task_008.txt
│  ├─ task_009.txt
│  └─ task_010.txt
├─ README.md
├─ app
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ privacy-policy
│  └─ terms-of-service
├─ components
│  ├─ about-tdi.tsx
│  ├─ animate-on-scroll.tsx
│  ├─ back-to-top.tsx
│  ├─ case-study.tsx
│  ├─ client-logos.tsx
│  ├─ contact-info.tsx
│  ├─ feature-card.tsx
│  ├─ footer.tsx
│  ├─ header.tsx
│  ├─ hero-geometric.tsx
│  ├─ hero-section.tsx
│  ├─ market-challenge.tsx
│  ├─ results-section.tsx
│  ├─ section-title.tsx
│  ├─ service-card.tsx
│  ├─ services-grid.tsx
│  ├─ services-section.tsx
│  ├─ ui
│  │  ├─ accordion.tsx
│  │  ├─ alert-dialog.tsx
│  │  ├─ alert.tsx
│  │  ├─ aspect-ratio.tsx
│  │  ├─ avatar.tsx
│  │  ├─ badge.tsx
│  │  ├─ breadcrumb.tsx
│  │  ├─ button.tsx
│  │  ├─ calendar.tsx
│  │  ├─ card.tsx
│  │  ├─ carousel.tsx
│  │  ├─ chart.tsx
│  │  ├─ checkbox.tsx
│  │  ├─ collapsible.tsx
│  │  ├─ command.tsx
│  │  ├─ context-menu.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ elegant-shape.tsx
│  │  ├─ form.tsx
│  │  ├─ hover-card.tsx
│  │  ├─ input-otp.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  ├─ menubar.tsx
│  │  ├─ navigation-menu.tsx
│  │  ├─ pagination.tsx
│  │  ├─ pixel-canvas.tsx
│  │  ├─ popover.tsx
│  │  ├─ progress.tsx
│  │  ├─ radio-group.tsx
│  │  ├─ resizable.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ select.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ slider.tsx
│  │  ├─ sonner.tsx
│  │  ├─ switch.tsx
│  │  ├─ table.tsx
│  │  ├─ tabs.tsx
│  │  ├─ textarea.tsx
│  │  ├─ toast.tsx
│  │  ├─ toaster.tsx
│  │  ├─ toggle-group.tsx
│  │  ├─ toggle.tsx
│  │  └─ tooltip.tsx
│  └─ why-tdi.tsx
├─ components.json
├─ hooks
│  └─ use-toast.ts
├─ lib
│  └─ utils.ts
├─ next.config.cjs
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.cjs
├─ public
│  ├─ images
│  │  ├─ clients
│  │  │  ├─ airbnb-logo.svg
│  │  │  ├─ amazon-logo.svg
│  │  │  ├─ dropbox-logo.svg
│  │  │  ├─ shopify-logo.svg
│  │  │  └─ slack-logo.svg
│  │  ├─ hero-pattern.svg
│  │  └─ tdi-logo.svg
│  ├─ robots.txt
│  └─ sitemap.xml
├─ scripts
│  ├─ README.md
│  ├─ dev.js
│  ├─ example_prd.txt
│  └─ task-complexity-report.json
├─ tailwind.config.ts
├─ tasks
│  ├─ task_001.txt
│  ├─ task_002.txt
│  ├─ task_003.txt
│  ├─ task_004.txt
│  ├─ task_005.txt
│  ├─ task_006.txt
│  ├─ task_007.txt
│  ├─ task_008.txt
│  ├─ task_009.txt
│  └─ task_010.txt
└─ tsconfig.json

```