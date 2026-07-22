import { quizEndpoints, technologiesEndpoints } from "./api/authEndpoints"
export interface AuthUser {
    id: number
    email: string
    name?: string
}
export interface Topics {
    [key: string]: string[]
}

export interface QuizGenerationPayload {
    technology: string
    topics: string[]
    difficulty: string
    questionCount: number
    notes?: File | string
    // Optional original filename; backend can ignore when receiving `notes` as File.
    notesFileName?: string
}
export interface QuizGenerationResponse {
    success: boolean
    quizId?: string
    message?: string
}

export const dummyData: Topics = {
    ".NET": [
        "C# Basics",
        "OOP",
        "Collections",
        "Generics",
        "Delegates",
        "Events",
        "LINQ",
        "Lambda Expressions",
        "Extension Methods",
        "Exception Handling",
        "File Handling",
        "Async & Await",
        "Multithreading",
        "Task Parallel Library",
        "Reflection",
        "Attributes",
        "Dependency Injection",
        "ASP.NET Core",
        "Web API",
        "MVC",
        "Razor Pages",
        "Middleware",
        "Authentication",
        "Authorization",
        "JWT",
        "Identity",
        "Entity Framework Core",
        "Migrations",
        "Fluent API",
        "Data Annotations",
        "Caching",
        "Logging",
        "SignalR",
        "Configuration",
        "Unit Testing",
        "xUnit",
        "NUnit"
    ],
    "Java": [
        "Core Java",
        "OOP",
        "Collections",
        "Streams API",
        "Lambda Expressions",
        "Multithreading",
        "Exception Handling",
        "Generics",
        "JDBC",
        "Servlets",
        "JSP",
        "Spring",
        "Spring Boot",
        "Spring MVC",
        "Spring Security",
        "Spring Data JPA",
        "Hibernate",
        "Maven",
        "Gradle",
        "Microservices",
        "JUnit",
        "Mockito"
    ],
    "React": [
        "JSX",
        "Components",
        "Props",
        "State",
        "Hooks",
        "useState",
        "useEffect",
        "useMemo",
        "useCallback",
        "useRef",
        "Context API",
        "Redux",
        "Redux Toolkit",
        "React Router",
        "Forms",
        "Controlled Components",
        "API Integration",
        "Axios",
        "Fetch API",
        "Authentication",
        "Performance Optimization",
        "Code Splitting",
        "Lazy Loading",
        "TypeScript with React"
    ],
    "JavaScript": [
        "Variables",
        "Data Types",
        "Operators",
        "Functions",
        "Arrow Functions",
        "Closures",
        "Hoisting",
        "Scope",
        "Promises",
        "Async Await",
        "Event Loop",
        "DOM",
        "Events",
        "ES6 Features",
        "Modules",
        "JSON",
        "Local Storage",
        "Session Storage"
    ],
    "TypeScript": [
        "Basic Types",
        "Interfaces",
        "Classes",
        "Enums",
        "Generics",
        "Type Aliases",
        "Union Types",
        "Intersection Types",
        "Decorators",
        "Modules",
        "Namespaces",
        "Utility Types"
    ],
    "SQL": [
        "DDL",
        "DML",
        "DCL",
        "TCL",
        "Constraints",
        "Primary Key",
        "Foreign Key",
        "Indexes",
        "Views",
        "Stored Procedures",
        "Functions",
        "Triggers",
        "Joins",
        "Group By",
        "Having",
        "Subqueries",
        "CTE",
        "Transactions",
        "Normalization",
        "Denormalization"
    ],
    "System Design": [
        "Scalability",
        "Load Balancing",
        "Caching",
        "CDN",
        "Database Sharding",
        "Replication",
        "CAP Theorem",
        "Microservices",
        "API Gateway",
        "Rate Limiting",
        "Message Queues",
        "Kafka",
        "RabbitMQ",
        "Redis",
        "Docker",
        "Kubernetes"
    ],
    "Data Structures": [
        "Arrays",
        "Strings",
        "Linked List",
        "Stack",
        "Queue",
        "Deque",
        "Hash Table",
        "Heap",
        "Binary Tree",
        "BST",
        "Trie",
        "Graph",
        "Segment Tree",
        "Disjoint Set"
    ],
    "Algorithms": [
        "Sorting",
        "Searching",
        "Binary Search",
        "Recursion",
        "Backtracking",
        "Greedy",
        "Dynamic Programming",
        "Sliding Window",
        "Two Pointers",
        "Prefix Sum",
        "DFS",
        "BFS",
        "Dijkstra",
        "Topological Sort"
    ],
    "DevOps": [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "Azure DevOps",
        "CI/CD",
        "Terraform",
        "Ansible",
        "Nginx"
    ],
    "Cloud": [
        "AWS EC2",
        "AWS S3",
        "AWS Lambda",
        "AWS RDS",
        "Azure App Service",
        "Azure Functions",
        "Azure Storage",
        "Google Cloud Run",
        "Google Cloud Storage",
        "Firebase"
    ],
    "Operating Systems": [
        "Processes",
        "Threads",
        "CPU Scheduling",
        "Deadlock",
        "Memory Management",
        "Virtual Memory",
        "Paging",
        "Segmentation",
        "Synchronization",
        "Semaphores"
    ],
    "Computer Networks": [
        "OSI Model",
        "TCP/IP",
        "HTTP",
        "HTTPS",
        "DNS",
        "DHCP",
        "FTP",
        "SMTP",
        "REST",
        "WebSockets",
        "Cookies",
        "Sessions"
    ]
}
export const tecnologies: string[] =
[
    ".NET",
    "Java",
    "React",
    "JavaScript",
    "TypeScript",
    "SQL",
    "System Design",
    "Data Structures",
    "Algorithms",
    "DevOps",
    "Cloud",
    "Operating Systems",
    "Computer Networks"
    ]

export interface TechnologyTopicCounts {
    [technology: string]: number;
}
export const getTechnologies = async (): Promise<TechnologyTopicCounts> => {
    try {
        const response = await fetch(technologiesEndpoints.getTechnologies, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch technologies');
        }
        const data: TechnologyTopicCounts = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching technologies:', error);
        return {};
    }
}
export const getTopicsByTechnology = async (technology: string): Promise<string[]> => {
    try {
        const response = await fetch(
            `${technologiesEndpoints.getTopics}/${encodeURIComponent(technology)}`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch topics");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const generateQuiz = async (
    payload: QuizGenerationPayload
): Promise<QuizGenerationResponse> => {
    try {
        let response: Response

        // If `notes` is a File, send multipart/form-data so backend receives the actual file.

        if (payload.notes instanceof File) {
            const form = new FormData()
            form.append('technology', payload.technology)
            payload.topics.forEach(topic =>
                            form.append("topics", topic));
            form.append("difficulty", payload.difficulty);
            form.append('questionCount', String(payload.questionCount))
            form.append('notesFile', payload.notes)
            if (payload.notesFileName) {
                form.append('notesFileName', payload.notesFileName)
            }
            response = await fetch(quizEndpoints.generateQuiz, {
                method: 'POST',
                credentials: 'include',
                body: form
            })
        } else {
            // Fallback: send JSON (notes may be a string or undefined)

            response = await fetch(quizEndpoints.generateQuiz, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })
        }

        if (!response.ok) {
            throw new Error("Failed to generate quiz");
        }
        return await response.json();
    } catch (error) {
        console.error("Error generating quiz:", error);
        return {
            success: false,
            message: "Unable to generate quiz right now."
        };
    }
};
