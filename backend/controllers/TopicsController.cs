using backend.repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TopicsController(TechnologyRepo technologyRepo) : ControllerBase
    {
        private readonly TechnologyRepo _technologyRepo = technologyRepo;
        // [HttpGet("all-topics")]
        // public Dictionary<string, List<string>> GetTopics()
        // {
        //     return new Dictionary<string, List<string>>
        //     {
        //         {
        //             ".NET",
        //             new List<string>
        //             {
        //                 "C# Basics",
        //                 "OOP",
        //                 "Collections",
        //                 "Generics",
        //                 "Delegates",
        //                 "Events",
        //                 "LINQ",
        //                 "Lambda Expressions",
        //                 "Extension Methods",
        //                 "Exception Handling",
        //                 "File Handling",
        //                 "Async & Await",
        //                 "Multithreading",
        //                 "Task Parallel Library",
        //                 "Reflection",
        //                 "Attributes",
        //                 "Dependency Injection",
        //                 "ASP.NET Core",
        //                 "Web API",
        //                 "MVC",
        //                 "Razor Pages",
        //                 "Middleware",
        //                 "Authentication",
        //                 "Authorization",
        //                 "JWT",
        //                 "Identity",
        //                 "Entity Framework Core",
        //                 "Migrations",
        //                 "Fluent API",
        //                 "Data Annotations",
        //                 "Caching",
        //                 "Logging",
        //                 "SignalR",
        //                 "Configuration",
        //                 "Unit Testing",
        //                 "xUnit",
        //                 "NUnit"
        //             }
        //         },

        //         {
        //                 "Java",
        //                 new List<string>
        //                 {
        //                     "Core Java",
        //                     "OOP",
        //                     "Collections",
        //                     "Streams API",
        //                     "Lambda Expressions",
        //                     "Multithreading",
        //                     "Exception Handling",
        //                     "Generics",
        //                     "JDBC",
        //                     "Servlets",
        //                     "JSP",
        //                     "Spring",
        //                     "Spring Boot",
        //                     "Spring MVC",
        //                     "Spring Security",
        //                     "Spring Data JPA",
        //                     "Hibernate",
        //                     "Maven",
        //                     "Gradle",
        //                     "Microservices",
        //                     "JUnit",
        //                     "Mockito"
        //                 }
        //             },

        //             {
        //                 "React",
        //                 new List<string>
        //                 {
        //                     "JSX",
        //                     "Components",
        //                     "Props",
        //                     "State",
        //                     "Hooks",
        //                     "useState",
        //                     "useEffect",
        //                     "useMemo",
        //                     "useCallback",
        //                     "useRef",
        //                     "Context API",
        //                     "Redux",
        //                     "Redux Toolkit",
        //                     "React Router",
        //                     "Forms",
        //                     "Controlled Components",
        //                     "API Integration",
        //                     "Axios",
        //                     "Fetch API",
        //                     "Authentication",
        //                     "Performance Optimization",
        //                     "Code Splitting",
        //                     "Lazy Loading",
        //                     "TypeScript with React"
        //                 }
        //             },

        //             {
        //                 "JavaScript",
        //                 new List<string>
        //                 {
        //                     "Variables",
        //                     "Data Types",
        //                     "Operators",
        //                     "Functions",
        //                     "Arrow Functions",
        //                     "Closures",
        //                     "Hoisting",
        //                     "Scope",
        //                     "Promises",
        //                     "Async Await",
        //                     "Event Loop",
        //                     "DOM",
        //                     "Events",
        //                     "ES6 Features",
        //                     "Modules",
        //                     "JSON",
        //                     "Local Storage",
        //                     "Session Storage"
        //                 }
        //             },

        //             {
        //                 "TypeScript",
        //                 new List<string>
        //                 {
        //                     "Basic Types",
        //                     "Interfaces",
        //                     "Classes",
        //                     "Enums",
        //                     "Generics",
        //                     "Type Aliases",
        //                     "Union Types",
        //                     "Intersection Types",
        //                     "Decorators",
        //                     "Modules",
        //                     "Namespaces",
        //                     "Utility Types"
        //                 }
        //             },

        //             {
        //                 "SQL",
        //                 new List<string>
        //                 {
        //                     "DDL",
        //                     "DML",
        //                     "DCL",
        //                     "TCL",
        //                     "Constraints",
        //                     "Primary Key",
        //                     "Foreign Key",
        //                     "Indexes",
        //                     "Views",
        //                     "Stored Procedures",
        //                     "Functions",
        //                     "Triggers",
        //                     "Joins",
        //                     "Group By",
        //                     "Having",
        //                     "Subqueries",
        //                     "CTE",
        //                     "Transactions",
        //                     "Normalization",
        //                     "Denormalization"
        //                 }
        //             },

        //             {
        //                 "System Design",
        //                 new List<string>
        //                 {
        //                     "Scalability",
        //                     "Load Balancing",
        //                     "Caching",
        //                     "CDN",
        //                     "Database Sharding",
        //                     "Replication",
        //                     "CAP Theorem",
        //                     "Microservices",
        //                     "API Gateway",
        //                     "Rate Limiting",
        //                     "Message Queues",
        //                     "Kafka",
        //                     "RabbitMQ",
        //                     "Redis",
        //                     "Docker",
        //                     "Kubernetes"
        //                 }
        //             },

        //             {
        //                 "Data Structures",
        //                 new List<string>
        //                 {
        //                     "Arrays",
        //                     "Strings",
        //                     "Linked List",
        //                     "Stack",
        //                     "Queue",
        //                     "Deque",
        //                     "Hash Table",
        //                     "Heap",
        //                     "Binary Tree",
        //                     "BST",
        //                     "Trie",
        //                     "Graph",
        //                     "Segment Tree",
        //                     "Disjoint Set"
        //                 }
        //             },

        //             {
        //                 "Algorithms",
        //                 new List<string>
        //                 {
        //                     "Sorting",
        //                     "Searching",
        //                     "Binary Search",
        //                     "Recursion",
        //                     "Backtracking",
        //                     "Greedy",
        //                     "Dynamic Programming",
        //                     "Sliding Window",
        //                     "Two Pointers",
        //                     "Prefix Sum",
        //                     "DFS",
        //                     "BFS",
        //                     "Dijkstra",
        //                     "Topological Sort"
        //                 }
        //             },

        //             {
        //                 "DevOps",
        //                 new List<string>
        //                 {
        //                     "Git",
        //                     "GitHub",
        //                     "GitHub Actions",
        //                     "Docker",
        //                     "Kubernetes",
        //                     "Jenkins",
        //                     "Azure DevOps",
        //                     "CI/CD",
        //                     "Terraform",
        //                     "Ansible",
        //                     "Nginx"
        //                 }
        //             },

        //             {
        //                 "Cloud",
        //                 new List<string>
        //                 {
        //                     "AWS EC2",
        //                     "AWS S3",
        //                     "AWS Lambda",
        //                     "AWS RDS",
        //                     "Azure App Service",
        //                     "Azure Functions",
        //                     "Azure Storage",
        //                     "Google Cloud Run",
        //                     "Google Cloud Storage",
        //                     "Firebase"
        //                 }
        //             },

        //             {
        //                 "Operating Systems",
        //                 new List<string>
        //                 {
        //                     "Processes",
        //                     "Threads",
        //                     "CPU Scheduling",
        //                     "Deadlock",
        //                     "Memory Management",
        //                     "Virtual Memory",
        //                     "Paging",
        //                     "Segmentation",
        //                     "Synchronization",
        //                     "Semaphores"
        //                 }
        //             },

        //             {
        //                 "Computer Networks",
        //                 new List<string>
        //                 {
        //                     "OSI Model",
        //                     "TCP/IP",
        //                     "HTTP",
        //                     "HTTPS",
        //                     "DNS",
        //                     "DHCP",
        //                     "FTP",
        //                     "SMTP",
        //                     "REST",
        //                     "WebSockets",
        //                     "Cookies",
        //                     "Sessions"
        //                 }
        //             }
        //         };
        // }

        //     [HttpGet("test")]
        // public string Test()
        // {
        //     var data = GetTopics();
        //     foreach(var tech in data){
        //         Technology technology = new Technology { Name = tech.Key };
        //         _technologyRepo.AddTechnology(technology);
        //         var values = tech.Value;
        //         foreach(var value in values){
        //             Topic topic = new Topic { Name = value };
        //             _technologyRepo.AddTopicToTechnology(tech.Key, topic);
        //         }
        //     }
        //     return "success";
        // }

        // [HttpGet("all-techs")]
        // public List<Technology> GetAllTechnologies()
        // {
        //     return _technologyRepo.GetAllTechnologies();
        // }

        [HttpGet("Technologies")]
        public Dictionary<string, int> GetAllTechnologies()
        {
            return _technologyRepo.GetTechologyTopicCounts();
        }

        [HttpGet("sub/{technologyName}")]
        public List<string> GetTopicsByTechnology(string technologyName)
        {
            return _technologyRepo.GetAllTopicNamesByTechnology(technologyName);
        }

    }
}

