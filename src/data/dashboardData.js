// Initial dashboard data structure
export const initialDashboardData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          content: {
            type: "donut-chart",
            data: {
              total: 4,
              connected: 2,
              notConnected: 2,
            },
          },
        },
        {
          id: "cloud-account-risk",
          name: "Cloud Account Risk Assessment",
          content: {
            type: "risk-chart",
            data: {
              total: 9658,
              failed: 1085,
              warning: 469,
              notEvaluated: 36,
              passed: 7968,
            },
          },
        },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          content: {
            type: "empty",
            message: "No Graph data available!",
          },
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          content: {
            type: "empty",
            message: "No Graph data available!",
          },
        },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          content: {
            type: "risk-bar",
            data: {
              total: 470,
              critical: 50,
              high: 132,
              moderate: 23,
              good: 265,
            },
          },
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          content: {
            type: "risk-bar",
            data: {
              total: 48,
              critical: 2,
              high: 32,
              moderate: 4,
              good: 10,
            },
          },
        },
      ],
    },
  ],
};
