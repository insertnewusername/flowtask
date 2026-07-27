window.TASKFLOW_SUPABASE = {
  url: "https://ryqyqvfprjozbyhasqtq.supabase.co",
  key: "sb_publishable_F9D9-UzmRaaLgBhxoH1yiw_dYh7O4qt",
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
    "https://insertnewusername.github.io/flowtask/",
    "localhost",
    "127.0.0.1",
    "::1",
  ],
};
