window.TASKFLOW_SUPABASE = {
  url: "https://timkbobrlxkwwmukkukv.supabase.co",
  key: "sb_publishable_GMzXBw5vLt8cNdj3ytp_gA_ymdJe7PV",
};

window.TASKFLOW_GOOGLE = {
  clientId: "9451179838-hacbjml6jol5errqfckr9lhcqhq90jpe.apps.googleusercontent.com",
  // Optional Cloudflare Worker backend for long-lived Google Calendar sync.
  // Example: "https://taskflow-calendar-sync.YOUR-SUBDOMAIN.workers.dev"
  calendarBackendUrl: "",
};

window.TASKFLOW_AI = {
  // Add your Worker URL here after following the AI Assist setup instructions.
  // Example: "https://taskflow-ai.YOUR-SUBDOMAIN.workers.dev"
  endpoint: "https://taskflow-ai-add.taskflowaiadd.workers.dev",
};

window.TASKFLOW_SECURITY = {
  allowedHosts: [
    "taskflow-northbyte.web.app",
    "taskflow-20341.web.app",
    "taskflowx1.netlify.app",
    "taskflowonline.netlify.app",
    "https://taskflow.benjamin-magro.workers.dev",
    "taskflowonline.publicvm.com",
    "localhost",
    "127.0.0.1",
    "::1",
  ],
};
