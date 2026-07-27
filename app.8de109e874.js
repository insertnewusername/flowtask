/*! TaskFlow proprietary software. Not open source. Copying, cloning, redistribution, reverse engineering, or derivative use is prohibited. */
/*! TaskFlow proprietary software. Not open source. Copying, cloning, redistribution, reverse engineering, or derivative use is prohibited. */
const STORAGE_KEY = "taskflow.tasks.v1"
  , THEME_KEY = "taskflow.theme.v1"
  , DENSITY_KEY = "taskflow.density.v1"
  , SETTINGS_SECTION_KEY = "taskflow.settings.section.v1"
  , UI_STYLE_KEY = "taskflow.ui.style.v1"
  , UI_PRESETS_KEY = "taskflow.ui.presets.v1"
  , CUSTOM_WALLPAPER_KEY = "taskflow.custom.wallpaper.v1"
  , MOBILE_PAGE_KEY = "taskflow.mobile.page.v1"
  , SESSION_KEY = "taskflow.supabase.session.v1"
  , PENDING_DELETE_KEY = "taskflow.pending.deletes.v1"
  , PENDING_TASK_SYNC_KEY = "taskflow.pending.tasks.sync.v1"
  , PENDING_MEETING_DELETE_KEY = "taskflow.pending.meeting.deletes.v1"
  , PENDING_MEETING_SYNC_KEY = "taskflow.pending.meeting.sync.v1"
  , TASK_TOMBSTONES_KEY_PREFIX = "taskflow.deleted.tasks.v1."
  , MEETING_TOMBSTONES_KEY_PREFIX = "taskflow.deleted.meetings.v1."
  , MEETING_TIMEZONE_KEY = "taskflow.meeting.timezone.v1"
  , UNIFIED_LAYOUT_KEY = "taskflow.unified.layout.v1"
  , UNIFIED_LAYOUT_UPDATED_KEY = "taskflow.unified.layout.updated.v1"
  , UNIFIED_PRESETS_KEY = "taskflow.unified.presets.v1"
  , PREFERENCES_SYNC_PENDING_KEY = "taskflow.preferences.sync.pending.v1"
  , NOTIFICATION_SETTINGS_KEY = "taskflow.notifications.v1"
  , NOTIFIED_REMINDERS_KEY = "taskflow.notified.reminders.v1"
  , ONBOARDING_KEY_PREFIX = "taskflow.onboarding.seen.v1."
  , GOOGLE_CALENDAR_AUTO_SYNC_KEY = "taskflow.googleCalendar.autoSync.v1"
  , GOOGLE_CALENDAR_CONNECTED_KEY = "taskflow.googleCalendar.connected.v1"
  , GOOGLE_CALENDAR_SYNC_TOKEN_KEY = "taskflow.googleCalendar.syncToken.v1"
  , GOOGLE_CALENDAR_LAST_SYNC_KEY = "taskflow.googleCalendar.lastSync.v1"
  , GOOGLE_CALENDAR_PUSHED_IDS_KEY = "taskflow.googleCalendar.pushedIds.v1"
  , GOOGLE_CALENDAR_ACCESS_TOKEN_KEY = "taskflow.googleCalendar.accessToken.v1"
  , GOOGLE_CALENDAR_LAST_STATUS_KEY = "taskflow.googleCalendar.lastStatus.v1"
  , GOOGLE_CALENDAR_LAST_ERROR_KEY = "taskflow.googleCalendar.lastError.v1"
  , GOOGLE_CALENDAR_BACKEND_CONNECTED_KEY = "taskflow.googleCalendar.backendConnected.v1"
  , GOOGLE_CALENDAR_NEXT_RETRY_KEY = "taskflow.googleCalendar.nextRetry.v1"
  , LAST_ACCOUNT_SYNC_KEY = "taskflow.last.account.sync.v1"
  , ENCRYPTION_ENABLED_KEY = "taskflow.encryption.enabled.v1"
  , AUTO_DELETE_DONE_KEY = "taskflow.autoDeleteDone.v1"
  , RESTORE_POINTS_KEY = "taskflow.restore.points.v1"
  , SYNC_ACTIVITY_KEY = "taskflow.sync.activity.v1"
  , SYNC_MERGE_SUMMARY_KEY = "taskflow.sync.mergeSummary.v1"
  , AI_USAGE_KEY_PREFIX = "taskflow.ai.usage.v1."
  , SEEN_TIER_OUTCOME_KEY_PREFIX = "taskflow.tier.outcome.seen.v1."
  , DOMAIN_MIGRATION_WINDOW_NAME = "taskflow-domain-migration"
  , DOMAIN_MIGRATION_SOURCE_HOSTS = new Set(["taskflow-20341.web.app"])
  , SUPABASE_TABLE = "tasks"
  , MEETINGS_TABLE = "meetings"
  , WORKSPACE_NOTES_TABLE = "workspace_notes"
  , WORKSPACE_DELETIONS_TABLE = "workspace_deletions"
  , ACCOUNT_PROFILES_TABLE = "account_profiles"
  , TIER_REQUESTS_TABLE = "tier_requests"
  , FEEDBACK_REPORTS_TABLE = "feedback_reports"
  , ACCOUNT_DELETION_REQUESTS_TABLE = "account_deletion_requests"
  , TERMS_VERSION = "2026-06-17"
  , LICENSE_VERSION = "2026-06-17"
  , ONBOARDING_VERSION = "2026-06-16"
  , APP_VERSION = "beta 0.95"
  , ENCRYPTED_PREFIX = "tfenc:v1:"
  , RESTORE_POINTS_LIMIT = 8
  , RESTORE_POINT_INTERVAL_MS = 3e5
  , SYNC_ACTIVITY_LIMIT = 50
  , DELETE_TOMBSTONE_RETENTION_MS = 10368e6
  , DELETE_TOMBSTONE_LIMIT = 5e3
  , SUPPORT_PROMPT = "Try again in a moment. If it keeps happening, contact support with this code."
  , DEMO_TASK_TITLES = new Set(["Plan the product launch", "Prepare weekly planning ritual", "Collect receipts for finance review", "Draft product notes for stakeholder review", "Clean up completed demo data", "Ship task tracker homepage", "Ship task tracker hompage", "Write privacy first sync copy", "Review TaskFlow analytics", "Polish the first screen"].map(normalizeDemoTaskTitle))
  , ERROR_MESSAGES = {
    "TF-AUTH-001": "TaskFlow cannot start sign-in right now.",
    "TF-AUTH-101": "That email and password did not match.",
    "TF-AUTH-102": "That account already exists.",
    "TF-AUTH-103": "Sign-in did not finish.",
    "TF-AUTH-104": "Your sign-in session expired.",
    "TF-NET-001": "TaskFlow cannot connect right now.",
    "TF-SYNC-001": "TaskFlow cannot reach your account workspace right now.",
    "TF-SYNC-201": "TaskFlow is having trouble syncing events.",
    "TF-SYNC-202": "TaskFlow needs a data update before events can sync.",
    "TF-SYNC-203": "TaskFlow found older event data and will try to repair it.",
    "TF-SYNC-301": "TaskFlow could not finish account sync.",
    "TF-GCAL-101": "Google Calendar permission was not granted.",
    "TF-GCAL-102": "Google Calendar needs permission again.",
    "TF-GCAL-201": "Google Calendar needs setup before it can sync here.",
    "TF-GCAL-202": "Google Calendar sync cannot reach its connector right now.",
    "TF-AI-001": "AI Assist is not available right now.",
    "TF-PLAN-001": "TaskFlow could not send that request right now.",
    "TF-FEED-001": "TaskFlow could not send feedback right now.",
    "TF-ACCT-001": "TaskFlow could not send that account request right now.",
    "TF-SEC-001": "This TaskFlow copy is not approved for this website.",
    "TF-GEN-001": "Something went wrong."
}
  , ACCOUNT_TIERS = {
    base: {
        label: "Base",
        aiDaily: 1 / 0,
        storageBytes: 1 / 0,
        itemLimit: 1 / 0,
        uiPresetLimit: 1 / 0,
        wallpaperBytes: 1 / 0,
        description: "Generous personal-use limits for normal planning."
    },
    pro: {
        label: "Pro",
        aiDaily: 500,
        storageBytes: 104857600,
        itemLimit: 2e4,
        uiPresetLimit: 12,
        wallpaperBytes: 1433600,
        description: "Higher fair-use limits for heavier daily planning."
    },
    dev: {
        label: "Unlimited",
        aiDaily: 1 / 0,
        storageBytes: 1 / 0,
        itemLimit: 1 / 0,
        uiPresetLimit: 1 / 0,
        wallpaperBytes: 1 / 0,
        description: "Full access for approved TaskFlow accounts."
    }
}
  , AUTO_DELETE_DONE_OPTIONS = [0, 1, 7, 14, 30, 90, 180, 365]
  , uiStylePresets = {
    og: {
        uiVersion: 4,
        id: "og",
        name: "OG TaskFlow",
        description: "The clean original TaskFlow feel: light, sharp, practical, and calm.",
        theme: "light",
        accent: "#137a63",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "soft",
        glassOpacity: 92,
        glassBlur: 12,
        glassSaturation: 108,
        glassContrast: 104,
        borderShine: 24,
        shadowStrength: 6,
        cornerRadius: 8,
        buttonOpacity: 100,
        windowOpacity: 82,
        sidebarOpacity: 98,
        motion: "standard",
        motionEnergy: 100,
        textScale: 100,
        compactSurfaces: !1
    },
    ogDark: {
        uiVersion: 4,
        id: "ogDark",
        name: "OG Dark",
        description: "The original layout in a focused dark workspace.",
        theme: "dark",
        accent: "#36b58f",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "soft",
        glassOpacity: 96,
        glassBlur: 10,
        glassSaturation: 112,
        glassContrast: 104,
        borderShine: 18,
        shadowStrength: 12,
        cornerRadius: 8,
        buttonOpacity: 98,
        windowOpacity: 82,
        sidebarOpacity: 96,
        motion: "standard",
        motionEnergy: 95,
        textScale: 100,
        compactSurfaces: !1
    },
    paper: {
        uiVersion: 4,
        id: "paper",
        name: "Paper Light",
        description: "Bright, tidy, and soft without looking washed out.",
        theme: "light",
        accent: "#2f6fd6",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "off",
        glassOpacity: 100,
        glassBlur: 0,
        glassSaturation: 100,
        glassContrast: 102,
        borderShine: 12,
        shadowStrength: 5,
        cornerRadius: 12,
        buttonOpacity: 100,
        windowOpacity: 100,
        sidebarOpacity: 100,
        motion: "calm",
        motionEnergy: 74,
        textScale: 100,
        compactSurfaces: !1
    },
    graphite: {
        uiVersion: 4,
        id: "graphite",
        name: "Graphite",
        description: "A quieter dark preset for long planning sessions.",
        theme: "dark",
        accent: "#60a5fa",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "soft",
        glassOpacity: 94,
        glassBlur: 12,
        glassSaturation: 112,
        glassContrast: 106,
        borderShine: 20,
        shadowStrength: 14,
        cornerRadius: 10,
        buttonOpacity: 96,
        windowOpacity: 78,
        sidebarOpacity: 96,
        motion: "calm",
        motionEnergy: 76,
        textScale: 100,
        compactSurfaces: !1
    },
    coastal: {
        uiVersion: 4,
        id: "coastal",
        name: "Coastal Frost",
        description: "Light frosted surfaces with controlled colour and readable panels.",
        theme: "light",
        accent: "#14b8a6",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "soft",
        glassOpacity: 72,
        glassBlur: 30,
        glassSaturation: 154,
        glassContrast: 112,
        borderShine: 62,
        shadowStrength: 15,
        cornerRadius: 18,
        buttonOpacity: 76,
        windowOpacity: 72,
        sidebarOpacity: 74,
        motion: "standard",
        motionEnergy: 100,
        textScale: 100,
        compactSurfaces: !1
    },
    auroraDark: {
        uiVersion: 4,
        id: "auroraDark",
        name: "Aurora Dark",
        description: "Colourful dark frost, dialled back enough for daily use.",
        theme: "dark",
        accent: "#8b5cf6",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "soft",
        glassOpacity: 66,
        glassBlur: 30,
        glassSaturation: 148,
        glassContrast: 108,
        borderShine: 18,
        shadowStrength: 14,
        cornerRadius: 18,
        buttonOpacity: 64,
        windowOpacity: 66,
        sidebarOpacity: 68,
        motion: "standard",
        motionEnergy: 104,
        textScale: 100,
        compactSurfaces: !1
    },
    sunrise: {
        uiVersion: 4,
        id: "sunrise",
        name: "Sunrise",
        description: "Warm light mode with a gentle glow and friendly shape.",
        theme: "light",
        accent: "#f97316",
        wallpaper: "none",
        wallpaperIntensity: 0,
        glass: "soft",
        glassOpacity: 96,
        glassBlur: 12,
        glassSaturation: 116,
        glassContrast: 104,
        borderShine: 30,
        shadowStrength: 8,
        cornerRadius: 14,
        buttonOpacity: 98,
        windowOpacity: 84,
        sidebarOpacity: 96,
        motion: "standard",
        motionEnergy: 98,
        textScale: 100,
        compactSurfaces: !1
    }
}
  , uiAccentChoices = ["#137a63", "#14b8a6", "#2f6fd6", "#8b5cf6", "#f97316", "#e11d48"]
  , defaultUiStyle = {
    ...uiStylePresets.og
}
  , customUiDescription = "Fine tune TaskFlow's theme, frosted surfaces, wallpaper, motion, and shape."
  , legacyUiStyleDefaults = {
    og: uiStylePresets.og,
    liquid: uiStylePresets.coastal,
    aurora: uiStylePresets.auroraDark,
    graphite: uiStylePresets.graphite,
    sunrise: uiStylePresets.sunrise
}
  , customUiFallbackStyle = {
    uiVersion: 4,
    id: "custom",
    name: "Custom",
    description: customUiDescription,
    theme: "light",
    accent: "#137a63",
    wallpaper: "none",
    wallpaperIntensity: 0,
    glass: "soft",
    glassOpacity: 96,
    glassBlur: 12,
    glassSaturation: 112,
    glassContrast: 104,
    borderShine: 30,
    shadowStrength: 8,
    cornerRadius: 10,
    buttonOpacity: 98,
    windowOpacity: 76,
    sidebarOpacity: 96,
    motion: "standard",
    motionEnergy: 100,
    textScale: 100,
    compactSurfaces: !1,
    sidebarAutoHide: !1,
    sidebarMode: "attached"
}
  , MEETING_HORIZON_MONTHS = 6
  , GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events"
  , GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3"
  , unifiedWindowDefaults = [{
    id: "focus",
    x: 0,
    y: 0,
    width: 330,
    height: 430,
    z: 1
}, {
    id: "board",
    x: 350,
    y: 0,
    width: 500,
    height: 460,
    z: 2
}, {
    id: "week",
    x: 870,
    y: 0,
    width: 510,
    height: 460,
    z: 3
}, {
    id: "events",
    x: 0,
    y: 480,
    width: 330,
    height: 360,
    z: 4
}, {
    id: "notes",
    x: 350,
    y: 480,
    width: 330,
    height: 360,
    z: 5
}, {
    id: "signals",
    x: 700,
    y: 480,
    width: 330,
    height: 360,
    z: 6
}, {
    id: "stack",
    x: 0,
    y: 860,
    width: 680,
    height: 430,
    z: 7
}]
  , UNIFIED_MIN_WIDTH = 260
  , UNIFIED_MIN_HEIGHT = 190
  , UNIFIED_CANVAS_MAX_HEIGHT = 2200
  , UNIFIED_EVENT_NOTES_WIDTH = 520
  , UNIFIED_PRESET_LIMIT = 8
  , UNIFIED_SNAP_DISTANCE = 14
  , GOOGLE_CALENDAR_SYNC_INTERVAL_MS = 12e4
  , GOOGLE_CALENDAR_SYNC_DEBOUNCE_MS = 8e3
  , GOOGLE_CALENDAR_SYNC_WINDOW_PAST_DAYS = 60
  , GOOGLE_CALENDAR_SYNC_WINDOW_FUTURE_DAYS = 365
  , WORKSPACE_SYNC_RETRY_MS = 45e3
  , NOTIFICATION_CHECK_MS = 6e4
  , NOTIFICATION_GRACE_MS = 3e5
  , AUTO_DELETE_DONE_CHECK_MS = 18e5
  , defaultNotificationSettings = {
    enabled: !1,
    leadMinutes: 10
}
  , DEFAULT_SUPABASE_CONFIG = {
    url: "https://timkbobrlxkwwmukkukv.supabase.co",
    key: "sb_publishable_GMzXBw5vLt8cNdj3ytp_gA_ymdJe7PV"
}
  , DEFAULT_AI_CONFIG = {
    endpoint: "",
    timeoutMs: 16e3
}
  , DEFAULT_ALLOWED_HOSTS = ["taskflow-northbyte.web.app", "taskflow-20341.web.app", "taskflowx1.netlify.app", "taskflowonline.netlify.app", "taskflow.benjamin-magro.workers.dev", "taskflowonline.publicvm.com", "localhost", "127.0.0.1", "::1"]
  , timezoneChoices = ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Adelaide", "Australia/Perth", "Pacific/Auckland", "UTC", "America/Los_Angeles", "America/New_York", "Europe/London", "Asia/Tokyo"]
  , welcomeSlides = [{
    eyebrow: "Welcome",
    title: "Welcome to TaskFlow",
    body: "Start with AI Assist, then organise tasks on the board, events on the calendar, and anything loose in General notes.",
    icon: "sparkles",
    tip: "Try AI Assist with a sentence like: finish the proposal by 4pm today, work on it 2-3."
}, {
    eyebrow: "AI Assist",
    title: "Ramble, then let TaskFlow clean it up",
    body: 'Write things like "finish the proposal by 4pm today" or "plan English essay tomorrow from 6pm to 7pm" and TaskFlow will turn it into structured action.',
    icon: "wand-sparkles",
    tip: "AI Assist can create, edit, schedule, complete, duplicate, delete, make follow-up tasks, and start sync."
}, {
    eyebrow: "Workspace",
    title: "Your main workspace is movable",
    body: "Workspace mixes tasks, today, week map, notes, focus, analytics, and board status in windows you can drag and resize.",
    icon: "panel-top-open",
    tip: "Use layout presets to keep a monitor setup and a laptop setup without rearranging everything every time."
}, {
    eyebrow: "Plan",
    title: "Due is different from planned",
    body: "Due time is when work must be finished. Planned time is when you want to sit down and do it.",
    icon: "layout-dashboard",
    tip: "Workspace uses planned time first, then due time, so your day feels more like a schedule."
}, {
    eyebrow: "Events",
    title: "Events and tasks can work together",
    body: "Import calendars, track meetings or appointments, then create follow-up tasks from anything that comes out of them.",
    icon: "calendar-clock",
    tip: "The Today rail in Workspace shows both events and tasks for the current day."
}, {
    eyebrow: "Sync",
    title: "Your account keeps everything together",
    body: "Settings lets you change timezone, theme, density, import/export backups, and clear workspace data when needed.",
    icon: "cloud-check",
    tip: "If the badge says Offline, keep TaskFlow installed and do not clear this site's stored data until it syncs again."
}, {
    eyebrow: "Beta",
    title: "A safer beta workspace",
    body: "TaskFlow beta focuses on clearer sync, stronger AI Assist actions, mobile polish, Google Calendar recovery, and safer backup guidance.",
    icon: "shield-check",
    tip: "Export a backup before testing major sync changes or clearing browser data."
}]
  , quickPlaceholders = ["Ask AI Assist to add, edit, schedule, or complete tasks and events..."]
  , statuses = [{
    id: "backlog",
    label: "Backlog",
    icon: "inbox",
    color: "#8b949e"
}, {
    id: "planned",
    label: "Planned",
    icon: "calendar-check",
    color: "#2f6fd6"
}, {
    id: "progress",
    label: "In progress",
    icon: "loader",
    color: "#137a63"
}, {
    id: "waiting",
    label: "Waiting",
    icon: "pause-circle",
    color: "#ba7900"
}, {
    id: "done",
    label: "Done",
    icon: "check-circle-2",
    color: "#7357d9"
}]
  , priorityOrder = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1
}
  , priorityLabels = {
    urgent: "Urgent",
    high: "High",
    medium: "Medium",
    low: "Low"
}
  , smartViews = [{
    id: "all",
    label: "All tasks",
    icon: "layout-dashboard"
}, {
    id: "today",
    label: "Today",
    icon: "sun"
}, {
    id: "upcoming",
    label: "Upcoming",
    icon: "calendar-clock"
}, {
    id: "overdue",
    label: "Overdue",
    icon: "alert-triangle"
}, {
    id: "waiting",
    label: "Waiting",
    icon: "pause-circle"
}, {
    id: "completed",
    label: "Completed",
    icon: "badge-check"
}]
  , els = {}
  , selectedTasks = new Set;
let deferredInstallPrompt = null
  , state = {
    tasks: [],
    meetings: [],
    generalNotes: {
        content: "",
        updatedAt: null
    },
    user: null,
    session: null,
    isOnline: navigator.onLine,
    pendingSyncIds: new Set,
    pendingDeleteIds: new Set,
    pendingMeetingSyncIds: new Set,
    pendingMeetingDeleteIds: new Set,
    deletedTaskTombstones: new Map,
    deletedMeetingTombstones: new Map,
    filters: {
        search: "",
        project: "all",
        tag: "all",
        priority: "all",
        due: "all",
        sort: "due"
    },
    smartView: "all",
    view: "unified",
    mobilePage: localStorage.getItem(MOBILE_PAGE_KEY) || "home",
    focusTaskId: null,
    activeMeetingId: null,
    meetingTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Australia/Sydney",
    unifiedLayout: defaultUnifiedLayout(),
    unifiedPresets: [],
    uiStyle: {
        ...defaultUiStyle
    },
    uiPresets: [],
    notifications: {
        ...defaultNotificationSettings
    },
    autoDeleteDoneDays: 0,
    accountAccess: {
        loaded: !1,
        tier: "base",
        holdUntil: "",
        holdReason: "",
        holdMessage: "",
        latestTierRequest: null,
        latestDeletionRequest: null
    },
    encryption: {
        enabled: "true" === localStorage.getItem(ENCRYPTION_ENABLED_KEY),
        unlocked: !1,
        key: null
    },
    density: "comfortable",
    welcomeStep: 0,
    forceWelcome: !1,
    isSyncing: !1,
    lastError: null,
    lastSyncMerge: null
}
  , calendarCursor = startOfMonth(new Date)
  , timer = {
    remaining: 1500,
    running: !1,
    intervalId: null
}
  , generalNotesSaveTimer = null
  , meetingNotesSaveTimer = null
  , unifiedLayoutSaveTimer = null
  , preferenceSyncTimer = null
  , uiStyleSyncTimer = null
  , notificationTimer = null
  , autoDeleteDoneTimer = null
  , googleCalendarSyncTimer = null
  , googleCalendarSyncDebounceTimer = null
  , googleCalendarAccessToken = ""
  , googleCalendarTokenExpiresAt = 0
  , googleCalendarSyncInFlight = !1
  , googleIdentityScriptPromise = null
  , workspaceSyncPromise = null
  , workspaceSyncQueued = !1
  , workspaceSyncRetryTimer = null
  , landingMotionReady = !1
  , serviceWorkerRefreshing = !1
  , liquidGlassRefreshTimer = null
  , webglLiquidGlassTimer = null
  , webglLiquidGlassModulePromise = null
  , webglLiquidGlassInstances = []
  , webglLiquidGlassSignature = ""
  , webglLiquidGlassGeneration = 0;
const renderedWorkspaceViews = new Set;
function verifyAuthorizedOrigin() {
    return !!isAuthorizedOrigin() || (document.body.classList.remove("auth-loading", "auth-ready"),
    document.body.classList.add("auth-required"),
    document.body.innerHTML = `\n    <section class="auth-gate" aria-label="Official TaskFlow access">\n      <div class="auth-card">\n        <div class="auth-brand">\n          <span class="brand-mark auth-mark" aria-hidden="true"><b></b><b></b><b></b></span>\n          <div><strong>TaskFlow</strong><span>Official access</span></div>\n        </div>\n        <div class="auth-copy">\n          <h1>TaskFlow cannot open here</h1>\n          <p>This copy of TaskFlow is not approved for this website.</p>\n        </div>\n        <p class="auth-message error">${errorText("TF-SEC-001")}</p>\n      </div>\n    </section>\n  `,
    !1)
}
function isAuthorizedOrigin() {
    if ("file:" === window.location.protocol)
        return !0;
    const e = window.location.hostname.toLowerCase();
    return authorizedHosts().some(t => {
        if (t.startsWith("*.")) {
            const n = t.slice(1);
            return e.endsWith(n) && e !== n.slice(1)
        }
        return e === t
    }
    )
}
function authorizedHosts() {
    const e = Array.isArray(window.TASKFLOW_SECURITY?.allowedHosts) ? window.TASKFLOW_SECURITY.allowedHosts : [];
    return unique([...DEFAULT_ALLOWED_HOSTS, ...e]).map(normalizeAllowedHost).filter(Boolean)
}
function normalizeAllowedHost(e) {
    const t = String(e || "").trim().toLowerCase();
    if (!t)
        return "";
    if (t.startsWith("*."))
        return t;
    try {
        return new URL(t.includes("://") ? t : `https://${t}`).hostname.replace(/^\[|\]$/g, "")
    } catch {
        return t.replace(/^https?:\/\//, "").replace(/^\/\//, "").split("/")[0].split(":")[0].replace(/^\[|\]$/g, "")
    }
}
function bindElements() {
    ["themeToggle", "authLoadingMessage", "landingPage", "authBackBtn", "authGate", "authEmailInput", "authPasswordForm", "authPasswordInput", "migrateLocalInput", "termsAcceptInput", "signInBtn", "createAccountBtn", "googleSignInBtn", "forgotPasswordBtn", "authMessage", "smartViews", "projectNav", "tagNav", "completionRing", "completionLabel", "metrics", "quickForm", "quickInput", "aiAssistHelpBtn", "aiAssistHelpDialog", "closeAiAssistHelpBtn", "activityPulse", "saveStatus", "accountChip", "accountSettingsBtn", "importFile", "installAppBtn", "newTaskBtn", "newMeetingTopBtn", "searchInput", "projectFilter", "tagFilter", "priorityFilter", "dueFilter", "sortSelect", "clearFiltersBtn", "viewTitle", "viewSubtitle", "workspaceToolbar", "nudgePanel", "viewTabs", "mobilePageNav", "boardView", "listView", "calendarView", "unifiedView", "meetingsView", "analyticsView", "focusView", "taskDialog", "taskForm", "taskId", "dialogTitle", "closeDialogBtn", "titleInput", "projectInput", "projectSuggestions", "statusInput", "priorityInput", "dueInput", "dueTimeInput", "plannedDateInput", "plannedStartInput", "plannedEndInput", "estimateInput", "energyInput", "recurrenceInput", "tagsInput", "notesInput", "subtaskList", "addSubtaskBtn", "deleteTaskBtn", "duplicateTaskBtn", "meetingDialog", "meetingForm", "meetingId", "meetingDialogTitle", "closeMeetingDialogBtn", "meetingTitleInput", "meetingSubjectInput", "meetingStatusInput", "meetingDateInput", "meetingStartInput", "meetingEndInput", "meetingRecurrenceInput", "meetingRepeatUntilInput", "meetingTeacherInput", "meetingLocationInput", "meetingTopicInput", "meetingNotesInput", "meetingCreateTaskBtn", "deleteMeetingBtn", "deleteMeetingsDialog", "deleteMeetingsForm", "deleteMeetingsScope", "cancelDeleteMeetingsBtn", "accountSettingsDialog", "accountSettingsForm", "closeSettingsDialogBtn", "settingsSectionTabs", "settingsEmail", "settingsTimezoneInput", "settingsDensityInput", "settingsCustomizeUiBtn", "settingsNotificationsInput", "settingsNotificationLeadInput", "settingsAutoDeleteDoneInput", "settingsDensityToggleBtn", "settingsTestNotificationBtn", "settingsTutorialBtn", "settingsSyncBadge", "settingsSyncSummary", "settingsSyncDetails", "settingsSyncAdvice", "settingsSyncNowBtn", "settingsActivityBadge", "settingsActivitySummary", "settingsActivityList", "settingsActivityExportBtn", "settingsActivityClearBtn", "settingsGoogleCalendarBadge", "settingsGoogleCalendarSummary", "settingsGoogleCalendarAdvice", "settingsGoogleCalendarDetails", "settingsGoogleCalendarAutoInput", "settingsGoogleCalendarSyncBtn", "settingsGoogleCalendarRepairBtn", "settingsDiagnosticsBadge", "settingsDiagnosticsSummary", "settingsDiagnosticsGrid", "settingsDiagnosticsAdvice", "settingsDiagnosticsCopyBtn", "settingsPlanSummary", "settingsTierBadge", "settingsUsageSummary", "settingsUsageMeter", "settingsWorkspaceSummary", "settingsWorkspaceMeter", "settingsTierRequestStatus", "settingsTierRequestBtn", "settingsEncryptionBadge", "settingsEncryptionSummary", "settingsEncryptionPassphraseInput", "settingsEncryptionAdvice", "settingsEnableEncryptionBtn", "settingsLockEncryptionBtn", "settingsDisableEncryptionBtn", "settingsExportBtn", "settingsImportBtn", "settingsDeleteDoneBtn", "settingsDeleteDataBtn", "settingsRestoreBadge", "settingsRestoreSummary", "settingsRestorePointInput", "settingsCreateRestorePointBtn", "settingsRestorePointBtn", "settingsExportRestorePointBtn", "settingsFeedbackBtn", "settingsDeletionStatus", "settingsDeletionRequestBtn", "settingsLicenseBtn", "settingsPrivacyBtn", "settingsSignOutBtn", "settingsAppVersion", "appearanceDialog", "appearanceForm", "closeAppearanceDialogBtn", "appearancePresetTitle", "appearancePresetDescription", "appearancePresetGrid", "appearanceModeBadge", "appearanceThemeInput", "appearanceWallpaperInput", "appearanceWallpaperStatus", "appearanceWallpaperUploadInput", "appearanceWallpaperUploadBtn", "appearanceWallpaperClearBtn", "appearanceGlassInput", "appearanceMotionInput", "appearanceAccentPicker", "appearanceGlassOpacityInput", "appearanceGlassBlurInput", "appearanceGlassSaturationInput", "appearanceGlassContrastInput", "appearanceBorderShineInput", "appearanceShadowStrengthInput", "appearanceCornerRadiusInput", "appearanceButtonOpacityInput", "appearanceWindowOpacityInput", "appearanceSidebarOpacityInput", "appearanceWallpaperIntensityInput", "appearanceMotionEnergyInput", "appearanceTextScaleInput", "appearanceCompactSurfacesInput", "appearanceSidebarAutoHideInput", "appearanceSidebarModeInput", "appearanceSavePresetBtn", "appearanceResetBtn", "appearanceDoneBtn", "welcomeDialog", "skipWelcomeBtn", "welcomeEyebrow", "welcomeTitle", "welcomeBody", "welcomeTip", "welcomeSteps", "welcomeBackBtn", "welcomeNextBtn", "usageLimitDialog", "usageLimitTitle", "usageLimitMessage", "usageLimitMeta", "usageLimitCloseBtn", "usageLimitRequestBtn", "tierRequestDialog", "tierRequestForm", "tierRequestFirstNameInput", "tierRequestLastNameInput", "tierRequestTierInput", "tierRequestReasonInput", "tierRequestMessage", "tierRequestCancelBtn", "tierRequestSubmitBtn", "tierOutcomeDialog", "tierOutcomeTitle", "tierOutcomeMessage", "tierOutcomeMeta", "tierOutcomeCloseBtn", "feedbackDialog", "feedbackForm", "feedbackTypeInput", "feedbackSubjectInput", "feedbackMessageInput", "feedbackIncludeDiagnosticsInput", "feedbackIncludeSummaryInput", "feedbackMessage", "feedbackCancelBtn", "feedbackSubmitBtn", "accountDeletionDialog", "accountDeletionForm", "accountDeletionReasonInput", "accountDeletionConfirmInput", "accountDeletionMessage", "accountDeletionCancelBtn", "accountDeletionSubmitBtn", "confirmDialog", "confirmTitle", "confirmMessage", "confirmActionBtn", "toastContainer"].forEach(e => {
        els[e] = document.getElementById(e)
    }
    )
}
function bindEvents() {
    document.querySelectorAll("[data-auth-open]").forEach(e => {
        e.addEventListener("click", () => showAuthGate())
    }
    ),
    els.authBackBtn.addEventListener("click", showLandingPage),
    els.themeToggle.addEventListener("click", openAppearanceDialog),
    els.authPasswordForm.addEventListener("submit", handleSignIn),
    els.createAccountBtn.addEventListener("click", handleCreateAccount),
    els.googleSignInBtn.addEventListener("click", handleGoogleSignIn),
    els.forgotPasswordBtn.addEventListener("click", handlePasswordReset),
    els.accountSettingsBtn.addEventListener("click", openAccountSettings),
    els.saveStatus.addEventListener("click", forceSyncNow),
    els.quickForm.addEventListener("submit", handleQuickAdd),
    els.quickInput.addEventListener("input", autosizeQuickInput),
    els.quickInput.addEventListener("keydown", e => {
        (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(),
        els.quickForm.requestSubmit())
    }
    ),
    els.aiAssistHelpBtn?.addEventListener("click", openAiAssistHelp),
    els.closeAiAssistHelpBtn?.addEventListener("click", () => els.aiAssistHelpDialog?.close()),
    els.importFile.addEventListener("change", importTasks),
    els.installAppBtn.addEventListener("click", installTaskFlowApp),
    els.newTaskBtn.addEventListener("click", () => openTaskDialog()),
    els.newMeetingTopBtn?.addEventListener("click", () => openMeetingDialog()),
    els.clearFiltersBtn.addEventListener("click", clearFilters),
    els.searchInput.addEventListener("input", e => {
        state.filters.search = e.target.value.trim().toLowerCase(),
        renderAll()
    }
    ),
    document.addEventListener("input", e => {
        e.target?.matches?.("#generalNotesInput, #unifiedNotesInput") && handleGeneralNotesInput(e)
    }
    ),
    document.addEventListener("click", e => {
        const t = e.target.closest("[data-empty-action]")?.dataset.emptyAction;
        t && ("task" === t && openTaskDialog(),
        "event" === t && openMeetingDialog(),
        "ai" === t && (els.quickInput?.focus(),
        els.quickInput?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })))
    }
    ),
    [["projectFilter", "project"], ["tagFilter", "tag"], ["priorityFilter", "priority"], ["dueFilter", "due"], ["sortSelect", "sort"]].forEach( ([e,t]) => {
        els[e].addEventListener("change", e => {
            state.filters[t] = e.target.value,
            renderAll()
        }
        )
    }
    ),
    els.viewTabs.addEventListener("click", e => {
        const t = e.target.closest("[data-view]");
        t && (state.view = t.dataset.view,
        renderWorkspaceTitle(),
        renderWorkspaceToolbar(),
        renderNudgePanel(),
        updateViewVisibility(),
        renderActiveView(),
        isMobileViewport() && setMobilePage(mobilePageForView(state.view), {
            quiet: !0,
            preserveView: !0
        }),
        refreshIcons())
    }
    ),
    els.mobilePageNav?.addEventListener("click", e => {
        const t = e.target.closest("[data-mobile-page]");
        t && setMobilePage(t.dataset.mobilePage)
    }
    ),
    window.addEventListener("resize", () => setMobilePage(state.mobilePage, {
        quiet: !0,
        preserveView: !0
    }), {
        passive: !0
    }),
    els.taskForm.addEventListener("submit", saveTaskFromDialog),
    els.closeDialogBtn.addEventListener("click", () => els.taskDialog.close()),
    els.addSubtaskBtn.addEventListener("click", () => addSubtaskRow()),
    els.deleteTaskBtn.addEventListener("click", handleDeleteFromDialog),
    els.duplicateTaskBtn.addEventListener("click", handleDuplicateFromDialog),
    els.meetingForm.addEventListener("submit", saveMeetingFromDialog),
    els.closeMeetingDialogBtn.addEventListener("click", () => els.meetingDialog.close()),
    els.deleteMeetingBtn.addEventListener("click", handleDeleteMeetingFromDialog),
    els.meetingCreateTaskBtn.addEventListener("click", createTaskFromMeetingDialog),
    els.deleteMeetingsForm.addEventListener("submit", handleDeleteMeetingsScope),
    els.cancelDeleteMeetingsBtn.addEventListener("click", () => els.deleteMeetingsDialog.close()),
    els.accountSettingsForm.addEventListener("submit", e => e.preventDefault()),
    els.closeSettingsDialogBtn.addEventListener("click", () => els.accountSettingsDialog.close()),
    els.settingsSectionTabs?.addEventListener("click", e => {
        const t = e.target.closest("[data-settings-section-target]");
        t && setSettingsSection(t.dataset.settingsSectionTarget)
    }
    ),
    [els.settingsTimezoneInput, els.settingsDensityInput, els.settingsNotificationLeadInput, els.settingsAutoDeleteDoneInput].forEach(e => {
        e.addEventListener("change", autosaveAccountSettings)
    }
    ),
    els.settingsNotificationsInput.addEventListener("change", autosaveAccountSettings),
    els.settingsCustomizeUiBtn.addEventListener("click", openAppearanceDialog),
    els.closeAppearanceDialogBtn.addEventListener("click", () => els.appearanceDialog.close()),
    els.appearanceDoneBtn.addEventListener("click", () => els.appearanceDialog.close()),
    els.appearanceResetBtn.addEventListener("click", () => applyUiStyle(uiStylePresets.og, {
        sync: !0,
        toastMessage: "OG TaskFlow restored"
    })),
    [els.appearanceThemeInput, els.appearanceWallpaperInput, els.appearanceGlassInput, els.appearanceMotionInput, els.appearanceCompactSurfacesInput, els.appearanceSidebarAutoHideInput, els.appearanceSidebarModeInput].forEach(e => {
        e.addEventListener("change", handleCustomUiInput)
    }
    ),
    els.appearanceWallpaperUploadBtn?.addEventListener("click", () => els.appearanceWallpaperUploadInput?.click()),
    els.appearanceWallpaperUploadInput?.addEventListener("change", handleWallpaperUpload),
    els.appearanceWallpaperClearBtn?.addEventListener("click", clearCustomWallpaper),
    els.appearanceSavePresetBtn?.addEventListener("click", saveCurrentUiPreset),
    els.appearancePresetGrid.addEventListener("click", e => {
        const t = e.target.closest("[data-delete-ui-preset]");
        if (t)
            return e.stopPropagation(),
            void deleteUiPreset(t.dataset.deleteUiPreset);
        const n = e.target.closest("[data-custom-ui-preset]");
        if (n) {
            const e = state.uiPresets.find(e => e.id === n.dataset.customUiPreset);
            return void (e && applyUiStyle(e.style, {
                sync: !0,
                toastMessage: `${e.name} applied`
            }))
        }
        const a = e.target.closest("[data-ui-preset]");
        if (!a)
            return;
        const s = uiStylePresets[a.dataset.uiPreset];
        s && applyUiStyle(s, {
            sync: !0,
            toastMessage: `${s.name} applied`
        })
    }
    ),
    appearanceRangeInputs().forEach(e => e.addEventListener("input", handleCustomUiInput)),
    els.appearanceAccentPicker.addEventListener("click", e => {
        const t = e.target.closest("[data-ui-accent]");
        t && setCustomAccent(t.dataset.uiAccent)
    }
    ),
    els.settingsExportBtn.addEventListener("click", exportTasks),
    els.settingsImportBtn.addEventListener("click", () => els.importFile.click()),
    els.settingsDeleteDataBtn.addEventListener("click", handleDeleteWorkspaceData),
    els.settingsCreateRestorePointBtn?.addEventListener("click", () => {
        toast(createRestorePoint("Manual restore point", {
            force: !0
        }) ? "Restore point created" : "Nothing to save yet")
    }
    ),
    els.settingsRestorePointBtn?.addEventListener("click", restoreSelectedRestorePoint),
    els.settingsExportRestorePointBtn?.addEventListener("click", exportSelectedRestorePoint),
    els.settingsFeedbackBtn?.addEventListener("click", openFeedbackDialog),
    els.settingsDeletionRequestBtn?.addEventListener("click", openAccountDeletionDialog),
    els.settingsLicenseBtn.addEventListener("click", () => window.open("TERMS.html", "_blank", "noopener")),
    els.settingsPrivacyBtn?.addEventListener("click", () => window.open("privacy-policy.html", "_blank", "noopener")),
    els.settingsSignOutBtn.addEventListener("click", handleSignOut),
    els.settingsDensityToggleBtn.addEventListener("click", toggleDensity),
    els.settingsTestNotificationBtn.addEventListener("click", sendTestNotification),
    els.settingsSyncNowBtn.addEventListener("click", forceSyncNow),
    els.settingsActivityExportBtn?.addEventListener("click", exportSyncActivityLog),
    els.settingsActivityClearBtn?.addEventListener("click", clearSyncActivityLog),
    els.settingsDiagnosticsCopyBtn?.addEventListener("click", copyDiagnosticsToClipboard),
    els.settingsGoogleCalendarSyncBtn?.addEventListener("click", () => syncTaskFlowToGoogleCalendar({
        forcePrompt: !googleCalendarAccessToken && !googleCalendarConnected(),
        enableAuto: !0
    })),
    els.settingsGoogleCalendarRepairBtn?.addEventListener("click", repairGoogleCalendarSync),
    els.settingsGoogleCalendarAutoInput?.addEventListener("change", async () => {
        if (els.settingsGoogleCalendarAutoInput.checked && !googleCalendarConnected())
            return await syncTaskFlowToGoogleCalendar({
                forcePrompt: !0,
                enableAuto: !0
            }),
            void updateGoogleCalendarSettingsPanel();
        setGoogleCalendarStorage(GOOGLE_CALENDAR_AUTO_SYNC_KEY, els.settingsGoogleCalendarAutoInput.checked ? "true" : "false"),
        els.settingsGoogleCalendarAutoInput.checked ? startGoogleCalendarAutoSync() : stopGoogleCalendarAutoSync(),
        scheduleUserPreferencesSync(),
        updateGoogleCalendarSettingsPanel(),
        toast(els.settingsGoogleCalendarAutoInput.checked ? "Google Calendar auto-sync enabled" : "Google Calendar auto-sync paused")
    }
    ),
    els.settingsTierRequestBtn.addEventListener("click", openTierRequestDialog),
    els.settingsEnableEncryptionBtn.addEventListener("click", handleEnableOrUnlockEncryption),
    els.settingsLockEncryptionBtn.addEventListener("click", lockEncryption),
    els.settingsDisableEncryptionBtn?.addEventListener("click", handleDisableEncryption),
    els.settingsDeleteDoneBtn.addEventListener("click", () => {
        els.accountSettingsDialog.close(),
        deleteDoneTasks()
    }
    ),
    els.settingsTutorialBtn.addEventListener("click", () => {
        els.accountSettingsDialog.close(),
        showWelcomeTutorial()
    }
    ),
    els.skipWelcomeBtn.addEventListener("click", finishWelcome),
    els.welcomeBackBtn.addEventListener("click", () => moveWelcome(-1)),
    els.welcomeNextBtn.addEventListener("click", () => moveWelcome(1)),
    els.usageLimitCloseBtn.addEventListener("click", () => els.usageLimitDialog.close()),
    els.usageLimitRequestBtn.addEventListener("click", () => {
        els.usageLimitDialog.close(),
        openTierRequestDialog()
    }
    ),
    els.tierRequestForm.addEventListener("submit", submitTierRequest),
    els.tierRequestCancelBtn.addEventListener("click", () => els.tierRequestDialog.close()),
    els.tierOutcomeCloseBtn.addEventListener("click", () => els.tierOutcomeDialog.close()),
    els.feedbackForm?.addEventListener("submit", submitFeedbackReport),
    els.feedbackCancelBtn?.addEventListener("click", () => els.feedbackDialog.close()),
    els.accountDeletionForm?.addEventListener("submit", submitAccountDeletionRequest),
    els.accountDeletionCancelBtn?.addEventListener("click", () => els.accountDeletionDialog.close()),
    document.addEventListener("keydown", e => {
        const t = e.ctrlKey || e.metaKey;
        t && "k" === e.key.toLowerCase() && (e.preventDefault(),
        els.quickInput.focus()),
        t && "n" === e.key.toLowerCase() && (e.preventDefault(),
        openTaskDialog())
    }
    ),
    window.addEventListener("online", () => {
        state.isOnline = !0,
        recordSyncActivity("device", "success", "Device is online", {}, {
            dedupeMs: 12e4
        }),
        updateSaveStatus(),
        syncPendingTasks(),
        preferencesSyncPending() && syncUserPreferences().catch(e => console.warn("Preference sync failed", e)),
        startGoogleCalendarAutoSync()
    }
    ),
    window.addEventListener("offline", () => {
        state.isOnline = !1,
        recordSyncActivity("device", "warning", "Device went offline", {}, {
            dedupeMs: 12e4
        }),
        updateSaveStatus(),
        stopGoogleCalendarAutoSync()
    }
    ),
    window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault(),
        deferredInstallPrompt = e,
        els.installAppBtn && (els.installAppBtn.hidden = !1)
    }
    ),
    window.addEventListener("appinstalled", () => {
        deferredInstallPrompt = null,
        els.installAppBtn && (els.installAppBtn.hidden = !0),
        toast("TaskFlow installed")
    }
    )
}
function setupLandingMotion() {
    const e = [...document.querySelectorAll(".landing-reveal")];
    if (!e.length)
        return;
    const t = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (t || isMobileStabilityMode())
        return void e.forEach(e => e.classList.add("is-visible"));
    e.forEach( (e, t) => {
        e.style.setProperty("--reveal-delay", 70 * Math.min(t % 4, 3) + "ms")
    }
    ),
    landingMotionReady = !0;
    const n = document.querySelector(".landing-preview-scene")
      , a = () => {
        if (!document.body.classList.contains("signed-out-landing"))
            return;
        if (e.forEach(e => {
            if (e.classList.contains("is-visible"))
                return;
            const t = e.getBoundingClientRect();
            t.top < .88 * window.innerHeight && t.bottom > -80 && e.classList.add("is-visible")
        }
        ),
        !n)
            return;
        const t = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
        n.style.setProperty("--landing-parallax", 34 * t + "px")
    }
    ;
    window.addEventListener("scroll", a, {
        passive: !0
    }),
    window.addEventListener("resize", a, {
        passive: !0
    }),
    a(),
    window.refreshTaskFlowLandingMotion = a
}
async function installTaskFlowApp() {
    if (!deferredInstallPrompt)
        return void toast("Use your browser menu to install TaskFlow on this device.");
    deferredInstallPrompt.prompt();
    const e = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null,
    els.installAppBtn && (els.installAppBtn.hidden = !0),
    "accepted" === e?.outcome && toast("TaskFlow install started")
}
function registerServiceWorker() {
    "serviceWorker"in navigator && "file:" !== window.location.protocol && window.addEventListener("load", async () => {
        try {
            const e = await navigator.serviceWorker.register("./service-worker.js")
              , t = Boolean(navigator.serviceWorker.controller);
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                t && notifyServiceWorkerUpdated()
            }
            ),
            e.addEventListener("updatefound", () => {
                const t = e.installing;
                t && t.addEventListener("statechange", () => {
                    "installed" === t.state && navigator.serviceWorker.controller && (notifyServiceWorkerUpdated(),
                    t.postMessage({
                        type: "SKIP_WAITING"
                    }))
                }
                )
            }
            ),
            await e.update()
        } catch (e) {
            console.warn("TaskFlow service worker registration failed", e)
        }
    }
    )
}
function notifyServiceWorkerUpdated() {
    serviceWorkerRefreshing || (serviceWorkerRefreshing = !0,
    showActivityPulse("TaskFlow updated. Refresh when you're ready.", {
        kind: "notification"
    }))
}
function loadDensity() {
    const e = localStorage.getItem(DENSITY_KEY);
    state.density = "compact" === e ? "compact" : "comfortable",
    document.documentElement.dataset.density = state.density,
    setDensityButton()
}
function toggleDensity() {
    state.density = "compact" === state.density ? "comfortable" : "compact",
    document.documentElement.dataset.density = state.density,
    localStorage.setItem(DENSITY_KEY, state.density),
    els.settingsDensityInput && (els.settingsDensityInput.value = state.density),
    setDensityButton(),
    syncUserPreferences().catch(e => console.warn("Preference sync failed", e)),
    toast(("compact" === state.density ? "Compact" : "Comfortable") + " density")
}
function setDensityButton() {
    if (!els.settingsDensityToggleBtn)
        return;
    const e = "compact" === state.density;
    els.settingsDensityToggleBtn.innerHTML = `<i data-lucide="${e ? "panel-top-open" : "rows-3"}"></i>${e ? "Comfort" : "Compact"}`,
    refreshIcons()
}
function loadNotificationSettings() {
    try {
        const e = JSON.parse(localStorage.getItem(NOTIFICATION_SETTINGS_KEY) || "{}");
        state.notifications = normalizeNotificationSettings(e)
    } catch {
        state.notifications = {
            ...defaultNotificationSettings
        }
    }
}
function normalizeNotificationSettings(e={}) {
    const t = Number(e.leadMinutes);
    return {
        enabled: Boolean(e.enabled),
        leadMinutes: [0, 5, 10, 15, 30, 60].includes(t) ? t : defaultNotificationSettings.leadMinutes
    }
}
function saveNotificationSettings() {
    state.notifications = normalizeNotificationSettings(state.notifications),
    localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(state.notifications))
}
function loadAutoDeleteDoneSetting() {
    state.autoDeleteDoneDays = normalizeAutoDeleteDoneDays(localStorage.getItem(AUTO_DELETE_DONE_KEY))
}
function normalizeAutoDeleteDoneDays(e) {
    const t = Number(e);
    return AUTO_DELETE_DONE_OPTIONS.includes(t) ? t : 0
}
function saveAutoDeleteDoneSetting() {
    state.autoDeleteDoneDays = normalizeAutoDeleteDoneDays(state.autoDeleteDoneDays),
    localStorage.setItem(AUTO_DELETE_DONE_KEY, String(state.autoDeleteDoneDays))
}
function startAutoDeleteDoneScheduler() {
    autoDeleteDoneTimer && window.clearInterval(autoDeleteDoneTimer),
    autoDeleteDoneTimer = window.setInterval( () => {
        autoDeleteExpiredDoneTasks({
            quiet: !0
        }) && renderAll()
    }
    , 18e5),
    window.setTimeout( () => {
        autoDeleteExpiredDoneTasks({
            quiet: !0
        }) && renderAll()
    }
    , 2400)
}
function notificationsSupported() {
    return "undefined" != typeof window && "Notification"in window
}
function notificationPermission() {
    return notificationsSupported() ? Notification.permission : "unsupported"
}
async function ensureNotificationPermission() {
    if (!notificationsSupported())
        return toast("This browser does not support notifications"),
        !1;
    if ("granted" === Notification.permission)
        return !0;
    if ("denied" === Notification.permission)
        return toast("Notifications are blocked in browser settings"),
        !1;
    const e = await Notification.requestPermission();
    return "granted" !== e && toast("Notifications were not enabled"),
    "granted" === e
}
function startNotificationScheduler() {
    notificationTimer && window.clearInterval(notificationTimer),
    notificationTimer = window.setInterval(checkDueNotifications, 6e4),
    window.setTimeout(checkDueNotifications, 1600)
}
async function sendTaskFlowNotification(e, t={}) {
    if (!state.notifications.enabled || "granted" !== notificationPermission())
        return !1;
    const n = {
        body: t.body || "",
        icon: "icons/icon-192.png",
        badge: "icons/icon-192.png",
        tag: t.tag || `taskflow-${Date.now()}`,
        renotify: !1
    };
    try {
        if ("serviceWorker"in navigator) {
            const t = await navigator.serviceWorker.ready;
            await t.showNotification(e, n)
        } else
            new Notification(e,n);
        return !0
    } catch (a) {
        return console.warn("Notification failed", a),
        !1
    }
}
async function sendTestNotification() {
    await ensureNotificationPermission() && (state.notifications.enabled = !0,
    saveNotificationSettings(),
    populateAccountSettings(),
    await sendTaskFlowNotification("TaskFlow reminders are on", {
        body: "You will get reminders for planned work, due times, and events while TaskFlow is active.",
        tag: "taskflow-test-notification"
    }),
    showActivityPulse("Test notification sent", {
        kind: "notification"
    }))
}
function readNotifiedReminderIds() {
    try {
        const e = JSON.parse(localStorage.getItem(NOTIFIED_REMINDERS_KEY) || "[]");
        return new Set(Array.isArray(e) ? e : [])
    } catch {
        return new Set
    }
}
function saveNotifiedReminderIds(e) {
    const t = [...e].slice(-500);
    localStorage.setItem(NOTIFIED_REMINDERS_KEY, JSON.stringify(t))
}
function checkDueNotifications() {
    if (!state.notifications.enabled || "granted" !== notificationPermission())
        return;
    const e = dueNotificationItems(new Date);
    if (!e.length)
        return;
    const t = readNotifiedReminderIds();
    e.forEach(e => {
        t.has(e.id) || (t.add(e.id),
        sendTaskFlowNotification(e.title, {
            body: e.body,
            tag: e.id
        }))
    }
    ),
    saveNotifiedReminderIds(t)
}
function dueNotificationItems(e=new Date) {
    const t = 60 * Number(state.notifications.leadMinutes || 0) * 1e3
      , n = [];
    return state.tasks.forEach(a => {
        if (a.completed || "done" === a.status)
            return;
        const s = taskDateTime(a.plannedDate, a.plannedStart);
        s && shouldNotifyAt(s, e, t) && n.push({
            id: notificationId("planned", a.id, s),
            title: `Plan now: ${a.title}`,
            body: a.project ? `${a.project} · ${formatPlannedWorkLabel(a)}` : formatPlannedWorkLabel(a)
        });
        const i = taskDateTime(a.dueDate, a.dueTime);
        i && shouldNotifyAt(i, e, t) && n.push({
            id: notificationId("due", a.id, i),
            title: `Due soon: ${a.title}`,
            body: a.project ? `${a.project} · ${formatDueLabel(a)}` : formatDueLabel(a)
        })
    }
    ),
    state.meetings.forEach(a => {
        if ("scheduled" !== a.status)
            return;
        const s = meetingStartDateTime(a);
        shouldNotifyAt(s, e, t) && n.push({
            id: notificationId("event", a.id, s),
            title: `Event soon: ${a.title}`,
            body: [formatMeetingDateTime(a), a.location].filter(Boolean).join(" · ")
        })
    }
    ),
    n
}
function shouldNotifyAt(e, t, n) {
    const a = e.getTime() - n
      , s = t.getTime();
    return s >= a && s <= e.getTime() + 3e5
}
function taskDateTime(e, t) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e || "") || !isValidTime(t))
        return null;
    const [n,a,s] = e.split("-").map(Number)
      , [i,o] = t.split(":").map(Number);
    return new Date(n,a - 1,s,i,o,0,0)
}
function notificationId(e, t, n) {
    return `taskflow:${e}:${t}:${n.toISOString().slice(0, 16)}`
}
function defaultUnifiedLayout() {
    return unifiedWindowDefaults.map(e => ({
        ...e
    }))
}
function defaultUnifiedPresets() {
    return [{
        id: "default",
        name: "Default",
        layout: defaultUnifiedLayout(),
        builtIn: !0,
        updatedAt: new Date(0).toISOString()
    }]
}
function normalizeUnifiedLayout(e) {
    const t = Array.isArray(e) ? e : []
      , n = new Map(unifiedWindowDefaults.map(e => [e.id, e]))
      , a = new Map;
    t.forEach( (e, t) => {
        const s = n.get(e?.id);
        s && a.set(e.id, normalizeUnifiedWindowLayout(e, s, t + 1))
    }
    );
    const s = t.map(e => a.get(e?.id)).filter(Boolean).filter( (e, t, n) => n.findIndex(t => t.id === e.id) === t);
    return unifiedWindowDefaults.forEach(e => {
        s.some(t => t.id === e.id) || s.push(normalizeUnifiedWindowLayout(e, e, s.length + 1))
    }
    ),
    s.map( (e, t) => ({
        ...e,
        z: clampNumber(e.z, 1, 9999, t + 1)
    }))
}
function normalizeUnifiedWindowLayout(e, t, n=1) {
    const a = e?.width ?? e?.w ?? (e?.span ? spanToUnifiedWidth(e.span) : null) ?? t.width
      , s = e?.height ?? e?.h ?? t.height;
    return {
        id: t.id,
        x: clampNumber(e?.x, 0, 2e4, t.x),
        y: clampNumber(e?.y, 0, 2200, t.y),
        width: clampNumber(a, 260, 2e4, t.width),
        height: clampNumber(s, 190, 900, t.height),
        z: clampNumber(e?.z, 1, 9999, t.z || n),
        hidden: Boolean(e?.hidden)
    }
}
function spanToUnifiedWidth(e) {
    const t = Number(e);
    return Number.isFinite(t) ? Math.round(86 * Math.min(12, Math.max(3, t))) : null
}
function clampNumber(e, t, n, a) {
    const s = Number(e);
    return Number.isFinite(s) ? Math.min(n, Math.max(t, s)) : a
}
function loadUnifiedLayout() {
    try {
        state.unifiedLayout = normalizeUnifiedLayout(JSON.parse(localStorage.getItem(UNIFIED_LAYOUT_KEY) || "[]"))
    } catch {
        state.unifiedLayout = defaultUnifiedLayout()
    }
    saveUnifiedLayoutLocal()
}
function saveUnifiedLayoutLocal() {
    localStorage.setItem(UNIFIED_LAYOUT_KEY, JSON.stringify(state.unifiedLayout))
}
function loadUnifiedPresets() {
    try {
        state.unifiedPresets = normalizeUnifiedPresets(JSON.parse(localStorage.getItem(UNIFIED_PRESETS_KEY) || "[]"))
    } catch {
        state.unifiedPresets = defaultUnifiedPresets()
    }
    saveUnifiedPresetsLocal()
}
function normalizeUnifiedPresets(e) {
    const t = Array.isArray(e) ? e : []
      , n = new Map(defaultUnifiedPresets().map(e => [e.id, e]));
    return t.forEach(e => {
        const t = cleanToken(e?.id || e?.name || uid()).slice(0, 40) || uid()
          , a = cleanTitle(e?.name || "Layout").slice(0, 32) || "Layout"
          , s = normalizeUnifiedLayout(e?.layout);
        n.set(t, {
            id: t,
            name: a,
            layout: s,
            builtIn: Boolean(e?.builtIn && "default" === t),
            updatedAt: e?.updatedAt || (new Date).toISOString()
        })
    }
    ),
    [...n.values()].sort( (e, t) => e.builtIn === t.builtIn ? e.name.localeCompare(t.name) : e.builtIn ? -1 : 1).slice(0, 8)
}
function saveUnifiedPresetsLocal() {
    state.unifiedPresets = normalizeUnifiedPresets(state.unifiedPresets),
    localStorage.setItem(UNIFIED_PRESETS_KEY, JSON.stringify(state.unifiedPresets))
}
function unifiedPresetOptions() {
    return normalizeUnifiedPresets(state.unifiedPresets)
}
function saveCurrentUnifiedPreset() {
    const e = cleanTitle(window.prompt("Name this Workspace view", suggestedUnifiedPresetName()) || "");
    if (!e)
        return;
    const t = cleanToken(e).slice(0, 40) || uid()
      , n = state.unifiedPresets.find(e => e.id === t)
      , a = {
        id: t,
        name: e.slice(0, 32),
        layout: normalizeUnifiedLayout(state.unifiedLayout),
        builtIn: !1,
        updatedAt: (new Date).toISOString()
    };
    state.unifiedPresets = normalizeUnifiedPresets([...n ? state.unifiedPresets.filter(e => e.id !== t) : state.unifiedPresets, a]),
    saveUnifiedPresetsLocal(),
    syncUserPreferences(),
    renderWorkspaceToolbar(),
    renderUnified(),
    toast(n ? "Workspace view updated" : "Workspace view saved")
}
function suggestedUnifiedPresetName() {
    const e = Math.round(window.innerWidth || 0);
    return e >= 1500 ? "Monitor" : e <= 900 ? "Laptop" : "My layout"
}
function applyUnifiedPreset(e) {
    const t = unifiedPresetOptions().find(t => t.id === e);
    t ? (state.unifiedLayout = normalizeUnifiedLayout(t.layout),
    saveUnifiedLayout(),
    renderWorkspaceToolbar(),
    renderUnified(),
    toast(`${t.name} Workspace view applied`)) : toast("Choose a saved Workspace view first")
}
function deleteUnifiedPreset(e) {
    const t = unifiedPresetOptions().find(t => t.id === e);
    t && !t.builtIn ? (state.unifiedPresets = normalizeUnifiedPresets(state.unifiedPresets.filter(t => t.id !== e)),
    saveUnifiedPresetsLocal(),
    syncUserPreferences(),
    renderWorkspaceToolbar(),
    renderUnified(),
    toast("Workspace view deleted")) : toast("Choose a saved custom view to delete")
}
function resetUnifiedLayout() {
    state.unifiedLayout = defaultUnifiedLayout(),
    saveUnifiedLayout(),
    renderWorkspaceToolbar(),
    renderUnified(),
    toast("Workspace layout reset")
}
function saveUnifiedLayoutUpdatedAt(e=(new Date).toISOString()) {
    return localStorage.setItem(UNIFIED_LAYOUT_UPDATED_KEY, e),
    e
}
function localUnifiedLayoutUpdatedAt() {
    return localStorage.getItem(UNIFIED_LAYOUT_UPDATED_KEY) || ""
}
function getUnifiedLayoutItem(e) {
    return state.unifiedLayout.find(t => t.id === e) || unifiedWindowDefaults.find(t => t.id === e) || {
        id: e,
        x: 0,
        y: 0,
        width: 320,
        height: 300,
        z: 1
    }
}
function saveUnifiedLayout(e={}) {
    state.unifiedLayout = normalizeUnifiedLayout(state.unifiedLayout),
    saveUnifiedLayoutLocal();
    const t = saveUnifiedLayoutUpdatedAt();
    e.quiet || updateSaveStatus(),
    clearTimeout(unifiedLayoutSaveTimer),
    scheduleUserPreferencesSync({
        layoutUpdatedAt: t,
        delay: e.immediate ? 0 : 650
    })
}
function updateUnifiedWindowLayout(e, t, n={}) {
    state.unifiedLayout = normalizeUnifiedLayout(state.unifiedLayout.map(n => n.id === e ? {
        ...n,
        ...t
    } : n)),
    !1 !== n.save && saveUnifiedLayout(n)
}
function bringUnifiedWindowForward(e, t={}) {
    const n = normalizeUnifiedLayout(state.unifiedLayout)
      , a = n.find(t => t.id === e);
    if (!a)
        return a;
    const s = Math.max(...n.map(e => Number(e.z) || 1)) + 1;
    return a.z = s,
    state.unifiedLayout = normalizeUnifiedLayout(n),
    t.save && saveUnifiedLayout({
        quiet: !0
    }),
    a
}
function unifiedCanvasHeight() {
    const e = normalizeUnifiedLayout(state.unifiedLayout).reduce( (e, t) => Math.max(e, t.y + t.height), 0);
    return Math.min(2200, Math.max(760, e + 18))
}
function unifiedWindowInlineStyle(e) {
    return [`left:${Math.round(e.x)}px`, `top:${Math.round(e.y)}px`, `width:${Math.round(e.width)}px`, `height:${Math.round(e.height)}px`, `z-index:${Math.round(e.z || 1)}`].join(";")
}
function applyUnifiedWindowStyle(e, t) {
    e && (e.style.left = `${Math.round(t.x)}px`,
    e.style.top = `${Math.round(t.y)}px`,
    e.style.width = `${Math.round(t.width)}px`,
    e.style.height = `${Math.round(t.height)}px`,
    e.style.zIndex = String(Math.round(t.z || 1)),
    e.dataset.windowX = String(Math.round(t.x)),
    e.dataset.windowY = String(Math.round(t.y)),
    e.dataset.windowWidth = String(Math.round(t.width)),
    e.dataset.windowHeight = String(Math.round(t.height)),
    e.classList.toggle("is-wide", t.width >= 520),
    updateRenderedUnifiedCanvasHeight(e.closest(".unified-dashboard")))
}
function updateRenderedUnifiedCanvasHeight(e) {
    if (!e)
        return;
    const t = [...e.querySelectorAll("[data-unified-window]")].reduce( (e, t) => {
        const n = Number(t.dataset.windowY || 0)
          , a = Number(t.dataset.windowHeight || 0);
        return Math.max(e, n + a)
    }
    , 0);
    e.style.setProperty("--unified-canvas-height", `${Math.min(2200, Math.max(760, t + 18))}px`)
}
function clampUnifiedRect(e, t=1080) {
    const n = Math.min(Math.max(e.width, 260), Math.max(260, t))
      , a = Math.min(Math.max(e.height, 190), 900)
      , s = Math.max(0, t - n)
      , i = Math.max(0, 2200 - a);
    return {
        ...e,
        x: clampNumber(e.x, 0, s, 0),
        y: clampNumber(e.y, 0, i, 0),
        width: n,
        height: a
    }
}
function snapUnifiedRect(e, t, n, a) {
    const s = clampUnifiedRect(e, a)
      , i = unifiedSnapTargets(n, a)
      , o = {
        left: s.x,
        centerX: s.x + s.width / 2,
        right: s.x + s.width,
        top: s.y,
        centerY: s.y + s.height / 2,
        bottom: s.y + s.height
    }
      , r = {
        ...s
    }
      , l = e => nearestSnap(o[e], i.x)
      , c = e => nearestSnap(o[e], i.y);
    if ("move" === t) {
        const e = [{
            edge: "left",
            snap: l("left")
        }, {
            edge: "centerX",
            snap: l("centerX")
        }, {
            edge: "right",
            snap: l("right")
        }].filter(e => e.snap).sort( (e, t) => e.snap.distance - t.snap.distance)[0]
          , t = [{
            edge: "top",
            snap: c("top")
        }, {
            edge: "centerY",
            snap: c("centerY")
        }, {
            edge: "bottom",
            snap: c("bottom")
        }].filter(e => e.snap).sort( (e, t) => e.snap.distance - t.snap.distance)[0];
        return e && (r.x += e.snap.value - o[e.edge]),
        t && (r.y += t.snap.value - o[t.edge]),
        clampUnifiedRect(r, a)
    }
    if (t.includes("w")) {
        const e = l("left");
        if (e) {
            const t = r.x + r.width;
            r.x = e.value,
            r.width = t - r.x
        }
    } else if (t.includes("e")) {
        const e = l("right");
        e && (r.width = e.value - r.x)
    }
    if (t.includes("n")) {
        const e = c("top");
        if (e) {
            const t = r.y + r.height;
            r.y = e.value,
            r.height = t - r.y
        }
    } else if (t.includes("s")) {
        const e = c("bottom");
        e && (r.height = e.value - r.y)
    }
    return clampUnifiedRect(r, a)
}
function nearestSnap(e, t) {
    let n = null;
    return t.forEach(t => {
        const a = Math.abs(e - t);
        a <= 14 && (!n || a < n.distance) && (n = {
            value: t,
            distance: a
        })
    }
    ),
    n
}
function unifiedSnapTargets(e, t) {
    const n = new Set([0, t / 2, t])
      , a = new Set([0]);
    return normalizeUnifiedLayout(state.unifiedLayout).forEach(t => {
        t.id !== e && (n.add(t.x),
        n.add(t.x + t.width / 2),
        n.add(t.x + t.width),
        a.add(t.y),
        a.add(t.y + t.height / 2),
        a.add(t.y + t.height))
    }
    ),
    {
        x: [...n],
        y: [...a]
    }
}
function userLocale() {
    return navigator.language || "en-AU"
}
function isMobileStabilityMode() {
    const e = window.matchMedia?.("(max-width: 820px)")?.matches
      , t = window.matchMedia?.("(display-mode: standalone)")?.matches || !0 === navigator.standalone
      , n = navigator.maxTouchPoints > 1
      , a = /iPad|iPhone|iPod/.test(navigator.userAgent || "") || "MacIntel" === navigator.platform && n;
    return Boolean(e || a || t)
}
function applyMobileStabilityMode() {
    document.documentElement.dataset.mobileStable = isMobileStabilityMode() ? "true" : "false"
}
function loadMeetingTimezone() {
    const e = localStorage.getItem(MEETING_TIMEZONE_KEY);
    e && (state.meetingTimezone = e)
}
function setMeetingTimezone(e, t={}) {
    state.meetingTimezone = e || Intl.DateTimeFormat().resolvedOptions().timeZone || "Australia/Sydney",
    localStorage.setItem(MEETING_TIMEZONE_KEY, state.meetingTimezone),
    t.quiet || toast(`Event time zone set to ${formatTimezoneOffsetLabel(state.meetingTimezone)}`)
}
function loadTheme() {
    const e = localStorage.getItem(THEME_KEY)
      , t = window.matchMedia?.("(prefers-color-scheme: dark)").matches
      , n = e || (t ? "dark" : "light");
    document.documentElement.dataset.theme = n,
    setThemeIcon(n)
}
function loadUiStyle() {
    let e = null;
    try {
        e = JSON.parse(localStorage.getItem(UI_STYLE_KEY) || "null")
    } catch {
        e = null
    }
    const t = document.documentElement.dataset.theme || localStorage.getItem(THEME_KEY);
    applyUiStyle(e || {
        ...defaultUiStyle,
        theme: "dark" === t ? "dark" : defaultUiStyle.theme
    }, {
        quiet: !0
    })
}
function toggleTheme() {
    setTheme("dark" === document.documentElement.dataset.theme ? "light" : "dark", {
        sync: !0
    })
}
function setTheme(e, t={}) {
    const n = "dark" === e ? "dark" : "light";
    applyUiStyle({
        ...state.uiStyle,
        theme: n
    }, t)
}
function setThemeIcon(e) {
    els.themeToggle && (els.themeToggle.innerHTML = '<i data-lucide="palette"></i>',
    els.themeToggle.title = "dark" === e ? "Customize UI - dark mode active" : "Customize UI - light mode active",
    els.themeToggle.setAttribute("aria-label", "Customize UI"),
    refreshIcons())
}
function normalizeUiStyle(e={}) {
    const t = uiStylePresets[e.id]
      , n = t ? {
        ...t,
        ...e,
        uiVersion: 4
    } : legacyUiStyleDefaults[e.id] ? {
        ...legacyUiStyleDefaults[e.id],
        uiVersion: 4
    } : 4 === e.uiVersion ? e : {
        ...defaultUiStyle,
        theme: e.theme || defaultUiStyle.theme,
        accent: e.accent || defaultUiStyle.accent
    }
      , a = Boolean(uiStylePresets[n.id])
      , s = {
        ...a ? uiStylePresets[n.id] : customUiFallbackStyle,
        ...n
    }
      , i = "liquid" === s.glass ? "soft" : s.glass;
    return {
        id: a ? n.id : "custom",
        uiVersion: 4,
        name: a ? uiStylePresets[n.id].name : "Custom",
        description: a ? uiStylePresets[n.id].description : customUiDescription,
        theme: "dark" === s.theme ? "dark" : "light",
        accent: /^#[0-9a-f]{6}$/i.test(s.accent || "") ? s.accent : defaultUiStyle.accent,
        wallpaper: ["none", "aurora", "mesh", "grid", "halo", "custom"].includes(s.wallpaper) ? s.wallpaper : defaultUiStyle.wallpaper,
        glass: ["off", "soft"].includes(i) ? i : defaultUiStyle.glass,
        motion: ["calm", "standard", "kinetic"].includes(s.motion) ? s.motion : defaultUiStyle.motion,
        wallpaperIntensity: clampNumber(s.wallpaperIntensity, 0, 100, customUiFallbackStyle.wallpaperIntensity),
        glassOpacity: clampNumber(s.glassOpacity, 38, 100, customUiFallbackStyle.glassOpacity),
        glassBlur: clampNumber(s.glassBlur, 0, 42, customUiFallbackStyle.glassBlur),
        glassSaturation: clampNumber(s.glassSaturation, 80, 210, customUiFallbackStyle.glassSaturation),
        glassContrast: clampNumber(s.glassContrast, 82, 135, customUiFallbackStyle.glassContrast),
        borderShine: clampNumber(s.borderShine, 0, 100, customUiFallbackStyle.borderShine),
        shadowStrength: clampNumber(s.shadowStrength, 0, 34, customUiFallbackStyle.shadowStrength),
        cornerRadius: clampNumber(s.cornerRadius ?? {
            sharp: 3,
            classic: 8,
            round: 18
        }[s.radius], 0, 28, customUiFallbackStyle.cornerRadius),
        buttonOpacity: clampNumber(s.buttonOpacity, 48, 100, customUiFallbackStyle.buttonOpacity),
        windowOpacity: clampNumber(s.windowOpacity, 40, 100, customUiFallbackStyle.windowOpacity),
        sidebarOpacity: clampNumber(s.sidebarOpacity, 42, 100, customUiFallbackStyle.sidebarOpacity),
        motionEnergy: clampNumber(s.motionEnergy, 40, 150, customUiFallbackStyle.motionEnergy),
        textScale: clampNumber(s.textScale, 92, 112, customUiFallbackStyle.textScale),
        compactSurfaces: Boolean(s.compactSurfaces),
        sidebarAutoHide: Boolean(s.sidebarAutoHide),
        sidebarMode: "detached" === s.sidebarMode ? "detached" : "attached"
    }
}
function applyUiStyle(e, t={}) {
    const n = normalizeUiStyle(e);
    state.uiStyle = n,
    document.documentElement.dataset.theme = n.theme,
    document.documentElement.dataset.uiPreset = n.id,
    document.documentElement.dataset.wallpaper = n.wallpaper,
    document.documentElement.dataset.glass = n.glass,
    document.documentElement.dataset.motion = n.motion,
    document.documentElement.dataset.compactSurfaces = n.compactSurfaces ? "true" : "false",
    document.documentElement.dataset.sidebarAutoHide = n.sidebarAutoHide ? "true" : "false",
    document.documentElement.dataset.sidebarMode = n.sidebarMode,
    document.documentElement.style.setProperty("--accent", n.accent),
    document.documentElement.style.setProperty("--accent-strong", shadeHex(n.accent, "dark" === n.theme ? 24 : -16)),
    document.documentElement.style.setProperty("--accent-soft", `color-mix(in srgb, ${n.accent} ${"dark" === n.theme ? "20%" : "16%"}, transparent)`),
    document.documentElement.style.setProperty("--radius", `${n.cornerRadius}px`),
    document.documentElement.style.setProperty("--glass-alpha", `${n.glassOpacity}%`),
    document.documentElement.style.setProperty("--glass-blur", `${n.glassBlur}px`),
    document.documentElement.style.setProperty("--glass-saturation", "" + n.glassSaturation / 100),
    document.documentElement.style.setProperty("--glass-contrast", "" + n.glassContrast / 100),
    document.documentElement.style.setProperty("--glass-highlight-strength", `${n.borderShine}%`),
    document.documentElement.style.setProperty("--shadow-strength", "" + n.shadowStrength / 100),
    document.documentElement.style.setProperty("--shadow-alpha", "" + (.03 + n.shadowStrength / 100)),
    document.documentElement.style.setProperty("--button-alpha", `${n.buttonOpacity}%`),
    document.documentElement.style.setProperty("--window-alpha", `${n.windowOpacity}%`),
    document.documentElement.style.setProperty("--sidebar-alpha", `${n.sidebarOpacity}%`),
    document.documentElement.style.setProperty("--wallpaper-opacity", "" + n.wallpaperIntensity / 100),
    document.documentElement.style.setProperty("--text-scale", "" + n.textScale / 100),
    applyCustomWallpaperCss(),
    applyMotionEnergy(n),
    scheduleLiquidGlassRefresh(),
    localStorage.setItem(UI_STYLE_KEY, JSON.stringify(n)),
    localStorage.setItem(THEME_KEY, n.theme),
    setThemeIcon(n.theme),
    renderAppearanceControls(),
    t.sync && scheduleUiStyleSync(),
    t.toastMessage && !t.quiet && toast(t.toastMessage)
}
function setupLiquidGlassRuntime() {
    isMobileStabilityMode() ? destroyWebGLLiquidGlass() : refreshLiquidGlassSurfaces()
}
function scheduleLiquidGlassRefresh() {
    isMobileStabilityMode() ? destroyWebGLLiquidGlass() : (window.clearTimeout(liquidGlassRefreshTimer),
    liquidGlassRefreshTimer = window.setTimeout(refreshLiquidGlassSurfaces, 80))
}
function refreshLiquidGlassSurfaces() {
    document.querySelectorAll("[rt-liquid-glass]").forEach(e => {
        clearLiquidGlassSurface(e)
    }
    ),
    destroyWebGLLiquidGlass()
}
function liquidGlassSurfaceSelector() {
    return [".sidebar", ".topbar", ".workspace-header", ".quick-capture", ".activity-pulse", ".unified-window", ".settings-panel", ".calendar-shell", ".analytics-card", ".focus-panel", ".metric", ".list-panel", ".task-card", ".meeting-card", "dialog[open]"].join(",")
}
function applyLiquidGlassSurface(e) {
    const t = liquidGlassOptionsFor(e);
    e.setAttribute("rt-liquid-glass", ""),
    e.setAttribute("rt-liquid-glass-blur", String(t.blur)),
    e.setAttribute("rt-liquid-glass-scale", String(t.scale)),
    e.setAttribute("rt-liquid-glass-map", String(t.map)),
    e.setAttribute("rt-liquid-glass-fallback-blur", String(t.fallbackBlur)),
    e.setAttribute("rt-liquid-glass-edge-thickness", String(t.edgeThickness)),
    e.setAttribute("rt-liquid-glass-edge-softness", String(t.edgeSoftness)),
    e.setAttribute("rt-liquid-glass-tint", t.tint)
}
function clearLiquidGlassSurface(e) {
    e.removeAttribute("rt-liquid-glass"),
    e.removeAttribute("rt-liquid-glass-blur"),
    e.removeAttribute("rt-liquid-glass-scale"),
    e.removeAttribute("rt-liquid-glass-map"),
    e.removeAttribute("rt-liquid-glass-fallback-blur"),
    e.removeAttribute("rt-liquid-glass-edge-thickness"),
    e.removeAttribute("rt-liquid-glass-edge-softness"),
    e.removeAttribute("rt-liquid-glass-tint"),
    delete e.dataset.liquidEngine,
    e.removeAttribute("data-rt-idx"),
    e.style.removeProperty("--rt-liquid-final-filter"),
    e.style.removeProperty("--rt-fallback-blur"),
    e.style.removeProperty("--rt-liquid-tint")
}
function liquidGlassOptionsFor(e) {
    const t = e.matches(".activity-pulse, .quick-capture")
      , n = e.matches(".sidebar, .unified-window, .settings-panel, dialog");
    return {
        blur: t ? 7 : n ? 10 : 8,
        scale: t ? 34 : n ? 54 : 42,
        map: t ? 192 : 320,
        fallbackBlur: t ? 14 : 22,
        edgeThickness: t ? .11 : .16,
        edgeSoftness: t ? .42 : .58,
        tint: "dark" === document.documentElement.dataset.theme ? "rgba(12, 18, 32, 0.22)" : "rgba(255, 255, 255, 0.16)"
    }
}
function scheduleWebGLLiquidGlassRefresh() {
    window.clearTimeout(webglLiquidGlassTimer),
    webglLiquidGlassTimer = window.setTimeout(refreshWebGLLiquidGlassSurfaces, 260)
}
async function refreshWebGLLiquidGlassSurfaces() {
    if (isMobileStabilityMode())
        return void destroyWebGLLiquidGlass();
    if ("liquid" !== document.documentElement.dataset.glass || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
        return void destroyWebGLLiquidGlass();
    const e = webglLiquidGlassGroups()
      , t = e.map(e => `${e.name}:${e.root?.className || ""}:${e.targets.map(e => `${e.className}:${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`).join("|")}`).join(";");
    if (!e.length)
        return void destroyWebGLLiquidGlass();
    if (t === webglLiquidGlassSignature && webglLiquidGlassInstances.length)
        return void webglLiquidGlassInstances.forEach(e => e.markChanged?.());
    const n = ++webglLiquidGlassGeneration;
    webglLiquidGlassSignature = t,
    destroyWebGLLiquidGlass({
        keepSignature: !0
    }),
    document.documentElement.dataset.webglGlass = "initializing";
    try {
        const t = await loadWebGLLiquidGlassModule()
          , a = [];
        for (const s of e) {
            if (n !== webglLiquidGlassGeneration)
                return;
            ensureWebGLSceneLayer(s.root),
            s.targets.forEach(e => applyWebGLGlassConfig(e));
            const e = await t.LiquidGlass.init({
                root: s.root,
                glassElements: s.targets,
                defaults: webglLiquidGlassDefaults()
            });
            if (n !== webglLiquidGlassGeneration)
                return void e.destroy?.();
            a.push(e),
            document.documentElement.dataset.webglGlass = "on"
        }
        webglLiquidGlassInstances = a,
        document.documentElement.dataset.webglGlass = "on"
    } catch (a) {
        console.warn("TaskFlow WebGL liquid glass fell back to SVG glass.", a),
        destroyWebGLLiquidGlass(),
        document.documentElement.dataset.webglGlass = "fallback"
    }
}
function loadWebGLLiquidGlassModule() {
    return webglLiquidGlassModulePromise || (webglLiquidGlassModulePromise = import("./vendor/ybouane-liquidglass.js")),
    webglLiquidGlassModulePromise
}
function destroyWebGLLiquidGlass(e={}) {
    e.keepSignature || (webglLiquidGlassGeneration += 1),
    webglLiquidGlassInstances.forEach(e => {
        try {
            e.destroy?.()
        } catch (t) {
            console.warn("TaskFlow could not fully release WebGL liquid glass.", t)
        }
    }
    ),
    webglLiquidGlassInstances = [],
    e.keepSignature || (webglLiquidGlassSignature = ""),
    document.querySelectorAll(".liquid-webgl-glass").forEach(e => {
        e.classList.remove("liquid-webgl-glass"),
        e.removeAttribute("data-config")
    }
    ),
    document.documentElement.dataset.webglGlass = "off"
}
function webglLiquidGlassGroups() {
    const e = []
      , t = document.querySelector(".unified-dashboard");
    return t && ( (t, n, a) => {
        if (!n)
            return;
        const s = a.filter(e => e instanceof HTMLElement && e.parentElement === n && e.offsetWidth > 80 && e.offsetHeight > 36);
        s.length && e.push({
            name: "workspace-windows",
            root: n,
            targets: s.slice(0, 6)
        })
    }
    )(0, t, Array.from(t.querySelectorAll(":scope > .unified-window"))),
    e
}
function ensureWebGLSceneLayer(e) {
    if (!e || e.querySelector(":scope > .liquid-webgl-scene"))
        return;
    const t = document.createElement("div");
    t.className = "liquid-webgl-scene",
    t.setAttribute("aria-hidden", "true"),
    e.prepend(t)
}
function applyWebGLGlassConfig(e) {
    const t = "dark" === document.documentElement.dataset.theme
      , n = e.matches(".unified-window, .workspace-header")
      , a = e.matches(".sidebar");
    e.classList.add("liquid-webgl-glass"),
    e.dataset.config = JSON.stringify({
        blurAmount: a ? .12 : .2,
        refraction: n ? 1.46 : 1.18,
        chromAberration: t ? .115 : .09,
        edgeHighlight: t ? .3 : .28,
        specular: t ? .54 : .58,
        fresnel: 1.5,
        distortion: n ? .13 : .09,
        cornerRadius: Math.max(12, Number.parseFloat(getComputedStyle(e).borderRadius) || Number(state.uiStyle.cornerRadius) || 18),
        zRadius: n ? 76 : 58,
        opacity: t ? .72 : .9,
        saturation: t ? .34 : .18,
        tintStrength: t ? .14 : .04,
        brightness: t ? -.16 : .03,
        shadowOpacity: t ? .34 : .22,
        shadowSpread: 20,
        shadowOffsetY: 10,
        floating: !1,
        button: !1,
        bevelMode: 0
    })
}
function webglLiquidGlassDefaults() {
    return {
        blurAmount: .18,
        refraction: 1.2,
        chromAberration: .1,
        edgeHighlight: .3,
        specular: .62,
        fresnel: 1.42,
        distortion: .1,
        tintStrength: .07,
        shadowOpacity: .28,
        shadowSpread: 20,
        shadowOffsetY: 10
    }
}
function loadCustomWallpaper() {
    return localStorage.getItem(CUSTOM_WALLPAPER_KEY) || ""
}
function saveCustomWallpaper(e) {
    e ? localStorage.setItem(CUSTOM_WALLPAPER_KEY, e) : localStorage.removeItem(CUSTOM_WALLPAPER_KEY),
    applyCustomWallpaperCss(),
    updateWallpaperControls()
}
function customWallpaperBytes(e=loadCustomWallpaper()) {
    if (!e)
        return 0;
    try {
        return new Blob([e]).size
    } catch {
        return 2 * String(e).length
    }
}
function wallpaperByteLimit() {
    return currentTierConfig?.().wallpaperBytes ?? ACCOUNT_TIERS.base.wallpaperBytes
}
function wallpaperLimitLabel() {
    const e = wallpaperByteLimit();
    return Number.isFinite(e) ? formatLimitBytes(e) : "unlimited"
}
function updateWallpaperControls() {
    const e = loadCustomWallpaper();
    if (els.appearanceWallpaperClearBtn && (els.appearanceWallpaperClearBtn.disabled = !e),
    els.appearanceWallpaperUploadBtn && (els.appearanceWallpaperUploadBtn.title = `Upload a synced wallpaper. ${currentTierConfig().label} allows ${wallpaperLimitLabel()}.`),
    els.appearanceWallpaperStatus) {
        const t = customWallpaperBytes(e);
        els.appearanceWallpaperStatus.textContent = e ? `Synced wallpaper: ${formatBytes(t)} of ${wallpaperLimitLabel()} for ${currentTierConfig().label}.` : `Uploaded wallpapers sync with your account. ${currentTierConfig().label} allows ${wallpaperLimitLabel()}.`
    }
}
function applyCustomWallpaperCss() {
    const e = loadCustomWallpaper();
    document.documentElement.style.setProperty("--custom-wallpaper-image", e ? `url("${e}")` : "linear-gradient(135deg, #0f766e, #38bdf8)"),
    document.documentElement.dataset.customWallpaper = e ? "ready" : "empty",
    updateWallpaperControls()
}
async function handleWallpaperUpload(e) {
    const t = e.target.files?.[0];
    if (e.target.value = "",
    t)
        if (t.type.startsWith("image/"))
            try {
                const e = wallpaperByteLimit()
                  , n = await compressWallpaperImage(t, e)
                  , a = customWallpaperBytes(n);
                if (Number.isFinite(e) && a > e)
                    return toast(`That wallpaper is too large for ${currentTierConfig().label}. Try a smaller image or request more room.`),
                    void openTierRequestDialog();
                saveCustomWallpaper(n),
                applyUiStyle({
                    ...state.uiStyle,
                    id: "custom",
                    name: "Custom",
                    description: customUiDescription,
                    wallpaper: "custom",
                    wallpaperIntensity: Math.max(Number(state.uiStyle.wallpaperIntensity || 0), 74),
                    glass: "off" === state.uiStyle.glass ? "soft" : state.uiStyle.glass
                }, {
                    sync: !0,
                    toastMessage: "Wallpaper saved and synced"
                }),
                syncWorkspaceNotes().catch(e => console.warn("Wallpaper sync failed", e))
            } catch (n) {
                console.warn("Wallpaper upload failed", n),
                toast(n?.message || "TaskFlow could not use that wallpaper image.")
            }
        else
            toast("Choose an image file for the wallpaper.")
}
function clearCustomWallpaper() {
    saveCustomWallpaper("");
    const e = "custom" === state.uiStyle.wallpaper ? "mesh" : state.uiStyle.wallpaper;
    applyUiStyle({
        ...state.uiStyle,
        id: "custom",
        name: "Custom",
        description: customUiDescription,
        wallpaper: e
    }, {
        sync: !0,
        toastMessage: "Wallpaper cleared"
    }),
    syncWorkspaceNotes().catch(e => console.warn("Wallpaper sync failed", e))
}
function compressWallpaperImage(e, t=wallpaperByteLimit()) {
    return new Promise( (n, a) => {
        const s = new FileReader;
        s.onerror = () => a(new Error("Could not read wallpaper.")),
        s.onload = () => {
            const e = new Image;
            e.onerror = () => a(new Error("Could not decode wallpaper.")),
            e.onload = () => {
                const s = Number.isFinite(t) ? [1800, 1500, 1200, 1e3, 820, 680] : [2200]
                  , i = Number.isFinite(t) ? [.84, .78, .7, .62, .54] : [.86];
                let o = "";
                s.forEach(a => {
                    const s = Math.min(1, a / Math.max(e.width, e.height))
                      , r = Math.max(1, Math.round(e.width * s))
                      , l = Math.max(1, Math.round(e.height * s))
                      , c = document.createElement("canvas");
                    c.width = r,
                    c.height = l,
                    c.getContext("2d").drawImage(e, 0, 0, r, l),
                    i.forEach(e => {
                        const a = c.toDataURL("image/jpeg", e);
                        o = !o || customWallpaperBytes(a) < customWallpaperBytes(o) ? a : o,
                        (!Number.isFinite(t) || customWallpaperBytes(a) <= t) && n(a)
                    }
                    )
                }
                ),
                Number.isFinite(t) ? a(new Error(`That wallpaper is too large to sync on ${currentTierConfig().label}. Try a smaller image or request more room.`)) : n(o)
            }
            ,
            e.src = s.result
        }
        ,
        s.readAsDataURL(e)
    }
    )
}
function scheduleUiStyleSync() {
    markPreferencesPending({
        quiet: !0
    }),
    window.clearTimeout(uiStyleSyncTimer),
    uiStyleSyncTimer = window.setTimeout( () => {
        syncUserPreferences().catch(e => console.warn("Preference sync failed", e))
    }
    , 650)
}
function shadeHex(e, t) {
    const n = e.replace("#", "")
      , a = Math.round(2.55 * t);
    return `#${[0, 2, 4].map(e => {
        const t = parseInt(n.slice(e, e + 2), 16);
        return Math.max(0, Math.min(255, t + a)).toString(16).padStart(2, "0")
    }
    ).join("")}`
}
function clampNumber(e, t, n, a) {
    const s = Number(e);
    return Number.isFinite(s) ? Math.min(n, Math.max(t, s)) : a
}
function applyMotionEnergy(e) {
    const t = "calm" === e.motion ? Math.min(e.motionEnergy, 80) : "kinetic" === e.motion ? Math.max(e.motionEnergy, 110) : e.motionEnergy
      , n = 100 / Math.max(40, t);
    document.documentElement.style.setProperty("--motion-fast", `${Math.round(140 * n)}ms`),
    document.documentElement.style.setProperty("--motion-med", `${Math.round(240 * n)}ms`),
    document.documentElement.style.setProperty("--motion-slow", `${Math.round(520 * n)}ms`)
}
function openAppearanceDialog() {
    els.accountSettingsDialog?.open && els.accountSettingsDialog.close(),
    renderAppearanceControls(),
    els.appearanceDialog.showModal(),
    refreshIcons()
}
function glassLabel(e) {
    return "soft" === e || "liquid" === e ? "frosted" : "normal"
}
function appearancePresetCardStyle(e={}) {
    const t = e.accent || defaultUiStyle.accent
      , n = "dark" === e.theme;
    return [`--preset-accent: ${t}`, "--preset-surface: " + (n ? "auroraDark" === e.id ? "#101827" : "#171b23" : "#ffffff"), "--preset-surface-2: " + (n ? "auroraDark" === e.id ? "#1c2440" : "#222832" : "#f6f8fb"), "--preset-ink: " + (n ? "#f8fafc" : "#17212b"), "--preset-muted: " + (n ? "#b7c0cc" : "#596575"), "--preset-line: " + (n ? "rgba(190, 202, 255, 0.24)" : "rgba(126, 143, 162, 0.28)"), "--preset-active: " + (n ? "rgba(139, 92, 246, 0.18)" : "rgba(19, 122, 99, 0.1)")].join("; ")
}
function renderAppearanceControls() {
    if (!els.appearanceThemeInput)
        return;
    const e = normalizeUiStyle(state.uiStyle);
    els.appearancePresetTitle.textContent = e.name,
    els.appearancePresetDescription.textContent = e.description,
    els.appearanceModeBadge.textContent = "custom" === e.id ? "Custom" : "Preset",
    els.appearanceThemeInput.value = e.theme,
    els.appearanceWallpaperInput.value = e.wallpaper,
    updateWallpaperControls(),
    els.appearanceGlassInput.value = e.glass,
    els.appearanceMotionInput.value = e.motion,
    els.appearanceCompactSurfacesInput.checked = e.compactSurfaces,
    els.appearanceSidebarAutoHideInput.checked = e.sidebarAutoHide,
    els.appearanceSidebarModeInput.value = e.sidebarMode;
    const t = Object.values(uiStylePresets).map(t => `\n        <button class="appearance-preset ${t.id === e.id ? "active" : ""}" type="button" data-ui-preset="${escapeAttr(t.id)}" style="${escapeAttr(appearancePresetCardStyle(t))}">\n          <span class="preset-orb"></span>\n          <span>\n            <strong>${escapeHtml(t.name)}</strong>\n            <small>${escapeHtml(t.description)}</small>\n            <em>${escapeHtml(t.theme)} / ${escapeHtml(glassLabel(t.glass))}${"none" !== t.wallpaper ? ` / ${escapeHtml(t.wallpaper)}` : ""}</em>\n          </span>\n        </button>\n      `).join("")
      , n = normalizeUiPresets(state.uiPresets).map(t => `\n        <button class="appearance-preset custom-preset ${"custom" === e.id && state.uiStyle.name === t.name ? "active" : ""}" type="button" data-custom-ui-preset="${escapeAttr(t.id)}" style="${escapeAttr(appearancePresetCardStyle(t.style))}">\n          <span class="preset-orb"></span>\n          <span>\n            <strong>${escapeHtml(t.name)}</strong>\n            <small>Saved custom UI preset</small>\n            <em>${escapeHtml(t.style.theme)} / ${escapeHtml(glassLabel(t.style.glass))}${"none" !== t.style.wallpaper ? ` / ${escapeHtml(t.style.wallpaper)}` : ""}</em>\n          </span>\n          <span class="preset-delete" data-delete-ui-preset="${escapeAttr(t.id)}" title="Delete preset" aria-label="Delete ${escapeAttr(t.name)}">\n            <i data-lucide="x"></i>\n          </span>\n        </button>\n      `).join("")
      , a = uiPresetLimit()
      , s = Number.isFinite(a) ? `${state.uiPresets.length}/${a} saved` : `${state.uiPresets.length} saved`;
    els.appearancePresetGrid.innerHTML = `\n    ${t}\n    <div class="appearance-preset-note">\n      <strong>Custom presets</strong>\n      <span>${escapeHtml(s)}. Saved presets sync with your account.</span>\n    </div>\n    ${n || '<div class="appearance-preset-note muted"><span>No custom UI presets saved yet.</span></div>'}\n  `,
    setAppearanceRangeValue("appearanceGlassOpacityInput", e.glassOpacity, "%"),
    setAppearanceRangeValue("appearanceGlassBlurInput", e.glassBlur, "px"),
    setAppearanceRangeValue("appearanceGlassSaturationInput", e.glassSaturation, "%"),
    setAppearanceRangeValue("appearanceGlassContrastInput", e.glassContrast, "%"),
    setAppearanceRangeValue("appearanceBorderShineInput", e.borderShine, "%"),
    setAppearanceRangeValue("appearanceShadowStrengthInput", e.shadowStrength, "%"),
    setAppearanceRangeValue("appearanceCornerRadiusInput", e.cornerRadius, "px"),
    setAppearanceRangeValue("appearanceButtonOpacityInput", e.buttonOpacity, "%"),
    setAppearanceRangeValue("appearanceWindowOpacityInput", e.windowOpacity, "%"),
    setAppearanceRangeValue("appearanceSidebarOpacityInput", e.sidebarOpacity, "%"),
    setAppearanceRangeValue("appearanceWallpaperIntensityInput", e.wallpaperIntensity, "%"),
    setAppearanceRangeValue("appearanceMotionEnergyInput", e.motionEnergy, "%"),
    setAppearanceRangeValue("appearanceTextScaleInput", e.textScale, "%"),
    els.appearanceAccentPicker.innerHTML = uiAccentChoices.map(t => `\n        <button class="accent-swatch ${t.toLowerCase() === e.accent.toLowerCase() ? "active" : ""}" type="button" data-ui-accent="${escapeAttr(t)}" style="--swatch: ${escapeAttr(t)}" aria-label="Use accent ${escapeAttr(t)}"></button>\n      `).join("")
}
function appearanceRangeInputs() {
    return [els.appearanceGlassOpacityInput, els.appearanceGlassBlurInput, els.appearanceGlassSaturationInput, els.appearanceGlassContrastInput, els.appearanceBorderShineInput, els.appearanceShadowStrengthInput, els.appearanceCornerRadiusInput, els.appearanceButtonOpacityInput, els.appearanceWindowOpacityInput, els.appearanceSidebarOpacityInput, els.appearanceWallpaperIntensityInput, els.appearanceMotionEnergyInput, els.appearanceTextScaleInput].filter(Boolean)
}
function setAppearanceRangeValue(e, t, n) {
    const a = els[e];
    a && (a.value = String(t),
    document.querySelectorAll(`[data-appearance-value="${e}"]`).forEach(e => {
        e.textContent = `${t}${n}`
    }
    ))
}
function handleCustomUiInput() {
    applyUiStyle({
        ...state.uiStyle,
        id: "custom",
        name: "Custom",
        description: customUiDescription,
        theme: els.appearanceThemeInput.value,
        wallpaper: els.appearanceWallpaperInput.value,
        glass: els.appearanceGlassInput.value,
        motion: els.appearanceMotionInput.value,
        wallpaperIntensity: els.appearanceWallpaperIntensityInput.value,
        glassOpacity: els.appearanceGlassOpacityInput.value,
        glassBlur: els.appearanceGlassBlurInput.value,
        glassSaturation: els.appearanceGlassSaturationInput.value,
        glassContrast: els.appearanceGlassContrastInput.value,
        borderShine: els.appearanceBorderShineInput.value,
        shadowStrength: els.appearanceShadowStrengthInput.value,
        cornerRadius: els.appearanceCornerRadiusInput.value,
        buttonOpacity: els.appearanceButtonOpacityInput.value,
        windowOpacity: els.appearanceWindowOpacityInput.value,
        sidebarOpacity: els.appearanceSidebarOpacityInput.value,
        motionEnergy: els.appearanceMotionEnergyInput.value,
        textScale: els.appearanceTextScaleInput.value,
        compactSurfaces: els.appearanceCompactSurfacesInput.checked,
        sidebarAutoHide: els.appearanceSidebarAutoHideInput.checked,
        sidebarMode: els.appearanceSidebarModeInput.value
    }, {
        sync: !0
    })
}
function setCustomAccent(e) {
    applyUiStyle({
        ...state.uiStyle,
        id: "custom",
        name: "Custom",
        description: customUiDescription,
        accent: e
    }, {
        sync: !0,
        toastMessage: "Accent saved"
    })
}
function loadUiPresets() {
    try {
        state.uiPresets = normalizeUiPresets(JSON.parse(localStorage.getItem(UI_PRESETS_KEY) || "[]"))
    } catch {
        state.uiPresets = []
    }
    saveUiPresetsLocal()
}
function normalizeUiPresets(e) {
    const t = new Map;
    return (Array.isArray(e) ? e : []).forEach(e => {
        const n = cleanToken(e?.id || e?.name || uid()).slice(0, 40) || uid()
          , a = cleanTitle(e?.name || "Custom").slice(0, 32) || "Custom"
          , s = normalizeUiStyle({
            ...e?.style,
            id: "custom",
            name: "Custom",
            description: customUiDescription
        });
        t.set(n, {
            id: n,
            name: a,
            style: s,
            updatedAt: e?.updatedAt || (new Date).toISOString()
        })
    }
    ),
    [...t.values()].sort( (e, t) => String(t.updatedAt || "").localeCompare(String(e.updatedAt || ""))).slice(0, uiPresetLimit())
}
function saveUiPresetsLocal() {
    state.uiPresets = normalizeUiPresets(state.uiPresets),
    localStorage.setItem(UI_PRESETS_KEY, JSON.stringify(state.uiPresets))
}
function uiPresetLimit() {
    return currentTierConfig?.().uiPresetLimit ?? ACCOUNT_TIERS.base.uiPresetLimit
}
function saveCurrentUiPreset() {
    const e = uiPresetLimit()
      , t = state.uiPresets.length
      , n = cleanTitle(window.prompt("Name this UI preset", suggestedUiPresetName()) || "");
    if (!n)
        return;
    const a = cleanToken(n).slice(0, 40) || uid()
      , s = state.uiPresets.find(e => e.id === a);
    if (!s && t >= e)
        return toast(`Your plan saves up to ${e} custom UI presets`),
        void openTierRequestDialog();
    const i = {
        id: a,
        name: n.slice(0, 32),
        style: normalizeUiStyle({
            ...state.uiStyle,
            id: "custom",
            name: "Custom",
            description: customUiDescription
        }),
        updatedAt: (new Date).toISOString()
    };
    state.uiPresets = normalizeUiPresets([...s ? state.uiPresets.filter(e => e.id !== a) : state.uiPresets, i]),
    saveUiPresetsLocal(),
    scheduleUserPreferencesSync(),
    renderAppearanceControls(),
    toast(s ? "UI preset updated" : "UI preset saved")
}
function suggestedUiPresetName() {
    return "dark" === state.uiStyle.theme ? "My dark preset" : "My light preset"
}
function deleteUiPreset(e) {
    state.uiPresets.find(t => t.id === e) && (state.uiPresets = normalizeUiPresets(state.uiPresets.filter(t => t.id !== e)),
    saveUiPresetsLocal(),
    scheduleUserPreferencesSync(),
    renderAppearanceControls(),
    toast("UI preset deleted"))
}
function consumeDomainMigrationPayload() {
    if (!window.name || !String(window.name).includes("taskflow-domain-migration"))
        return;
    let e = null;
    try {
        e = JSON.parse(window.name)
    } catch {
        return void (window.name = "")
    }
    if (window.name = "",
    "TaskFlow" !== e?.app || "taskflow-domain-migration" !== e?.type || !DOMAIN_MIGRATION_SOURCE_HOSTS.has(String(e.sourceHost || "")))
        return;
    const t = e.localStorage && "object" == typeof e.localStorage ? e.localStorage : {};
    let n = 0;
    Object.entries(t).forEach( ([e,t]) => {
        if (isDomainMigrationStorageKeySafe(e) && "string" == typeof t) {
            if (e === STORAGE_KEY) {
                if (workspaceRawHasContent(localStorage.getItem(STORAGE_KEY)))
                    return;
                if (!workspaceRawHasContent(t))
                    return;
                return localStorage.setItem(STORAGE_KEY, t),
                void (n += 1)
            }
            null === localStorage.getItem(e) && (localStorage.setItem(e, t),
            n += 1)
        }
    }
    ),
    n && sessionStorage.setItem("taskflow.domainMigration.applied.v1", String(n))
}
function isDomainMigrationStorageKeySafe(e) {
    const t = String(e || "");
    return !!t.startsWith("taskflow.") && !/(session|token|pending|googlecalendar|notified|tier\.outcome)/i.test(t)
}
function workspaceRawHasContent(e) {
    if (!e)
        return !1;
    try {
        return workspaceHasContent(JSON.parse(e))
    } catch {
        return !1
    }
}
async function initAuth() {
    if (showAuthLoading("Checking your session..."),
    consumeDomainMigrationPayload(),
    loadTasks({
        allowSeed: !1
    }),
    !getSupabaseConfig())
        return setAuthMessage(errorText("TF-AUTH-001"), "error"),
        void showAuthGate();
    if (await consumeOAuthCallback())
        return;
    consumeGoogleCalendarBackendCallback();
    const e = loadStoredSession();
    if (e?.access_token)
        try {
            state.session = e;
            try {
                state.user = await getCurrentUser()
            } catch {
                state.session = await refreshSession(e.refresh_token),
                storeSession(state.session),
                state.user = state.session.user || await getCurrentUser()
            }
            applyUserPreferences(),
            loadPendingDeletes(),
            await loadCloudTasks(),
            await loadAccountAccess(),
            refreshGoogleCalendarBackendStatus().catch(e => console.warn("Google Calendar connector status failed", e)),
            await syncPendingDeletes(),
            showApp(),
            maybeShowAccountAccessNotice()
        } catch {
            clearStoredSession(),
            state.session = null,
            state.user = null,
            setAuthMessage("Sign in with your Northbyte account to sync your TaskFlow workspace.", ""),
            showAuthGate()
        }
    else
        showLandingPage()
}
function consumeGoogleCalendarBackendCallback() {
    const e = new URL(window.location.href)
      , t = e.searchParams.get("google_calendar_backend");
    t && ("connected" === t ? (markGoogleCalendarBackendConnected(),
    setGoogleCalendarStorage(GOOGLE_CALENDAR_AUTO_SYNC_KEY, "true"),
    recordGoogleCalendarStatus("connected", {
        mode: "backend"
    }),
    window.setTimeout( () => {
        syncTaskFlowToGoogleCalendar({
            silent: !0,
            reason: "backend-connected",
            enableAuto: !0
        })
    }
    , 1800)) : "denied" === t ? recordGoogleCalendarError(codedError("TF-GCAL-101", "No changes were made.")) : "expired" !== t && "needs_consent" !== t || recordGoogleCalendarError(codedError("TF-GCAL-102", "Open Settings and use One-time Google sync.")),
    e.searchParams.delete("google_calendar_backend"),
    window.history.replaceState(null, "", e.toString()))
}
function getSupabaseConfig() {
    const e = window.TASKFLOW_SUPABASE || DEFAULT_SUPABASE_CONFIG
      , t = String(e.url || "").replace(/\/$/, "")
      , n = String(e.key || "");
    return t && n ? {
        url: t,
        key: n
    } : null
}
function showAuthGate() {
    document.body.classList.remove("auth-loading", "signed-out-landing", "auth-ready"),
    document.body.classList.add("auth-required"),
    showAuthForm(),
    setAuthMessage("Sign in with your Northbyte account to continue.", ""),
    refreshIcons()
}
function showAuthLoading(e="Opening your workspace...") {
    document.body.classList.add("auth-loading"),
    document.body.classList.remove("signed-out-landing", "auth-required", "auth-ready"),
    els.authLoadingMessage && (els.authLoadingMessage.textContent = e)
}
function showLandingPage() {
    document.body.classList.remove("auth-loading", "auth-required", "auth-ready"),
    document.body.classList.add("signed-out-landing"),
    setAuthMessage("Checking for an existing session...", ""),
    refreshIcons(),
    landingMotionReady && window.requestAnimationFrame( () => window.refreshTaskFlowLandingMotion?.())
}
function showApp() {
    document.body.classList.remove("auth-loading", "signed-out-landing", "auth-required"),
    document.body.classList.add("auth-ready"),
    updateAccountChip(),
    updateSaveStatus(),
    renderAll(),
    maybeShowWelcome()
}
function showAuthForm() {
    els.authPasswordForm.hidden = !1;
    const e = els.migrateLocalInput?.closest(".auth-check");
    e && (e.hidden = 0 === readLocalTasks().length),
    els.authEmailInput.focus()
}
function setAuthMessage(e, t="") {
    els.authMessage.textContent = e,
    els.authMessage.className = `auth-message ${t}`.trim()
}
function applyUserPreferences() {
    const e = state.user?.user_metadata || {};
    if (e.taskflow_timezone && setMeetingTimezone(e.taskflow_timezone, {
        quiet: !0
    }),
    e.taskflow_density && (state.density = "compact" === e.taskflow_density ? "compact" : "comfortable",
    document.documentElement.dataset.density = state.density,
    localStorage.setItem(DENSITY_KEY, state.density),
    setDensityButton()),
    e.taskflow_ui_style ? applyUiStyle(e.taskflow_ui_style, {
        quiet: !0
    }) : e.taskflow_theme && ["light", "dark"].includes(e.taskflow_theme) && applyUiStyle({
        ...state.uiStyle,
        theme: e.taskflow_theme
    }, {
        quiet: !0
    }),
    Object.prototype.hasOwnProperty.call(e, "taskflow_custom_wallpaper") && saveCustomWallpaper("string" == typeof e.taskflow_custom_wallpaper ? e.taskflow_custom_wallpaper : ""),
    e.taskflow_ui_presets && (state.uiPresets = normalizeUiPresets(e.taskflow_ui_presets),
    saveUiPresetsLocal()),
    void 0 !== e.taskflow_notification_lead_minutes && (state.notifications = normalizeNotificationSettings({
        ...state.notifications,
        leadMinutes: e.taskflow_notification_lead_minutes
    }),
    saveNotificationSettings()),
    void 0 !== e.taskflow_auto_delete_done_days && (state.autoDeleteDoneDays = normalizeAutoDeleteDoneDays(e.taskflow_auto_delete_done_days),
    saveAutoDeleteDoneSetting()),
    void 0 !== e.taskflow_google_calendar_auto_sync && setGoogleCalendarStorage(GOOGLE_CALENDAR_AUTO_SYNC_KEY, e.taskflow_google_calendar_auto_sync ? "true" : "false"),
    e.taskflow_unified_presets && (state.unifiedPresets = normalizeUnifiedPresets(e.taskflow_unified_presets),
    saveUnifiedPresetsLocal()),
    e.taskflow_unified_layout) {
        const t = e.taskflow_layout_updated_at || e.taskflow_preferences_updated_at || ""
          , n = localUnifiedLayoutUpdatedAt();
        n && t && n > t || (state.unifiedLayout = normalizeUnifiedLayout(e.taskflow_unified_layout),
        saveUnifiedLayoutLocal(),
        t && saveUnifiedLayoutUpdatedAt(t))
    }
}
async function syncUserPreferences(e={}) {
    if (!state.session?.access_token) {
        if (e.throwOnError)
            throw codedError("TF-AUTH-104");
        return !1
    }
    markPreferencesPending({
        quiet: !0
    });
    const t = document.documentElement.dataset.theme || "light"
      , n = normalizeUiStyle(state.uiStyle)
      , a = e.layoutUpdatedAt || localUnifiedLayoutUpdatedAt() || (new Date).toISOString();
    try {
        const e = await authRequest("/user", {
            method: "PUT",
            body: JSON.stringify({
                data: {
                    taskflow_timezone: state.meetingTimezone,
                    taskflow_density: state.density,
                    taskflow_theme: t,
                    taskflow_ui_style: n,
                    taskflow_ui_presets: normalizeUiPresets(state.uiPresets),
                    taskflow_notification_lead_minutes: state.notifications.leadMinutes,
                    taskflow_auto_delete_done_days: state.autoDeleteDoneDays,
                    taskflow_google_calendar_auto_sync: googleCalendarAutoSyncEnabled(),
                    taskflow_unified_layout: normalizeUnifiedLayout(state.unifiedLayout),
                    taskflow_unified_presets: normalizeUnifiedPresets(state.unifiedPresets),
                    taskflow_layout_updated_at: a,
                    taskflow_preferences_updated_at: (new Date).toISOString()
                }
            })
        });
        return state.user = e.user || e,
        clearPreferencesPending(),
        updateAccountChip(),
        !0
    } catch (s) {
        if (console.warn("Preference sync failed", s),
        markPreferencesPending({
            quiet: !0
        }),
        e.throwOnError)
            throw s;
        return !1
    }
}
function markPreferencesPending(e={}) {
    localStorage.setItem(PREFERENCES_SYNC_PENDING_KEY, "true"),
    e.quiet || updateSaveStatus()
}
function clearPreferencesPending() {
    localStorage.removeItem(PREFERENCES_SYNC_PENDING_KEY)
}
function preferencesSyncPending() {
    return "true" === localStorage.getItem(PREFERENCES_SYNC_PENDING_KEY)
}
function scheduleUserPreferencesSync(e={}) {
    markPreferencesPending({
        quiet: !0
    }),
    window.clearTimeout(preferenceSyncTimer),
    preferenceSyncTimer = window.setTimeout( () => {
        preferenceSyncTimer = null,
        syncUserPreferences(e).catch(e => console.warn("Preference sync failed", e))
    }
    , Math.max(0, Number(e.delay ?? 650)))
}
async function handleSignIn(e) {
    e.preventDefault();
    const t = els.authEmailInput.value.trim().toLowerCase()
      , n = els.authPasswordInput.value;
    t && n && requireTermsAgreement("signing in") && await withAuthBusy("Signing in...", async () => {
        const e = await signInWithPassword(t, n);
        showAuthLoading("Opening your workspace..."),
        await completeAuth(e, "Signed in and synced")
    }
    )
}
async function handleCreateAccount() {
    const e = els.authEmailInput.value.trim().toLowerCase()
      , t = els.authPasswordInput.value;
    e && t ? requireTermsAgreement("creating an account") && await withAuthBusy("Creating your account...", async () => {
        const n = await signUpWithPassword(e, t);
        n?.access_token ? (state.forceWelcome = !0,
        showAuthLoading("Creating your workspace..."),
        await completeAuth(n, "Account created and synced")) : setAuthMessage("Account created. Check your email to confirm it, then sign in here.", "success")
    }
    ) : setAuthMessage("Enter an email and a password with at least 6 characters.", "error")
}
async function handleGoogleSignIn() {
    if (!requireTermsAgreement("continuing with Google"))
        return;
    const e = getSupabaseConfig();
    e ? (setAuthButtonsDisabled(!0),
    showAuthLoading("Opening Google sign in..."),
    setAuthMessage("Opening Google sign in...", ""),
    window.location.href = `${e.url}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(getAuthRedirectUrl())}`) : setAuthMessage(errorText("TF-AUTH-001"), "error")
}
function requireTermsAgreement(e="continuing") {
    return !!els.termsAcceptInput?.checked || (setAuthMessage(`Please agree to the Terms, Proprietary License, and Fair Use Policy before ${e}.`, "error"),
    els.termsAcceptInput?.focus(),
    !1)
}
async function handlePasswordReset() {
    const e = els.authEmailInput.value.trim().toLowerCase();
    e ? await withAuthBusy("Sending reset email...", async () => {
        await resetPasswordForEmail(e),
        setAuthMessage("Password reset email sent. Check your inbox.", "success")
    }
    ) : setAuthMessage("Enter your email first, then request a reset link.", "error")
}
async function handleSignOut() {
    stopGoogleCalendarAutoSync(),
    googleCalendarAccessToken = "",
    googleCalendarTokenExpiresAt = 0;
    try {
        state.session?.access_token && await authRequest("/logout", {
            method: "POST"
        })
    } catch {}
    state.session = null,
    state.user = null,
    state.tasks = [],
    state.meetings = [],
    state.generalNotes = normalizeGeneralNotes(),
    state.accountAccess = defaultAccountAccess(),
    selectedTasks.clear(),
    clearStoredSession(),
    localStorage.removeItem(STORAGE_KEY),
    clearGoogleCalendarLocalState(),
    setAuthMessage("Signed out. Sign in again to access your synced tasks.", "success"),
    showAuthGate()
}
async function withAuthBusy(e, t) {
    setAuthMessage(e, ""),
    setAuthButtonsDisabled(!0);
    try {
        await t()
    } catch (n) {
        setAuthMessage(readableError(n), "error")
    } finally {
        setAuthButtonsDisabled(!1),
        refreshIcons()
    }
}
function setAuthButtonsDisabled(e) {
    [els.signInBtn, els.createAccountBtn, els.googleSignInBtn, els.forgotPasswordBtn].forEach(t => {
        t && (t.disabled = e)
    }
    )
}
async function completeAuth(e, t) {
    showAuthLoading("Syncing your workspace...");
    const n = readLocalWorkspace();
    state.session = e,
    state.user = e.user || await getCurrentUser(),
    applyUserPreferences(),
    storeSession(e),
    loadPendingDeletes(),
    loadDeletionTombstones(),
    await loadCloudTasks(),
    await loadAccountAccess(),
    refreshGoogleCalendarBackendStatus().catch(e => console.warn("Google Calendar connector status failed", e)),
    els.migrateLocalInput.checked && await migrateLocalTasksToCloud(n),
    showApp(),
    startGoogleCalendarAutoSync(),
    maybeShowAccountAccessNotice(),
    toast(t)
}
function loadTasks(e={}) {
    const {allowSeed: t=!1} = e
      , n = localStorage.getItem(STORAGE_KEY);
    if (!n)
        return state.tasks = t ? filterDemoSeedTasks(seedTasks()) : [],
        state.meetings = [],
        state.generalNotes = normalizeGeneralNotes(),
        t && persist(),
        void autoDeleteExpiredDoneTasks({
            quiet: !0
        });
    try {
        const e = JSON.parse(n);
        state.tasks = Array.isArray(e.tasks) ? filterDemoSeedTasks(e.tasks.map(normalizeTask)) : [],
        state.meetings = Array.isArray(e.meetings) ? e.meetings.map(normalizeMeeting) : [],
        state.generalNotes = normalizeGeneralNotes(e.generalNotes),
        state.unifiedLayout = normalizeUnifiedLayout(e.unifiedLayout || state.unifiedLayout),
        state.unifiedPresets = normalizeUnifiedPresets(e.unifiedPresets || state.unifiedPresets),
        Object.prototype.hasOwnProperty.call(e, "customWallpaper") && saveCustomWallpaper("string" == typeof e.customWallpaper ? e.customWallpaper : ""),
        saveUnifiedLayoutLocal(),
        saveUnifiedPresetsLocal(),
        topUpRecurringMeetings(),
        autoDeleteExpiredDoneTasks({
            quiet: !0
        })
    } catch {
        state.tasks = t ? filterDemoSeedTasks(seedTasks()) : [],
        state.meetings = [],
        state.generalNotes = normalizeGeneralNotes(),
        t && persist(),
        autoDeleteExpiredDoneTasks({
            quiet: !0
        })
    }
}
function persist(e={}) {
    const t = readLocalWorkspace();
    saveWorkspaceLocal(new Date),
    state.session?.access_token && (queueWorkspaceChangesForSync(t, e),
    savePendingSyncs(),
    queueWorkspaceSync().catch(e => {
        console.warn("TaskFlow sync failed", e),
        savePendingSyncs(),
        scheduleWorkspaceSyncRetry("background failure"),
        updateSaveStatus()
    }
    )),
    scheduleGoogleCalendarSyncSoon()
}
function queueWorkspaceChangesForSync(e=readLocalWorkspace(), t={}) {
    const n = Boolean(t.forceAll)
      , a = new Map((e.tasks || []).map(e => [e.id, normalizeTask(e)]))
      , s = new Map((e.meetings || []).map(e => [e.id, normalizeMeeting(e)]))
      , i = new Set
      , o = new Set;
    state.tasks.map(normalizeTask).forEach(e => {
        if (i.add(e.id),
        state.pendingDeleteIds.has(e.id))
            return;
        const t = a.get(e.id);
        !n && t && taskContentFingerprint(t) === taskContentFingerprint(e) && String(t.updatedAt || "") === String(e.updatedAt || "") || state.pendingSyncIds.add(e.id)
    }
    ),
    state.meetings.map(normalizeMeeting).forEach(e => {
        if (o.add(e.id),
        state.pendingMeetingDeleteIds.has(e.id))
            return;
        const t = s.get(e.id);
        !n && t && meetingContentFingerprint(t) === meetingContentFingerprint(e) && String(t.updatedAt || "") === String(e.updatedAt || "") || state.pendingMeetingSyncIds.add(e.id)
    }
    ),
    a.forEach( (e, t) => {
        i.has(t) || (state.pendingSyncIds.delete(t),
        state.pendingDeleteIds.add(t),
        recordTaskTombstone(t))
    }
    ),
    s.forEach( (e, t) => {
        o.has(t) || (state.pendingMeetingSyncIds.delete(t),
        state.pendingMeetingDeleteIds.add(t),
        recordMeetingTombstone(t))
    }
    ),
    saveDeletionTombstones(),
    savePendingDeletes()
}
function queueWorkspaceSync() {
    return workspaceSyncPromise ? (workspaceSyncQueued = !0,
    workspaceSyncPromise) : (clearWorkspaceSyncRetry(),
    workspaceSyncPromise = (async () => {
        do {
            workspaceSyncQueued = !1,
            await syncPendingDeletes(),
            await syncAllWorkspace(),
            preferencesSyncPending() && await syncUserPreferences()
        } while (workspaceSyncQueued)
    }
    )().finally( () => {
        workspaceSyncPromise = null,
        workspaceSyncQueued = !1
    }
    ),
    workspaceSyncPromise)
}
function scheduleWorkspaceSyncRetry(e="retry") {
    !workspaceSyncRetryTimer && state.session?.access_token && state.isOnline && (workspaceSyncRetryTimer = window.setTimeout( () => {
        workspaceSyncRetryTimer = null,
        recordSyncActivity("sync", "info", "Retrying workspace sync", {
            reason: e
        }, {
            dedupeMs: 12e4
        }),
        syncPendingTasks()
    }
    , 45e3),
    updateSaveStatus())
}
function clearWorkspaceSyncRetry() {
    workspaceSyncRetryTimer && (window.clearTimeout(workspaceSyncRetryTimer),
    workspaceSyncRetryTimer = null)
}
function saveWorkspaceLocal(e=new Date) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaceBackupPayload(e))),
    createRestorePoint("Automatic restore point"),
    updateSaveStatus(e),
    recordSyncActivity("device", "success", "Workspace saved on this device", {
        tasks: state.tasks.length,
        events: state.meetings.length
    }, {
        dedupeMs: 6e4
    })
}
function loadSyncActivity() {
    try {
        const e = JSON.parse(localStorage.getItem(SYNC_ACTIVITY_KEY) || "[]");
        return Array.isArray(e) ? e.filter(e => e?.id && e?.at && e?.message).map(e => ({
            id: String(e.id),
            at: e.at,
            type: String(e.type || "sync"),
            status: ["success", "warning", "error", "info"].includes(e.status) ? e.status : "info",
            message: cleanTitle(e.message || "TaskFlow activity"),
            meta: sanitizeActivityMeta(e.meta)
        })).sort( (e, t) => new Date(t.at) - new Date(e.at)).slice(0, 50) : []
    } catch {
        return []
    }
}
function saveSyncActivity(e) {
    const t = Array.isArray(e) ? e.slice(0, 50) : [];
    try {
        localStorage.setItem(SYNC_ACTIVITY_KEY, JSON.stringify(t))
    } catch {}
    return t
}
function sanitizeActivityMeta(e={}) {
    return e && "object" == typeof e ? Object.fromEntries(Object.entries(e).filter( ([,e]) => null != e && "" !== e).slice(0, 8).map( ([e,t]) => [String(e).slice(0, 32), String(t).slice(0, 180)])) : {}
}
function recordSyncActivity(e, t, n, a={}, s={}) {
    const i = new Date
      , o = loadSyncActivity()
      , r = o[0];
    if (s.dedupeMs && r && r.type === e && r.status === t && r.message === n && i.getTime() - new Date(r.at).getTime() < s.dedupeMs)
        return r;
    const l = {
        id: uid(),
        at: i.toISOString(),
        type: e,
        status: t,
        message: cleanTitle(n || "TaskFlow activity"),
        meta: sanitizeActivityMeta(a)
    };
    return saveSyncActivity([l, ...o]),
    renderSyncActivityLog(),
    l
}
function renderSyncActivityLog() {
    if (!els.settingsActivityList || !els.accountSettingsDialog?.open)
        return;
    const e = loadSyncActivity()
      , t = e[0];
    els.settingsActivityBadge && (els.settingsActivityBadge.dataset.health = t ? activityHealth(t.status) : "muted",
    els.settingsActivityBadge.textContent = e.length ? `${e.length} logs` : "Empty"),
    els.settingsActivitySummary && (els.settingsActivitySummary.textContent = t ? `Latest: ${t.message} (${formatSavedTime(t.at)}).` : "TaskFlow will record sync, backup, and support activity here."),
    els.settingsActivityList.innerHTML = e.length ? e.slice(0, 8).map(e => {
        const t = Object.entries(e.meta || {}).map( ([e,t]) => `<span>${escapeHtml(labelFromKey(e))}: ${escapeHtml(t)}</span>`).join("");
        return `\n            <article class="sync-activity-item" data-status="${escapeAttr(e.status)}">\n              <div class="sync-activity-icon" aria-hidden="true"><i data-lucide="${activityIcon(e.type, e.status)}"></i></div>\n              <div class="sync-activity-copy">\n                <strong>${escapeHtml(e.message)}</strong>\n                <span>${escapeHtml(formatSavedTime(e.at))} · ${escapeHtml(labelFromKey(e.type))}</span>\n                ${t ? `<div class="sync-activity-meta">${t}</div>` : ""}\n              </div>\n            </article>\n          `
    }
    ).join("") : '<div class="sync-activity-empty">No activity recorded yet.</div>',
    els.settingsActivityExportBtn && (els.settingsActivityExportBtn.disabled = !e.length),
    els.settingsActivityClearBtn && (els.settingsActivityClearBtn.disabled = !e.length),
    refreshIcons()
}
function activityHealth(e) {
    return "error" === e || "warning" === e ? "warning" : "success" === e ? "good" : "working"
}
function activityIcon(e, t) {
    return "error" === t ? "triangle-alert" : "warning" === t ? "circle-alert" : {
        account: "user-check",
        device: "hard-drive",
        export: "download",
        feedback: "message-square-check",
        google: "calendar-check",
        import: "upload",
        restore: "rotate-ccw",
        settings: "sliders-horizontal",
        sync: "refresh-cw"
    }[e] || "activity"
}
function labelFromKey(e) {
    return String(e || "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\b\w/g, e => e.toUpperCase())
}
function exportSyncActivityLog() {
    const e = loadSyncActivity();
    e.length ? (downloadJson({
        app: "TaskFlow",
        version: "beta 0.95",
        exportedAt: (new Date).toISOString(),
        entries: e
    }, `taskflow-sync-activity-${todayISO()}.json`),
    toast("Sync activity exported")) : toast("No sync activity to export yet")
}
function clearSyncActivityLog() {
    confirmAction("Clear sync activity?", "This clears the local activity history on this device. Your tasks, events, notes, and account data are not changed.", () => {
        localStorage.removeItem(SYNC_ACTIVITY_KEY),
        renderSyncActivityLog(),
        toast("Sync activity cleared")
    }
    )
}
function saveSyncMergeSummary(e={}) {
    const t = {
        at: e.at || (new Date).toISOString(),
        tasksPulled: Number(e.tasksPulled || 0),
        eventsPulled: Number(e.eventsPulled || 0),
        localKept: Number(e.localKept || 0),
        conflicts: Number(e.conflicts || 0)
    };
    state.lastSyncMerge = t;
    try {
        localStorage.setItem(SYNC_MERGE_SUMMARY_KEY, JSON.stringify(t))
    } catch {}
    return t
}
function readSyncMergeSummary() {
    if (state.lastSyncMerge)
        return state.lastSyncMerge;
    try {
        const e = JSON.parse(localStorage.getItem(SYNC_MERGE_SUMMARY_KEY) || "null");
        return e?.at ? (state.lastSyncMerge = {
            at: e.at,
            tasksPulled: Number(e.tasksPulled || 0),
            eventsPulled: Number(e.eventsPulled || 0),
            localKept: Number(e.localKept || 0),
            conflicts: Number(e.conflicts || 0)
        },
        state.lastSyncMerge) : null
    } catch {
        return null
    }
}
function formatSyncMergeSummary(e=readSyncMergeSummary()) {
    if (!e?.at)
        return "No account pull yet";
    const t = [e.tasksPulled ? `${e.tasksPulled} tasks` : "", e.eventsPulled ? `${e.eventsPulled} events` : "", e.localKept ? `${e.localKept} local kept` : "", e.conflicts ? `${e.conflicts} conflicts` : ""].filter(Boolean);
    return t.length ? `${t.join(", ")} (${formatSavedTime(e.at)})` : `No changes (${formatSavedTime(e.at)})`
}
function workspaceBackupPayload(e=new Date) {
    const t = e instanceof Date ? e.toISOString() : new Date(e || Date.now()).toISOString();
    return {
        app: "TaskFlow",
        version: 2,
        account: state.user?.email || null,
        exportedAt: t,
        tasks: state.tasks,
        meetings: state.meetings,
        generalNotes: state.generalNotes,
        unifiedLayout: normalizeUnifiedLayout(state.unifiedLayout),
        unifiedPresets: normalizeUnifiedPresets(state.unifiedPresets),
        customWallpaper: loadCustomWallpaper()
    }
}
function workspaceHasContent(e=workspaceBackupPayload()) {
    const t = normalizeGeneralNotes(e.generalNotes);
    return Boolean(e.tasks?.length || e.meetings?.length || t.tabs?.some(e => String(e.content || "").trim()))
}
function workspaceFingerprint(e=workspaceBackupPayload()) {
    return [e.tasks?.length || 0, e.meetings?.length || 0, normalizeGeneralNotes(e.generalNotes).tabs.map(e => `${e.id}:${e.title}:${e.content?.length || 0}`).join("|"), customWallpaperBytes(e.customWallpaper || ""), normalizeUnifiedLayout(e.unifiedLayout).map(e => `${e.id}:${e.x}:${e.y}:${e.w}:${e.h}:${e.hidden}`).join("|"), [...e.tasks || [], ...e.meetings || []].map(e => e.updatedAt || e.completedAt || e.createdAt || e.date || "").sort().slice(-12).join("|")].join(";")
}
function restorePointCounts(e=workspaceBackupPayload()) {
    const t = normalizeGeneralNotes(e.generalNotes);
    return {
        tasks: e.tasks?.length || 0,
        meetings: e.meetings?.length || 0,
        notes: t.tabs?.filter(e => String(e.content || "").trim()).length || 0,
        wallpaper: e.customWallpaper ? 1 : 0
    }
}
function loadRestorePoints() {
    try {
        const e = JSON.parse(localStorage.getItem(RESTORE_POINTS_KEY) || "[]");
        return Array.isArray(e) ? e.filter(e => e?.id && e?.payload).map(e => ({
            id: String(e.id),
            reason: cleanTitle(e.reason || "Restore point"),
            createdAt: e.createdAt || (new Date).toISOString(),
            fingerprint: e.fingerprint || workspaceFingerprint(e.payload),
            counts: e.counts || restorePointCounts(e.payload),
            payload: {
                ...e.payload,
                tasks: Array.isArray(e.payload.tasks) ? e.payload.tasks.map(normalizeTask) : [],
                meetings: Array.isArray(e.payload.meetings) ? e.payload.meetings.map(normalizeMeeting) : [],
                generalNotes: normalizeGeneralNotes(e.payload.generalNotes),
                unifiedLayout: normalizeUnifiedLayout(e.payload.unifiedLayout || defaultUnifiedLayout()),
                unifiedPresets: normalizeUnifiedPresets(e.payload.unifiedPresets || []),
                customWallpaper: "string" == typeof e.payload.customWallpaper ? e.payload.customWallpaper : ""
            }
        })).sort( (e, t) => new Date(t.createdAt) - new Date(e.createdAt)).slice(0, 8) : []
    } catch {
        return []
    }
}
function saveRestorePoints(e) {
    const t = e.slice(0, 8);
    for (; t.length; )
        try {
            return localStorage.setItem(RESTORE_POINTS_KEY, JSON.stringify(t)),
            t
        } catch {
            t.pop()
        }
    return localStorage.removeItem(RESTORE_POINTS_KEY),
    []
}
function createRestorePoint(e="Automatic restore point", t={}) {
    const n = workspaceBackupPayload(new Date);
    if (!workspaceHasContent(n))
        return renderRestorePointControls(),
        null;
    const a = loadRestorePoints()
      , s = workspaceFingerprint(n)
      , i = a[0]
      , o = i?.createdAt ? new Date(i.createdAt).getTime() : 0;
    if (!t.force && i && (i.fingerprint === s || Date.now() - o < 3e5))
        return renderRestorePointControls(),
        i;
    const r = {
        id: uid(),
        reason: e,
        createdAt: (new Date).toISOString(),
        fingerprint: s,
        counts: restorePointCounts(n),
        payload: n
    }
      , l = saveRestorePoints([r, ...a.filter(e => e.fingerprint !== s)]);
    return renderRestorePointControls(),
    (t.force || "Automatic restore point" !== e) && recordSyncActivity("restore", "success", `${e} saved`, r.counts),
    l[0] || r
}
function renderRestorePointControls() {
    if (!els.settingsRestoreBadge || !els.settingsRestorePointInput || !els.accountSettingsDialog?.open)
        return;
    const e = loadRestorePoints()
      , t = els.settingsRestorePointInput.value;
    els.settingsRestoreBadge.dataset.health = e.length ? "good" : "muted",
    els.settingsRestoreBadge.textContent = e.length ? `${e.length} saved` : "None yet",
    els.settingsRestoreSummary.textContent = e.length ? `Latest restore point: ${formatSavedTime(e[0].createdAt)}.` : "TaskFlow will save restore points as you work.",
    els.settingsRestorePointInput.innerHTML = e.length ? e.map(e => {
        const t = e.counts || {}
          , n = `${formatSavedTime(e.createdAt)} - ${e.reason} (${t.tasks || 0} tasks, ${t.meetings || 0} events)`;
        return `<option value="${escapeAttr(e.id)}">${escapeHtml(n)}</option>`
    }
    ).join("") : '<option value="">No restore points yet</option>',
    t && e.some(e => e.id === t) && (els.settingsRestorePointInput.value = t);
    const n = Boolean(els.settingsRestorePointInput.value && e.length);
    els.settingsRestorePointBtn && (els.settingsRestorePointBtn.disabled = !n),
    els.settingsExportRestorePointBtn && (els.settingsExportRestorePointBtn.disabled = !n),
    refreshIcons()
}
function selectedRestorePoint() {
    const e = els.settingsRestorePointInput?.value || "";
    return loadRestorePoints().find(t => t.id === e) || null
}
function restoreSelectedRestorePoint() {
    const e = selectedRestorePoint();
    e ? confirmAction("Restore workspace?", "This replaces your current tasks, events, notes, and Workspace layout with the selected restore point. TaskFlow will save your current workspace first.", () => {
        allowWorkspaceChange(e.payload) && (createRestorePoint("Before restore", {
            force: !0
        }),
        applyWorkspacePayload(e.payload),
        persist(),
        syncPendingDeletes().catch(e => console.warn("Restore delete sync failed", e)),
        renderAll(),
        els.accountSettingsDialog.open && populateAccountSettings(),
        recordSyncActivity("restore", "success", "Workspace restored from restore point", e.counts || {}),
        toast("Workspace restored and syncing"))
    }
    ) : toast("Choose a restore point first")
}
function exportSelectedRestorePoint() {
    const e = selectedRestorePoint();
    e ? (downloadJson(e.payload, `taskflow-restore-${e.createdAt.slice(0, 10)}.json`),
    recordSyncActivity("export", "success", "Restore point exported", e.counts || {}),
    toast("Restore point exported")) : toast("Choose a restore point first")
}
function applyWorkspacePayload(e) {
    const t = state.tasks.map(e => e.id)
      , n = state.meetings.map(e => e.id);
    state.tasks = Array.isArray(e.tasks) ? e.tasks.map(normalizeTask) : [],
    state.meetings = Array.isArray(e.meetings) ? e.meetings.map(normalizeMeeting) : [],
    state.generalNotes = normalizeGeneralNotes(e.generalNotes),
    state.unifiedLayout = normalizeUnifiedLayout(e.unifiedLayout || state.unifiedLayout),
    state.unifiedPresets = normalizeUnifiedPresets(e.unifiedPresets || state.unifiedPresets),
    Object.prototype.hasOwnProperty.call(e, "customWallpaper") && saveCustomWallpaper("string" == typeof e.customWallpaper ? e.customWallpaper : ""),
    saveUnifiedLayoutLocal(),
    saveUnifiedPresetsLocal(),
    selectedTasks.clear(),
    state.tasks.forEach(e => state.pendingSyncIds.add(e.id)),
    state.meetings.forEach(e => state.pendingMeetingSyncIds.add(e.id));
    const a = new Set(state.tasks.map(e => e.id))
      , s = new Set(state.meetings.map(e => e.id));
    clearTaskTombstones([...a]),
    clearMeetingTombstones([...s]),
    t.filter(e => !a.has(e)).forEach(e => {
        state.pendingDeleteIds.add(e),
        recordTaskTombstone(e)
    }
    ),
    n.filter(e => !s.has(e)).forEach(e => {
        state.pendingMeetingDeleteIds.add(e),
        recordMeetingTombstone(e)
    }
    ),
    saveDeletionTombstones(),
    savePendingDeletes(),
    savePendingSyncs()
}
async function forceSyncNow() {
    if (!state.session?.access_token)
        return recordSyncActivity("sync", "warning", "Sync needs sign in", {}, {
            dedupeMs: 12e4
        }),
        void toast("Sign in to sync your workspace");
    if (!state.isOnline)
        return recordSyncActivity("sync", "warning", "Sync paused while offline", {}, {
            dedupeMs: 12e4
        }),
        toast("You are offline. TaskFlow will sync when the connection returns."),
        void updateSaveStatus();
    if (state.encryption.enabled && !state.encryption.unlocked)
        return recordSyncActivity("sync", "warning", "Private sync locked", {}, {
            dedupeMs: 12e4
        }),
        toast("Unlock Private sync before syncing encrypted data"),
        void updateSaveStatus();
    recordSyncActivity("sync", "info", "Manual sync started"),
    clearTimeout(generalNotesSaveTimer),
    clearTimeout(meetingNotesSaveTimer),
    clearTimeout(unifiedLayoutSaveTimer),
    clearTimeout(preferenceSyncTimer),
    clearTimeout(uiStyleSyncTimer);
    const e = readLocalWorkspace();
    saveWorkspaceLocal(new Date),
    queueWorkspaceChangesForSync(e),
    savePendingSyncs(),
    state.isSyncing = !0,
    updateSaveStatus();
    try {
        workspaceSyncPromise && await workspaceSyncPromise.catch(e => console.warn("Waiting background sync failed", e)),
        await syncPendingDeletes(),
        await syncAllWorkspace(),
        await syncUserPreferences({
            throwOnError: !0
        }),
        googleCalendarAutoSyncEnabled() && await syncTaskFlowToGoogleCalendar({
            silent: !0,
            reason: "manual"
        }),
        recordSyncActivity("sync", "success", "Workspace synced", {
            tasks: state.tasks.length,
            events: state.meetings.length,
            notes: normalizeGeneralNotes(state.generalNotes).tabs.filter(e => e.content.trim()).length
        }),
        toast("Workspace synced")
    } catch (t) {
        console.warn("Manual sync failed", t),
        savePendingSyncs(),
        scheduleWorkspaceSyncRetry("manual failure"),
        recordSyncActivity("sync", "error", "Workspace sync failed", {
            code: t?.taskflowCode || t?.code || "",
            detail: String(t?.message || t || "").slice(0, 160)
        }),
        toast(readableError(t))
    } finally {
        state.isSyncing = !1,
        updateSaveStatus()
    }
}
function loadStoredSession() {
    try {
        const e = localStorage.getItem(SESSION_KEY);
        return e ? JSON.parse(e) : null
    } catch {
        return null
    }
}
function storeSession(e) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(e))
}
function clearStoredSession() {
    localStorage.removeItem(SESSION_KEY),
    localStorage.removeItem(PENDING_DELETE_KEY),
    localStorage.removeItem(PENDING_TASK_SYNC_KEY),
    localStorage.removeItem(PENDING_MEETING_DELETE_KEY),
    localStorage.removeItem(PENDING_MEETING_SYNC_KEY)
}
async function consumeOAuthCallback() {
    const e = new URLSearchParams(window.location.hash.replace(/^#/, ""))
      , t = void 0;
    if (e.get("error_description") || e.get("error"))
        return window.history.replaceState(null, "", getCleanAuthUrl()),
        setAuthMessage(readableError(codedError("TF-AUTH-103", "Please try signing in again.")), "error"),
        showAuthGate(),
        !0;
    const n = e.get("access_token");
    if (!n)
        return !1;
    showAuthLoading("Finishing secure sign in...");
    const a = Number(e.get("expires_in") || 3600)
      , s = normalizeSession({
        access_token: n,
        refresh_token: e.get("refresh_token"),
        expires_in: a,
        token_type: e.get("token_type") || "bearer"
    });
    window.history.replaceState(null, "", getCleanAuthUrl());
    try {
        await completeAuth(s, "Signed in with Google")
    } catch (t) {
        clearStoredSession(),
        state.session = null,
        state.user = null,
        setAuthMessage(readableError(t), "error"),
        showAuthGate()
    }
    return !0
}
function getAuthRedirectUrl() {
    return "null" === window.location.origin ? getCleanAuthUrl() : `${window.location.origin}${window.location.pathname}`
}
function getCleanAuthUrl() {
    return `${"null" === window.location.origin ? window.location.href.split("#")[0].split("?")[0] : window.location.origin + window.location.pathname}`
}
async function signInWithPassword(e, t) {
    return normalizeSession(await authRequest("/token?grant_type=password", {
        method: "POST",
        body: JSON.stringify({
            email: e,
            password: t
        })
    }))
}
async function signUpWithPassword(e, t) {
    const n = (new Date).toISOString();
    return normalizeSession(await authRequest("/signup", {
        method: "POST",
        body: JSON.stringify({
            email: e,
            password: t,
            data: {
                terms_version: "2026-06-17",
                terms_accepted_at: n,
                license_version: "2026-06-17",
                onboarding_version: "2026-06-16",
                taskflow_timezone: state.meetingTimezone,
                taskflow_density: state.density,
                taskflow_theme: document.documentElement.dataset.theme || "light",
                taskflow_ui_style: normalizeUiStyle(state.uiStyle),
                taskflow_auto_delete_done_days: state.autoDeleteDoneDays,
                taskflow_unified_layout: normalizeUnifiedLayout(state.unifiedLayout),
                taskflow_unified_presets: normalizeUnifiedPresets(state.unifiedPresets)
            }
        })
    }))
}
async function resetPasswordForEmail(e) {
    await authRequest("/recover", {
        method: "POST",
        body: JSON.stringify({
            email: e,
            redirect_to: getAuthRedirectUrl()
        })
    })
}
async function refreshSession(e) {
    if (!e)
        throw new Error("Session expired. Please sign in again.");
    return normalizeSession(await authRequest("/token?grant_type=refresh_token", {
        method: "POST",
        body: JSON.stringify({
            refresh_token: e
        })
    }))
}
async function getCurrentUser() {
    const e = await authRequest("/user", {
        method: "GET"
    });
    return e.user || e
}
async function authRequest(e, t={}) {
    const n = getSupabaseConfig();
    if (!n)
        throw codedError("TF-AUTH-001");
    const a = {
        apikey: n.key,
        "Content-Type": "application/json",
        ...t.headers || {}
    };
    state.session?.access_token && (a.Authorization = `Bearer ${state.session.access_token}`);
    const s = await fetch(`${n.url}/auth/v1${e}`, {
        ...t,
        headers: a
    })
      , i = await readJsonResponse(s);
    if (!s.ok)
        throw codedError(codeForAuthResponse(i), i?.msg || i?.message || i?.error_description || "Authentication failed.");
    return i
}
async function restRequest(e, t={}) {
    const n = getSupabaseConfig();
    if (!n)
        throw codedError("TF-SYNC-001");
    if (!state.session?.access_token)
        throw new Error("Please sign in first.");
    const a = {
        apikey: n.key,
        Authorization: `Bearer ${state.session.access_token}`,
        "Content-Type": "application/json",
        ...t.headers || {}
    }
      , s = await fetch(`${n.url}/rest/v1${e}`, {
        ...t,
        headers: a
    })
      , i = await readJsonResponse(s);
    if (!s.ok) {
        const e = new Error(i?.message || i?.hint || "Sync failed.");
        throw e.status = s.status,
        e.code = i?.code || "",
        e.details = i?.details || "",
        e.hint = i?.hint || "",
        e
    }
    return i
}
async function readJsonResponse(e) {
    const t = await e.text();
    if (!t)
        return null;
    try {
        return JSON.parse(t)
    } catch {
        return {
            message: t
        }
    }
}
function normalizeSession(e) {
    return e ? {
        access_token: e.access_token,
        refresh_token: e.refresh_token,
        expires_at: e.expires_at || (e.expires_in ? Math.floor(Date.now() / 1e3) + e.expires_in : null),
        token_type: e.token_type || "bearer",
        user: e.user || null
    } : null
}
function defaultAccountAccess() {
    return {
        loaded: !1,
        tier: "base",
        holdUntil: "",
        holdReason: "",
        holdMessage: "",
        latestTierRequest: null,
        latestDeletionRequest: null
    }
}
async function loadAccountAccess() {
    if (state.accountAccess = defaultAccountAccess(),
    !state.session?.access_token || !state.user?.id)
        return;
    const e = encodeURIComponent(state.user.id);
    try {
        const [t,n,a] = await Promise.all([restRequest(`/account_profiles?select=*&user_id=eq.${e}&limit=1`, {
            method: "GET"
        }).catch(e => (console.warn("Account profile unavailable", e),
        [])), restRequest(`/tier_requests?select=*&user_id=eq.${e}&order=created_at.desc&limit=1`, {
            method: "GET"
        }).catch(e => (console.warn("Tier requests unavailable", e),
        [])), restRequest(`/account_deletion_requests?select=*&user_id=eq.${e}&order=created_at.desc&limit=1`, {
            method: "GET"
        }).catch(e => (console.warn("Account deletion requests unavailable", e),
        []))])
          , s = Array.isArray(t) ? t[0] : null
          , i = Array.isArray(n) ? n[0] : null
          , o = Array.isArray(a) ? a[0] : null
          , r = "approved" === i?.status ? normalizeAccountTier(i.resolved_tier) : "";
        state.accountAccess = {
            loaded: !0,
            tier: normalizeAccountTier(s?.tier) || r || "base",
            holdUntil: s?.hold_until || "",
            holdReason: s?.hold_reason || "",
            holdMessage: s?.hold_message || "",
            latestTierRequest: normalizeTierRequest(i),
            latestDeletionRequest: normalizeDeletionRequest(o)
        }
    } catch (t) {
        console.warn("Account access load failed", t),
        state.accountAccess = {
            ...defaultAccountAccess(),
            loaded: !0
        }
    }
}
function normalizeAccountTier(e) {
    const t = String(e || "").toLowerCase();
    return Object.prototype.hasOwnProperty.call(ACCOUNT_TIERS, t) ? t : ""
}
function currentAccountTier() {
    return normalizeAccountTier(state.accountAccess?.tier) || "base"
}
function currentTierConfig() {
    return ACCOUNT_TIERS[currentAccountTier()] || ACCOUNT_TIERS.base
}
function normalizeTierRequest(e) {
    return e ? {
        id: e.id || "",
        status: String(e.status || "pending").toLowerCase(),
        requestedTier: normalizeAccountTier(e.requested_tier) || "pro",
        resolvedTier: normalizeAccountTier(e.resolved_tier),
        reason: e.reason || "",
        responseMessage: e.response_message || "",
        createdAt: e.created_at || "",
        updatedAt: e.updated_at || e.created_at || "",
        resolvedAt: e.resolved_at || ""
    } : null
}
function normalizeDeletionRequest(e) {
    return e ? {
        id: e.id || "",
        status: String(e.status || "pending").toLowerCase(),
        reason: e.reason || "",
        responseMessage: e.response_message || "",
        createdAt: e.created_at || "",
        updatedAt: e.updated_at || e.created_at || "",
        resolvedAt: e.resolved_at || ""
    } : null
}
function activeAccountHold() {
    const e = state.accountAccess?.holdUntil;
    if (!e)
        return null;
    const t = new Date(e);
    return Number.isNaN(t.getTime()) || t.getTime() <= Date.now() ? null : {
        until: t,
        reason: state.accountAccess.holdReason || "Fair use review",
        message: state.accountAccess.holdMessage || "Some account actions are temporarily limited while this account is reviewed."
    }
}
function aiUsageStorageKey() {
    const e = state.user?.id || state.user?.email || "local";
    return `${AI_USAGE_KEY_PREFIX}${e}.${todayISO()}`
}
function readAiUsageCount() {
    const e = localStorage.getItem(aiUsageStorageKey())
      , t = Number(e);
    return Number.isFinite(t) ? Math.max(0, Math.floor(t)) : 0
}
function writeAiUsageCount(e) {
    localStorage.setItem(aiUsageStorageKey(), String(Math.max(0, Math.floor(e))))
}
function recordAiAddAttempt() {
    const e = readAiUsageCount() + 1;
    return writeAiUsageCount(e),
    renderAccountAccessUi(),
    e
}
function checkAiAddAccess() {
    const e = activeAccountHold()
      , t = currentTierConfig()
      , n = readAiUsageCount();
    return e ? {
        allowed: !1,
        kind: "hold",
        title: "Account temporarily limited",
        message: e.message,
        meta: `${e.reason}. Hold ends ${e.until.toLocaleString(userLocale(), {
            dateStyle: "medium",
            timeStyle: "short"
        })}.`
    } : Number.isFinite(t.aiDaily) && n >= t.aiDaily ? {
        allowed: !1,
        kind: "limit",
        title: "Daily AI Assist limit reached",
        message: "TaskFlow can still add this task without AI. The daily AI Assist counter resets tomorrow.",
        meta: `${t.label}: ${n} / ${formatLimit(t.aiDaily)} AI Assist requests used today.`
    } : {
        allowed: !0,
        used: n,
        limit: t.aiDaily
    }
}
function maybeShowAiLimitDialog(e) {
    e && els.usageLimitDialog && (els.usageLimitTitle.textContent = e.title || "AI Assist paused",
    els.usageLimitMessage.textContent = e.message || "TaskFlow can still add the task without AI.",
    els.usageLimitMeta.textContent = e.meta || "",
    els.usageLimitRequestBtn.hidden = "hold" === e.kind,
    els.usageLimitDialog.open || els.usageLimitDialog.showModal(),
    refreshIcons())
}
function renderAccountAccessUi() {
    if (!els.settingsTierBadge)
        return;
    const e = currentAccountTier()
      , t = currentTierConfig()
      , n = readAiUsageCount()
      , a = Number.isFinite(t.aiDaily) ? Math.min(100, Math.round(n / t.aiDaily * 100)) : 0
      , s = workspaceUsageSnapshot()
      , i = Number.isFinite(t.storageBytes) ? Math.min(100, Math.round(s.bytes / t.storageBytes * 100)) : 0
      , o = activeAccountHold();
    if (els.settingsTierBadge.textContent = t.label,
    els.settingsTierBadge.dataset.health = o ? "warning" : "base" === e ? "muted" : "good",
    els.settingsPlanSummary && (els.settingsPlanSummary.textContent = o ? o.message : t.description),
    els.settingsUsageSummary && (els.settingsUsageSummary.textContent = `${n} / ${formatLimit(t.aiDaily)}`),
    els.settingsUsageMeter && (els.settingsUsageMeter.style.width = `${a}%`),
    els.settingsWorkspaceSummary && (els.settingsWorkspaceSummary.textContent = `${formatBytes(s.bytes)} / ${formatLimitBytes(t.storageBytes)} - ${s.items} / ${formatLimit(t.itemLimit)} items`),
    els.settingsWorkspaceMeter && (els.settingsWorkspaceMeter.style.width = `${i}%`),
    els.settingsTierRequestStatus && (els.settingsTierRequestStatus.textContent = tierRequestStatusText()),
    els.settingsTierRequestBtn) {
        const e = "pending" === state.accountAccess.latestTierRequest?.status;
        els.settingsTierRequestBtn.disabled = e || Boolean(o),
        els.settingsTierRequestBtn.title = e ? "Your latest request is waiting for review" : o ? "Account is temporarily limited" : "Request more fair-use room"
    }
    renderAccountDeletionUi()
}
function renderAccountDeletionUi() {
    if (!els.settingsDeletionStatus || !els.settingsDeletionRequestBtn)
        return;
    const e = state.accountAccess?.latestDeletionRequest;
    if (!Boolean(state.session?.access_token))
        return els.settingsDeletionStatus.dataset.health = "muted",
        els.settingsDeletionStatus.textContent = "Sign in",
        els.settingsDeletionRequestBtn.disabled = !0,
        void (els.settingsDeletionRequestBtn.title = "Sign in before requesting account deletion");
    if (!e)
        return els.settingsDeletionStatus.dataset.health = "muted",
        els.settingsDeletionStatus.textContent = "Available",
        els.settingsDeletionRequestBtn.disabled = !1,
        void (els.settingsDeletionRequestBtn.title = "Request account deletion");
    const t = {
        pending: "Pending",
        reviewing: "Reviewing",
        completed: "Completed",
        cancelled: "Cancelled",
        rejected: "Reviewed"
    }
      , n = ["pending", "reviewing"].includes(e.status);
    els.settingsDeletionStatus.dataset.health = n ? "warning" : "completed" === e.status ? "good" : "muted",
    els.settingsDeletionStatus.textContent = t[e.status] || "Submitted",
    els.settingsDeletionRequestBtn.disabled = n,
    els.settingsDeletionRequestBtn.title = n ? `Your account deletion request is ${t[e.status].toLowerCase()}` : "Submit another account deletion request"
}
function tierRequestStatusText() {
    const e = state.accountAccess.latestTierRequest;
    return e ? "pending" === e.status ? `Your ${ACCOUNT_TIERS[e.requestedTier]?.label || "higher tier"} request is waiting for review.` : "approved" === e.status ? `Latest request approved${e.resolvedTier ? `: ${ACCOUNT_TIERS[e.resolvedTier]?.label}` : ""}.` : "rejected" === e.status ? e.responseMessage || "Latest request was reviewed and not approved." : "Higher tiers can be requested if your normal use needs more room." : "Higher tiers can be requested if your normal use needs more room."
}
function openTierRequestDialog() {
    if (!state.session?.access_token)
        return void toast("Sign in to request a higher tier");
    const e = activeAccountHold();
    if (e)
        return void maybeShowAiLimitDialog({
            kind: "hold",
            title: "Account temporarily limited",
            message: e.message,
            meta: `${e.reason}. Hold ends ${e.until.toLocaleString(userLocale(), {
                dateStyle: "medium",
                timeStyle: "short"
            })}.`
        });
    if ("pending" === state.accountAccess.latestTierRequest?.status)
        return void toast("Your latest tier request is still waiting for review");
    els.tierRequestTierInput.value = "base" === currentAccountTier() ? "pro" : "dev";
    const t = splitProfileName();
    els.tierRequestFirstNameInput.value = t.first,
    els.tierRequestLastNameInput.value = t.last,
    els.tierRequestReasonInput.value = "",
    els.tierRequestMessage.textContent = "",
    els.tierRequestDialog.showModal(),
    refreshIcons()
}
async function submitTierRequest(e) {
    e.preventDefault();
    const t = normalizeAccountTier(els.tierRequestTierInput.value) || "pro"
      , n = currentAccountTier()
      , a = cleanTitle(els.tierRequestFirstNameInput.value || "")
      , s = cleanTitle(els.tierRequestLastNameInput.value || "")
      , i = cleanTitle(els.tierRequestReasonInput.value || "");
    if (a && s) {
        els.tierRequestSubmitBtn.disabled = !0,
        els.tierRequestMessage.textContent = "Sending request...";
        try {
            const e = await restRequest("/tier_requests", {
                method: "POST",
                headers: {
                    Prefer: "return=representation"
                },
                body: JSON.stringify({
                    user_id: state.user.id,
                    email: state.user.email || "",
                    first_name: a,
                    last_name: s,
                    current_tier: n,
                    requested_tier: t,
                    reason: i,
                    status: "pending"
                })
            });
            state.accountAccess.latestTierRequest = normalizeTierRequest(Array.isArray(e) ? e[0] : e),
            renderAccountAccessUi(),
            els.tierRequestDialog.close(),
            toast("Tier request sent")
        } catch (o) {
            console.warn("Tier request failed", o),
            els.tierRequestMessage.textContent = errorText("TF-PLAN-001", "Try again after syncing, or contact TaskFlow support.")
        } finally {
            els.tierRequestSubmitBtn.disabled = !1
        }
    } else
        els.tierRequestMessage.textContent = "Add your first and last name so TaskFlow can review the request."
}
function openFeedbackDialog() {
    state.session?.access_token ? (els.feedbackTypeInput.value = state.lastError ? "bug" : "feedback",
    els.feedbackSubjectInput.value = state.lastError?.code ? `Issue ${state.lastError.code}` : "",
    els.feedbackMessageInput.value = "",
    els.feedbackIncludeDiagnosticsInput.checked = !0,
    els.feedbackIncludeSummaryInput.checked = !1,
    els.feedbackMessage.textContent = "",
    els.feedbackSubmitBtn.disabled = !1,
    els.feedbackDialog.showModal(),
    window.setTimeout( () => els.feedbackSubjectInput.value ? els.feedbackMessageInput.focus() : els.feedbackSubjectInput.focus(), 40),
    refreshIcons()) : toast("Sign in to send feedback to TaskFlow")
}
async function submitFeedbackReport(e) {
    if (e.preventDefault(),
    !state.session?.access_token || !state.user?.id)
        return void (els.feedbackMessage.textContent = "Sign in again before sending feedback.");
    const t = normalizeFeedbackType(els.feedbackTypeInput.value)
      , n = String(els.feedbackSubjectInput.value || "").trim().slice(0, 120)
      , a = String(els.feedbackMessageInput.value || "").trim().slice(0, 1800);
    if (n && a) {
        els.feedbackSubmitBtn.disabled = !0,
        els.feedbackMessage.textContent = "Sending to TaskFlow...";
        try {
            await restRequest("/feedback_reports", {
                method: "POST",
                headers: {
                    Prefer: "return=minimal"
                },
                body: JSON.stringify({
                    user_id: state.user.id,
                    email: state.user.email || "",
                    report_type: t,
                    subject: n,
                    message: a,
                    include_diagnostics: Boolean(els.feedbackIncludeDiagnosticsInput.checked),
                    include_workspace_summary: Boolean(els.feedbackIncludeSummaryInput.checked),
                    diagnostics: els.feedbackIncludeDiagnosticsInput.checked ? feedbackDiagnostics() : {},
                    workspace_summary: els.feedbackIncludeSummaryInput.checked ? feedbackWorkspaceSummary() : {},
                    app_version: "beta 0.95",
                    page_url: safeCurrentUrl(),
                    status: "new"
                })
            }),
            els.feedbackDialog.close(),
            recordSyncActivity("feedback", "success", "Feedback sent to TaskFlow", {
                type: t
            }),
            toast("Feedback sent to TaskFlow")
        } catch (s) {
            console.warn("Feedback send failed", s),
            trackClientError(s),
            recordSyncActivity("feedback", "error", "Feedback could not be sent", {
                detail: String(s?.message || s || "").slice(0, 160)
            }),
            els.feedbackMessage.textContent = errorText("TF-FEED-001", "Your draft is still here. Try again after syncing.")
        } finally {
            els.feedbackSubmitBtn.disabled = !1
        }
    } else
        els.feedbackMessage.textContent = "Add a subject and a few details so TaskFlow can review it."
}
function openAccountDeletionDialog() {
    if (!state.session?.access_token)
        return void toast("Sign in to request account deletion");
    const e = state.accountAccess?.latestDeletionRequest;
    e && ["pending", "reviewing"].includes(e.status) ? toast("Your account deletion request is already waiting for review") : (els.accountDeletionReasonInput.value = "",
    els.accountDeletionConfirmInput.value = "",
    els.accountDeletionMessage.textContent = "Your workspace is not deleted immediately. TaskFlow reviews account deletion requests for safety.",
    els.accountDeletionSubmitBtn.disabled = !1,
    els.accountDeletionDialog.showModal(),
    window.setTimeout( () => els.accountDeletionConfirmInput.focus(), 40),
    refreshIcons())
}
async function submitAccountDeletionRequest(e) {
    if (e.preventDefault(),
    !state.session?.access_token || !state.user?.id)
        return void (els.accountDeletionMessage.textContent = "Sign in again before sending this request.");
    if ("DELETE" !== String(els.accountDeletionConfirmInput.value || "").trim())
        return void (els.accountDeletionMessage.textContent = "Type DELETE exactly to confirm this request.");
    const t = state.accountAccess?.latestDeletionRequest;
    if (t && ["pending", "reviewing"].includes(t.status))
        return els.accountDeletionMessage.textContent = "Your latest account deletion request is already waiting for review.",
        void renderAccountDeletionUi();
    const n = String(els.accountDeletionReasonInput.value || "").trim().slice(0, 900);
    els.accountDeletionSubmitBtn.disabled = !0,
    els.accountDeletionMessage.textContent = "Sending request to TaskFlow...";
    try {
        const e = await restRequest("/account_deletion_requests", {
            method: "POST",
            headers: {
                Prefer: "return=representation"
            },
            body: JSON.stringify({
                user_id: state.user.id,
                email: state.user.email || "",
                reason: n,
                status: "pending",
                app_version: "beta 0.95",
                page_url: safeCurrentUrl()
            })
        });
        state.accountAccess.latestDeletionRequest = normalizeDeletionRequest(Array.isArray(e) ? e[0] : e),
        renderAccountDeletionUi(),
        els.accountDeletionDialog.close(),
        recordSyncActivity("account", "success", "Account deletion request sent"),
        toast("Account deletion request sent")
    } catch (a) {
        console.warn("Account deletion request failed", a),
        trackClientError(a),
        recordSyncActivity("account", "error", "Account deletion request failed", {
            detail: String(a?.message || a || "").slice(0, 160)
        }),
        els.accountDeletionMessage.textContent = errorText("TF-ACCT-001", "Try again after syncing, or contact TaskFlow support.")
    } finally {
        els.accountDeletionSubmitBtn.disabled = !1
    }
}
function normalizeFeedbackType(e) {
    const t = String(e || "").toLowerCase();
    return ["bug", "sync", "feature", "feedback", "urgent"].includes(t) ? t : "feedback"
}
function feedbackDiagnostics() {
    const e = state.pendingSyncIds.size + state.pendingMeetingSyncIds.size
      , t = state.pendingDeleteIds.size + state.pendingMeetingDeleteIds.size;
    return {
        appVersion: "beta 0.95",
        online: state.isOnline,
        signedIn: Boolean(state.session?.access_token),
        accountTier: currentAccountTier(),
        view: state.view,
        smartView: state.smartView,
        theme: document.documentElement.dataset.theme || "",
        glass: document.documentElement.dataset.glass || "",
        uiPreset: document.documentElement.dataset.uiPreset || "",
        density: state.density,
        timezone: state.meetingTimezone,
        pageUrl: safeCurrentUrl(),
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
        language: navigator.language || "",
        platform: navigator.platform || "",
        serviceWorker: Boolean(navigator.serviceWorker?.controller),
        installMode: window.matchMedia?.("(display-mode: standalone)")?.matches ? "installed" : "browser",
        recentActivity: loadSyncActivity().slice(0, 10),
        sync: {
            isSyncing: state.isSyncing,
            pendingSaves: e,
            pendingDeletes: t,
            lastAccountSync: lastAccountSyncedAt(),
            lastDeviceSave: readWorkspaceSaveMeta().exportedAt || "",
            lastMergeSummary: readSyncMergeSummary(),
            googleCalendarConnected: googleCalendarConnected(),
            googleCalendarAutoSync: googleCalendarAutoSyncEnabled(),
            googleCalendarLastSync: googleCalendarLastSyncedAt(),
            googleCalendarLastStatus: googleCalendarLastStatus(),
            googleCalendarLastError: googleCalendarLastError(),
            googleCalendarIncremental: Boolean(googleCalendarSyncToken()),
            googleCalendarOwnedItems: loadGoogleCalendarPushedIds().size,
            privateSyncEnabled: state.encryption.enabled,
            privateSyncUnlocked: state.encryption.unlocked
        },
        counts: {
            tasks: state.tasks.length,
            events: state.meetings.length,
            notes: normalizeGeneralNotes(state.generalNotes).tabs.filter(e => String(e.content || "").trim()).length,
            restorePoints: loadRestorePoints().length
        },
        lastError: state.lastError
    }
}
function feedbackWorkspaceSummary() {
    return {
        projects: getProjects().slice(0, 80),
        tags: getTags().slice(0, 80),
        statuses: statuses.map(e => ({
            id: e.id,
            count: state.tasks.filter(t => t.status === e.id).length
        })),
        priorities: ["urgent", "high", "medium", "low"].map(e => ({
            id: e,
            count: state.tasks.filter(t => t.priority === e).length
        })),
        overdueTasks: state.tasks.filter(e => isOverdue(e)).length,
        upcomingEvents: state.meetings.filter(isUpcomingMeeting).length
    }
}
function safeCurrentUrl() {
    try {
        const e = new URL(window.location.href);
        return e.hash = "",
        e.search = e.search ? "?..." : "",
        e.toString()
    } catch {
        return window.location.origin || ""
    }
}
function trackClientError(e) {
    const t = String(e?.message || e || "Unknown error").slice(0, 240)
      , n = e?.taskflowCode || e?.code || inferErrorCodeFromMessage(t) || "";
    state.lastError = {
        code: n,
        message: t,
        at: (new Date).toISOString()
    }
}
function inferErrorCodeFromMessage(e) {
    const t = String(e || "").toLowerCase();
    return t.includes("calendar") ? "TF-GCAL-201" : t.includes("auth") || t.includes("jwt") || t.includes("session") ? "TF-AUTH-103" : t.includes("sync") || t.includes("schema cache") || t.includes("row-level security") ? "TF-SYNC-301" : t.includes("feedback") ? "TF-FEED-001" : ""
}
function maybeShowAccountAccessNotice() {
    const e = activeAccountHold();
    e ? maybeShowAiLimitDialog({
        kind: "hold",
        title: "Account temporarily limited",
        message: e.message,
        meta: `${e.reason}. Hold ends ${e.until.toLocaleString(userLocale(), {
            dateStyle: "medium",
            timeStyle: "short"
        })}.`
    }) : maybeShowTierRequestOutcome()
}
function maybeShowTierRequestOutcome() {
    const e = state.accountAccess.latestTierRequest;
    if (!e || "pending" === e.status || !e.id || !els.tierOutcomeDialog)
        return;
    if ("approved" === e.status)
        return;
    const t = `${e.id}:${e.status}:${e.resolvedTier || ""}:${e.updatedAt || e.resolvedAt || ""}`
      , n = `${SEEN_TIER_OUTCOME_KEY_PREFIX}${state.user?.id || "local"}`;
    if (localStorage.getItem(n) === t || state.user?.user_metadata?.taskflow_tier_outcome_seen === t)
        return;
    localStorage.setItem(n, t),
    rememberTierOutcomeSeen(t);
    const a = "approved" === e.status
      , s = e.resolvedTier ? ACCOUNT_TIERS[e.resolvedTier]?.label || e.resolvedTier : "your requested tier";
    els.tierOutcomeTitle.textContent = a ? "Tier request approved" : "Tier request reviewed",
    els.tierOutcomeMessage.textContent = a ? `Your account has been approved for ${s}.` : e.responseMessage || "Your request was reviewed and was not approved this time.",
    els.tierOutcomeMeta.textContent = e.responseMessage && a ? e.responseMessage : "",
    els.tierOutcomeDialog.showModal(),
    refreshIcons()
}
function rememberTierOutcomeSeen(e) {
    state.session?.access_token && e && authRequest("/user", {
        method: "PUT",
        body: JSON.stringify({
            data: {
                ...state.user?.user_metadata || {},
                taskflow_tier_outcome_seen: e
            }
        })
    }).then(e => {
        state.user = e.user || e || state.user
    }
    ).catch(e => console.warn("Tier outcome seen sync failed", e))
}
function splitProfileName() {
    const e = state.user?.user_metadata || {}
      , t = cleanTitle(e.first_name || e.given_name || "")
      , n = cleanTitle(e.last_name || e.family_name || "");
    if (t || n)
        return {
            first: t,
            last: n
        };
    const a = cleanTitle(e.full_name || e.name || "");
    if (!a)
        return {
            first: "",
            last: ""
        };
    const s = a.split(" ");
    return {
        first: s.shift() || "",
        last: s.join(" ")
    }
}
function workspaceUsageSnapshot(e={}) {
    const t = Array.isArray(e.tasks) ? e.tasks : state.tasks
      , n = Array.isArray(e.meetings) ? e.meetings : state.meetings
      , a = e.generalNotes ? normalizeGeneralNotes(e.generalNotes) : normalizeGeneralNotes(state.generalNotes)
      , s = {
        tasks: t,
        meetings: n,
        generalNotes: a,
        unifiedLayout: e.unifiedLayout || state.unifiedLayout,
        unifiedPresets: e.unifiedPresets || state.unifiedPresets,
        customWallpaper: e.customWallpaper ?? loadCustomWallpaper()
    }
      , i = JSON.stringify(s);
    let o = 2 * i.length;
    try {
        o = new Blob([i]).size
    } catch {}
    return {
        bytes: o,
        items: t.length + n.length + a.tabs.length
    }
}
function workspaceLimitStatus(e={}) {
    const t = currentTierConfig()
      , n = workspaceUsageSnapshot(e);
    return Number.isFinite(t.itemLimit) && n.items > t.itemLimit ? {
        allowed: !1,
        kind: "workspace",
        title: "Workspace limit reached",
        message: "This workspace has reached the fair-use item limit for your current plan.",
        meta: `${t.label}: ${n.items} / ${formatLimit(t.itemLimit)} items. You can delete old items or request a higher tier.`
    } : Number.isFinite(t.storageBytes) && n.bytes > t.storageBytes ? {
        allowed: !1,
        kind: "workspace",
        title: "Workspace storage limit reached",
        message: "This workspace has reached the fair-use storage limit for your current plan.",
        meta: `${t.label}: ${formatBytes(n.bytes)} / ${formatLimitBytes(t.storageBytes)}. You can export a backup, delete old items, or request a higher tier.`
    } : {
        allowed: !0,
        usage: n
    }
}
function allowWorkspaceChange(e) {
    const t = workspaceLimitStatus(e);
    return !!t.allowed || (maybeShowAiLimitDialog(t),
    !1)
}
function formatLimit(e) {
    return Number.isFinite(e) ? Number(e).toLocaleString(userLocale()) : "Unlimited"
}
function formatLimitBytes(e) {
    return Number.isFinite(e) ? formatBytes(e) : "Unlimited"
}
function formatBytes(e) {
    const t = ["B", "KB", "MB", "GB"];
    let n = Math.max(0, Number(e) || 0)
      , a = 0;
    for (; n >= 1024 && a < t.length - 1; )
        n /= 1024,
        a += 1;
    const s = 0 === a || n >= 10 ? 0 : 1;
    return `${n.toFixed(s)} ${t[a]}`
}
async function loadCloudTasks() {
    const e = readLocalWorkspace()
      , t = lastAccountSyncedAt();
    await loadCloudDeletionTombstones();
    const n = await restRequest("/tasks?select=*&order=updated_at.desc", {
        method: "GET"
    })
      , a = Array.isArray(n) ? (await Promise.all(n.map(rowToTask))).filter(e => !isTaskDeleted(e.id)) : []
      , s = a.filter(isDemoSeedTask).map(e => e.id)
      , i = a.filter(e => !isDemoSeedTask(e))
      , o = filterDemoSeedTasks(e.tasks).filter(e => !isTaskDeleted(e.id));
    s.length && (queueDeletedTasks(s),
    deleteCloudTasks(s).catch(e => console.warn("Demo cleanup sync failed", e)),
    recordSyncActivity("sync", "info", "Starter tasks cleaned up", {
        tasks: s.length
    }, {
        dedupeMs: 3e5
    }));
    const r = mergeCloudAndLocalTasks(i, o, {
        lastSync: t
    });
    state.tasks = r.tasks,
    r.pendingIds.forEach(e => state.pendingSyncIds.add(e));
    let l = {
        pulled: 0,
        keptLocal: 0,
        conflicts: 0,
        pendingIds: new Set
    };
    try {
        const n = await restRequest("/meetings?select=*&order=meeting_date.asc,start_time.asc", {
            method: "GET"
        });
        l = mergeCloudAndLocalMeetings(Array.isArray(n) ? (await Promise.all(n.map(rowToMeeting))).filter(e => !isMeetingDeleted(e.id)) : [], e.meetings.filter(e => !isMeetingDeleted(e.id)), {
            lastSync: t
        }),
        state.meetings = l.meetings,
        l.pendingIds.forEach(e => state.pendingMeetingSyncIds.add(e));
        const a = topUpRecurringMeetings();
        a.length && markMeetingsPending(a)
    } catch (d) {
        console.warn("Meetings sync unavailable", d),
        state.meetings = e.meetings
    }
    await loadCloudWorkspaceNotes(e.generalNotes);
    const c = saveSyncMergeSummary({
        at: (new Date).toISOString(),
        tasksPulled: r.pulled,
        eventsPulled: l.pulled || 0,
        localKept: r.keptLocal + (l.keptLocal || 0),
        conflicts: r.conflicts + (l.conflicts || 0)
    });
    (c.tasksPulled || c.eventsPulled || c.localKept || c.conflicts) && recordSyncActivity("sync", c.conflicts ? "warning" : "success", c.conflicts ? "Sync conflicts protected" : "Account changes merged", {
        tasksPulled: c.tasksPulled,
        eventsPulled: c.eventsPulled,
        localKept: c.localKept,
        conflicts: c.conflicts
    }, {
        dedupeMs: 12e4
    }),
    autoDeleteExpiredDoneTasks({
        quiet: !0
    }),
    selectedTasks.clear(),
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        exportedAt: (new Date).toISOString(),
        tasks: state.tasks,
        meetings: state.meetings,
        generalNotes: state.generalNotes,
        unifiedLayout: normalizeUnifiedLayout(state.unifiedLayout),
        unifiedPresets: normalizeUnifiedPresets(state.unifiedPresets)
    })),
    updateSaveStatus(),
    (state.pendingSyncIds.size || state.pendingMeetingSyncIds.size) && (savePendingSyncs(),
    syncAllWorkspace().catch(e => console.warn("Recurring event sync failed", e)))
}
function mergeCloudAndLocalTasks(e, t, n={}) {
    const a = new Map
      , s = new Set
      , i = new Set(t.map(e => e?.id).filter(Boolean))
      , o = new Set;
    let r = e.filter(e => !i.has(e.id)).length
      , l = 0
      , c = 0;
    return e.forEach(e => {
        isTaskDeleted(e.id) || (a.set(e.id, normalizeTask(e)),
        s.add(e.id))
    }
    ),
    t.forEach(e => {
        const t = normalizeTask(e);
        if (isTaskDeleted(t.id))
            return;
        const i = a.get(t.id);
        if (t.encryptedLocked)
            return;
        const d = state.pendingSyncIds.has(t.id);
        if (!i && !d && shouldTreatMissingCloudItemAsDeleted(t, n.lastSync))
            return;
        if (i && d && shouldCreateTaskConflictCopy(t, i, n.lastSync)) {
            const e = createTaskConflictCopy(t, i);
            return a.set(i.id, normalizeTask(i)),
            a.set(e.id, e),
            o.add(e.id),
            void (c += 1)
        }
        const u = !i || String(t.updatedAt || "") > String(i.updatedAt || "");
        (d || u) && (a.set(t.id, t),
        o.add(t.id),
        i && (l += 1)),
        !i || d || u || taskContentFingerprint(t) === taskContentFingerprint(i) || (r += 1),
        s.has(t.id) || !d && !isLocalItemNewerThanLastSync(t, n.lastSync) || o.add(t.id)
    }
    ),
    {
        tasks: sortTasks([...a.values()].map(normalizeTask), "created"),
        pendingIds: o,
        pulled: r,
        keptLocal: l,
        conflicts: c
    }
}
function mergeCloudAndLocalMeetings(e, t, n={}) {
    const a = new Map
      , s = new Set
      , i = new Set(t.map(e => e?.id).filter(Boolean))
      , o = new Set;
    let r = e.filter(e => !i.has(e.id)).length
      , l = 0
      , c = 0;
    return e.forEach(e => {
        isMeetingDeleted(e.id) || (a.set(e.id, normalizeMeeting(e)),
        s.add(e.id))
    }
    ),
    t.forEach(e => {
        const t = normalizeMeeting(e);
        if (isMeetingDeleted(t.id))
            return;
        const i = a.get(t.id);
        if (t.encryptedLocked)
            return;
        const d = state.pendingMeetingSyncIds.has(t.id);
        if (!i && !d && shouldTreatMissingCloudItemAsDeleted(t, n.lastSync))
            return;
        if (i && d && shouldCreateMeetingConflictCopy(t, i, n.lastSync)) {
            const e = createMeetingConflictCopy(t, i);
            return a.set(i.id, normalizeMeeting(i)),
            a.set(e.id, e),
            o.add(e.id),
            void (c += 1)
        }
        const u = !i || String(t.updatedAt || "") > String(i.updatedAt || "");
        (d || u) && (a.set(t.id, t),
        o.add(t.id),
        i && (l += 1)),
        !i || d || u || meetingContentFingerprint(t) === meetingContentFingerprint(i) || (r += 1),
        s.has(t.id) || !d && !isLocalItemNewerThanLastSync(t, n.lastSync) || o.add(t.id)
    }
    ),
    {
        meetings: sortMeetings([...a.values()].map(normalizeMeeting)),
        pendingIds: o,
        pulled: r,
        keptLocal: l,
        conflicts: c
    }
}
function shouldCreateTaskConflictCopy(e, t, n="") {
    if (taskContentFingerprint(e) === taskContentFingerprint(t))
        return !1;
    if (!n)
        return String(t.updatedAt || "") > String(e.updatedAt || "");
    const a = String(e.updatedAt || "") > String(n)
      , s = String(t.updatedAt || "") > String(n);
    return a && s
}
function shouldCreateMeetingConflictCopy(e, t, n="") {
    if (meetingContentFingerprint(e) === meetingContentFingerprint(t))
        return !1;
    if (!n)
        return String(t.updatedAt || "") > String(e.updatedAt || "");
    const a = String(e.updatedAt || "") > String(n)
      , s = String(t.updatedAt || "") > String(n);
    return a && s
}
function createTaskConflictCopy(e, t) {
    const n = (new Date).toISOString();
    return normalizeTask({
        ...e,
        id: uid(),
        title: `${stripConflictCopySuffix(e.title)} (conflict copy)`,
        tags: unique([...e.tags || [], "conflict"]),
        notes: [`TaskFlow kept this copy because this device and your account both changed "${t.title}" before sync finished.`, `Account version updated: ${formatSavedTime(t.updatedAt || n)}.`, displayNotes(e)].filter(Boolean).join("\n\n"),
        createdAt: n,
        updatedAt: n
    })
}
function createMeetingConflictCopy(e, t) {
    const n = (new Date).toISOString();
    return normalizeMeeting({
        ...e,
        id: uid(),
        seriesId: uid(),
        title: `${stripConflictCopySuffix(e.title)} (conflict copy)`,
        notes: [`TaskFlow kept this copy because this device and your account both changed "${t.title}" before sync finished.`, `Account version updated: ${formatSavedTime(t.updatedAt || n)}.`, e.notes || ""].filter(Boolean).join("\n\n"),
        linkedTaskIds: [],
        importedUid: "",
        recurrence: "none",
        createdAt: n,
        updatedAt: n
    })
}
function stripConflictCopySuffix(e) {
    return cleanTitle(e).replace(/\s+\(conflict copy\)$/i, "")
}
function taskContentFingerprint(e) {
    const t = normalizeTask(e);
    return JSON.stringify({
        title: t.title,
        project: t.project,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        dueTime: t.dueTime,
        plannedDate: t.plannedDate,
        plannedStart: t.plannedStart,
        plannedEnd: t.plannedEnd,
        estimate: t.estimate,
        energy: t.energy,
        recurrence: t.recurrence,
        tags: [...t.tags].sort(),
        notes: displayNotes(t),
        subtasks: t.subtasks.map(e => ({
            text: e.text,
            done: e.done
        })),
        completedAt: t.completedAt
    })
}
function meetingContentFingerprint(e) {
    const t = normalizeMeeting(e);
    return JSON.stringify({
        title: t.title,
        subject: t.subject,
        topic: t.topic,
        teacher: t.teacher,
        location: t.location,
        date: t.date,
        startTime: t.startTime,
        endTime: t.endTime,
        recurrence: t.recurrence,
        recurrenceEndDate: t.recurrenceEndDate,
        notes: t.notes,
        status: t.status,
        linkedTaskIds: [...t.linkedTaskIds].sort(),
        importedUid: t.importedUid
    })
}
async function migrateLocalTasksToCloud(e=readLocalWorkspace()) {
    const t = filterDemoSeedTasks(e.tasks).filter(e => !isTaskDeleted(e.id) && !state.tasks.some(t => t.id === e.id))
      , n = e.meetings.filter(e => !isMeetingDeleted(e.id) && !state.meetings.some(t => t.id === e.id))
      , a = normalizeGeneralNotes(e.generalNotes);
    state.unifiedLayout = normalizeUnifiedLayout(e.unifiedLayout || state.unifiedLayout),
    state.unifiedPresets = normalizeUnifiedPresets(e.unifiedPresets || state.unifiedPresets),
    saveUnifiedLayout(),
    saveUnifiedPresetsLocal(),
    a.content && (!state.generalNotes.content || (a.updatedAt || "") > (state.generalNotes.updatedAt || "")) && (state.generalNotes = a),
    (t.length || n.length || a.content) && (state.tasks = sortTasks([...t, ...state.tasks].map(normalizeTask), "created"),
    state.meetings = sortMeetings([...n, ...state.meetings].map(normalizeMeeting)),
    await syncAllWorkspace(),
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        exportedAt: (new Date).toISOString(),
        tasks: state.tasks,
        meetings: state.meetings,
        generalNotes: state.generalNotes,
        unifiedLayout: normalizeUnifiedLayout(state.unifiedLayout),
        unifiedPresets: normalizeUnifiedPresets(state.unifiedPresets)
    })))
}
function readLocalTasks() {
    return readLocalWorkspace().tasks
}
function readLocalWorkspace() {
    try {
        const e = localStorage.getItem(STORAGE_KEY)
          , t = e ? JSON.parse(e) : null;
        return {
            tasks: Array.isArray(t?.tasks) ? filterDemoSeedTasks(t.tasks.map(normalizeTask)) : [],
            meetings: Array.isArray(t?.meetings) ? t.meetings.map(normalizeMeeting) : [],
            generalNotes: normalizeGeneralNotes(t?.generalNotes),
            unifiedLayout: normalizeUnifiedLayout(t?.unifiedLayout),
            unifiedPresets: normalizeUnifiedPresets(t?.unifiedPresets)
        }
    } catch {
        return {
            tasks: [],
            meetings: [],
            generalNotes: normalizeGeneralNotes(),
            unifiedLayout: defaultUnifiedLayout(),
            unifiedPresets: defaultUnifiedPresets()
        }
    }
}
async function syncAllTasks() {
    return syncAllWorkspace()
}
async function syncAllWorkspace() {
    let e = null;
    prunePendingSyncQueues();
    const t = new Set([...state.pendingSyncIds].filter(e => !isTaskDeleted(e)))
      , n = new Set([...state.pendingMeetingSyncIds].filter(e => !isMeetingDeleted(e)))
      , a = state.tasks.filter(e => t.has(e.id))
      , s = state.meetings.filter(e => n.has(e.id));
    if (!state.encryption.enabled || state.encryption.unlocked) {
        if (state.isOnline && state.session?.access_token && state.user?.id && a.length) {
            const e = await Promise.all(a.map(taskToRow));
            await restRequest("/tasks?on_conflict=id", {
                method: "POST",
                headers: {
                    Prefer: "resolution=merge-duplicates"
                },
                body: JSON.stringify(e)
            }),
            t.forEach(e => state.pendingSyncIds.delete(e)),
            savePendingSyncs()
        } else
            updateSaveStatus();
        if (state.isOnline && state.session?.access_token && state.user?.id && s.length)
            try {
                const e = await Promise.all(s.map(meetingToRow));
                await restRequest("/meetings?on_conflict=id", {
                    method: "POST",
                    headers: {
                        Prefer: "resolution=merge-duplicates"
                    },
                    body: JSON.stringify(e)
                }),
                n.forEach(e => state.pendingMeetingSyncIds.delete(e)),
                savePendingSyncs()
            } catch (i) {
                e = i,
                s.forEach(e => state.pendingMeetingSyncIds.add(e.id)),
                savePendingSyncs(),
                recordSyncActivity("sync", isMissingMeetingsTableError(i) ? "warning" : "error", "Events sync needs attention", {
                    detail: String(i?.message || i || "").slice(0, 160)
                }, {
                    dedupeMs: 3e5
                }),
                console.warn("Events sync unavailable", i)
            }
        if (await syncWorkspaceNotes(),
        e && !isMissingMeetingsTableError(e))
            throw e;
        state.isOnline && state.session?.access_token && state.user?.id && (recordAccountSyncedAt(),
        clearWorkspaceSyncRetry()),
        updateSaveStatus()
    } else
        updateSaveStatus()
}
async function loadCloudWorkspaceNotes(e=normalizeGeneralNotes()) {
    if (state.generalNotes = normalizeGeneralNotes(e),
    state.isOnline && state.session?.access_token && state.user?.id)
        try {
            const e = await restRequest("/workspace_notes?select=content,updated_at&limit=1", {
                method: "GET"
            })
              , t = Array.isArray(e) ? e[0] : null;
            let n = parseGeneralNotesContent(t?.content || "")
              , a = normalizeGeneralNotes(t)
              , s = Object.prototype.hasOwnProperty.call(n, "customWallpaper")
              , i = s && "string" == typeof n.customWallpaper ? n.customWallpaper : "";
            if (isEncryptedPayload(t?.content)) {
                const e = await decryptJsonPayload(t.content);
                if (!e?.generalNotes)
                    return;
                n = e,
                a = normalizeGeneralNotes(e.generalNotes),
                s = Object.prototype.hasOwnProperty.call(e, "customWallpaper"),
                i = s && "string" == typeof e.customWallpaper ? e.customWallpaper : ""
            }
            if (!a.tabs.some(e => e.content) && !s)
                return;
            const o = state.generalNotes.tabs.some(e => e.content)
              , r = state.generalNotes.updatedAt || "";
            (!o && !r || (a.updatedAt || "") >= r) && (state.generalNotes = a),
            s && saveCustomWallpaper(i)
        } catch (t) {
            console.warn("Workspace notes sync unavailable", t)
        }
}
async function syncWorkspaceNotes() {
    if (state.isOnline && state.session?.access_token && state.user?.id && (!state.encryption.enabled || state.encryption.unlocked))
        try {
            const e = shouldEncryptCloudPayload() ? await encryptJsonPayload({
                type: "generalNotes",
                generalNotes: normalizeGeneralNotes(state.generalNotes),
                customWallpaper: loadCustomWallpaper()
            }) : serializeGeneralNotesForCloud(state.generalNotes);
            await restRequest("/workspace_notes?on_conflict=user_id", {
                method: "POST",
                headers: {
                    Prefer: "resolution=merge-duplicates"
                },
                body: JSON.stringify({
                    user_id: state.user.id,
                    content: e,
                    updated_at: state.generalNotes.updatedAt || (new Date).toISOString()
                })
            })
        } catch (e) {
            console.warn("Workspace notes sync unavailable", e)
        }
}
async function syncPendingTasks() {
    if (state.session?.access_token)
        try {
            await syncPendingDeletes(),
            await syncAllWorkspace(),
            preferencesSyncPending() && await syncUserPreferences(),
            recordSyncActivity("sync", "success", "Queued changes synced", {}, {
                dedupeMs: 3e5
            }),
            clearWorkspaceSyncRetry(),
            toast("Cloud sync restored")
        } catch (e) {
            console.warn("Pending sync failed", e),
            recordSyncActivity("sync", "warning", "Queued sync will retry", {
                detail: String(e?.message || e || "").slice(0, 160)
            }, {
                dedupeMs: 3e5
            }),
            scheduleWorkspaceSyncRetry("queued sync failure")
        }
}
async function deleteCloudTasks(e) {
    const t = e.filter(Boolean);
    if (t.length)
        if (t.forEach(e => recordTaskTombstone(e)),
        saveDeletionTombstones(),
        state.session?.access_token && state.isOnline)
            try {
                await syncCloudDeletionTombstones(t, []),
                await Promise.all(t.map(e => restRequest(`/tasks?id=eq.${encodeURIComponent(e)}`, {
                    method: "DELETE"
                }))),
                t.forEach(e => state.pendingDeleteIds.delete(e)),
                t.forEach(e => state.pendingSyncIds.delete(e)),
                savePendingDeletes(),
                savePendingSyncs(),
                updateSaveStatus()
            } catch (n) {
                throw queueDeletedTasks(t),
                n
            }
        else
            queueDeletedTasks(t)
}
async function deleteCloudMeetings(e) {
    const t = e.filter(Boolean);
    if (t.length)
        if (t.forEach(e => recordMeetingTombstone(e)),
        saveDeletionTombstones(),
        state.session?.access_token && state.isOnline)
            try {
                await syncCloudDeletionTombstones([], t),
                await Promise.all(t.map(e => restRequest(`/meetings?id=eq.${encodeURIComponent(e)}`, {
                    method: "DELETE"
                }))),
                t.forEach(e => state.pendingMeetingDeleteIds.delete(e)),
                t.forEach(e => state.pendingMeetingSyncIds.delete(e)),
                savePendingDeletes(),
                savePendingSyncs(),
                updateSaveStatus()
            } catch (n) {
                throw queueDeletedMeetings(t),
                n
            }
        else
            queueDeletedMeetings(t)
}
function queueDeletedTasks(e) {
    e.forEach(e => {
        recordTaskTombstone(e),
        state.pendingDeleteIds.add(e),
        state.pendingSyncIds.delete(e)
    }
    ),
    saveDeletionTombstones(),
    savePendingDeletes(),
    savePendingSyncs(),
    updateSaveStatus()
}
function queueDeletedMeetings(e) {
    e.forEach(e => {
        recordMeetingTombstone(e),
        state.pendingMeetingDeleteIds.add(e),
        state.pendingMeetingSyncIds.delete(e)
    }
    ),
    saveDeletionTombstones(),
    savePendingDeletes(),
    savePendingSyncs(),
    updateSaveStatus()
}
function tombstoneStorageIdentity() {
    return state.user?.id || state.user?.email || "local"
}
function tombstoneStorageKey(e) {
    return `${"meeting" === e ? MEETING_TOMBSTONES_KEY_PREFIX : TASK_TOMBSTONES_KEY_PREFIX}${tombstoneStorageIdentity()}`
}
function normalizeTombstoneMap(e) {
    const t = new Map
      , n = Date.now()
      , a = n - 10368e6;
    return (Array.isArray(e) ? e : Object.entries(e || {}).map( ([e,t]) => ({
        id: e,
        deletedAt: t
    }))).forEach(e => {
        const s = String(e?.id || "").trim()
          , i = new Date(e?.deletedAt || e?.deleted_at || e?.at || n).toISOString()
          , o = new Date(i).getTime();
        !s || !Number.isFinite(o) || o < a || t.set(s, i)
    }
    ),
    new Map([...t.entries()].sort( (e, t) => String(t[1]).localeCompare(String(e[1]))).slice(0, 5e3))
}
function loadDeletionTombstones() {
    try {
        state.deletedTaskTombstones = normalizeTombstoneMap(JSON.parse(localStorage.getItem(tombstoneStorageKey("task")) || "[]"))
    } catch {
        state.deletedTaskTombstones = new Map
    }
    try {
        state.deletedMeetingTombstones = normalizeTombstoneMap(JSON.parse(localStorage.getItem(tombstoneStorageKey("meeting")) || "[]"))
    } catch {
        state.deletedMeetingTombstones = new Map
    }
    [...state.pendingDeleteIds].forEach(e => recordTaskTombstone(e)),
    [...state.pendingMeetingDeleteIds].forEach(e => recordMeetingTombstone(e)),
    saveDeletionTombstones()
}
function saveDeletionTombstones() {
    state.deletedTaskTombstones = normalizeTombstoneMap([...state.deletedTaskTombstones.entries()].map( ([e,t]) => ({
        id: e,
        deletedAt: t
    }))),
    state.deletedMeetingTombstones = normalizeTombstoneMap([...state.deletedMeetingTombstones.entries()].map( ([e,t]) => ({
        id: e,
        deletedAt: t
    }))),
    localStorage.setItem(tombstoneStorageKey("task"), JSON.stringify([...state.deletedTaskTombstones.entries()].map( ([e,t]) => ({
        id: e,
        deletedAt: t
    })))),
    localStorage.setItem(tombstoneStorageKey("meeting"), JSON.stringify([...state.deletedMeetingTombstones.entries()].map( ([e,t]) => ({
        id: e,
        deletedAt: t
    }))))
}
function recordTaskTombstone(e, t=(new Date).toISOString()) {
    e && state.deletedTaskTombstones.set(String(e), t)
}
function recordMeetingTombstone(e, t=(new Date).toISOString()) {
    e && state.deletedMeetingTombstones.set(String(e), t)
}
function clearTaskTombstones(e=[]) {
    let t = !1;
    e.filter(Boolean).forEach(e => {
        state.deletedTaskTombstones.delete(String(e)) && (t = !0),
        state.pendingDeleteIds.delete(e)
    }
    ),
    t && saveDeletionTombstones(),
    savePendingDeletes()
}
function clearMeetingTombstones(e=[]) {
    let t = !1;
    e.filter(Boolean).forEach(e => {
        state.deletedMeetingTombstones.delete(String(e)) && (t = !0),
        state.pendingMeetingDeleteIds.delete(e)
    }
    ),
    t && saveDeletionTombstones(),
    savePendingDeletes()
}
function isTaskDeleted(e) {
    return Boolean(e && (state.pendingDeleteIds.has(e) || state.deletedTaskTombstones.has(String(e))))
}
function isMeetingDeleted(e) {
    return Boolean(e && (state.pendingMeetingDeleteIds.has(e) || state.deletedMeetingTombstones.has(String(e))))
}
async function loadCloudDeletionTombstones() {
    if (state.isOnline && state.session?.access_token && state.user?.id)
        try {
            const e = await restRequest("/workspace_deletions?select=item_id,item_type,deleted_at&order=deleted_at.desc&limit=5000", {
                method: "GET"
            });
            if (!Array.isArray(e) || !e.length)
                return;
            e.forEach(e => {
                "meeting" === e.item_type && recordMeetingTombstone(e.item_id, e.deleted_at),
                "task" === e.item_type && recordTaskTombstone(e.item_id, e.deleted_at)
            }
            ),
            prunePendingSyncQueues(),
            saveDeletionTombstones()
        } catch (e) {
            console.warn("Deletion history sync unavailable", e)
        }
}
async function syncCloudDeletionTombstones(e=[], t=[]) {
    if (!state.isOnline || !state.session?.access_token || !state.user?.id)
        return;
    const n = [...e.filter(Boolean).map(e => ({
        user_id: state.user.id,
        item_id: e,
        item_type: "task",
        deleted_at: state.deletedTaskTombstones.get(String(e)) || (new Date).toISOString()
    })), ...t.filter(Boolean).map(e => ({
        user_id: state.user.id,
        item_id: e,
        item_type: "meeting",
        deleted_at: state.deletedMeetingTombstones.get(String(e)) || (new Date).toISOString()
    }))];
    if (n.length)
        try {
            await restRequest("/workspace_deletions?on_conflict=user_id,item_type,item_id", {
                method: "POST",
                headers: {
                    Prefer: "resolution=merge-duplicates"
                },
                body: JSON.stringify(n)
            })
        } catch (a) {
            console.warn("Deletion history sync unavailable", a)
        }
}
function loadPendingDeletes() {
    try {
        const e = JSON.parse(localStorage.getItem(PENDING_DELETE_KEY) || "[]");
        state.pendingDeleteIds = new Set(Array.isArray(e) ? e : [])
    } catch {
        state.pendingDeleteIds = new Set
    }
    try {
        const e = JSON.parse(localStorage.getItem(PENDING_MEETING_DELETE_KEY) || "[]");
        state.pendingMeetingDeleteIds = new Set(Array.isArray(e) ? e : [])
    } catch {
        state.pendingMeetingDeleteIds = new Set
    }
    try {
        const e = JSON.parse(localStorage.getItem(PENDING_TASK_SYNC_KEY) || "[]");
        state.pendingSyncIds = new Set(Array.isArray(e) ? e : [])
    } catch {
        state.pendingSyncIds = new Set
    }
    try {
        const e = JSON.parse(localStorage.getItem(PENDING_MEETING_SYNC_KEY) || "[]");
        state.pendingMeetingSyncIds = new Set(Array.isArray(e) ? e : [])
    } catch {
        state.pendingMeetingSyncIds = new Set
    }
}
function savePendingDeletes() {
    localStorage.setItem(PENDING_DELETE_KEY, JSON.stringify([...state.pendingDeleteIds])),
    localStorage.setItem(PENDING_MEETING_DELETE_KEY, JSON.stringify([...state.pendingMeetingDeleteIds]))
}
function savePendingSyncs() {
    localStorage.setItem(PENDING_TASK_SYNC_KEY, JSON.stringify([...state.pendingSyncIds])),
    localStorage.setItem(PENDING_MEETING_SYNC_KEY, JSON.stringify([...state.pendingMeetingSyncIds])),
    updateSaveStatus()
}
function markTasksPending(e) {
    e.filter(Boolean).forEach(e => state.pendingSyncIds.add(e)),
    savePendingSyncs()
}
function markMeetingsPending(e) {
    e.filter(Boolean).forEach(e => state.pendingMeetingSyncIds.add(e)),
    savePendingSyncs()
}
async function syncPendingDeletes() {
    if (!state.session?.access_token || !state.isOnline)
        return;
    const e = [...state.pendingDeleteIds]
      , t = [...state.pendingMeetingDeleteIds]
      , n = e.length
      , a = t.length;
    await syncCloudDeletionTombstones(e, t),
    e.length && await Promise.all(e.map(e => restRequest(`/tasks?id=eq.${encodeURIComponent(e)}`, {
        method: "DELETE"
    }))),
    t.length && await Promise.all(t.map(e => restRequest(`/meetings?id=eq.${encodeURIComponent(e)}`, {
        method: "DELETE"
    }))),
    state.pendingDeleteIds.clear(),
    state.pendingMeetingDeleteIds.clear(),
    e.forEach(e => state.pendingSyncIds.delete(e)),
    t.forEach(e => state.pendingMeetingSyncIds.delete(e)),
    savePendingDeletes(),
    savePendingSyncs(),
    updateSaveStatus(),
    (n || a) && recordSyncActivity("sync", "success", "Deleted items synced", {
        tasks: n,
        events: a
    }, {
        dedupeMs: 12e4
    })
}
async function taskToRow(e) {
    if (shouldEncryptCloudPayload()) {
        const t = await encryptJsonPayload({
            type: "task",
            task: normalizeTask(e)
        });
        return {
            id: e.id,
            user_id: state.user.id,
            title: "Encrypted task",
            project: "Private",
            status: "backlog",
            priority: "medium",
            due_date: null,
            estimate: 0,
            energy: "medium",
            recurrence: "none",
            tags: [],
            notes: t,
            subtasks: [],
            created_at: e.createdAt || (new Date).toISOString(),
            completed_at: e.completedAt || null,
            updated_at: e.updatedAt || (new Date).toISOString()
        }
    }
    return {
        id: e.id,
        user_id: state.user.id,
        title: e.title,
        project: e.project || "Inbox",
        status: e.status,
        priority: e.priority,
        due_date: e.dueDate || null,
        estimate: Number(e.estimate || 0),
        energy: e.energy,
        recurrence: e.recurrence,
        tags: e.tags || [],
        notes: withPlanningNote(withDueTimeNote(e.notes || "", e.dueTime || ""), e),
        subtasks: e.subtasks || [],
        created_at: e.createdAt || (new Date).toISOString(),
        completed_at: e.completedAt || null,
        updated_at: e.updatedAt || (new Date).toISOString()
    }
}
async function rowToTask(e) {
    if (isEncryptedPayload(e.notes)) {
        const t = await decryptJsonPayload(e.notes);
        return normalizeTask(t?.task ? t.task : {
            id: e.id,
            title: "Encrypted task - unlock Private sync in Settings",
            project: "Private",
            status: "backlog",
            priority: "medium",
            notes: "This task is encrypted and needs your passphrase on this device.",
            createdAt: e.created_at,
            completedAt: e.completed_at,
            updatedAt: e.updated_at,
            encryptedLocked: !0
        })
    }
    return normalizeTask({
        id: e.id,
        title: e.title,
        project: e.project,
        status: e.status,
        priority: e.priority,
        dueDate: e.due_date || "",
        dueTime: dueTimeFromNotes(e.notes || ""),
        plannedDate: plannedFieldsFromNotes(e.notes || "").plannedDate,
        plannedStart: plannedFieldsFromNotes(e.notes || "").plannedStart,
        plannedEnd: plannedFieldsFromNotes(e.notes || "").plannedEnd,
        estimate: e.estimate,
        energy: e.energy,
        recurrence: e.recurrence,
        tags: e.tags || [],
        notes: e.notes,
        subtasks: e.subtasks || [],
        createdAt: e.created_at,
        completedAt: e.completed_at,
        updatedAt: e.updated_at
    })
}
async function meetingToRow(e) {
    const t = normalizeMeeting(e);
    if (shouldEncryptCloudPayload()) {
        const e = await encryptJsonPayload({
            type: "meeting",
            meeting: t
        });
        return {
            id: t.id,
            user_id: state.user.id,
            series_id: t.seriesId || t.id,
            title: "Encrypted event",
            subject: "Private",
            topic: "",
            teacher: "",
            location: "",
            meeting_date: t.date,
            start_time: t.startTime,
            end_time: t.endTime || null,
            recurrence: "none",
            recurrence_end_date: null,
            notes: e,
            status: "scheduled",
            linked_task_ids: [],
            imported_uid: "",
            created_at: t.createdAt || (new Date).toISOString(),
            updated_at: (new Date).toISOString()
        }
    }
    return {
        id: t.id,
        user_id: state.user.id,
        series_id: t.seriesId || t.id,
        title: t.title,
        subject: t.subject || "Events",
        topic: t.topic || "",
        teacher: t.teacher || "",
        location: t.location || "",
        meeting_date: t.date,
        start_time: t.startTime,
        end_time: t.endTime || null,
        recurrence: t.recurrence || "none",
        recurrence_end_date: t.recurrenceEndDate || null,
        notes: t.notes || "",
        status: t.status || "scheduled",
        linked_task_ids: (t.linkedTaskIds || []).filter(isUuid),
        imported_uid: t.importedUid || "",
        created_at: t.createdAt || (new Date).toISOString(),
        updated_at: (new Date).toISOString()
    }
}
async function rowToMeeting(e) {
    if (isEncryptedPayload(e.notes)) {
        const t = await decryptJsonPayload(e.notes);
        return normalizeMeeting(t?.meeting ? t.meeting : {
            id: e.id,
            seriesId: e.series_id,
            title: "Encrypted event - unlock Private sync in Settings",
            subject: "Private",
            date: e.meeting_date,
            startTime: normalizeClockValue(e.start_time),
            endTime: normalizeClockValue(e.end_time),
            notes: "This event is encrypted and needs your passphrase on this device.",
            status: "scheduled",
            createdAt: e.created_at,
            updatedAt: e.updated_at,
            encryptedLocked: !0
        })
    }
    return normalizeMeeting({
        id: e.id,
        seriesId: e.series_id,
        title: e.title,
        subject: e.subject,
        topic: e.topic,
        teacher: e.teacher,
        location: e.location,
        date: e.meeting_date,
        startTime: normalizeClockValue(e.start_time),
        endTime: normalizeClockValue(e.end_time),
        recurrence: e.recurrence,
        recurrenceEndDate: e.recurrence_end_date || "",
        notes: e.notes,
        status: e.status,
        linkedTaskIds: e.linked_task_ids || [],
        importedUid: e.imported_uid || "",
        createdAt: e.created_at,
        updatedAt: e.updated_at
    })
}
function shouldEncryptCloudPayload() {
    return Boolean(state.encryption.enabled && state.encryption.unlocked && state.encryption.key)
}
function hasLockedEncryptedWorkspace() {
    return state.tasks.some(e => e.encryptedLocked) || state.meetings.some(e => e.encryptedLocked)
}
function isEncryptedPayload(e) {
    return String(e || "").startsWith("tfenc:v1:")
}
async function deriveEncryptionKey(e) {
    const t = String(e || "");
    if (t.length < 8)
        throw new Error("Use at least 8 characters for your encryption passphrase.");
    if (!window.crypto?.subtle)
        throw new Error("This browser does not support TaskFlow private sync encryption.");
    const n = `taskflow-private-sync:${state.user?.id || "local"}`
      , a = await window.crypto.subtle.importKey("raw", textBytes(t), "PBKDF2", !1, ["deriveKey"]);
    return window.crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: textBytes(n),
        iterations: 21e4,
        hash: "SHA-256"
    }, a, {
        name: "AES-GCM",
        length: 256
    }, !1, ["encrypt", "decrypt"])
}
async function encryptJsonPayload(e) {
    if (!state.encryption.key)
        throw new Error("Private sync is locked.");
    const t = window.crypto.getRandomValues(new Uint8Array(12))
      , n = textBytes(JSON.stringify(e))
      , a = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: t
    }, state.encryption.key, n);
    return `tfenc:v1:${bytesToBase64(t)}.${bytesToBase64(new Uint8Array(a))}`
}
async function decryptJsonPayload(e) {
    if (!isEncryptedPayload(e))
        return null;
    if (!state.encryption.key)
        return state.encryption.enabled = !0,
        localStorage.setItem(ENCRYPTION_ENABLED_KEY, "true"),
        null;
    try {
        const [t,n] = String(e).slice(9).split(".")
          , a = await window.crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: base64ToBytes(t)
        }, state.encryption.key, base64ToBytes(n));
        return state.encryption.unlocked = !0,
        JSON.parse((new TextDecoder).decode(a))
    } catch {
        return state.encryption.enabled = !0,
        localStorage.setItem(ENCRYPTION_ENABLED_KEY, "true"),
        null
    }
}
function textBytes(e) {
    return (new TextEncoder).encode(e)
}
function bytesToBase64(e) {
    let t = "";
    return e.forEach(e => {
        t += String.fromCharCode(e)
    }
    ),
    btoa(t)
}
function base64ToBytes(e) {
    const t = atob(e || "")
      , n = new Uint8Array(t.length);
    for (let a = 0; a < t.length; a += 1)
        n[a] = t.charCodeAt(a);
    return n
}
function updateAccountChip() {
    if (!els.accountChip)
        return;
    const e = state.user?.email || "Signed in";
    els.accountChip.innerHTML = `<i data-lucide="user-circle"></i><span>${escapeHtml(e)}</span>`,
    els.accountChip.title = e,
    els.accountChip.setAttribute("aria-label", `Account: ${e}`)
}
function prunePendingSyncQueues() {
    const e = new Set(state.tasks.map(e => e.id))
      , t = new Set(state.meetings.map(e => e.id));
    let n = !1;
    [...state.pendingSyncIds].forEach(t => {
        e.has(t) && !isTaskDeleted(t) || (state.pendingSyncIds.delete(t),
        n = !0)
    }
    ),
    [...state.pendingMeetingSyncIds].forEach(e => {
        t.has(e) && !isMeetingDeleted(e) || (state.pendingMeetingSyncIds.delete(e),
        n = !0)
    }
    ),
    n && savePendingSyncs()
}
function shouldTreatMissingCloudItemAsDeleted(e, t="") {
    return Boolean(t && !isLocalItemNewerThanLastSync(e, t))
}
function isLocalItemNewerThanLastSync(e, t="") {
    if (!t)
        return !0;
    const n = String(e?.updatedAt || e?.createdAt || "")
      , a = String(e?.createdAt || "");
    return n > String(t) || a > String(t)
}
function filterDemoSeedTasks(e=[]) {
    return e.filter(e => !isDemoSeedTask(e))
}
function isDemoSeedTask(e) {
    const t = normalizeDemoTaskTitle(e?.title || "");
    return DEMO_TASK_TITLES.has(t)
}
function normalizeDemoTaskTitle(e) {
    return String(e || "").toLowerCase().replace(/\s+/g, " ").trim()
}
function openAccountSettings() {
    els.accountSettingsDialog.showModal(),
    setSettingsSection(localStorage.getItem(SETTINGS_SECTION_KEY) || "account", {
        quiet: !0
    }),
    populateAccountSettings(),
    refreshIcons()
}
function setSettingsSection(e="account", t={}) {
    const n = ["account", "sync", "plan", "data", "support"].includes(e) ? e : "account";
    t.quiet || localStorage.setItem(SETTINGS_SECTION_KEY, n),
    document.querySelectorAll("[data-settings-section]").forEach(e => {
        e.hidden = e.dataset.settingsSection !== n
    }
    ),
    document.querySelectorAll("[data-settings-section-target]").forEach(e => {
        const t = e.dataset.settingsSectionTarget === n;
        e.classList.toggle("active", t),
        e.setAttribute("aria-selected", t ? "true" : "false")
    }
    )
}
function populateAccountSettings() {
    els.settingsEmail.textContent = state.user?.email || "Signed in",
    els.settingsAppVersion && (els.settingsAppVersion.textContent = "Version: beta 0.95"),
    updateSettingsSyncPanel(),
    renderSyncActivityLog(),
    renderAccountAccessUi(),
    els.settingsTimezoneInput.innerHTML = unique([state.meetingTimezone, ...timezoneChoices]).map(e => `<option value="${escapeAttr(e)}" ${e === state.meetingTimezone ? "selected" : ""}>${escapeHtml(formatTimezoneOptionLabel(e))}</option>`).join(""),
    els.settingsDensityInput.value = state.density;
    const e = notificationsSupported();
    els.settingsNotificationsInput.checked = e && state.notifications.enabled && "granted" === notificationPermission(),
    els.settingsNotificationsInput.disabled = !e,
    els.settingsNotificationLeadInput.value = String(state.notifications.leadMinutes),
    els.settingsAutoDeleteDoneInput.value = String(normalizeAutoDeleteDoneDays(state.autoDeleteDoneDays)),
    els.settingsTestNotificationBtn.disabled = !e,
    els.settingsTestNotificationBtn.title = e ? "Send a test notification" : "This browser does not support notifications",
    updateEncryptionSettingsPanel(),
    updateGoogleCalendarSettingsPanel(),
    updateDiagnosticsPanel(),
    renderRestorePointControls()
}
function updateGoogleCalendarSettingsPanel() {
    if (!els.settingsGoogleCalendarBadge)
        return;
    const e = googleCalendarConfigured()
      , t = googleCalendarAutoSyncEnabled()
      , n = googleCalendarConnected()
      , a = googleCalendarBackendConnected()
      , s = Boolean(googleCalendarBackendUrl())
      , i = googleCalendarLastSyncedAt()
      , o = googleCalendarLastStatus()
      , r = googleCalendarLastError()
      , l = googleCalendarSyncToken()
      , c = state.isOnline
      , d = Boolean(state.session?.access_token);
    let u = "muted"
      , g = "Not ready"
      , p = "One-time Google sync needs Google permission before it can run."
      , m = s ? "TaskFlow-owned items overwrite matching Google Calendar items. Other Google events can be imported into TaskFlow." : "Until the secure connector is deployed, Google sync runs as a one-time browser action from Settings.";
    if (e ? c ? d ? googleCalendarSyncInFlight ? (u = "working",
    g = "Syncing",
    p = "TaskFlow is syncing with Google Calendar now.") : "error" === o.status ? (u = "warning",
    g = "Needs attention",
    p = r?.message ? `Google Calendar needs attention: ${readableGoogleCalendarError(r)}` : "Google Calendar needs attention before it can sync again.",
    m = "Click One-time Google sync to reconnect. If this is a school or work account, the account administrator may need to allow calendar access.") : t ? (u = "good",
    g = "Auto",
    p = n ? `Google Calendar is connected${a ? " through the secure connector" : " on this device"}. Auto-sync runs regularly while TaskFlow is open${i ? `; last sync ${formatSavedTime(i)}` : ""}.` : "Google Calendar auto-sync is on. Connect once to allow calendar access.",
    m = n ? `${l ? "Incremental sync is active, so TaskFlow only asks Google for changes since the last sync." : "TaskFlow will complete a full Calendar scan, then switch to incremental sync."} ${a ? "The connector can refresh Google access without asking you to sign in again." : s ? "Click One-time Google sync to finish connector access." : "Browser-only one-time sync may occasionally ask for permission again."}` : "Click One-time Google sync and approve access. TaskFlow will remember the connection on this device.") : n ? (u = "good",
    g = "Connected",
    p = `Google Calendar is connected on this device. Manual sync is ready${i ? `; last sync ${formatSavedTime(i)}` : ""}.`,
    m = s ? "Turn on auto-sync if you want TaskFlow to update Google Calendar regularly while the app is open." : "Use one-time Google sync from Settings until the secure connector is deployed.") : (u = "good",
    g = "Ready",
    p = "Google Calendar is ready. Use One-time Google sync to connect it.") : (g = "Sign in",
    p = "Sign in to TaskFlow before syncing Google Calendar.") : (u = "warning",
    g = "Offline",
    p = "Google Calendar sync will resume when this device is online.",
    m = "Keep TaskFlow installed and avoid clearing site data while changes are waiting to sync.") : (g = "Setup needed",
    p = "Google Calendar is not ready for this website.",
    m = "Add Google Calendar setup in TaskFlow configuration before using one-time Google sync."),
    els.settingsGoogleCalendarBadge.dataset.health = u,
    els.settingsGoogleCalendarBadge.textContent = g,
    els.settingsGoogleCalendarSummary.textContent = p,
    els.settingsGoogleCalendarAdvice.textContent = m,
    els.settingsGoogleCalendarDetails) {
        const o = [["Connection", n ? a ? "Connected through secure connector" : "Connected on this device" : e && d ? "Ready to connect" : "Not connected"], ["Auto-sync", t ? "On while TaskFlow is open" : "Off"], ["Connector", s ? a ? "Active" : "Configured" : "Browser only"], ["Sync state", a ? "Shared across signed-in devices" : "Stored on this device"], ["Last synced", i ? formatSavedTime(i) : "Not yet"], ["Sync mode", l ? "Incremental" : "Full scan next"], ["TaskFlow wins", "Own tasks and events overwrite matching Google items"], ["One-time sync", e && d ? "Available in Settings" : "Sign in first"]];
        els.settingsGoogleCalendarDetails.innerHTML = o.map( ([e,t]) => `\n          <div class="sync-health-item">\n            <span>${escapeHtml(e)}</span>\n            <strong>${escapeHtml(t)}</strong>\n          </div>\n        `).join("")
    }
    els.settingsGoogleCalendarAutoInput && (els.settingsGoogleCalendarAutoInput.checked = t,
    els.settingsGoogleCalendarAutoInput.disabled = !e || !d),
    els.settingsGoogleCalendarSyncBtn && (els.settingsGoogleCalendarSyncBtn.disabled = !e || !c || !d || googleCalendarSyncInFlight,
    els.settingsGoogleCalendarSyncBtn.title = s ? "Connect or sync Google Calendar once" : "Run a one-time browser Google Calendar sync until the secure connector is deployed"),
    els.settingsGoogleCalendarRepairBtn && (els.settingsGoogleCalendarRepairBtn.disabled = !e || !c || !d || googleCalendarSyncInFlight,
    els.settingsGoogleCalendarRepairBtn.title = "Run a full Google Calendar scan if normal sync looks wrong"),
    updateDiagnosticsPanel()
}
async function autosaveAccountSettings() {
    if (setMeetingTimezone(els.settingsTimezoneInput.value, {
        quiet: !0
    }),
    state.density = "compact" === els.settingsDensityInput.value ? "compact" : "comfortable",
    state.notifications.leadMinutes = Number(els.settingsNotificationLeadInput.value),
    state.notifications.enabled = Boolean(els.settingsNotificationsInput.checked),
    state.autoDeleteDoneDays = normalizeAutoDeleteDoneDays(els.settingsAutoDeleteDoneInput.value),
    state.notifications.enabled) {
        const e = await ensureNotificationPermission();
        state.notifications.enabled = e
    }
    saveNotificationSettings(),
    saveAutoDeleteDoneSetting(),
    document.documentElement.dataset.density = state.density,
    localStorage.setItem(DENSITY_KEY, state.density),
    setDensityButton(),
    autoDeleteExpiredDoneTasks({
        quiet: !0
    }),
    renderAll(),
    await syncUserPreferences(),
    updateSettingsSyncPanel(),
    recordSyncActivity("settings", "success", "Settings saved", {}, {
        dedupeMs: 12e4
    }),
    toast("Settings saved")
}
function updateEncryptionSettingsPanel() {
    if (!els.settingsEncryptionBadge)
        return;
    const e = hasLockedEncryptedWorkspace();
    let t = "Off"
      , n = "muted"
      , a = "Optional passphrase encryption for task, event, and note content before cloud sync."
      , s = "If you forget this passphrase, encrypted cloud data cannot be recovered.";
    state.encryption.enabled && state.encryption.unlocked ? (t = "Unlocked",
    n = e ? "warning" : "good",
    a = e ? "Private sync is unlocked, but a few encrypted placeholders could not be recovered with this passphrase." : "Private sync is unlocked on this device. New cloud syncs encrypt task, event, and note content.",
    s = e ? "You can turn Private sync off now. TaskFlow will keep recovered items and remove unrecoverable encrypted placeholders after confirmation." : "Lock Private sync before sharing this device. Keep your passphrase somewhere safe.") : (state.encryption.enabled || e) && (t = "Locked",
    n = "warning",
    a = "Private sync is enabled, but this device needs the passphrase before encrypted cloud data can open.",
    s = "Enter your passphrase to unlock. Without it, TaskFlow will not overwrite encrypted cloud data."),
    els.settingsEncryptionBadge.dataset.health = n,
    els.settingsEncryptionBadge.textContent = t,
    els.settingsEncryptionSummary && (els.settingsEncryptionSummary.textContent = a),
    els.settingsEncryptionAdvice && (els.settingsEncryptionAdvice.textContent = s),
    els.settingsLockEncryptionBtn && (els.settingsLockEncryptionBtn.disabled = !state.encryption.unlocked),
    els.settingsDisableEncryptionBtn && (els.settingsDisableEncryptionBtn.disabled = !state.encryption.enabled || !state.encryption.unlocked,
    els.settingsDisableEncryptionBtn.title = state.encryption.enabled && !state.encryption.unlocked ? "Unlock Private sync with your passphrase first" : e ? "Turn off Private sync and remove unrecoverable encrypted placeholders" : "Turn off Private sync and save future cloud data normally")
}
async function handleEnableOrUnlockEncryption() {
    if (!state.session?.access_token)
        return void toast("Sign in before enabling Private sync");
    const e = els.settingsEncryptionPassphraseInput.value;
    try {
        const t = await deriveEncryptionKey(e);
        if (!state.encryption.enabled)
            return void confirmAction("Enable Private sync?", "TaskFlow will encrypt task, event, and note content before cloud sync. If you forget the passphrase, encrypted cloud data cannot be recovered.", async () => {
                await unlockEncryptionWithKey(t, !0)
            }
            );
        await unlockEncryptionWithKey(t, !1)
    } catch (t) {
        toast(readableError(t))
    }
}
async function unlockEncryptionWithKey(e, t) {
    if (state.encryption.key = e,
    state.encryption.enabled = !0,
    state.encryption.unlocked = !0,
    localStorage.setItem(ENCRYPTION_ENABLED_KEY, "true"),
    els.settingsEncryptionPassphraseInput.value = "",
    updateEncryptionSettingsPanel(),
    t)
        state.tasks.forEach(e => state.pendingSyncIds.add(e.id)),
        state.meetings.forEach(e => state.pendingMeetingSyncIds.add(e.id)),
        savePendingSyncs(),
        await forceSyncNow(),
        recordSyncActivity("settings", "success", "Private sync enabled"),
        toast("Private sync enabled");
    else {
        if (await loadCloudTasks(),
        hasLockedEncryptedWorkspace())
            return updateEncryptionSettingsPanel(),
            renderAll(),
            recordSyncActivity("settings", "warning", "Private sync partly unlocked"),
            void toast("Private sync partly unlocked. Some old encrypted items could not be recovered.");
        renderAll(),
        recordSyncActivity("settings", "success", "Private sync unlocked"),
        toast("Private sync unlocked")
    }
}
function lockEncryption() {
    state.encryption.unlocked = !1,
    state.encryption.key = null,
    updateEncryptionSettingsPanel(),
    updateSaveStatus(),
    recordSyncActivity("settings", "info", "Private sync locked"),
    toast("Private sync locked on this device")
}
function handleDisableEncryption() {
    if (!state.encryption.enabled)
        return void toast("Private sync is already off");
    if (!state.encryption.unlocked || !state.encryption.key)
        return toast("Unlock Private sync with your passphrase first"),
        void updateEncryptionSettingsPanel();
    const e = state.tasks.filter(e => e.encryptedLocked).map(e => e.id)
      , t = state.meetings.filter(e => e.encryptedLocked).map(e => e.id)
      , n = e.length + t.length;
    confirmAction("Turn off Private sync?", n ? `TaskFlow will stop encrypting future cloud syncs, keep recovered items, and remove ${n} unrecoverable encrypted ${1 === n ? "placeholder" : "placeholders"}.` : "TaskFlow will stop encrypting future cloud syncs and re-save your current workspace normally. Your passphrase will be removed from this device.", async () => {
        e.length && (state.tasks = state.tasks.filter(t => !e.includes(t.id))),
        t.length && (state.meetings = state.meetings.filter(e => !t.includes(e.id))),
        state.encryption.enabled = !1,
        state.encryption.unlocked = !1,
        state.encryption.key = null,
        localStorage.setItem(ENCRYPTION_ENABLED_KEY, "false"),
        state.tasks = state.tasks.map(e => normalizeTask({
            ...e,
            encryptedLocked: !1,
            updatedAt: (new Date).toISOString()
        })),
        state.meetings = state.meetings.map(e => normalizeMeeting({
            ...e,
            encryptedLocked: !1,
            updatedAt: (new Date).toISOString()
        })),
        state.tasks.forEach(e => state.pendingSyncIds.add(e.id)),
        state.meetings.forEach(e => state.pendingMeetingSyncIds.add(e.id)),
        savePendingSyncs(),
        saveWorkspaceLocal(new Date),
        updateEncryptionSettingsPanel(),
        renderAll(),
        await Promise.allSettled([deleteCloudTasks(e), deleteCloudMeetings(t)]),
        await forceSyncNow(),
        recordSyncActivity("settings", "success", "Private sync turned off"),
        toast("Private sync turned off")
    }
    )
}
function handleDeleteWorkspaceData() {
    confirmAction("Delete workspace data?", "This removes all synced tasks, events, and general notes for this account. Your login account stays active.", async () => {
        createRestorePoint("Before clearing workspace", {
            force: !0
        });
        const e = state.tasks.map(e => e.id)
          , t = state.meetings.map(e => e.id);
        state.tasks = [],
        state.meetings = [],
        state.generalNotes = normalizeGeneralNotes(),
        selectedTasks.clear(),
        persist(),
        await Promise.allSettled([deleteCloudTasks(e), deleteCloudMeetings(t), deleteCloudWorkspaceNotes()]),
        els.accountSettingsDialog.open && els.accountSettingsDialog.close(),
        renderAll(),
        recordSyncActivity("account", "warning", "Workspace data deleted", {
            tasks: e.length,
            events: t.length
        }),
        toast("Workspace data deleted")
    }
    )
}
async function deleteCloudWorkspaceNotes() {
    if (state.session?.access_token && state.isOnline && state.user?.id)
        try {
            await restRequest(`/workspace_notes?user_id=eq.${encodeURIComponent(state.user.id)}`, {
                method: "DELETE"
            })
        } catch (e) {
            console.warn("Workspace notes delete unavailable", e)
        }
}
function onboardingKey() {
    return `${ONBOARDING_KEY_PREFIX}${state.user?.id || state.user?.email || "local"}`
}
function hasSeenWelcome() {
    return "2026-06-16" === localStorage.getItem(onboardingKey()) || "2026-06-16" === state.user?.user_metadata?.taskflow_onboarding_seen
}
function maybeShowWelcome() {
    if (!state.user || els.welcomeDialog.open)
        return;
    if (isMobileStabilityMode())
        return;
    const e = state.user?.created_at ? new Date(state.user.created_at).getTime() : 0
      , t = e && Date.now() - e < 864e5
      , n = !state.tasks.length && !state.meetings.length && !normalizeGeneralNotes(state.generalNotes).tabs.some(e => e.content);
    (state.forceWelcome || t || n) && !hasSeenWelcome() && (state.forceWelcome = !1,
    state.welcomeStep = 0,
    window.setTimeout( () => {
        document.body.classList.contains("auth-ready") && !els.welcomeDialog.open && (renderWelcome(),
        els.welcomeDialog.showModal(),
        refreshIcons())
    }
    , 300))
}
function showWelcomeTutorial() {
    state.forceWelcome = !0,
    state.welcomeStep = 0,
    renderWelcome(),
    els.welcomeDialog.showModal(),
    refreshIcons()
}
function openAiAssistHelp() {
    els.aiAssistHelpDialog && (els.aiAssistHelpDialog.showModal(),
    refreshIcons())
}
function renderWelcome() {
    const e = welcomeSlides[state.welcomeStep] || welcomeSlides[0];
    els.welcomeEyebrow.textContent = e.eyebrow,
    els.welcomeTitle.textContent = e.title,
    els.welcomeBody.textContent = e.body,
    els.welcomeTip.innerHTML = `<i data-lucide="${e.icon || "sparkles"}"></i><span>${escapeHtml(e.tip || "")}</span>`,
    els.welcomeSteps.innerHTML = welcomeSlides.map( (e, t) => `<span class="${t === state.welcomeStep ? "active" : ""}" aria-label="Step ${t + 1}"></span>`).join(""),
    els.welcomeBackBtn.disabled = 0 === state.welcomeStep,
    els.welcomeBackBtn.textContent = "Back",
    els.welcomeNextBtn.innerHTML = state.welcomeStep === welcomeSlides.length - 1 ? 'Start using TaskFlow<i data-lucide="check"></i>' : 'Next<i data-lucide="arrow-right"></i>';
    const t = els.welcomeDialog.querySelector(".welcome-mark");
    t && (t.dataset.icon = e.icon),
    refreshIcons()
}
function moveWelcome(e) {
    const t = state.welcomeStep + e;
    t < 0 || (t >= welcomeSlides.length ? finishWelcome() : (state.welcomeStep = t,
    renderWelcome()))
}
function finishWelcome() {
    localStorage.setItem(onboardingKey(), "2026-06-16"),
    state.forceWelcome = !1,
    els.welcomeDialog.open && els.welcomeDialog.close(),
    state.session?.access_token && authRequest("/user", {
        method: "PUT",
        body: JSON.stringify({
            data: {
                taskflow_onboarding_seen: "2026-06-16"
            }
        })
    }).then(e => {
        state.user = e.user || e
    }
    ).catch(e => console.warn("Onboarding sync failed", e))
}
function readableError(e) {
    const t = String(e?.message || e || "Something went wrong.");
    return e?.taskflowCode ? errorText(e.taskflowCode, e.publicDetail) : isMissingMeetingsTableError(e) ? errorText("TF-SYNC-201", "Your tasks are still saved on this device.") : t.toLowerCase().includes("column") && t.toLowerCase().includes("meetings") ? errorText("TF-SYNC-202", "Your tasks are still saved on this device.") : t.toLowerCase().includes("invalid input syntax for type uuid") ? errorText("TF-SYNC-203", "Press Sync again after refreshing TaskFlow.") : t.toLowerCase().includes("invalid login") ? errorText("TF-AUTH-101", "Try again or create an account.") : t.toLowerCase().includes("already registered") ? errorText("TF-AUTH-102", "Sign in instead.") : t.toLowerCase().includes("jwt expired") || t.toLowerCase().includes("session expired") ? errorText("TF-AUTH-104", "Please sign in again.") : t.toLowerCase().includes("failed to fetch") ? errorText("TF-NET-001", "Check your internet connection.") : t.toLowerCase().includes("row-level security") || "42501" === String(e?.code || "") ? errorText("TF-SYNC-301") : errorText("TF-GEN-001")
}
function errorText(e, t=SUPPORT_PROMPT) {
    return `${ERROR_MESSAGES[e] || ERROR_MESSAGES["TF-GEN-001"]} ${t} (${e})`
}
function codedError(e, t=SUPPORT_PROMPT) {
    const n = new Error(`${ERROR_MESSAGES[e] || ERROR_MESSAGES["TF-GEN-001"]} (${e})`);
    return n.taskflowCode = e,
    n.publicDetail = t,
    n
}
function codeForAuthResponse(e) {
    const t = String(e?.msg || e?.message || e?.error_description || e?.error || "").toLowerCase();
    return t.includes("invalid login") ? "TF-AUTH-101" : t.includes("already registered") ? "TF-AUTH-102" : t.includes("jwt") || t.includes("session") ? "TF-AUTH-104" : t.includes("fetch") ? "TF-NET-001" : "TF-AUTH-103"
}
function isMissingMeetingsTableError(e) {
    const t = String(e?.message || e || "").toLowerCase();
    return t.includes("meetings") && (t.includes("schema cache") || t.includes("could not find the table"))
}
function isMobileViewport() {
    return window.matchMedia?.("(max-width: 820px)").matches
}
function mobilePageForView(e) {
    return ["list", "board"].includes(e) ? "tasks" : ["meetings", "calendar", "analytics", "focus"].includes(e) ? "activity" : "home"
}
function viewForMobilePage(e) {
    return "tasks" === e ? "list" : "activity" === e ? "meetings" : "unified"
}
function setMobilePage(e="home", t={}) {
    const n = ["home", "tasks", "activity"].includes(e) ? e : "home";
    if (state.mobilePage = n,
    document.body.dataset.mobilePage = n,
    t.quiet || localStorage.setItem(MOBILE_PAGE_KEY, n),
    document.querySelectorAll("[data-mobile-page]").forEach(e => {
        const t = e.dataset.mobilePage === n;
        e.classList.toggle("active", t),
        e.setAttribute("aria-pressed", String(t))
    }
    ),
    isMobileViewport() && !t.preserveView) {
        const e = viewForMobilePage(n);
        state.view !== e && (state.view = e,
        document.body.dataset.view = state.view,
        renderWorkspaceTitle(),
        renderWorkspaceToolbar(),
        renderNudgePanel(),
        updateViewVisibility(),
        renderActiveView())
    }
    refreshIcons()
}
function renderAll() {
    ["unified", "board", "list", "calendar", "meetings", "analytics", "focus"].includes(state.view) || (state.view = "unified"),
    document.body.dataset.view = state.view,
    selectedTasks.forEach(e => {
        state.tasks.some(t => t.id === e) || selectedTasks.delete(e)
    }
    ),
    hydrateFilterOptions(),
    renderSidebar(),
    renderMetrics(),
    renderWorkspaceTitle(),
    renderWorkspaceToolbar(),
    renderNudgePanel(),
    updateViewVisibility(),
    renderActiveView(),
    setMobilePage(isMobileViewport() ? mobilePageForView(state.view) : state.mobilePage, {
        quiet: !0,
        preserveView: !0
    }),
    refreshIcons(),
    scheduleLiquidGlassRefresh()
}
function renderActiveView() {
    document.body.classList.toggle("quiet-view-motion", !isMobileViewport() && renderedWorkspaceViews.has(state.view)),
    "board" === state.view && renderBoard(),
    "list" === state.view && renderList(),
    "calendar" === state.view && renderCalendar(),
    "unified" === state.view && renderUnified(),
    "meetings" === state.view && renderMeetings(),
    "analytics" === state.view && renderAnalytics(),
    "focus" === state.view && renderFocus(),
    renderedWorkspaceViews.add(state.view)
}
function updateSaveStatus(e=new Date) {
    if (!els.saveStatus)
        return;
    const t = e.toLocaleTimeString(userLocale(), {
        hour: "2-digit",
        minute: "2-digit"
    })
      , n = state.pendingSyncIds.size || state.pendingDeleteIds.size || state.pendingMeetingSyncIds.size || state.pendingMeetingDeleteIds.size || preferencesSyncPending();
    els.saveStatus.disabled = Boolean(state.isSyncing),
    els.saveStatus.dataset.syncState = "ready",
    els.saveStatus.title = "Sync now",
    els.saveStatus.setAttribute("aria-label", "Sync now"),
    state.isOnline ? state.session?.access_token ? state.isSyncing ? (els.saveStatus.dataset.syncState = "syncing",
    els.saveStatus.innerHTML = '<i data-lucide="refresh-cw"></i>Syncing...') : state.encryption.enabled && !state.encryption.unlocked ? (els.saveStatus.dataset.syncState = "pending",
    els.saveStatus.title = "Private sync is locked. Unlock it in Settings before syncing.",
    els.saveStatus.setAttribute("aria-label", "Private sync is locked. Unlock it in Settings before syncing."),
    els.saveStatus.innerHTML = '<i data-lucide="lock"></i>Private locked') : workspaceSyncRetryTimer ? (els.saveStatus.dataset.syncState = "pending",
    els.saveStatus.title = "TaskFlow will retry account sync shortly. Click to sync now.",
    els.saveStatus.setAttribute("aria-label", "TaskFlow will retry account sync shortly. Click to sync now."),
    els.saveStatus.innerHTML = '<i data-lucide="refresh-cw"></i>Retrying soon') : n ? (els.saveStatus.dataset.syncState = "pending",
    els.saveStatus.title = "Changes are ready to sync. Click to sync now.",
    els.saveStatus.setAttribute("aria-label", "Changes are ready to sync. Click to sync now."),
    els.saveStatus.innerHTML = '<i data-lucide="refresh-cw"></i>Ready to sync') : (els.saveStatus.dataset.syncState = "synced",
    els.saveStatus.title = "Synced. Click to sync now.",
    els.saveStatus.setAttribute("aria-label", "Synced. Click to sync now."),
    els.saveStatus.innerHTML = `<i data-lucide="cloud-check"></i>Synced ${t.replace(/^0/, "")}`) : (els.saveStatus.dataset.syncState = "signed-out",
    els.saveStatus.innerHTML = '<i data-lucide="lock"></i>Sign in required') : (els.saveStatus.dataset.syncState = "offline",
    els.saveStatus.title = "Offline. TaskFlow is saving on this device. Do not clear this site's stored data until it syncs again.",
    els.saveStatus.setAttribute("aria-label", "Offline. Do not clear this site's stored data until TaskFlow syncs again."),
    els.saveStatus.innerHTML = '<i data-lucide="cloud-off"></i>Offline'),
    updateSettingsSyncPanel(e),
    updateGoogleCalendarSettingsPanel(),
    refreshIcons()
}
function updateSettingsSyncPanel(e=new Date) {
    if (!els.settingsSyncBadge || !els.settingsSyncSummary || !els.settingsSyncDetails)
        return;
    const t = state.pendingSyncIds.size + state.pendingMeetingSyncIds.size
      , n = state.pendingDeleteIds.size + state.pendingMeetingDeleteIds.size
      , a = preferencesSyncPending() ? 1 : 0
      , s = t + n + a
      , i = Boolean(state.session?.access_token)
      , o = readWorkspaceSaveMeta()
      , r = o.exportedAt ? formatSavedTime(o.exportedAt) : "Not saved on this device yet"
      , l = lastAccountSyncedAt()
      , c = normalizeGeneralNotes(state.generalNotes).tabs.filter(e => e.content.trim()).length;
    let d = "good"
      , u = "Up to date"
      , g = "Everything is saved on this device and your account."
      , p = "TaskFlow saves locally first, then syncs to your account when it has a connection.";
    state.isOnline ? i ? state.isSyncing ? (d = "working",
    u = "Syncing",
    g = "TaskFlow is saving your latest changes to your account.",
    p = "Keep this tab open until syncing finishes.") : state.encryption.enabled && !state.encryption.unlocked ? (d = "warning",
    u = "Private locked",
    g = "Private sync is locked on this device.",
    p = "Unlock Private sync before syncing. TaskFlow will not upload plaintext while Private sync is locked.") : workspaceSyncRetryTimer ? (d = "working",
    u = "Retrying",
    g = "TaskFlow will retry account sync shortly.",
    p = "You can press Sync now if you want to retry immediately.") : s ? (d = "warning",
    u = "Needs sync",
    g = `${s} ${1 === s ? "change is" : "changes are"} waiting to sync across your workspace.`,
    p = "Press Sync now, or leave TaskFlow open and it will keep trying automatically.") : hasLockedEncryptedWorkspace() && (d = "warning",
    u = "Locked",
    g = "Some cloud data is encrypted and needs your Private sync passphrase.",
    p = "Unlock Private sync in Settings before editing encrypted tasks or events on this device.") : (d = "muted",
    u = "Device only",
    g = "Sign in to save this workspace to your account and use it on other devices.",
    p = "Export a backup before clearing browser data if you are not signed in.") : (d = "warning",
    u = "Offline",
    g = i ? "Your changes are saved on this device and will sync when the connection returns." : "Your workspace is saved on this device only.",
    p = "Do not clear this site's stored data while offline, otherwise unsynced changes could be lost."),
    els.settingsSyncBadge.dataset.health = d,
    els.settingsSyncBadge.textContent = u,
    els.settingsSyncSummary.textContent = g,
    els.settingsSyncAdvice && (els.settingsSyncAdvice.textContent = p),
    els.settingsSyncNowBtn && (els.settingsSyncNowBtn.disabled = !i || state.isSyncing,
    els.settingsSyncNowBtn.title = i ? "Save your latest workspace to your account" : "Sign in to sync your workspace");
    const m = [["Tasks", String(state.tasks.length)], ["Events", String(state.meetings.length)], ["Notes", c ? `${c} ${1 === c ? "tab" : "tabs"}` : "None yet"], ["Queued tasks", state.pendingSyncIds.size ? `${state.pendingSyncIds.size} waiting` : "Clear"], ["Queued events", state.pendingMeetingSyncIds.size ? `${state.pendingMeetingSyncIds.size} waiting` : "Clear"], ["Queued deletes", n ? `${n} waiting` : "Clear"], ["Settings queue", a ? "Waiting" : "Clear"], ["Auto retry", workspaceSyncRetryTimer ? "Scheduled" : "Idle"], ["This device", r], ["Account sync", i ? l ? formatSavedTime(l) : "Not synced yet" : "Sign in required"], ["Last pull", i ? formatSyncMergeSummary() : "Sign in required"]];
    els.settingsSyncDetails.innerHTML = m.map( ([e,t]) => `\n        <div class="sync-health-item">\n          <span>${escapeHtml(e)}</span>\n          <strong>${escapeHtml(t)}</strong>\n        </div>\n      `).join(""),
    updateEncryptionSettingsPanel(),
    updateDiagnosticsPanel()
}
function updateDiagnosticsPanel() {
    if (!els.settingsDiagnosticsBadge || !els.settingsDiagnosticsGrid)
        return;
    const e = feedbackDiagnostics()
      , t = preferencesSyncPending() ? 1 : 0
      , n = e.sync.pendingSaves + e.sync.pendingDeletes + t
      , a = googleCalendarLastStatus()
      , s = googleCalendarLastError()
      , i = Boolean(state.lastError || "error" === a.status);
    let o = "good"
      , r = "Healthy"
      , l = "TaskFlow looks ready."
      , c = "Diagnostics stay on this device unless you choose to send feedback.";
    state.isOnline ? e.signedIn ? n ? (o = "warning",
    r = "Queue",
    l = `${n} ${1 === n ? "change is" : "changes are"} waiting to sync.`,
    c = "Press Sync now if you want to force a save immediately.") : i && (o = "warning",
    r = "Review",
    l = s?.message ? "Google Calendar reported a sync issue." : "TaskFlow recorded a recent issue.",
    c = "Copy diagnostics or send feedback if this keeps happening.") : (o = "muted",
    r = "Signed out",
    l = "TaskFlow is running in this browser, but account sync needs sign-in.",
    c = "Sign in before relying on cross-device sync.") : (o = "warning",
    r = "Offline",
    l = "TaskFlow is saving locally and will sync when this device is online.",
    c = "Do not clear browser data while offline or while changes are waiting."),
    els.settingsDiagnosticsBadge.dataset.health = o,
    els.settingsDiagnosticsBadge.textContent = r,
    els.settingsDiagnosticsSummary.textContent = l,
    els.settingsDiagnosticsAdvice && (els.settingsDiagnosticsAdvice.textContent = c);
    const d = workspaceUsageSnapshot()
      , u = [["Version", "beta 0.95"], ["Connection", state.isOnline ? "Online" : "Offline"], ["Account", e.signedIn ? currentTierConfig().label : "Signed out"], ["Workspace", `${e.counts.tasks} tasks, ${e.counts.events} events`], ["Storage", formatBytes(d.bytes)], ["Pending queue", n ? `${n} waiting` : "Clear"], ["Task queue", state.pendingSyncIds.size ? `${state.pendingSyncIds.size} waiting` : "Clear"], ["Event queue", state.pendingMeetingSyncIds.size ? `${state.pendingMeetingSyncIds.size} waiting` : "Clear"], ["Delete queue", e.sync.pendingDeletes ? `${e.sync.pendingDeletes} waiting` : "Clear"], ["Settings queue", t ? "Waiting" : "Clear"], ["Auto retry", workspaceSyncRetryTimer ? "Scheduled" : "Idle"], ["Account sync", e.sync.lastAccountSync ? formatSavedTime(e.sync.lastAccountSync) : "Not yet"], ["Google", googleDiagnosticsLabel()], ["Google mode", e.sync.googleCalendarIncremental ? "Incremental ready" : "Full scan next"], ["Private sync", state.encryption.enabled ? state.encryption.unlocked ? "Unlocked" : "Locked" : "Off"], ["Install mode", "installed" === e.installMode ? "Installed app" : "Browser"], ["Recent issue", s?.message || state.lastError?.code || "None"]];
    els.settingsDiagnosticsGrid.innerHTML = u.map( ([e,t]) => `\n        <div class="sync-health-item diagnostics-item">\n          <span>${escapeHtml(e)}</span>\n          <strong>${escapeHtml(String(t || "None"))}</strong>\n        </div>\n      `).join("")
}
function googleDiagnosticsLabel() {
    return googleCalendarConfigured() ? googleCalendarSyncInFlight ? "Syncing" : "error" === googleCalendarLastStatus().status ? "Needs reconnect" : googleCalendarAutoSyncEnabled() ? googleCalendarConnected() ? googleCalendarBackendConnected() ? "Auto via connector" : "Auto-sync on" : "Auto enabled" : googleCalendarConnected() ? googleCalendarBackendConnected() ? "Connector connected" : "Connected" : "Ready" : "Setup needed"
}
async function copyDiagnosticsToClipboard() {
    const e = {
        ...feedbackDiagnostics(),
        copiedAt: (new Date).toISOString()
    }
      , t = JSON.stringify(e, null, 2);
    try {
        await navigator.clipboard.writeText(t),
        toast("Report details copied"),
        recordSyncActivity("support", "success", "Report details copied", {}, {
            dedupeMs: 6e4
        })
    } catch {
        downloadJson(e, `taskflow-diagnostics-${todayISO()}.json`),
        toast("Report details downloaded")
    }
}
function recordAccountSyncedAt(e=new Date) {
    try {
        const t = e.toISOString();
        localStorage.setItem(LAST_ACCOUNT_SYNC_KEY, t),
        localStorage.setItem(accountScopedStorageKey(LAST_ACCOUNT_SYNC_KEY), t)
    } catch {}
}
function lastAccountSyncedAt() {
    try {
        return localStorage.getItem(accountScopedStorageKey(LAST_ACCOUNT_SYNC_KEY)) || localStorage.getItem(LAST_ACCOUNT_SYNC_KEY) || ""
    } catch {
        return ""
    }
}
function accountScopedStorageKey(e) {
    return `${e}.${cleanToken(state.user?.id || state.user?.email || "local") || "local"}`
}
function readWorkspaceSaveMeta() {
    try {
        const e = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        return {
            exportedAt: e?.exportedAt || ""
        }
    } catch {
        return {
            exportedAt: ""
        }
    }
}
function formatSavedTime(e) {
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? "Not saved yet" : `Saved ${t.toLocaleTimeString(userLocale(), {
        hour: "2-digit",
        minute: "2-digit"
    }).replace(/^0/, "")}`
}
function rotateQuickPlaceholder() {
    els.quickInput.placeholder = quickPlaceholders[0]
}
function refreshIcons() {
    window.lucide && window.lucide.createIcons()
}
function renderSidebar() {
    const e = {
        all: state.tasks.length,
        today: state.tasks.filter(e => isToday(e.dueDate) && "done" !== e.status).length,
        upcoming: state.tasks.filter(e => isUpcoming(e.dueDate) && "done" !== e.status).length,
        overdue: state.tasks.filter(e => isOverdue(e)).length,
        waiting: state.tasks.filter(e => "waiting" === e.status).length,
        completed: state.tasks.filter(e => "done" === e.status).length
    };
    els.smartViews.innerHTML = smartViews.map(t => `\n        <button class="nav-item ${state.smartView === t.id ? "active" : ""}" type="button" data-smart="${t.id}">\n          <i data-lucide="${t.icon}"></i>\n          <span>${escapeHtml(t.label)}</span>\n          <span class="count">${e[t.id] || 0}</span>\n        </button>\n      `).join(""),
    els.smartViews.querySelectorAll("[data-smart]").forEach(e => {
        e.addEventListener("click", () => {
            state.smartView = e.dataset.smart,
            renderAll()
        }
        )
    }
    );
    const t = getProjects();
    els.projectNav.innerHTML = t.map(e => {
        const t = state.tasks.filter(t => t.project === e).length + state.meetings.filter(t => t.subject === e).length;
        return `\n        <button class="nav-item ${state.filters.project === e ? "active" : ""}" type="button" data-project="${escapeAttr(e)}">\n          <i data-lucide="folder"></i>\n          <span>${escapeHtml(e)}</span>\n          <span class="count">${t}</span>\n        </button>\n      `
    }
    ).join(""),
    els.projectNav.querySelectorAll("[data-project]").forEach(e => {
        e.addEventListener("click", () => {
            state.filters.project = state.filters.project === e.dataset.project ? "all" : e.dataset.project,
            renderAll()
        }
        )
    }
    );
    const n = getTags();
    els.tagNav.innerHTML = n.length ? n.slice(0, 18).map(e => `<button class="tag-pill ${state.filters.tag === e ? "active" : ""}" type="button" data-tag="${escapeAttr(e)}">#${escapeHtml(e)}</button>`).join("") : '<span class="tag-pill">No tags yet</span>',
    els.tagNav.querySelectorAll("[data-tag]").forEach(e => {
        e.addEventListener("click", () => {
            state.filters.tag = state.filters.tag === e.dataset.tag ? "all" : e.dataset.tag,
            renderAll()
        }
        )
    }
    );
    const a = state.tasks.filter(e => "done" === e.status).length
      , s = state.tasks.length ? Math.round(a / state.tasks.length * 100) : 0;
    els.completionRing.style.setProperty("--ring-value", `${s}%`),
    els.completionLabel.textContent = `${s}%`
}
function hydrateFilterOptions() {
    const e = state.filters.project
      , t = state.filters.tag;
    els.searchInput.value = state.filters.search,
    els.projectFilter.innerHTML = `<option value="all">All projects</option>${getProjects().map(e => `<option value="${escapeAttr(e)}">${escapeHtml(e)}</option>`).join("")}`,
    els.tagFilter.innerHTML = `<option value="all">All tags</option>${getTags().map(e => `<option value="${escapeAttr(e)}">#${escapeHtml(e)}</option>`).join("")}`,
    els.projectFilter.value = getProjects().includes(e) ? e : "all",
    els.tagFilter.value = getTags().includes(t) ? t : "all",
    state.filters.project = els.projectFilter.value,
    state.filters.tag = els.tagFilter.value,
    els.priorityFilter.value = state.filters.priority,
    els.dueFilter.value = state.filters.due,
    els.sortSelect.value = state.filters.sort
}
function renderMetrics() {
    const e = state.tasks.filter(e => "done" !== e.status)
      , t = state.tasks.filter(e => "done" === e.status)
      , n = e.filter(e => isToday(e.dueDate))
      , a = e.filter(e => isOverdue(e))
      , s = e.reduce( (e, t) => e + Number(t.estimate || 0), 0)
      , i = t.filter(e => isWithinDays(e.completedAt, 7)).length
      , o = [{
        label: "Active tasks",
        value: e.length,
        detail: `${state.tasks.length} total in workspace`,
        icon: "circle-dot"
    }, {
        label: "Due today",
        value: n.length,
        detail: n.length ? "Ready for attention" : "No deadline pressure",
        icon: "sun"
    }, {
        label: "Overdue",
        value: a.length,
        detail: a.length ? "Needs a decision" : "Nothing slipping",
        icon: "alert-triangle"
    }, {
        label: "Workload",
        value: `${Math.round(s / 60)}h`,
        detail: `${i} completed this week`,
        icon: "activity"
    }];
    els.metrics.innerHTML = o.map(e => `\n        <article class="metric">\n          <i data-lucide="${e.icon}"></i>\n          <div class="label">\n            <span>${escapeHtml(e.label)}</span>\n            <small>${escapeHtml(e.detail)}</small>\n          </div>\n          <strong>${escapeHtml(String(e.value))}</strong>\n        </article>\n      `).join("")
}
function renderWorkspaceTitle() {
    if ("unified" === state.view) {
        const e = state.tasks.filter(e => "done" !== e.status).length
          , t = state.meetings.filter(isUpcomingMeeting).length;
        return els.viewTitle.textContent = "Workspace",
        void (els.viewSubtitle.textContent = `${e} active ${1 === e ? "task" : "tasks"} + ${t} upcoming ${1 === t ? "event" : "events"} in one workspace`)
    }
    if ("meetings" === state.view) {
        const e = state.meetings.filter(isUpcomingMeeting).length;
        return els.viewTitle.textContent = "Events",
        void (els.viewSubtitle.textContent = `${e} upcoming ${1 === e ? "event" : "events"} · follow-up tasks`)
    }
    const e = smartViews.find(e => e.id === state.smartView)
      , t = filteredTasks().length;
    els.viewTitle.textContent = e?.label || "All tasks";
    const n = filteredTasks().filter(e => "done" !== e.status).reduce( (e, t) => e + Number(t.estimate || 0), 0);
    els.viewSubtitle.textContent = `${t} ${1 === t ? "task" : "tasks"} in view · ${Math.round(n / 60)}h active estimate`
}
function renderWorkspaceToolbar() {
    if (els.workspaceToolbar) {
        if ("unified" !== state.view)
            return els.workspaceToolbar.hidden = !0,
            void (els.workspaceToolbar.innerHTML = "");
        els.workspaceToolbar.hidden = !1,
        els.workspaceToolbar.innerHTML = `\n    ${renderUnifiedPresetControls("compact")}\n  `,
        bindUnifiedActionButtons(els.workspaceToolbar)
    }
}
function renderNudgePanel() {
    const e = state.tasks.filter(e => "done" !== e.status)
      , t = sortTasks([...e], "priority")[0]
      , n = e.filter(e => isOverdue(e)).length
      , a = e.filter(e => "waiting" === e.status).length;
    if (!t)
        return void (els.nudgePanel.innerHTML = '\n      <div class="nudge-message">\n        <i data-lucide="sparkles"></i>\n        <span>Your active queue is clear. Capture the next thing only when it earns a place.</span>\n      </div>\n    ');
    const s = n ? `${n} overdue ${1 === n ? "task" : "tasks"} need a decision` : a ? `${a} waiting ${1 === a ? "handoff" : "handoffs"} to unblock` : `${priorityLabels[t.priority]} priority · ${t.dueDate ? formatDueLabel(t) : "unscheduled"}`;
    els.nudgePanel.innerHTML = `\n    <div class="nudge-message">\n      <i data-lucide="target"></i>\n      <span><strong>Next best move:</strong> ${escapeHtml(t.title)}</span>\n      <small>${escapeHtml(s)}</small>\n    </div>\n    <div class="nudge-actions">\n      <button class="button ghost" type="button" data-nudge-action="edit" data-task-id="${t.id}">\n        <i data-lucide="pencil"></i>\n        Edit\n      </button>\n      <button class="button primary" type="button" data-nudge-action="focus" data-task-id="${t.id}">\n        <i data-lucide="timer"></i>\n        Focus\n      </button>\n    </div>\n  `,
    els.nudgePanel.querySelectorAll("[data-nudge-action]").forEach(e => {
        e.addEventListener("click", () => {
            "edit" === e.dataset.nudgeAction && openTaskDialog(e.dataset.taskId),
            "focus" === e.dataset.nudgeAction && (state.focusTaskId = e.dataset.taskId,
            state.view = "unified",
            updateUnifiedWindowLayout("focus", {
                ...bringUnifiedWindowForward("focus") || getUnifiedLayoutItem("focus"),
                hidden: !1
            }),
            renderAll())
        }
        )
    }
    )
}
function updateViewVisibility() {
    els.viewTabs.querySelectorAll("[data-view]").forEach(e => {
        const t = e.dataset.view === state.view;
        e.classList.toggle("active", t),
        e.setAttribute("aria-selected", String(t))
    }
    ),
    ["board", "list", "calendar", "unified", "meetings", "analytics", "focus"].forEach(e => {
        els[`${e}View`].classList.toggle("active", state.view === e)
    }
    )
}
function renderBoard() {
    const e = filteredTasks();
    els.boardView.innerHTML = `\n    ${renderGeneralNotesPanel()}\n    <div class="kanban">\n      ${statuses.map(t => {
        const n = e.filter(e => e.status === t.id);
        return `\n            <section class="kanban-column" data-status="${t.id}">\n              <div class="column-head">\n                <span class="status-dot" style="background:${t.color}"></span>\n                <h2>${escapeHtml(t.label)}</h2>\n                <span>${n.length}</span>\n              </div>\n              <div class="column-body">\n                ${n.length ? n.map(renderTaskCard).join("") : renderColumnEmpty(t.id)}\n              </div>\n            </section>\n          `
    }
    ).join("")}\n    </div>\n  `,
    bindGeneralNotesTabs(els.boardView),
    els.boardView.querySelectorAll(".task-card").forEach(e => {
        e.addEventListener("dragstart", () => e.classList.add("dragging")),
        e.addEventListener("dragend", () => e.classList.remove("dragging"))
    }
    ),
    els.boardView.querySelectorAll(".kanban-column").forEach(e => {
        e.addEventListener("dragover", t => {
            t.preventDefault(),
            e.classList.add("drag-over")
        }
        ),
        e.addEventListener("dragleave", () => e.classList.remove("drag-over")),
        e.addEventListener("drop", t => {
            t.preventDefault(),
            e.classList.remove("drag-over"),
            updateTaskStatus(t.dataTransfer.getData("text/plain"), e.dataset.status)
        }
        )
    }
    ),
    bindTaskCardActions(els.boardView)
}
function renderGeneralNotesPanel() {
    const e = state.generalNotes.updatedAt ? formatSavedTime(state.generalNotes.updatedAt) : "Not saved yet"
      , t = getGeneralNoteTabs()
      , n = getActiveGeneralNoteTab();
    return `\n    <section class="general-notes-panel" aria-label="General notes">\n      <div class="general-notes-head">\n        <div>\n          <h2>General notes</h2>\n          <small>${escapeHtml(e)}</small>\n        </div>\n        <i data-lucide="notebook-pen"></i>\n      </div>\n      ${renderGeneralNotesTabs(t)}\n      <textarea id="generalNotesInput" rows="4" maxlength="5000" placeholder="Write anything you want to keep handy.">${escapeHtml(n.content)}</textarea>\n    </section>\n  `
}
function handleGeneralNotesInput(e) {
    updateGeneralNoteTabContent(e.target.value),
    updateSaveStatus(new Date(state.generalNotes.updatedAt)),
    clearTimeout(generalNotesSaveTimer),
    saveWorkspaceLocal(new Date(state.generalNotes.updatedAt)),
    state.session?.access_token && syncWorkspaceNotes()
}
function renderGeneralNotesTabs(e=getGeneralNoteTabs()) {
    const t = getActiveGeneralNoteTab().id;
    return `\n    <div class="general-notes-tabs" role="tablist" aria-label="General note tabs">\n      ${e.map(e => `\n            <button class="note-tab ${e.id === t ? "active" : ""}" type="button" role="tab" aria-selected="${e.id === t}" data-note-tab="${escapeAttr(e.id)}">\n              <span>${escapeHtml(e.title)}</span>\n            </button>\n          `).join("")}\n      <button class="note-tab add" type="button" data-note-tab-add title="Add note tab" aria-label="Add note tab"><i data-lucide="plus"></i></button>\n      <button class="note-tab rename" type="button" data-note-tab-rename="${escapeAttr(t)}" title="Rename current note" aria-label="Rename current note"><i data-lucide="pencil"></i></button>\n      ${e.length > 1 ? `<button class="note-tab danger" type="button" data-note-tab-delete="${escapeAttr(t)}" title="Delete current note tab" aria-label="Delete current note tab"><i data-lucide="trash-2"></i></button>` : ""}\n    </div>\n  `
}
function bindGeneralNotesTabs(e) {
    e.querySelectorAll(".general-notes-tabs").forEach(e => {
        e.addEventListener("click", e => {
            const t = e.target.closest("[data-note-tab]")
              , n = e.target.closest("[data-note-tab-add]")
              , a = e.target.closest("[data-note-tab-rename]")
              , s = e.target.closest("[data-note-tab-delete]");
            if (t || n || a || s) {
                if (e.preventDefault(),
                e.stopPropagation(),
                t)
                    return state.generalNotes.activeTabId = t.dataset.noteTab,
                    state.generalNotes = normalizeGeneralNotes(state.generalNotes),
                    saveWorkspaceLocal(new Date),
                    state.session?.access_token && syncWorkspaceNotes(),
                    void renderAll();
                if (n) {
                    const e = `Note ${getGeneralNoteTabs().length + 1}`
                      , t = {
                        id: uid(),
                        title: e,
                        content: ""
                    };
                    return state.generalNotes.tabs.push(t),
                    state.generalNotes.activeTabId = t.id,
                    state.generalNotes.updatedAt = (new Date).toISOString(),
                    state.generalNotes = normalizeGeneralNotes(state.generalNotes),
                    saveWorkspaceLocal(new Date(state.generalNotes.updatedAt)),
                    state.session?.access_token && syncWorkspaceNotes(),
                    void renderAll()
                }
                if (a)
                    renameGeneralNoteTab(a.dataset.noteTabRename || state.generalNotes.activeTabId);
                else if (s) {
                    const e = s.dataset.noteTabDelete || state.generalNotes.activeTabId
                      , t = getGeneralNoteTabs();
                    if (t.length <= 1)
                        return;
                    const n = Math.max(0, t.findIndex(t => t.id === e));
                    state.generalNotes.tabs = t.filter(t => t.id !== e),
                    state.generalNotes.activeTabId = state.generalNotes.tabs[Math.max(0, n - 1)]?.id || state.generalNotes.tabs[0]?.id || "",
                    state.generalNotes.updatedAt = (new Date).toISOString(),
                    state.generalNotes = normalizeGeneralNotes(state.generalNotes),
                    saveWorkspaceLocal(new Date(state.generalNotes.updatedAt)),
                    state.session?.access_token && syncWorkspaceNotes(),
                    renderAll()
                }
            }
        }
        )
    }
    )
}
function renameGeneralNoteTab(e) {
    const t = getGeneralNoteTabs()
      , n = t.find(t => t.id === e) || getActiveGeneralNoteTab();
    if (!n)
        return;
    const a = cleanTitle(window.prompt("Rename note", n.title) || "").slice(0, 28);
    a && a !== n.title && (state.generalNotes.tabs = t.map(e => e.id === n.id ? {
        ...e,
        title: a
    } : e),
    state.generalNotes.activeTabId = n.id,
    state.generalNotes.updatedAt = (new Date).toISOString(),
    state.generalNotes = normalizeGeneralNotes(state.generalNotes),
    saveWorkspaceLocal(new Date(state.generalNotes.updatedAt)),
    state.session?.access_token && syncWorkspaceNotes(),
    renderAll(),
    toast("Note renamed"))
}
function getGeneralNoteTabs() {
    return state.generalNotes = normalizeGeneralNotes(state.generalNotes),
    state.generalNotes.tabs
}
function getActiveGeneralNoteTab() {
    const e = getGeneralNoteTabs();
    return e.find(e => e.id === state.generalNotes.activeTabId) || e[0]
}
function updateGeneralNoteTabContent(e) {
    const t = String(e || "").slice(0, 5e3);
    state.generalNotes = normalizeGeneralNotes(state.generalNotes);
    const n = state.generalNotes.tabs
      , a = n.some(e => e.id === state.generalNotes.activeTabId) ? state.generalNotes.activeTabId : n[0]?.id;
    state.generalNotes.tabs = n.map(e => e.id === a ? {
        ...e,
        content: t
    } : e),
    state.generalNotes.activeTabId = a,
    state.generalNotes.updatedAt = (new Date).toISOString(),
    state.generalNotes.content = t
}
function renderColumnEmpty(e) {
    return `<div class="empty-state"><div><div class="empty-art"><span></span><span></span><span></span></div><strong>${{
        backlog: "No loose ideas",
        planned: "Nothing scheduled",
        progress: "No active work",
        waiting: "No handoffs",
        done: "No wins here yet"
    }[e]}</strong></div></div>`
}
function renderTaskCard(e) {
    const t = e.subtasks.length
      , n = e.subtasks.filter(e => e.done).length
      , a = t ? Math.round(n / t * 100) : "done" === e.status ? 100 : 0
      , s = "done" === e.status
      , i = getDueClass(e);
    return `\n    <article class="task-card ${s ? "done" : ""}" draggable="true" data-task-id="${e.id}">\n      <div class="task-card-top">\n        <span class="chip project-chip">${escapeHtml(e.project || "Inbox")}</span>\n        <span class="priority-chip priority-${e.priority}">${escapeHtml(priorityLabels[e.priority] || e.priority)}</span>\n      </div>\n      <div class="task-title-row">\n        <button class="task-check ${s ? "done" : ""}" type="button" data-action="toggle" title="${s ? "Reopen task" : "Complete task"}" aria-label="${s ? "Reopen task" : "Complete task"}">\n          <i data-lucide="${s ? "check" : "circle"}"></i>\n        </button>\n        <button class="plain-task" type="button" data-action="edit">\n          <span class="task-title">${escapeHtml(e.title)}</span>\n        </button>\n      </div>\n      ${e.tags.length ? `<div class="task-tags">${e.tags.map(e => `<span class="tag">#${escapeHtml(e)}</span>`).join("")}</div>` : ""}\n      ${t ? `<div class="progress" title="${n} of ${t} subtasks"><span style="--progress:${a}%"></span></div>` : ""}\n      <div class="task-card-footer">\n        <div class="task-meta">\n          ${e.dueDate ? `<span class="due-chip ${i}"><i data-lucide="calendar"></i>${formatDueLabel(e)}</span>` : '<span class="due-chip"><i data-lucide="calendar-x"></i>No date</span>'}\n          ${e.plannedDate ? `<span class="energy-chip"><i data-lucide="clock-3"></i>Plan ${escapeHtml(formatPlannedWorkLabel(e))}</span>` : ""}\n          ${e.estimate ? `<span class="energy-chip"><i data-lucide="clock"></i>${e.estimate}m</span>` : ""}\n          ${"none" !== e.recurrence ? `<span class="energy-chip"><i data-lucide="repeat"></i>${escapeHtml(e.recurrence)}</span>` : ""}\n        </div>\n        <div class="card-actions">\n          <button class="chip-button" type="button" data-action="focus" title="Focus" aria-label="Focus task"><i data-lucide="timer"></i></button>\n          <button class="chip-button" type="button" data-action="edit" title="Edit" aria-label="Edit task"><i data-lucide="pencil"></i></button>\n        </div>\n      </div>\n    </article>\n  `
}
function bindTaskCardActions(e) {
    e.querySelectorAll(".task-card").forEach(e => {
        e.addEventListener("dragstart", t => {
            t.dataTransfer.setData("text/plain", e.dataset.taskId)
        }
        )
    }
    ),
    e.querySelectorAll("[data-action]").forEach(e => {
        e.addEventListener("click", t => {
            const n = t.target.closest("[data-task-id]")
              , a = n?.dataset.taskId || e.dataset.taskId;
            if (!a)
                return;
            const s = e.dataset.action;
            "toggle" === s && toggleComplete(a),
            "edit" === s && openTaskDialog(a),
            "focus" === s && (state.focusTaskId = a,
            state.view = "unified",
            updateUnifiedWindowLayout("focus", {
                ...bringUnifiedWindowForward("focus") || getUnifiedLayoutItem("focus"),
                hidden: !1
            }),
            renderAll())
        }
        )
    }
    )
}
function renderList() {
    const e = filteredTasks();
    e.length ? (els.listView.innerHTML = `\n    <div class="list-panel">\n      <div class="list-toolbar">\n        <strong>${e.length} ${1 === e.length ? "task" : "tasks"}</strong>\n        <div class="bulk-actions">\n          <button class="button ghost" id="bulkDoneBtn" type="button" ${selectedTasks.size ? "" : "disabled"}><i data-lucide="check"></i>Done</button>\n          <button class="button ghost" id="bulkProgressBtn" type="button" ${selectedTasks.size ? "" : "disabled"}><i data-lucide="loader"></i>Progress</button>\n          <button class="button danger" id="bulkDeleteBtn" type="button" ${selectedTasks.size ? "" : "disabled"}><i data-lucide="trash-2"></i>Delete</button>\n        </div>\n      </div>\n      <div class="table-wrap">\n        <table>\n          <thead>\n            <tr>\n              <th>Select</th>\n              <th>Task</th>\n              <th>Project</th>\n              <th>Status</th>\n              <th>Priority</th>\n              <th>Due</th>\n              <th>Tags</th>\n              <th>Edit</th>\n            </tr>\n          </thead>\n          <tbody>\n            ${e.map(renderTaskRow).join("")}\n          </tbody>\n        </table>\n      </div>\n    </div>\n  `,
    els.listView.querySelectorAll("[data-select-task]").forEach(e => {
        e.addEventListener("change", () => {
            e.checked ? selectedTasks.add(e.dataset.selectTask) : selectedTasks.delete(e.dataset.selectTask),
            renderList(),
            refreshIcons()
        }
        )
    }
    ),
    els.listView.querySelectorAll("[data-row-action='edit']").forEach(e => {
        e.addEventListener("click", () => openTaskDialog(e.dataset.taskId))
    }
    ),
    bindTaskCardActions(els.listView),
    document.getElementById("bulkDoneBtn")?.addEventListener("click", () => bulkStatus("done")),
    document.getElementById("bulkProgressBtn")?.addEventListener("click", () => bulkStatus("progress")),
    document.getElementById("bulkDeleteBtn")?.addEventListener("click", bulkDelete)) : els.listView.innerHTML = renderEmptyWorkspace("No tasks match these filters", "Try clearing a filter or capturing a new task.")
}
function renderTaskRow(e) {
    const t = statuses.find(t => t.id === e.status)
      , n = "done" === e.status;
    return `\n    <tr>\n      <td>\n        <input type="checkbox" data-select-task="${e.id}" ${selectedTasks.has(e.id) ? "checked" : ""} aria-label="Select ${escapeAttr(e.title)}" />\n      </td>\n      <td>\n        <div class="row-title">\n          <button class="row-check ${n ? "task-check done" : ""}" type="button" data-task-id="${e.id}" data-action="toggle" aria-label="${n ? "Reopen task" : "Complete task"}">\n            <i data-lucide="${n ? "check" : "circle"}"></i>\n          </button>\n          <div>\n            <strong>${escapeHtml(e.title)}</strong>\n            <small>${escapeHtml(displayNotes(e) || "No notes")}</small>\n          </div>\n        </div>\n      </td>\n      <td>${escapeHtml(e.project || "Inbox")}</td>\n      <td><span class="chip"><i data-lucide="${t?.icon || "circle"}"></i>${escapeHtml(t?.label || e.status)}</span></td>\n      <td><span class="priority-chip priority-${e.priority}">${escapeHtml(priorityLabels[e.priority] || e.priority)}</span></td>\n      <td>\n        ${e.dueDate ? `<span class="due-chip ${getDueClass(e)}">${formatDueLabel(e)}</span>` : '<span class="due-chip">No date</span>'}\n        ${e.plannedDate ? `<span class="energy-chip">Plan ${escapeHtml(formatPlannedWorkLabel(e))}</span>` : ""}\n      </td>\n      <td>${e.tags.map(e => `<span class="tag">#${escapeHtml(e)}</span>`).join(" ") || '<span class="chip">None</span>'}</td>\n      <td><button class="chip-button" type="button" data-row-action="edit" data-task-id="${e.id}" aria-label="Edit ${escapeAttr(e.title)}"><i data-lucide="pencil"></i></button></td>\n    </tr>\n  `
}
function renderCalendar() {
    const e = startOfMonth(calendarCursor)
      , t = startOfWeek(e)
      , n = Array.from({
        length: 42
    }, (e, n) => addDays(t, n))
      , a = groupTasksByDueDate(filteredTasks())
      , s = groupMeetingsByDate(filteredMeetingsForCalendar());
    els.calendarView.innerHTML = `\n    <div class="calendar-panel">\n      <div class="calendar-head">\n        <h2>${e.toLocaleDateString(userLocale(), {
        month: "long",
        year: "numeric"
    })}</h2>\n        <div class="calendar-controls">\n          <button class="icon-button" id="prevMonthBtn" type="button" aria-label="Previous month"><i data-lucide="chevron-left"></i></button>\n          <button class="button ghost" id="todayMonthBtn" type="button">Today</button>\n          <button class="icon-button" id="nextMonthBtn" type="button" aria-label="Next month"><i data-lucide="chevron-right"></i></button>\n        </div>\n      </div>\n      <div class="calendar-grid">\n        ${localizedWeekdays().map(e => `<div class="weekday">${escapeHtml(e)}</div>`).join("")}\n        ${n.map(t => renderCalendarDay(t, e, a, s)).join("")}\n      </div>\n    </div>\n  `,
    document.getElementById("prevMonthBtn").addEventListener("click", () => {
        calendarCursor = addMonths(calendarCursor, -1),
        renderCalendar(),
        refreshIcons()
    }
    ),
    document.getElementById("nextMonthBtn").addEventListener("click", () => {
        calendarCursor = addMonths(calendarCursor, 1),
        renderCalendar(),
        refreshIcons()
    }
    ),
    document.getElementById("todayMonthBtn").addEventListener("click", () => {
        calendarCursor = startOfMonth(new Date),
        renderCalendar(),
        refreshIcons()
    }
    ),
    els.calendarView.querySelectorAll("[data-calendar-task]").forEach(e => {
        e.addEventListener("click", () => openTaskDialog(e.dataset.calendarTask))
    }
    ),
    els.calendarView.querySelectorAll("[data-calendar-meeting]").forEach(e => {
        e.addEventListener("click", () => openMeetingDialog(e.dataset.calendarMeeting))
    }
    )
}
function renderCalendarDay(e, t, n, a) {
    const s = toISODate(e)
      , i = n.get(s) || []
      , o = a.get(s) || []
      , r = o.length + i.length;
    return `\n    <div class="calendar-day ${e.getMonth() !== t.getMonth() ? "outside" : ""} ${s === todayISO() ? "today" : ""}">\n      <span class="day-number">${e.getDate()}</span>\n      ${o.slice(0, 3).map(e => `<button class="calendar-task meeting-calendar-chip meeting-${e.status}" type="button" data-calendar-meeting="${e.id}" title="${escapeAttr(e.title)}">${escapeHtml(formatMeetingTime(e))} ${escapeHtml(e.title)}</button>`).join("")}\n      ${i.slice(0, Math.max(0, 4 - o.length)).map(e => `<button class="calendar-task priority-${e.priority}" type="button" data-calendar-task="${e.id}" title="${escapeAttr(e.title)}">${escapeHtml(formatTaskCalendarLabel(e, s))}</button>`).join("")}\n      ${r > 4 ? `<span class="chip">+${r - 4} more</span>` : ""}\n    </div>\n  `
}
function renderUnified() {
    "unified" === state.view && renderedWorkspaceViews.has("unified") && document.body.classList.add("quiet-view-motion");
    const e = filteredTasks()
      , t = sortTasks(e.filter(e => "done" !== e.status), "priority")
      , n = e.filter(e => "done" === e.status)
      , a = todayISO()
      , s = unifiedTodayItems(t.filter(e => e.dueDate === a || e.plannedDate === a), sortMeetings([...state.meetings]).filter(e => e.date === a && "cancelled" !== e.status))
      , i = t.slice(0, 8);
    state.focusTaskId && state.tasks.some(e => e.id === state.focusTaskId && "done" !== e.status) || (state.focusTaskId = i[0]?.id || null);
    const o = state.tasks.find(e => e.id === state.focusTaskId)
      , r = startOfWeek(new Date)
      , l = Array.from({
        length: 7
    }, (e, t) => addDays(r, t))
      , c = groupTasksByDueDate(e)
      , d = groupMeetingsByDate(filteredMeetingsForCalendar())
      , u = countBy(e, "project")
      , g = countBy(e, "status")
      , p = state.generalNotes.updatedAt ? formatSavedTime(state.generalNotes.updatedAt) : "Not saved yet"
      , m = getUnifiedLayoutItem("events").width >= 520
      , f = unifiedWeekItemLimit(getUnifiedLayoutItem("week"))
      , y = getUnifiedLayoutItem("board")
      , h = unifiedBoardDetailLevel(y)
      , k = unifiedBoardItemLimit(y, h)
      , S = {
        focus: renderUnifiedWindow("focus", "Focus now", "timer", o ? priorityLabels[o.priority] : "Ready", `\n        <div class="unified-focus">\n          <div class="unified-timer">\n            <strong id="unifiedTimerText">${formatTimer(timer.remaining)}</strong>\n            <span>${o ? escapeHtml(o.title) : "Choose a task to begin"}</span>\n          </div>\n          <div class="focus-actions unified-focus-actions">\n            <button class="button primary" type="button" data-unified-action="focus-start" ${o ? "" : "disabled"}><i data-lucide="${timer.running ? "pause" : "play"}"></i>${timer.running ? "Pause" : "Start"}</button>\n            <button class="button ghost" type="button" data-unified-action="focus-reset"><i data-lucide="rotate-ccw"></i>Reset</button>\n            <button class="button primary" type="button" data-unified-action="focus-done" ${o ? "" : "disabled"}><i data-lucide="check"></i>Done</button>\n          </div>\n          <div class="unified-focus-list">\n            ${i.length ? i.slice(0, 5).map(renderUnifiedFocusTask).join("") : renderMiniEmpty("No focus tasks")}\n          </div>\n        </div>\n      `),
        board: renderUnifiedWindow("board", "Board snapshot", "kanban", `${t.length} active`, `\n        <div class="unified-lanes">\n          ${statuses.map(t => {
            const n = e.filter(e => e.status === t.id)
              , a = n.slice(0, k)
              , s = Math.max(0, n.length - a.length);
            return `\n                <div class="unified-lane detail-${h}" data-unified-status="${t.id}">\n                  <div><span class="status-dot" style="background:${t.color}"></span><strong>${escapeHtml(t.label)}</strong><em>${n.length}</em></div>\n                  ${a.length ? a.map(e => renderUnifiedTaskPill(e, h)).join("") : '<span class="unified-empty-line">Clear</span>'}\n                  ${s ? `<span class="chip">+${s} more</span>` : ""}\n                </div>\n              `
        }
        ).join("")}\n        </div>\n      `),
        week: renderUnifiedWindow("week", "Week map", "calendar-days", "Tasks + events", `<div class="unified-week">${l.map(e => renderUnifiedWeekDay(e, c, d, f)).join("")}</div>`),
        events: renderUnifiedWindow("events", "Today rail", "calendar-clock", `${s.length} items`, `<div class="unified-event-list unified-today-list">${s.length ? s.map(e => renderUnifiedTodayItem(e, m)).join("") : renderMiniEmpty("Nothing scheduled today")}</div>`),
        notes: renderUnifiedWindow("notes", "General notes", "sticky-note", p, `${renderGeneralNotesTabs()}\n      <textarea id="unifiedNotesInput" class="unified-notes-input" rows="8" maxlength="5000" placeholder="Scratchpad for anything that does not deserve a task yet.">${escapeHtml(getActiveGeneralNoteTab().content)}</textarea>`, "unified-notes-window"),
        signals: renderUnifiedWindow("signals", "Signals", "bar-chart-3", `${n.length} done`, `\n        <div class="unified-insights">\n          <div class="insight"><strong>${e.length ? Math.round(n.length / e.length * 100) : 0}%</strong><span>completion</span></div>\n          <div class="insight"><strong>${Object.keys(u).length}</strong><span>projects</span></div>\n          <div class="insight"><strong>${state.meetings.length}</strong><span>events</span></div>\n          <div class="insight"><strong>${state.pendingSyncIds.size + state.pendingMeetingSyncIds.size}</strong><span>sync queue</span></div>\n        </div>\n        <div class="unified-bars">\n          ${renderBars(g, Math.max(1, e.length), "status")}\n        </div>\n      `),
        stack: renderUnifiedWindow("stack", "Priority stack", "list-checks", `${t.length} tasks`, `<div class="unified-task-stack">${t.length ? t.slice(0, 4).map(renderTaskCard).join("") : renderMiniEmpty("No active tasks")}</div>`)
    };
    els.unifiedView.innerHTML = `\n    <div class="unified-dashboard" style="--unified-canvas-height:${unifiedCanvasHeight()}px">\n      ${normalizeUnifiedLayout(state.unifiedLayout).filter(e => !e.hidden).map(e => S[e.id] || "").join("")}\n    </div>\n  `,
    bindUnifiedActions(),
    bindTaskCardActions(els.unifiedView),
    bindGeneralNotesTabs(els.unifiedView)
}
function fitUnifiedWindowsToDashboard() {
    const e = els.unifiedView?.querySelector(".unified-dashboard");
    if (!e || window.matchMedia?.("(max-width: 820px)").matches)
        return;
    const t = Math.max(260, e.clientWidth);
    let n = !1;
    const a = normalizeUnifiedLayout(state.unifiedLayout).map(e => {
        const a = clampUnifiedRect(e, t);
        return Math.round(a.x) === Math.round(e.x) && Math.round(a.y) === Math.round(e.y) && Math.round(a.width) === Math.round(e.width) && Math.round(a.height) === Math.round(e.height) || (n = !0),
        a
    }
    );
    n && (state.unifiedLayout = a,
    saveUnifiedLayout({
        quiet: !0
    }),
    renderUnified())
}
function renderUnifiedWindow(e, t, n, a, s, i="") {
    const o = getUnifiedLayoutItem(e);
    return `\n    <section\n      class="unified-window unified-window-${escapeAttr(e)} ${o.width >= 520 ? "is-wide" : ""} ${i}"\n      style="${unifiedWindowInlineStyle(o)}"\n      data-unified-window="${escapeAttr(e)}"\n      data-window-x="${Math.round(o.x)}"\n      data-window-y="${Math.round(o.y)}"\n      data-window-width="${Math.round(o.width)}"\n      data-window-height="${Math.round(o.height)}"\n    >\n      ${renderUnifiedChrome(e, t, n, a)}\n      <div class="unified-window-body">\n        ${s}\n      </div>\n      ${renderUnifiedResizeHandles(e)}\n    </section>\n  `
}
function renderUnifiedChrome(e, t, n, a="") {
    return `\n    <div class="unified-window-chrome" data-unified-drag-handle="${escapeAttr(e)}" title="Drag to move this window">\n      <strong><i data-lucide="${n}"></i>${escapeHtml(t)}</strong>\n      <i class="window-grip" data-lucide="grip-horizontal" aria-hidden="true"></i>\n      ${a ? `<small>${escapeHtml(a)}</small>` : ""}\n      <button class="unified-window-close" type="button" data-unified-close="${escapeAttr(e)}" title="Close window" aria-label="Close ${escapeAttr(t)} window"><i data-lucide="x"></i></button>\n    </div>\n  `
}
function renderUnifiedResizeHandles(e) {
    return ["n", "e", "s", "w", "ne", "nw", "se", "sw"].map(t => `<span class="unified-resize-handle handle-${t}" data-unified-resize-handle="${t}" data-window-id="${escapeAttr(e)}" aria-hidden="true"></span>`).join("")
}
function renderUnifiedFocusTask(e) {
    return `\n    <button class="unified-focus-task ${e.id === state.focusTaskId ? "active" : ""}" type="button" data-unified-focus-task="${e.id}">\n      <span>${escapeHtml(e.title)}</span>\n      <small>${escapeHtml(e.dueDate ? formatDueLabel(e) : e.project || "Inbox")}</small>\n    </button>\n  `
}
function renderUnifiedPresetControls(e="") {
    const t = unifiedPresetOptions()
      , n = normalizeUnifiedLayout(state.unifiedLayout)
      , a = {
        focus: {
            label: "Focus",
            icon: "timer"
        },
        board: {
            label: "Board",
            icon: "kanban"
        },
        week: {
            label: "Week map",
            icon: "calendar-days"
        },
        events: {
            label: "Today rail",
            icon: "calendar-clock"
        },
        notes: {
            label: "Notes",
            icon: "sticky-note"
        },
        signals: {
            label: "Signals",
            icon: "bar-chart-3"
        },
        stack: {
            label: "Priority stack",
            icon: "list-checks"
        }
    };
    return `\n    <div class="unified-preset-bar ${e ? `is-${escapeAttr(e)}` : ""}">\n      <label>\n        <select id="unifiedPresetSelect" aria-label="Saved Workspace views">\n          ${t.map(e => `<option value="${escapeAttr(e.id)}">${escapeHtml(e.name)}</option>`).join("")}\n        </select>\n      </label>\n      <div>\n        <button class="button ghost" type="button" data-unified-action="preset-apply"><i data-lucide="panel-top-open"></i>Apply</button>\n        <button class="button ghost" type="button" data-unified-action="preset-save"><i data-lucide="save"></i>Save view</button>\n        <button class="button ghost" type="button" data-unified-action="preset-delete"><i data-lucide="trash-2"></i>Delete</button>\n        <button class="button ghost" type="button" data-unified-action="preset-reset"><i data-lucide="rotate-ccw"></i>Reset</button>\n      </div>\n      <div class="unified-window-manager" aria-label="Workspace windows">\n        <span>Windows</span>\n        ${n.map(e => {
        const t = a[e.id] || {
            label: e.id,
            icon: "panel-top"
        };
        return `\n              <button class="button ghost unified-window-toggle ${e.hidden ? "" : "active"}" type="button" data-unified-window-toggle="${escapeAttr(e.id)}" title="${e.hidden ? "Show" : "Hide"} ${escapeAttr(t.label)}">\n                <i data-lucide="${t.icon}"></i>\n                ${escapeHtml(t.label)}\n              </button>\n            `
    }
    ).join("")}\n      </div>\n    </div>\n  `
}
function unifiedBoardDetailLevel(e) {
    const t = Number(e?.height || unifiedWindowDefaults.find(e => "board" === e.id)?.height || 460)
      , n = Number(e?.width || unifiedWindowDefaults.find(e => "board" === e.id)?.width || 500);
    return t >= 500 && n >= 420 ? 3 : t >= 380 && n >= 340 ? 2 : t >= 280 ? 1 : 0
}
function unifiedBoardItemLimit(e, t=unifiedBoardDetailLevel(e)) {
    const n = Number(e?.height || unifiedWindowDefaults.find(e => "board" === e.id)?.height || 460)
      , a = [58, 66, 86, 108][t] || 70;
    return Math.round(clampNumber(Math.floor((n - 110) / a), 2, 10, 3))
}
function renderUnifiedTaskPill(e, t=0) {
    const n = displayNotes(e)
      , a = e.subtasks.length
      , s = e.subtasks.filter(e => e.done).length
      , i = [e.project || "Inbox", e.plannedDate ? `Plan ${formatPlannedWorkLabel(e)}` : "", e.dueDate ? formatDueLabel(e) : "No date", e.estimate ? `${e.estimate}m` : ""].filter(Boolean)
      , o = e.tags.slice(0, 3)
      , r = e.subtasks.slice(0, t >= 3 ? 3 : 2);
    return `\n    <button class="unified-task-pill priority-${e.priority} detail-${t}" type="button" draggable="true" data-unified-task="${e.id}" data-task-id="${e.id}" title="${escapeAttr(e.title)}">\n      <span>${escapeHtml(e.title)}</span>\n      ${t >= 0 ? `<small>${escapeHtml(e.dueDate ? formatDueLabel(e) : e.project || "Inbox")}</small>` : ""}\n      ${t >= 1 ? `<div class="unified-task-meta">\n              ${i.map(e => `<em>${escapeHtml(e)}</em>`).join("")}\n              <em>${escapeHtml(priorityLabels[e.priority] || e.priority)}</em>\n            </div>` : ""}\n      ${t >= 2 && n ? `<p>${escapeHtml(n)}</p>` : ""}\n      ${t >= 2 && r.length ? `<ul class="unified-task-steps">\n              ${r.map(e => `<li class="${e.done ? "done" : ""}">${escapeHtml(e.text)}</li>`).join("")}\n            </ul>` : ""}\n      ${t >= 3 ? `<div class="unified-task-extras">\n              ${o.map(e => `<b>#${escapeHtml(e)}</b>`).join("")}\n              ${a ? `<b>${s}/${a} steps</b>` : ""}\n            </div>` : ""}\n    </button>\n  `
}
function unifiedWeekItemLimit(e) {
    const t = Number(e?.height || unifiedWindowDefaults.find(e => "week" === e.id)?.height || 460);
    return Math.round(clampNumber(Math.floor((t - 178) / 30), 4, 16, 6))
}
function renderUnifiedWeekDay(e, t, n, a=6) {
    const s = toISODate(e)
      , i = t.get(s) || []
      , o = n.get(s) || []
      , r = s === todayISO()
      , l = Math.min(o.length, Math.max(2, a - Math.min(2, i.length)))
      , c = Math.max(0, a - l)
      , d = Math.max(0, o.length + i.length - l - c);
    return `\n    <article class="unified-day ${r ? "today" : ""}">\n      <div>\n        <span>${escapeHtml(e.toLocaleDateString(userLocale(), {
        weekday: "short"
    }))}</span>\n        <strong>${e.getDate()}</strong>\n      </div>\n      ${o.slice(0, l).map(e => `<button class="unified-day-chip event" type="button" data-unified-meeting="${e.id}">${escapeHtml(formatMeetingTime(e))} ${escapeHtml(e.title)}</button>`).join("")}\n      ${i.slice(0, c).map(e => `<button class="unified-day-chip task priority-${e.priority}" type="button" data-unified-task="${e.id}">${escapeHtml(formatTaskCalendarLabel(e, s))}</button>`).join("")}\n      ${d ? `<span class="chip">+${d} more</span>` : ""}\n    </article>\n  `
}
function unifiedTodayItems(e, t) {
    const n = e.map(e => ({
        type: "task",
        sort: e.plannedStart || e.dueTime || "99:99",
        task: e
    }));
    return [...t.map(e => ({
        type: "event",
        sort: e.startTime || "99:99",
        meeting: e
    })), ...n].sort( (e, t) => e.sort.localeCompare(t.sort) || e.type.localeCompare(t.type))
}
function renderUnifiedTodayItem(e, t=!1) {
    if ("event" === e.type)
        return renderUnifiedMeetingItem(e.meeting, t);
    const n = e.task
      , a = displayNotes(n)
      , s = n.plannedDate === todayISO() ? formatPlannedWorkLabel(n) : n.dueDate ? formatDueLabel(n) : "Today"
      , i = n.subtasks.slice(0, t ? 3 : 2);
    return `\n    <article class="unified-event-item unified-today-task priority-${n.priority} ${t ? "show-notes" : ""}">\n      <button class="plain-task" type="button" data-unified-task="${n.id}">\n        <strong>${escapeHtml(n.title)}</strong>\n        <span>${escapeHtml(s)}</span>\n      </button>\n      ${t && (a || i.length) ? `<div class="unified-event-note">\n              ${a ? `<p>${escapeHtml(a)}</p>` : ""}\n              ${i.length ? `<ul>${i.map(e => `<li>${escapeHtml(e.text)}</li>`).join("")}</ul>` : ""}\n            </div>` : ""}\n      <div>\n        <span class="chip project-chip">${escapeHtml(n.project || "Inbox")}</span>\n        <span class="priority-chip priority-${n.priority}">${escapeHtml(priorityLabels[n.priority] || n.priority)}</span>\n      </div>\n    </article>\n  `
}
function renderUnifiedMeetingItem(e, t=!1) {
    const n = String(e.notes || e.topic || "").trim();
    return `\n    <article class="unified-event-item ${isCurrentMeeting(e) ? "current" : ""} ${t ? "show-notes" : ""}">\n      <button class="plain-task" type="button" data-unified-meeting="${e.id}">\n        <strong>${escapeHtml(e.title)}</strong>\n        <span>${escapeHtml(formatMeetingDateTime(e))}</span>\n      </button>\n      ${t ? `<textarea class="unified-event-note-input" data-meeting-note="${escapeAttr(e.id)}" rows="2" maxlength="500" placeholder="Small notes..." aria-label="Event notes for ${escapeAttr(e.title)}">${escapeHtml(n)}</textarea>` : ""}\n      <div>\n        <span class="chip project-chip">${escapeHtml(e.subject || "Events")}</span>\n        <button class="chip-button" type="button" data-unified-meeting-task="${e.id}" title="Create task from event" aria-label="Create task from event"><i data-lucide="list-plus"></i></button>\n      </div>\n    </article>\n  `
}
function renderMiniEmpty(e) {
    return `<div class="unified-mini-empty">${escapeHtml(e)}</div>`
}
function bindUnifiedActions() {
    els.unifiedView.querySelectorAll("[data-unified-window]").forEach(e => {
        e.addEventListener("pointerdown", t => {
            if (t.target.closest("button, textarea, input, select, a, [data-unified-resize-handle], [data-unified-drag-handle]"))
                return;
            const n = bringUnifiedWindowForward(e.dataset.unifiedWindow);
            applyUnifiedWindowStyle(e, n)
        }
        ),
        e.querySelector("[data-unified-drag-handle]")?.addEventListener("pointerdown", e => {
            startUnifiedWindowPointer(e, "move")
        }
        ),
        e.querySelectorAll("[data-unified-resize-handle]").forEach(e => {
            e.addEventListener("pointerdown", t => {
                startUnifiedWindowPointer(t, e.dataset.unifiedResizeHandle)
            }
            )
        }
        )
    }
    ),
    els.unifiedView.querySelectorAll("[data-unified-close]").forEach(e => {
        e.addEventListener("click", t => {
            t.stopPropagation(),
            closeUnifiedWindow(e.dataset.unifiedClose)
        }
        )
    }
    ),
    bindUnifiedActionButtons(els.unifiedView),
    els.unifiedView.querySelectorAll("[data-unified-task]").forEach(e => {
        e.addEventListener("click", () => openTaskDialog(e.dataset.unifiedTask))
    }
    ),
    bindUnifiedBoardDragDrop(),
    els.unifiedView.querySelectorAll("[data-unified-meeting]").forEach(e => {
        e.addEventListener("click", () => openMeetingDialog(e.dataset.unifiedMeeting))
    }
    ),
    els.unifiedView.querySelectorAll("[data-unified-meeting-task]").forEach(e => {
        e.addEventListener("click", () => createTaskFromMeeting(e.dataset.unifiedMeetingTask))
    }
    ),
    els.unifiedView.querySelectorAll("[data-meeting-note]").forEach(e => {
        e.addEventListener("input", handleMeetingCardNotesInput)
    }
    ),
    els.unifiedView.querySelectorAll("[data-unified-focus-task]").forEach(e => {
        e.addEventListener("click", () => {
            state.focusTaskId = e.dataset.unifiedFocusTask,
            timer.remaining = 60 * getFocusMinutes(),
            stopTimer(),
            renderUnified(),
            refreshIcons()
        }
        )
    }
    )
}
function bindUnifiedActionButtons(e) {
    e.querySelectorAll("[data-unified-action]").forEach(e => {
        e.addEventListener("click", () => {
            const t = e.dataset.unifiedAction;
            "new-task" === t && openTaskDialog(),
            "new-event" === t && openMeetingDialog(),
            "tutorial" === t && showWelcomeTutorial(),
            "preset-save" === t && saveCurrentUnifiedPreset(),
            "preset-apply" === t && applyUnifiedPreset(document.getElementById("unifiedPresetSelect")?.value),
            "preset-delete" === t && deleteUnifiedPreset(document.getElementById("unifiedPresetSelect")?.value),
            "preset-reset" === t && resetUnifiedLayout(),
            "focus-start" === t && toggleTimer(),
            "focus-reset" === t && resetTimer(60 * getFocusMinutes()),
            "focus-done" === t && toggleComplete(state.focusTaskId)
        }
        )
    }
    ),
    e.querySelectorAll("[data-unified-window-toggle]").forEach(e => {
        e.addEventListener("click", () => toggleUnifiedWindow(e.dataset.unifiedWindowToggle))
    }
    )
}
function closeUnifiedWindow(e) {
    normalizeUnifiedLayout(state.unifiedLayout).filter(e => !e.hidden).length <= 1 ? toast("Keep at least one Workspace window open.") : (updateUnifiedWindowLayout(e, {
        hidden: !0
    }),
    renderWorkspaceToolbar(),
    renderUnified(),
    refreshIcons(),
    toast("Workspace window closed"))
}
function toggleUnifiedWindow(e) {
    const t = getUnifiedLayoutItem(e);
    t.hidden ? (updateUnifiedWindowLayout(e, {
        ...bringUnifiedWindowForward(e) || t,
        hidden: !1
    }),
    renderWorkspaceToolbar(),
    renderUnified(),
    refreshIcons(),
    toast("Workspace window reopened")) : closeUnifiedWindow(e)
}
function bindUnifiedBoardDragDrop() {
    els.unifiedView.querySelectorAll("[data-unified-task]").forEach(e => {
        e.addEventListener("dragstart", t => {
            t.dataTransfer.setData("text/plain", e.dataset.unifiedTask),
            t.dataTransfer.effectAllowed = "move",
            e.classList.add("dragging")
        }
        ),
        e.addEventListener("dragend", () => {
            e.classList.remove("dragging"),
            els.unifiedView.querySelectorAll("[data-unified-status].drag-over").forEach(e => e.classList.remove("drag-over"))
        }
        )
    }
    ),
    els.unifiedView.querySelectorAll("[data-unified-status]").forEach(e => {
        e.addEventListener("dragover", t => {
            t.preventDefault(),
            t.dataTransfer.dropEffect = "move",
            e.classList.add("drag-over")
        }
        ),
        e.addEventListener("dragleave", t => {
            e.contains(t.relatedTarget) || e.classList.remove("drag-over")
        }
        ),
        e.addEventListener("drop", t => {
            t.preventDefault(),
            e.classList.remove("drag-over"),
            updateTaskStatus(t.dataTransfer.getData("text/plain"), e.dataset.unifiedStatus)
        }
        )
    }
    )
}
function startUnifiedWindowPointer(e, t) {
    if (void 0 !== e.button && 0 !== e.button)
        return;
    if (window.matchMedia?.("(max-width: 820px)").matches)
        return;
    const n = e.currentTarget.closest("[data-unified-window]")
      , a = n?.closest(".unified-dashboard");
    if (!n || !a)
        return;
    e.preventDefault(),
    e.stopPropagation();
    const s = n.dataset.unifiedWindow
      , i = bringUnifiedWindowForward(s) || getUnifiedLayoutItem(s)
      , o = {
        x: Number(n.dataset.windowX ?? i.x),
        y: Number(n.dataset.windowY ?? i.y),
        width: Number(n.dataset.windowWidth ?? i.width),
        height: Number(n.dataset.windowHeight ?? i.height),
        z: i.z
    }
      , r = Math.max(260, a.clientWidth)
      , l = e.clientX
      , c = e.clientY;
    let d = {
        ...o
    };
    n.classList.add("move" === t ? "dragging" : "resizing"),
    applyUnifiedWindowStyle(n, d),
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const u = e => {
        const a = e.clientX - l
          , i = e.clientY - c
          , u = "move" === t ? clampUnifiedRect({
            ...o,
            x: o.x + a,
            y: o.y + i
        }, r) : resizeUnifiedRect(o, t, a, i, r);
        d = snapUnifiedRect(u, t, s, r),
        applyUnifiedWindowStyle(n, d)
    }
      , g = () => {
        window.removeEventListener("pointermove", u),
        window.removeEventListener("pointerup", g),
        window.removeEventListener("pointercancel", g),
        n.classList.remove("dragging", "resizing"),
        updateUnifiedWindowLayout(s, d),
        "events" !== s && "week" !== s && "board" !== s || (renderUnified(),
        refreshIcons())
    }
    ;
    window.addEventListener("pointermove", u),
    window.addEventListener("pointerup", g, {
        once: !0
    }),
    window.addEventListener("pointercancel", g, {
        once: !0
    })
}
function resizeUnifiedRect(e, t, n, a, s) {
    const i = {
        ...e
    }
      , o = e.x + e.width
      , r = e.y + e.height;
    return t.includes("e") && (i.width = e.width + n),
    t.includes("s") && (i.height = e.height + a),
    t.includes("w") && (i.x = e.x + n,
    i.width = e.width - n,
    i.width < 260 && (i.width = 260,
    i.x = o - i.width)),
    t.includes("n") && (i.y = e.y + a,
    i.height = e.height - a,
    i.height < 190 && (i.height = 190,
    i.y = r - i.height)),
    i.x < 0 && (i.width += i.x,
    i.x = 0),
    i.y < 0 && (i.height += i.y,
    i.y = 0),
    i.x + i.width > s && (i.width = s - i.x),
    clampUnifiedRect(i, s)
}
function localizedWeekdays() {
    const e = new Intl.DateTimeFormat(userLocale(),{
        weekday: "short"
    })
      , t = new Date(2026,5,7);
    return Array.from({
        length: 7
    }, (n, a) => e.format(addDays(t, a)))
}
function meetingStartDateTime(e) {
    const t = parseISODate(e.date)
      , [n,a] = isValidTime(e.startTime) ? e.startTime.split(":").map(Number) : [0, 0];
    return t.setHours(n, a, 0, 0),
    t
}
function meetingEndDateTime(e) {
    const t = meetingStartDateTime(e)
      , n = new Date(t);
    if (isValidTime(e.endTime)) {
        const [a,s] = e.endTime.split(":").map(Number);
        return n.setHours(a, s, 0, 0),
        n < t && n.setDate(n.getDate() + 1),
        n
    }
    return n.setMinutes(n.getMinutes() + 60),
    n
}
function isCurrentMeeting(e) {
    if ("scheduled" !== e.status)
        return !1;
    const t = Date.now();
    return meetingStartDateTime(e).getTime() <= t && meetingEndDateTime(e).getTime() >= t
}
function isUpcomingMeeting(e) {
    return "scheduled" === e.status && meetingStartDateTime(e).getTime() >= Date.now()
}
function renderMeetings() {
    const e = sortMeetings([...state.meetings])
      , t = findTimelineTargetMeeting(e);
    els.meetingsView.innerHTML = `\n    <div class="meetings-toolbar">\n      <div>\n        <h2>Events</h2>\n      </div>\n      <div class="meeting-actions">\n        <button class="button ghost" id="importIcsBtn" type="button"><i data-lucide="calendar-plus"></i>Import .ics</button>\n        <input id="icsImportFile" type="file" accept=".ics,text/calendar" multiple hidden />\n        <button class="button ghost danger" id="bulkDeleteMeetingsBtn" type="button"><i data-lucide="trash-2"></i>Delete events</button>\n        <label class="timezone-control" title="Event time zone">\n          <select id="meetingTimezoneSelect" aria-label="Event time zone">\n            ${renderTimezoneOptions()}\n          </select>\n        </label>\n        <button class="button primary" id="newMeetingBtn" type="button"><i data-lucide="plus"></i>New event</button>\n      </div>\n    </div>\n    <div class="meetings-grid events-grid">\n      <section class="meetings-panel">\n        <h2>Events timeline</h2>\n        <div class="events-scroll" id="eventsScroll">\n          ${renderMeetingTimeline(e, t?.id)}\n        </div>\n      </section>\n    </div>\n  `,
    document.getElementById("newMeetingBtn")?.addEventListener("click", () => openMeetingDialog()),
    document.getElementById("importIcsBtn")?.addEventListener("click", () => document.getElementById("icsImportFile")?.click()),
    document.getElementById("bulkDeleteMeetingsBtn")?.addEventListener("click", () => els.deleteMeetingsDialog.showModal()),
    document.getElementById("meetingTimezoneSelect")?.addEventListener("change", e => setMeetingTimezone(e.target.value)),
    document.getElementById("icsImportFile")?.addEventListener("change", importIcsMeetings),
    els.meetingsView.querySelectorAll("button[data-meeting-action]").forEach(e => {
        e.addEventListener("click", () => {
            const t = e.dataset.meetingId
              , n = e.dataset.meetingAction;
            "open" === n && openMeetingDialog(t),
            "task" === n && createTaskFromMeeting(t)
        }
        )
    }
    ),
    els.meetingsView.querySelectorAll("[data-meeting-note]").forEach(e => {
        e.addEventListener("input", handleMeetingCardNotesInput)
    }
    ),
    scrollToTimelineTarget()
}
function findTimelineTargetMeeting(e) {
    return e.find(isCurrentMeeting) || e.find(isUpcomingMeeting) || e.at(-1) || null
}
function renderMeetingTimeline(e, t) {
    if (!e.length)
        return renderEmptyWorkspace("No events yet", "Create an event or import an .ics file to build your timeline.");
    const n = [];
    let a = "";
    return e.forEach(e => {
        const s = e.date;
        s !== a && (a = s,
        n.push(`<div class="meeting-day-label">${escapeHtml(formatTimelineDateLabel(s))}</div>`)),
        n.push(renderMeetingCard(e, e.id === t))
    }
    ),
    n.join("")
}
function formatTimelineDateLabel(e) {
    return e === todayISO() ? "Today" : e === addDaysISO(1) ? "Tomorrow" : formatFullDate(e)
}
function renderMeetingGroup(e, t) {
    return t.length ? `\n    <div class="meeting-group">\n      <h3>${escapeHtml(e)}</h3>\n      ${t.map(e => renderMeetingCard(e)).join("")}\n    </div>\n  ` : ""
}
function scrollToTimelineTarget() {
    window.setTimeout( () => {
        const e = document.getElementById("eventsScroll")
          , t = e?.querySelector("[data-timeline-target='true']");
        if (!e || !t)
            return;
        const n = Math.max(0, t.offsetTop - e.offsetTop - 80);
        e.scrollTo({
            top: n,
            behavior: "smooth"
        })
    }
    , 80)
}
function googleCalendarClientId() {
    return String(window.TASKFLOW_GOOGLE?.clientId || "").trim()
}
function googleCalendarBackendUrl() {
    return String(window.TASKFLOW_GOOGLE?.calendarBackendUrl || window.TASKFLOW_GOOGLE?.backendUrl || "").trim().replace(/\/$/, "")
}
function googleCalendarConfigured() {
    return Boolean(googleCalendarClientId() || googleCalendarBackendUrl())
}
function googleCalendarStorageKey(e) {
    const t = cleanToken(state.user?.id || state.user?.email || "");
    return t ? `${e}.${t}` : e
}
function getGoogleCalendarStorage(e) {
    try {
        return localStorage.getItem(googleCalendarStorageKey(e)) || localStorage.getItem(e) || ""
    } catch {
        return ""
    }
}
function setGoogleCalendarStorage(e, t) {
    try {
        localStorage.setItem(googleCalendarStorageKey(e), String(t))
    } catch {}
}
function removeGoogleCalendarStorage(e) {
    try {
        localStorage.removeItem(googleCalendarStorageKey(e)),
        localStorage.removeItem(e)
    } catch {}
}
function clearGoogleCalendarLocalState(e={}) {
    [GOOGLE_CALENDAR_AUTO_SYNC_KEY, GOOGLE_CALENDAR_CONNECTED_KEY, GOOGLE_CALENDAR_BACKEND_CONNECTED_KEY, GOOGLE_CALENDAR_SYNC_TOKEN_KEY, GOOGLE_CALENDAR_LAST_SYNC_KEY, GOOGLE_CALENDAR_PUSHED_IDS_KEY, GOOGLE_CALENDAR_LAST_STATUS_KEY, GOOGLE_CALENDAR_LAST_ERROR_KEY, GOOGLE_CALENDAR_NEXT_RETRY_KEY].forEach(removeGoogleCalendarStorage),
    !1 !== e.tokens && clearGoogleCalendarAccessTokenCache()
}
async function syncTaskFlowToGoogleCalendar(e={}) {
    if (!googleCalendarConfigured())
        return e.silent || recordSyncActivity("google", "warning", "Google Calendar setup needed", {}, {
            dedupeMs: 3e5
        }),
        void (e.silent || toast(errorText("TF-GCAL-201")));
    if (!state.isOnline)
        return e.silent || recordSyncActivity("google", "warning", "Google Calendar paused while offline", {}, {
            dedupeMs: 3e5
        }),
        void (e.silent || toast("You are offline. Connect first, then sync Google Calendar."));
    if (e.silent && googleCalendarNextRetryAt() > Date.now())
        return;
    if (googleCalendarSyncInFlight)
        return;
    const t = [els.settingsGoogleCalendarSyncBtn, els.settingsGoogleCalendarRepairBtn].filter(Boolean);
    googleCalendarSyncInFlight = !0,
    t.forEach(e => setButtonBusy(e, !0, "Syncing...")),
    updateGoogleCalendarSettingsPanel(),
    clearTimeout(generalNotesSaveTimer),
    clearTimeout(meetingNotesSaveTimer),
    clearTimeout(unifiedLayoutSaveTimer),
    clearTimeout(preferenceSyncTimer),
    saveWorkspaceLocal(new Date);
    try {
        const t = !e.silent || "manual" === e.reason
          , n = Boolean(e.full);
        recordGoogleCalendarStatus("syncing", {
            mode: n ? "full" : googleCalendarSyncToken() ? "incremental" : "full"
        }),
        e.silent && "manual" !== e.reason || recordSyncActivity("google", "info", "Google Calendar sync started"),
        e.silent || toast("Connecting Google Calendar..."),
        state.session?.access_token && (workspaceSyncPromise && await workspaceSyncPromise.catch(e => console.warn("Waiting background sync before Google Calendar failed", e)),
        await syncAllWorkspace().catch(e => console.warn("Workspace pre-sync before Google Calendar failed", e)),
        await syncUserPreferences().catch(e => console.warn("Preference pre-sync before Google Calendar failed", e)));
        const a = await getGoogleCalendarAccessToken({
            forcePrompt: Boolean(e.forcePrompt),
            silent: Boolean(e.silent),
            reason: e.reason || ""
        });
        await loadGoogleCalendarBackendSyncState(),
        e.silent || toast("Two-way syncing Google Calendar...");
        const s = await listGoogleCalendarEvents(a, {
            full: n
        })
          , i = s.events
          , o = importGoogleCalendarEvents(i, {
            incremental: s.incremental
        })
          , r = new Map(i.filter(e => "cancelled" !== e.status).map(e => [e.id, e]))
          , l = i.filter(isTaskFlowGoogleEvent)
          , c = taskFlowCalendarItems()
          , d = new Set(c.map(googleCalendarEventIdForItem))
          , u = loadGoogleCalendarPushedIds();
        let g = 0
          , p = 0
          , m = 0
          , f = 0
          , y = 0;
        for (const e of l)
            d.has(e.id) || "cancelled" === e.status || (await deleteGoogleCalendarEvent(e.id, a),
            m += 1);
        for (const e of u)
            d.has(e) || l.some(t => t.id === e) || (await deleteGoogleCalendarEvent(e, a) ? m += 1 : f += 1);
        for (const e of c) {
            const t = googleCalendarEventIdForItem(e)
              , n = buildGoogleCalendarEvent(e)
              , s = r.get(t);
            s && googleCalendarEventMatchesBody(s, n) ? y += 1 : "created" === await upsertGoogleCalendarEvent(t, n, a, Boolean(s) || u.has(t)) ? g += 1 : p += 1
        }
        o.changed && (state.meetings = sortMeetings(state.meetings.map(normalizeMeeting)),
        saveWorkspaceLocal(new Date),
        o.removedIds.length && await deleteCloudMeetings(o.removedIds).catch(e => console.warn("Cloud meeting delete failed", e)),
        state.session?.access_token && await syncAllWorkspace(),
        renderAll()),
        markGoogleCalendarConnected(),
        saveGoogleCalendarPushedIds(d),
        s.nextSyncToken && saveGoogleCalendarSyncToken(s.nextSyncToken),
        await saveGoogleCalendarBackendSyncState(s.nextSyncToken || googleCalendarSyncToken(), d).catch(e => console.warn("Google Calendar backend state save failed", e)),
        recordGoogleCalendarSyncedAt(),
        recordGoogleCalendarStatus("success", {
            mode: s.incremental ? "incremental" : "full"
        }),
        clearGoogleCalendarRetryCooldown(),
        e.enableAuto && (setGoogleCalendarStorage(GOOGLE_CALENDAR_AUTO_SYNC_KEY, "true"),
        startGoogleCalendarAutoSync()),
        t && recordSyncActivity("google", "success", "Google Calendar synced", {
            created: g,
            updated: p,
            removed: m + o.removed,
            alreadyRemoved: f,
            unchanged: y,
            imported: o.imported,
            pulledIn: o.updated,
            mode: s.incremental ? "incremental" : "full"
        }),
        e.silent || toast(`Google Calendar synced: ${g} created, ${p} updated, ${y} unchanged, ${m} removed, ${o.imported} imported${o.updated ? `, ${o.updated} pulled in` : ""}${o.removed ? `, ${o.removed} removed from TaskFlow` : ""}`)
    } catch (n) {
        console.warn("Google Calendar sync failed", n),
        recordGoogleCalendarError(n),
        recordSyncActivity("google", "error", "Google Calendar sync failed", {
            detail: String(n?.message || n || "").slice(0, 160)
        }, {
            dedupeMs: 3e5
        }),
        e.silent || toast(readableGoogleCalendarError(n)),
        isGoogleCalendarPermissionError(n) && (clearGoogleCalendarAccessTokenCache(),
        googleCalendarBackendConnected() || removeGoogleCalendarStorage(GOOGLE_CALENDAR_CONNECTED_KEY)),
        e.silent && (setGoogleCalendarRetryCooldown(isGoogleCalendarPermissionError(n) ? 60 : 15),
        isGoogleCalendarPermissionError(n) && !googleCalendarBackendConnected() && stopGoogleCalendarAutoSync())
    } finally {
        googleCalendarSyncInFlight = !1,
        t.forEach(e => setButtonBusy(e, !1)),
        updateGoogleCalendarTopButton(),
        updateGoogleCalendarSettingsPanel()
    }
}
function setButtonBusy(e, t, n="Working...") {
    e && (t ? (e.dataset.originalHtml = e.innerHTML,
    e.disabled = !0,
    e.innerHTML = `<i data-lucide="loader"></i>${escapeHtml(n)}`) : (e.disabled = !1,
    e.dataset.originalHtml && (e.innerHTML = e.dataset.originalHtml),
    delete e.dataset.originalHtml),
    refreshIcons())
}
function googleCalendarAutoSyncEnabled() {
    return "true" === getGoogleCalendarStorage(GOOGLE_CALENDAR_AUTO_SYNC_KEY)
}
function googleCalendarConnected() {
    return "true" === getGoogleCalendarStorage(GOOGLE_CALENDAR_CONNECTED_KEY)
}
function markGoogleCalendarConnected() {
    setGoogleCalendarStorage(GOOGLE_CALENDAR_CONNECTED_KEY, "true")
}
function googleCalendarBackendConnected() {
    return "true" === getGoogleCalendarStorage(GOOGLE_CALENDAR_BACKEND_CONNECTED_KEY)
}
function markGoogleCalendarBackendConnected() {
    setGoogleCalendarStorage(GOOGLE_CALENDAR_BACKEND_CONNECTED_KEY, "true"),
    markGoogleCalendarConnected()
}
function googleCalendarNextRetryAt() {
    const e = Number(getGoogleCalendarStorage(GOOGLE_CALENDAR_NEXT_RETRY_KEY) || 0);
    return Number.isFinite(e) ? e : 0
}
function setGoogleCalendarRetryCooldown(e=15) {
    setGoogleCalendarStorage(GOOGLE_CALENDAR_NEXT_RETRY_KEY, String(Date.now() + 60 * Math.max(1, Number(e) || 15) * 1e3))
}
function clearGoogleCalendarRetryCooldown() {
    removeGoogleCalendarStorage(GOOGLE_CALENDAR_NEXT_RETRY_KEY)
}
async function repairGoogleCalendarSync() {
    clearGoogleCalendarSyncToken(),
    recordSyncActivity("google", "info", "Google Calendar repair sync started"),
    await syncTaskFlowToGoogleCalendar({
        full: !0,
        reason: "repair",
        enableAuto: !0,
        forcePrompt: !googleCalendarAccessToken && !googleCalendarConnected()
    })
}
function googleCalendarSyncToken() {
    return getGoogleCalendarStorage(GOOGLE_CALENDAR_SYNC_TOKEN_KEY) || ""
}
function saveGoogleCalendarSyncToken(e) {
    e && setGoogleCalendarStorage(GOOGLE_CALENDAR_SYNC_TOKEN_KEY, e)
}
function clearGoogleCalendarSyncToken() {
    removeGoogleCalendarStorage(GOOGLE_CALENDAR_SYNC_TOKEN_KEY)
}
function googleCalendarLastSyncedAt() {
    return getGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_SYNC_KEY) || ""
}
function recordGoogleCalendarSyncedAt(e=new Date) {
    setGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_SYNC_KEY, e.toISOString())
}
function recordGoogleCalendarStatus(e, t={}) {
    const n = {
        status: e,
        at: (new Date).toISOString(),
        ...t
    };
    setGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_STATUS_KEY, JSON.stringify(n)),
    "error" !== e && removeGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_ERROR_KEY)
}
function googleCalendarLastStatus() {
    try {
        const e = JSON.parse(getGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_STATUS_KEY) || "{}");
        return {
            status: String(e.status || ""),
            at: e.at || "",
            mode: e.mode || ""
        }
    } catch {
        return {
            status: "",
            at: "",
            mode: ""
        }
    }
}
function recordGoogleCalendarError(e) {
    const t = {
        at: (new Date).toISOString(),
        message: String(e?.message || e || "").slice(0, 240),
        status: e?.status || "",
        code: e?.taskflowCode || e?.code || ""
    };
    setGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_ERROR_KEY, JSON.stringify(t)),
    recordGoogleCalendarStatus("error", {
        code: t.code,
        statusCode: t.status
    })
}
function googleCalendarLastError() {
    try {
        return JSON.parse(getGoogleCalendarStorage(GOOGLE_CALENDAR_LAST_ERROR_KEY) || "null")
    } catch {
        return null
    }
}
function loadGoogleCalendarPushedIds() {
    try {
        const e = JSON.parse(getGoogleCalendarStorage(GOOGLE_CALENDAR_PUSHED_IDS_KEY) || "[]");
        return new Set(Array.isArray(e) ? e.filter(Boolean).map(String) : [])
    } catch {
        return new Set
    }
}
function saveGoogleCalendarPushedIds(e) {
    setGoogleCalendarStorage(GOOGLE_CALENDAR_PUSHED_IDS_KEY, JSON.stringify([...e].filter(Boolean)))
}
function applyGoogleCalendarBackendState(e={}) {
    const t = e.state || e
      , n = t.sync_token || t.syncToken || ""
      , a = Array.isArray(t.pushed_ids) ? t.pushed_ids : Array.isArray(t.pushedIds) ? t.pushedIds : [];
    return n && saveGoogleCalendarSyncToken(n),
    a.length && saveGoogleCalendarPushedIds(new Set(a)),
    Boolean(n || a.length)
}
function startGoogleCalendarAutoSync() {
    stopGoogleCalendarAutoSync(),
    googleCalendarAutoSyncEnabled() && state.session?.access_token && state.isOnline && googleCalendarConfigured() && (googleCalendarSyncTimer = window.setInterval( () => {
        syncTaskFlowToGoogleCalendar({
            silent: !0,
            reason: "auto"
        })
    }
    , 12e4),
    window.setTimeout( () => syncTaskFlowToGoogleCalendar({
        silent: !0,
        reason: "auto-start"
    }), 2500))
}
function stopGoogleCalendarAutoSync() {
    googleCalendarSyncTimer && window.clearInterval(googleCalendarSyncTimer),
    googleCalendarSyncDebounceTimer && window.clearTimeout(googleCalendarSyncDebounceTimer),
    googleCalendarSyncTimer = null,
    googleCalendarSyncDebounceTimer = null
}
function scheduleGoogleCalendarSyncSoon() {
    googleCalendarAutoSyncEnabled() && state.session?.access_token && state.isOnline && googleCalendarConfigured() && (googleCalendarSyncDebounceTimer && window.clearTimeout(googleCalendarSyncDebounceTimer),
    googleCalendarSyncDebounceTimer = window.setTimeout( () => {
        googleCalendarSyncDebounceTimer = null,
        syncTaskFlowToGoogleCalendar({
            silent: !0,
            reason: "debounced-change"
        })
    }
    , 8e3))
}
function loadGoogleIdentityScript() {
    return window.google?.accounts?.oauth2 ? Promise.resolve() : googleIdentityScriptPromise || (googleIdentityScriptPromise = new Promise( (e, t) => {
        const n = document.querySelector("script[data-taskflow-google-identity]");
        if (n)
            return n.addEventListener("load", () => e(), {
                once: !0
            }),
            void n.addEventListener("error", () => t(new Error("Could not load Google sign-in script.")), {
                once: !0
            });
        const a = document.createElement("script");
        a.src = "https://accounts.google.com/gsi/client",
        a.async = !0,
        a.defer = !0,
        a.dataset.taskflowGoogleIdentity = "true",
        a.onload = () => e(),
        a.onerror = () => t(new Error("Could not load Google sign-in script.")),
        document.head.appendChild(a)
    }
    ),
    googleIdentityScriptPromise)
}
async function getGoogleCalendarAccessToken(e={}) {
    const t = Date.now();
    if (!e.forcePrompt && googleCalendarAccessToken && googleCalendarTokenExpiresAt - t > 6e4)
        return googleCalendarAccessToken;
    const n = await getGoogleCalendarBackendAccessToken(e);
    if (n)
        return n;
    if (!e.forcePrompt) {
        const e = loadGoogleCalendarAccessTokenCache();
        if (e?.accessToken && e.expiresAt - t > 6e4)
            return googleCalendarAccessToken = e.accessToken,
            googleCalendarTokenExpiresAt = e.expiresAt,
            googleCalendarAccessToken
    }
    const a = googleCalendarClientId();
    if (!a)
        throw codedError("TF-GCAL-201");
    const s = await requestGoogleCalendarToken(a, e);
    return googleCalendarAccessToken = s.accessToken,
    googleCalendarTokenExpiresAt = Date.now() + 1e3 * Math.max(60, s.expiresIn || 3600),
    saveGoogleCalendarAccessTokenCache(googleCalendarAccessToken, googleCalendarTokenExpiresAt),
    googleCalendarAccessToken
}
async function getGoogleCalendarBackendAccessToken(e={}) {
    const t = googleCalendarBackendUrl();
    if (!t || !state.session?.access_token)
        return "";
    try {
        const n = await fetch(`${t}/token`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${state.session.access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                returnTo: googleCalendarReturnUrl()
            })
        })
          , a = await n.json().catch( () => ({}));
        if (n.ok && a?.access_token)
            return googleCalendarAccessToken = String(a.access_token),
            googleCalendarTokenExpiresAt = Date.now() + 1e3 * Math.max(60, Number(a.expires_in || 3600)),
            saveGoogleCalendarAccessTokenCache(googleCalendarAccessToken, googleCalendarTokenExpiresAt),
            markGoogleCalendarBackendConnected(),
            clearGoogleCalendarRetryCooldown(),
            googleCalendarAccessToken;
        if (404 === n.status || a?.needs_connect) {
            if (e.silent)
                throw codedError("TF-GCAL-102", "Google Calendar needs to be connected once.");
            throw await startGoogleCalendarBackendConnect(),
            codedError("TF-GCAL-102", "Opening Google Calendar connection...")
        }
        throw new Error(a?.error || a?.message || `Calendar backend returned ${n.status}`)
    } catch (n) {
        if (n?.taskflowCode)
            throw n;
        if (!googleCalendarClientId())
            throw codedError("TF-GCAL-202", "Google Calendar backend is not reachable.");
        return console.warn("Google Calendar backend unavailable, falling back to browser token flow", n),
        ""
    }
}
async function refreshGoogleCalendarBackendStatus() {
    const e = googleCalendarBackendUrl();
    if (!e || !state.session?.access_token)
        return !1;
    const t = await fetch(`${e}/status`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${state.session.access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            returnTo: googleCalendarReturnUrl()
        })
    })
      , n = await t.json().catch( () => ({}));
    return !!t.ok && (n?.connected ? (markGoogleCalendarBackendConnected(),
    applyGoogleCalendarBackendState(n),
    recordGoogleCalendarStatus("connected", {
        mode: "backend"
    }),
    updateGoogleCalendarSettingsPanel(),
    updateGoogleCalendarTopButton(),
    !0) : (removeGoogleCalendarStorage(GOOGLE_CALENDAR_BACKEND_CONNECTED_KEY),
    !1))
}
async function loadGoogleCalendarBackendSyncState() {
    const e = googleCalendarBackendUrl();
    if (!e || !state.session?.access_token || !googleCalendarBackendConnected())
        return !1;
    try {
        const t = await fetch(`${e}/calendar-state`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${state.session.access_token}`
            }
        })
          , n = await t.json().catch( () => ({}));
        return !!t.ok && applyGoogleCalendarBackendState(n)
    } catch (t) {
        return console.warn("Google Calendar backend state unavailable", t),
        !1
    }
}
async function saveGoogleCalendarBackendSyncState(e, t) {
    const n = googleCalendarBackendUrl();
    if (!n || !state.session?.access_token || !googleCalendarBackendConnected())
        return !1;
    const a = await fetch(`${n}/calendar-state`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${state.session.access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sync_token: e || "",
            pushed_ids: [...t || []].filter(Boolean)
        })
    })
      , s = await a.json().catch( () => ({}));
    if (!a.ok)
        throw new Error(s?.error || s?.message || "Calendar backend state save failed.");
    return applyGoogleCalendarBackendState(s),
    !0
}
async function startGoogleCalendarBackendConnect() {
    const e = googleCalendarBackendUrl();
    if (!e || !state.session?.access_token)
        return;
    const t = await fetch(`${e}/connect`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${state.session.access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            returnTo: googleCalendarReturnUrl()
        })
    })
      , n = await t.json().catch( () => ({}));
    if (!t.ok || !n?.url)
        throw new Error(n?.error || n?.message || "Could not start Google Calendar connection.");
    window.location.assign(n.url)
}
function googleCalendarReturnUrl() {
    const e = new URL(window.location.href);
    return e.hash = "",
    e.searchParams.set("google_calendar_backend", "connected"),
    e.toString()
}
function loadGoogleCalendarAccessTokenCache() {
    try {
        const e = JSON.parse(getGoogleCalendarStorage(GOOGLE_CALENDAR_ACCESS_TOKEN_KEY) || "null");
        return e?.accessToken && e?.expiresAt ? {
            accessToken: String(e.accessToken),
            expiresAt: Number(e.expiresAt)
        } : null
    } catch {
        return null
    }
}
function saveGoogleCalendarAccessTokenCache(e, t) {
    e && Number.isFinite(Number(t)) && localStorage.setItem(googleCalendarStorageKey(GOOGLE_CALENDAR_ACCESS_TOKEN_KEY), JSON.stringify({
        accessToken: e,
        expiresAt: Number(t),
        savedAt: (new Date).toISOString()
    }))
}
function clearGoogleCalendarAccessTokenCache() {
    googleCalendarAccessToken = "",
    googleCalendarTokenExpiresAt = 0,
    removeGoogleCalendarStorage(GOOGLE_CALENDAR_ACCESS_TOKEN_KEY)
}
async function requestGoogleCalendarToken(e, t={}) {
    return await loadGoogleIdentityScript(),
    new Promise( (n, a) => {
        window.google.accounts.oauth2.initTokenClient({
            client_id: e,
            scope: GOOGLE_CALENDAR_SCOPE,
            include_granted_scopes: !0,
            prompt: t.forcePrompt ? "consent" : "",
            callback: e => {
                e?.error ? a(new Error(e.error_description || e.error)) : e?.access_token ? n({
                    accessToken: e.access_token,
                    expiresIn: Number(e.expires_in || 3600)
                }) : a(new Error("Google did not return an access token."))
            }
            ,
            error_callback: e => a(new Error(e?.message || e?.type || "Google permission was cancelled."))
        }).requestAccessToken({
            prompt: t.forcePrompt ? "consent" : ""
        })
    }
    )
}
async function listGoogleCalendarEvents(e, t={}) {
    const n = t.full ? "" : googleCalendarSyncToken();
    if (n)
        try {
            return await requestGoogleCalendarEventList(e, {
                syncToken: n
            })
        } catch (a) {
            if (410 !== a?.status)
                throw a;
            clearGoogleCalendarSyncToken(),
            recordSyncActivity("google", "warning", "Google Calendar performed a full resync", {
                reason: "Google sync token expired"
            }, {
                dedupeMs: 3e5
            })
        }
    return requestGoogleCalendarEventList(e, {})
}
async function requestGoogleCalendarEventList(e, t={}) {
    const n = [];
    let a = "";
    do {
        const s = new URLSearchParams({
            maxResults: "2500",
            singleEvents: "true"
        });
        if (t.syncToken)
            s.set("showDeleted", "true"),
            s.set("syncToken", t.syncToken);
        else {
            const e = new Date
              , t = new Date(e.getTime() - 5184e6).toISOString()
              , n = new Date(e.getTime() + 31536e6).toISOString();
            s.set("showDeleted", "false"),
            s.set("orderBy", "startTime"),
            s.set("timeMin", t),
            s.set("timeMax", n)
        }
        a && s.set("pageToken", a);
        const i = await googleCalendarRequest(`/calendars/primary/events?${s}`, {
            method: "GET"
        }, e);
        n.push(...Array.isArray(i?.items) ? i.items : []),
        a = i?.nextPageToken || "",
        i?.nextSyncToken && (t.nextSyncToken = i.nextSyncToken)
    } while (a);
    return {
        events: n,
        incremental: Boolean(t.syncToken),
        nextSyncToken: t.nextSyncToken || ""
    }
}
function isTaskFlowGoogleEvent(e) {
    return "taskflow" === e?.extendedProperties?.private?.taskflowSource
}
function importGoogleCalendarEvents(e, t={}) {
    const n = e.filter(e => !isTaskFlowGoogleEvent(e) && "cancelled" !== e.status && googleEventStartEnd(e))
      , a = new Set(e.filter(e => !isTaskFlowGoogleEvent(e) && "cancelled" === e.status && e.id).map(e => `google:${e.id}`))
      , s = new Set(n.map(e => `google:${e.id}`))
      , i = new Map(state.meetings.filter(e => e.importedUid?.startsWith("google:")).map(e => [e.importedUid, e]))
      , o = taskFlowCalendarItems().filter(e => !("meeting" === e.kind && e.source.importedUid?.startsWith("google:")));
    let r = 0
      , l = 0
      , c = 0;
    const d = [];
    let u = !1;
    n.forEach(e => {
        const t = `google:${e.id}`
          , n = googleEventToMeeting(e);
        if (!n)
            return;
        const a = i.get(t);
        if (!o.some(e => calendarItemsOverlap({
            kind: "meeting",
            source: n
        }, e)) || a) {
            if (a) {
                const t = e.updated || "";
                if (state.pendingMeetingSyncIds.has(a.id) || a.updatedAt && t && a.updatedAt >= t)
                    return;
                return state.meetings = state.meetings.map(e => e.id === a.id ? normalizeMeeting({
                    ...n,
                    id: a.id,
                    linkedTaskIds: a.linkedTaskIds,
                    createdAt: a.createdAt
                }) : e),
                markMeetingsPending([a.id]),
                l += 1,
                void (u = !0)
            }
            allowWorkspaceChange({
                meetings: [...state.meetings, n]
            }) && (state.meetings.push(n),
            markMeetingsPending([n.id]),
            r += 1,
            u = !0)
        }
    }
    );
    const g = state.meetings.filter(e => !(e.importedUid?.startsWith("google:") && (a.has(e.importedUid) && !state.pendingMeetingSyncIds.has(e.id) || !t.incremental && meetingInGoogleSyncWindow(e) && !s.has(e.importedUid) && !state.pendingMeetingSyncIds.has(e.id)) && (d.push(e.id),
    c += 1,
    u = !0,
    1)));
    return c && (state.meetings = g),
    {
        imported: r,
        updated: l,
        removed: c,
        removedIds: d,
        changed: u
    }
}
function googleEventToMeeting(e) {
    const t = googleEventStartEnd(e);
    if (!t)
        return null;
    const n = cleanTitle(e.summary || "Google event")
      , a = `google:${e.id}`;
    return normalizeMeeting({
        id: stableMeetingId(a, t.date, t.startTime),
        seriesId: uuidFromString(a),
        title: n,
        subject: "Google Calendar",
        topic: "",
        teacher: "",
        location: e.location || "",
        date: t.date,
        startTime: t.startTime,
        endTime: t.endTime,
        recurrence: "none",
        recurrenceEndDate: "",
        notes: stripTaskFlowGoogleFooter(e.description || ""),
        status: "cancelled" === e.status ? "cancelled" : "scheduled",
        linkedTaskIds: [],
        importedUid: a,
        createdAt: e.created || (new Date).toISOString(),
        updatedAt: e.updated || (new Date).toISOString()
    })
}
function googleEventStartEnd(e) {
    const t = googleEventDateTime(e?.start);
    if (!t)
        return null;
    const n = googleEventDateTime(e?.end) || new Date(t.getTime() + 36e5);
    return {
        date: toISODate(t),
        startTime: `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`,
        endTime: `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`,
        startDate: t,
        endDate: n
    }
}
function googleEventDateTime(e={}) {
    if (e.dateTime)
        return new Date(e.dateTime);
    if (e.date) {
        const [t,n,a] = e.date.split("-").map(Number);
        return new Date(t,n - 1,a,9,0,0,0)
    }
    return null
}
function stripTaskFlowGoogleFooter(e) {
    return String(e || "").replace(/Synced from TaskFlow[\s\S]*$/i, "").trim().slice(0, 2e3)
}
function calendarItemsOverlap(e, t) {
    const n = calendarItemStartDateTime(e)
      , a = calendarItemEndDateTime(e)
      , s = calendarItemStartDateTime(t)
      , i = calendarItemEndDateTime(t);
    return !!(n && a && s && i) && n < i && s < a
}
function meetingInGoogleSyncWindow(e) {
    const t = parseISODate(e.date)
      , n = new Date
      , a = addDays(n, -60)
      , s = addDays(n, 365);
    return t >= a && t <= s
}
async function googleCalendarRequest(e, t={}, n) {
    const a = {
        Authorization: `Bearer ${n}`,
        ...t.body ? {
            "Content-Type": "application/json"
        } : {},
        ...t.headers || {}
    }
      , s = await fetch(`${GOOGLE_CALENDAR_API}${e}`, {
        ...t,
        headers: a
    });
    if (204 === s.status)
        return null;
    const i = await s.json().catch( () => null);
    if (!s.ok) {
        const e = new Error(i?.error?.message || `Google Calendar returned ${s.status}`);
        throw e.status = s.status,
        e.details = i,
        e
    }
    return i
}
function googleCalendarEventMatchesBody(e={}, t={}) {
    return googleCalendarEventFingerprint(e) === googleCalendarBodyFingerprint(t)
}
function googleCalendarEventFingerprint(e={}) {
    return JSON.stringify({
        summary: e.summary || "",
        location: e.location || "",
        description: e.description || "",
        start: {
            dateTime: normalizeGoogleDateTime(e.start?.dateTime || ""),
            date: e.start?.date || "",
            timeZone: e.start?.timeZone || ""
        },
        end: {
            dateTime: normalizeGoogleDateTime(e.end?.dateTime || ""),
            date: e.end?.date || "",
            timeZone: e.end?.timeZone || ""
        },
        private: e.extendedProperties?.private || {}
    })
}
function googleCalendarBodyFingerprint(e={}) {
    return JSON.stringify({
        summary: e.summary || "",
        location: e.location || "",
        description: e.description || "",
        start: {
            dateTime: normalizeGoogleDateTime(e.start?.dateTime || ""),
            date: e.start?.date || "",
            timeZone: e.start?.timeZone || ""
        },
        end: {
            dateTime: normalizeGoogleDateTime(e.end?.dateTime || ""),
            date: e.end?.date || "",
            timeZone: e.end?.timeZone || ""
        },
        private: e.extendedProperties?.private || {}
    })
}
function normalizeGoogleDateTime(e) {
    return String(e || "").replace(/(?:\.000)?(?:Z|[+-]\d{2}:?\d{2})$/, "")
}
async function upsertGoogleCalendarEvent(e, t, n, a=!1) {
    const s = `/calendars/primary/events/${encodeURIComponent(e)}?sendUpdates=none`;
    if (a)
        try {
            return await googleCalendarRequest(s, {
                method: "PUT",
                body: JSON.stringify(t)
            }, n),
            "updated"
        } catch (i) {
            if (![404, 410].includes(i?.status))
                throw i
        }
    try {
        return await googleCalendarRequest("/calendars/primary/events?sendUpdates=none", {
            method: "POST",
            body: JSON.stringify(t)
        }, n),
        "created"
    } catch (i) {
        if (![409, 410].includes(i?.status) && !String(i?.message || "").toLowerCase().includes("already exists"))
            throw i;
        return await googleCalendarRequest(s, {
            method: "PUT",
            body: JSON.stringify(t)
        }, n),
        "updated"
    }
}
async function deleteGoogleCalendarEvent(e, t) {
    try {
        return await googleCalendarRequest(`/calendars/primary/events/${encodeURIComponent(e)}?sendUpdates=none`, {
            method: "DELETE"
        }, t),
        !0
    } catch (n) {
        if ([404, 410].includes(n?.status))
            return !1;
        throw n
    }
}
function taskFlowCalendarItems() {
    return [...sortMeetings(state.meetings.map(normalizeMeeting)).filter(e => "cancelled" !== e.status).map(e => ({
        kind: "meeting",
        source: e
    })), ...state.tasks.map(normalizeTask).filter(e => "done" !== e.status).filter(e => taskGoogleStartDateTime(e)).map(e => ({
        kind: "task",
        source: e
    }))]
}
function buildGoogleCalendarEvent(e) {
    const t = normalizeCalendarItem(e)
      , n = calendarItemStartDateTime(t)
      , a = calendarItemEndDateTime(t)
      , s = t.source;
    return {
        id: googleCalendarEventIdForItem(t),
        summary: "task" === t.kind ? `Task: ${s.title}` : s.title,
        location: "meeting" === t.kind && s.location || void 0,
        description: googleCalendarDescription(t),
        start: {
            dateTime: formatGoogleLocalDateTime(n),
            timeZone: state.meetingTimezone
        },
        end: {
            dateTime: formatGoogleLocalDateTime(a),
            timeZone: state.meetingTimezone
        },
        status: "confirmed",
        extendedProperties: {
            private: {
                taskflowSource: "taskflow",
                taskflowKind: t.kind,
                taskflowMeetingId: "meeting" === t.kind ? s.id : "",
                taskflowTaskId: "task" === t.kind ? s.id : "",
                taskflowSeriesId: "meeting" === t.kind && s.seriesId || "",
                taskflowUpdatedAt: s.updatedAt || ""
            }
        }
    }
}
function normalizeCalendarItem(e) {
    return "task" === e?.kind ? {
        kind: "task",
        source: normalizeTask(e.source)
    } : "meeting" === e?.kind ? {
        kind: "meeting",
        source: normalizeMeeting(e.source)
    } : {
        kind: "meeting",
        source: normalizeMeeting(e)
    }
}
function googleCalendarEventIdForItem(e) {
    const t = normalizeCalendarItem(e);
    return "meeting" === t.kind && t.source.importedUid?.startsWith("google:") ? t.source.importedUid.slice(7) : googleCalendarInsertIdForItem(t)
}
function googleCalendarInsertIdForItem(e) {
    const t = normalizeCalendarItem(e)
      , n = t.source
      , a = "task" === t.kind ? n.id : n.id || stableMeetingId(n.seriesId, n.date, n.startTime)
      , s = "task" === t.kind ? "tftask" : "tf"
      , i = String(a).toLowerCase().replace(/[^a-f0-9]/g, "").slice(0, 40)
      , o = uuidFromString("task" === t.kind ? `${n.id}-${n.plannedDate || n.dueDate}-${n.plannedStart || n.dueTime}` : meetingOccurrenceKey(n)).replace(/[^a-f0-9]/g, "").slice(0, 32);
    return `${s}${i || o}`
}
function taskFlowGoogleEventId(e) {
    const t = normalizeMeeting(e)
      , n = t.id || stableMeetingId(t.seriesId, t.date, t.startTime)
      , a = String(n).toLowerCase().replace(/[^a-f0-9]/g, "").slice(0, 40)
      , s = uuidFromString(meetingOccurrenceKey(t)).replace(/[^a-f0-9]/g, "").slice(0, 32);
    return `tf${a || s}`
}
function googleCalendarDescription(e) {
    const t = normalizeCalendarItem(e)
      , n = t.source;
    return "task" === t.kind ? [n.project ? `Project: ${n.project}` : "", n.priority ? `Priority: ${priorityLabels[n.priority] || n.priority}` : "", n.estimate ? `Estimate: ${n.estimate}m` : "", displayNotes(n) ? `Notes: ${displayNotes(n)}` : "", n.subtasks.length ? `Steps:\n${n.subtasks.map(e => `- ${e.done ? "[x]" : "[ ]"} ${e.text}`).join("\n")}` : "", "Synced from TaskFlow. TaskFlow is the source of truth for this task."].filter(Boolean).join("\n\n") : [n.subject ? `Category: ${n.subject}` : "", n.topic ? `Topic: ${n.topic}` : "", n.teacher ? `Host: ${n.teacher}` : "", n.notes ? `Notes: ${n.notes}` : "", "Synced from TaskFlow. TaskFlow is the source of truth for this event."].filter(Boolean).join("\n\n")
}
function calendarItemStartDateTime(e) {
    const t = normalizeCalendarItem(e);
    return "task" === t.kind ? taskGoogleStartDateTime(t.source) : meetingStartDateTime(t.source)
}
function calendarItemEndDateTime(e) {
    const t = normalizeCalendarItem(e);
    if ("meeting" === t.kind)
        return meetingEndDateTime(t.source);
    const n = t.source
      , a = taskGoogleStartDateTime(n)
      , s = new Date(a);
    if (n.plannedDate && isValidTime(n.plannedEnd)) {
        const [e,t] = n.plannedEnd.split(":").map(Number);
        if (s.setHours(e, t, 0, 0),
        s > a)
            return s
    }
    return s.setMinutes(s.getMinutes() + Math.max(15, Number(n.estimate || 30))),
    s
}
function taskGoogleStartDateTime(e) {
    const t = normalizeTask(e);
    return t.plannedDate && isValidTime(t.plannedStart) ? taskDateTime(t.plannedDate, t.plannedStart) : t.dueDate && isValidTime(t.dueTime) ? taskDateTime(t.dueDate, t.dueTime) : null
}
function formatGoogleLocalDateTime(e) {
    return `${toISODate(e)}T${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}:00`
}
function readableGoogleCalendarError(e) {
    const t = String(e?.message || e || "Something went wrong.");
    return t.toLowerCase().includes("access_denied") || t.toLowerCase().includes("cancel") ? errorText("TF-GCAL-101", "No changes were made.") : t.toLowerCase().includes("popup") || t.toLowerCase().includes("interaction") ? errorText("TF-GCAL-102", "Google needs a quick reconnect in this browser. Open Settings and use One-time Google sync.") : t.toLowerCase().includes("org_internal") || t.toLowerCase().includes("admin_policy") || t.toLowerCase().includes("unauthorized_client") ? errorText("TF-GCAL-201", "This Google account may block outside calendar apps. Ask the account administrator to allow TaskFlow, or use a personal Google account.") : t.toLowerCase().includes("insufficient") || 403 === e?.status ? errorText("TF-GCAL-102", "Open Settings, use One-time Google sync, and approve calendar access.") : t.toLowerCase().includes("origin") || t.toLowerCase().includes("api has not been used") || t.toLowerCase().includes("disabled") ? errorText("TF-GCAL-201") : t.toLowerCase().includes("failed to fetch") ? errorText("TF-NET-001", "Check your internet connection.") : errorText("TF-GCAL-201")
}
function isGoogleCalendarPermissionError(e) {
    const t = String(e?.message || e || "").toLowerCase();
    return 401 === e?.status || 403 === e?.status || t.includes("access_denied") || t.includes("insufficient")
}
function renderTimezoneOptions() {
    return unique([state.meetingTimezone, ...timezoneChoices]).map(e => `<option value="${escapeAttr(e)}" ${e === state.meetingTimezone ? "selected" : ""}>${escapeHtml(formatTimezoneOptionLabel(e))}</option>`).join("")
}
function formatTimezoneOptionLabel(e) {
    const t = e.split("/").pop()?.replace(/_/g, " ") || e;
    return `${formatTimezoneOffsetLabel(e)} - ${t}`
}
function formatTimezoneOffsetLabel(e) {
    try {
        const t = new Intl.DateTimeFormat("en",{
            timeZone: e,
            timeZoneName: "shortOffset"
        }).formatToParts(new Date).find(e => "timeZoneName" === e.type)?.value;
        return t || "GMT"
    } catch (t) {
        return "GMT"
    }
}
function renderMeetingCard(e, t=!1) {
    const n = e.linkedTaskIds.length;
    return `\n    <article class="meeting-card meeting-${e.status} ${t ? "timeline-target" : ""}" data-meeting-card="${e.id}" data-timeline-target="${t}">\n      <div class="meeting-card-body">\n        <div class="meeting-content">\n          <div class="meeting-card-top">\n            <span class="chip project-chip"><i data-lucide="book-open"></i>${escapeHtml(e.subject)}</span>\n            <span class="due-chip"><i data-lucide="calendar"></i>${escapeHtml(formatMeetingDateTime(e))}</span>\n          </div>\n          <button class="plain-task meeting-title-button" type="button" data-meeting-action="open" data-meeting-id="${e.id}">\n            <span class="task-title">${escapeHtml(e.title)}</span>\n          </button>\n          ${e.topic ? `<p>${escapeHtml(e.topic)}</p>` : ""}\n          <div class="task-tags">\n            ${e.location ? `<span class="tag"><i data-lucide="map-pin"></i>${escapeHtml(e.location)}</span>` : ""}\n            ${"none" !== e.recurrence ? `<span class="tag"><i data-lucide="repeat"></i>${escapeHtml(e.recurrence)}</span>` : ""}\n            ${n ? `<span class="tag"><i data-lucide="list-checks"></i>${n} tasks</span>` : ""}\n          </div>\n        </div>\n        <textarea\n          class="meeting-note-input"\n          data-meeting-note="${e.id}"\n          rows="2"\n          maxlength="500"\n          placeholder="Small notes..."\n          aria-label="Event notes for ${escapeAttr(e.title)}"\n        >${escapeHtml(e.notes || "")}</textarea>\n        <div class="meeting-card-actions">\n          <button class="chip-button" type="button" data-meeting-action="task" data-meeting-id="${e.id}" title="Create task" aria-label="Create task from event"><i data-lucide="list-plus"></i></button>\n          <button class="chip-button" type="button" data-meeting-action="open" data-meeting-id="${e.id}" title="Edit event" aria-label="Edit event"><i data-lucide="pencil"></i></button>\n        </div>\n      </div>\n    </article>\n  `
}
function handleMeetingCardNotesInput(e) {
    const t = e.target.dataset.meetingNote
      , n = state.meetings.find(e => e.id === t);
    n && (n.notes = e.target.value.slice(0, 500),
    n.updatedAt = (new Date).toISOString(),
    markMeetingsPending([n.id]),
    updateSaveStatus(new Date(n.updatedAt)),
    clearTimeout(meetingNotesSaveTimer),
    meetingNotesSaveTimer = setTimeout( () => {
        persist()
    }
    , 450))
}
function renderAnalytics() {
    const e = filteredTasks();
    if (!e.length)
        return void (els.analyticsView.innerHTML = renderEmptyWorkspace("No analytics yet", "Tasks in the current view will create charts here."));
    const t = e.filter(e => "done" === e.status).length
      , n = e.filter(e => "done" !== e.status).length
      , a = e.filter(e => isOverdue(e)).length
      , s = e.reduce( (e, t) => e + Number(t.estimate || 0), 0)
      , i = countBy(e, "project")
      , o = countBy(e, "priority")
      , r = countBy(e, "status")
      , l = e.filter(e => "waiting" === e.status).length
      , c = e.filter(e => isOverdue(e) && ["urgent", "high"].includes(e.priority)).length;
    els.analyticsView.innerHTML = `\n    <div class="analytics-grid">\n      <section class="analytics-panel">\n        <h2>Project load</h2>\n        ${renderBars(i, e.length, "project")}\n      </section>\n      <section class="analytics-panel">\n        <h2>Signals</h2>\n        <div class="insight-grid">\n          <div class="insight"><strong>${Math.round(t / e.length * 100)}%</strong><span>completion rate</span></div>\n          <div class="insight"><strong>${n}</strong><span>active tasks</span></div>\n          <div class="insight"><strong>${c}</strong><span>high-risk overdue</span></div>\n          <div class="insight"><strong>${l}</strong><span>waiting handoffs</span></div>\n          <div class="insight"><strong>${a}</strong><span>overdue tasks</span></div>\n          <div class="insight"><strong>${Math.round(s / 60)}h</strong><span>estimated work</span></div>\n        </div>\n      </section>\n      <section class="analytics-panel">\n        <h2>Priority mix</h2>\n        ${renderBars(o, e.length, "priority")}\n      </section>\n      <section class="analytics-panel">\n        <h2>Status distribution</h2>\n        ${renderBars(r, e.length, "status")}\n      </section>\n    </div>\n  `
}
function renderBars(e, t, n) {
    return `\n    <div class="bar-list">\n      ${Object.entries(e).sort( (e, t) => t[1] - e[1]).map( ([e,a]) => {
        const s = "priority" === n ? priorityLabels[e] || e : "status" === n && statuses.find(t => t.id === e)?.label || e
          , i = t ? Math.max(4, Math.round(a / t * 100)) : 0;
        return `\n            <div class="bar-row">\n              <span>${escapeHtml(s)}</span>\n              <div class="bar-track"><div class="bar-fill" style="--bar:${i}%"></div></div>\n              <strong>${a}</strong>\n            </div>\n          `
    }
    ).join("")}\n    </div>\n  `
}
function renderFocus() {
    const e = state.tasks.filter(e => "done" !== e.status).sort( (e, t) => priorityOrder[t.priority] - priorityOrder[e.priority] || compareDue(e, t)).slice(0, 24);
    state.focusTaskId && state.tasks.some(e => e.id === state.focusTaskId && "done" !== e.status) || (state.focusTaskId = e[0]?.id || null);
    const t = state.tasks.find(e => e.id === state.focusTaskId);
    els.focusView.innerHTML = `\n    <div class="focus-grid">\n      <section class="focus-panel">\n        <h2>Focus queue</h2>\n        <div class="focus-task-list">\n          ${e.length ? e.map(e => `\n                      <button class="focus-task ${e.id === state.focusTaskId ? "active" : ""}" type="button" data-focus-task="${e.id}">\n                        <span>\n                          <strong>${escapeHtml(e.title)}</strong>\n                          <span>${escapeHtml(e.project || "Inbox")} · ${e.dueDate ? formatDueLabel(e) : "No date"}</span>\n                        </span>\n                        <span class="priority-chip priority-${e.priority}">${escapeHtml(priorityLabels[e.priority])}</span>\n                      </button>\n                    `).join("") : renderEmptyWorkspace("No active tasks", "Create or reopen a task to start a focus session.")}\n        </div>\n      </section>\n      <section class="focus-panel">\n        <h2>${t ? escapeHtml(t.title) : "Focus session"}</h2>\n        <div class="timer-display">\n          <div>\n            <strong id="timerText">${formatTimer(timer.remaining)}</strong>\n            <span>${t ? escapeHtml(t.project || "Inbox") : "Select a task to begin"}</span>\n          </div>\n        </div>\n        <div class="focus-actions">\n          <button class="button primary" id="timerStartBtn" type="button" ${t ? "" : "disabled"}><i data-lucide="${timer.running ? "pause" : "play"}"></i>${timer.running ? "Pause" : "Start"}</button>\n          <button class="button ghost" id="timerResetBtn" type="button"><i data-lucide="rotate-ccw"></i>Reset</button>\n          <button class="button ghost" id="timerShortBtn" type="button"><i data-lucide="coffee"></i>5 min</button>\n          <button class="button ghost" id="timerLongBtn" type="button"><i data-lucide="timer"></i>25 min</button>\n          <button class="button primary" id="focusDoneBtn" type="button" ${t ? "" : "disabled"}><i data-lucide="check"></i>Done</button>\n        </div>\n      </section>\n    </div>\n  `,
    els.focusView.querySelectorAll("[data-focus-task]").forEach(e => {
        e.addEventListener("click", () => {
            state.focusTaskId = e.dataset.focusTask,
            timer.remaining = 60 * getFocusMinutes(),
            stopTimer(),
            renderFocus(),
            refreshIcons()
        }
        )
    }
    ),
    document.getElementById("timerStartBtn")?.addEventListener("click", toggleTimer),
    document.getElementById("timerResetBtn")?.addEventListener("click", () => resetTimer(60 * getFocusMinutes())),
    document.getElementById("timerShortBtn")?.addEventListener("click", () => resetTimer(300)),
    document.getElementById("timerLongBtn")?.addEventListener("click", () => resetTimer(1500)),
    document.getElementById("focusDoneBtn")?.addEventListener("click", () => toggleComplete(state.focusTaskId))
}
function renderEmptyWorkspace(e, t) {
    return `\n    <div class="empty-state">\n      <div>\n        <div class="empty-art"><span></span><span></span><span></span></div>\n        <strong>${escapeHtml(e)}</strong>\n        <p>${escapeHtml(t)}</p>\n        <div class="empty-actions">\n          <button class="button primary" type="button" data-empty-action="task">\n            <i data-lucide="plus"></i>\n            New task\n          </button>\n          <button class="button ghost" type="button" data-empty-action="event">\n            <i data-lucide="calendar-plus"></i>\n            New event\n          </button>\n          <button class="button ghost" type="button" data-empty-action="ai">\n            <i data-lucide="wand-sparkles"></i>\n            AI Assist\n          </button>\n        </div>\n      </div>\n    </div>\n  `
}
function filteredTasks() {
    let e = [...state.tasks];
    const {search: t, project: n, tag: a, priority: s, due: i, sort: o} = state.filters;
    return e = e.filter(e => !!("today" !== state.smartView || isToday(e.dueDate) && "done" !== e.status) && (!!("upcoming" !== state.smartView || isUpcoming(e.dueDate) && "done" !== e.status) && (!("overdue" === state.smartView && !isOverdue(e)) && (("waiting" !== state.smartView || "waiting" === e.status) && (("completed" !== state.smartView || "done" === e.status) && (("all" === n || e.project === n) && (!("all" !== a && !e.tags.includes(a)) && (("all" === s || e.priority === s) && (!("overdue" === i && !isOverdue(e)) && (!("today" === i && !isToday(e.dueDate)) && (!("upcoming" === i && !isUpcoming(e.dueDate)) && (("unscheduled" !== i || !e.dueDate) && !(t && ![e.title, e.notes, e.project, e.status, e.priority, ...e.tags].join(" ").toLowerCase().includes(t)))))))))))))),
    sortTasks(e, o)
}
function sortTasks(e, t) {
    return e.sort( (e, n) => "title" === t ? e.title.localeCompare(n.title) : "created" === t ? new Date(n.createdAt) - new Date(e.createdAt) : "priority" === t ? priorityOrder[n.priority] - priorityOrder[e.priority] || compareDue(e, n) : "estimate" === t ? Number(n.estimate || 0) - Number(e.estimate || 0) : compareDue(e, n) || priorityOrder[n.priority] - priorityOrder[e.priority])
}
function compareDue(e, t) {
    return dueSortValue(e) - dueSortValue(t)
}
function dueSortValue(e) {
    if (!e.dueDate)
        return Number.MAX_SAFE_INTEGER;
    const [t,n] = isValidTime(e.dueTime) ? e.dueTime.split(":").map(Number) : [23, 59]
      , a = parseISODate(e.dueDate);
    return a.setHours(t, n, 0, 0),
    a.getTime()
}
async function handleQuickAdd(e) {
    e.preventDefault();
    const t = els.quickInput.value.trim();
    if (!t)
        return;
    const n = els.quickForm.querySelector("button[type='submit']");
    n.disabled = !0,
    n.innerHTML = '<i data-lucide="loader"></i>AI working',
    refreshIcons();
    let a = !1
      , s = !1;
    try {
        const e = await handleAiAssistCommand(t);
        if (e.handled)
            return els.quickInput.value = "",
            autosizeQuickInput(),
            void showActivityPulse(e.message, {
                kind: "ai"
            });
        let n;
        try {
            if (getAiConfig().endpoint && state.isOnline) {
                const e = checkAiAddAccess();
                e.allowed ? (recordAiAddAttempt(),
                n = await parseAiTask(t),
                a = !0) : (s = !0,
                maybeShowAiLimitDialog(e),
                n = parseQuickTask(t))
            } else
                n = parseQuickTask(t)
        } catch (i) {
            console.warn("AI assist unavailable; using local parser", i),
            n = parseQuickTask(t)
        }
        const o = buildTaskFromParsedCapture(n, t);
        if (!allowWorkspaceChange({
            tasks: [o, ...state.tasks]
        }))
            return;
        state.tasks.unshift(o),
        els.quickInput.value = "",
        autosizeQuickInput(),
        persist(),
        renderAll(),
        a ? showActivityPulse(`${o.title} created by AI Assist`, {
            kind: "ai"
        }) : toast(s ? `${o.title} created without AI. AI Assist is paused for now.` : `${o.title} created`)
    } finally {
        n.disabled = !1,
        n.innerHTML = '<i data-lucide="wand-sparkles"></i>AI assist',
        refreshIcons()
    }
}
async function handleAiAssistCommand(e) {
    const t = detectAssistIntent(e);
    if ("sync_workspace" === t.type)
        return await forceSyncNow(),
        {
            handled: !0,
            message: "Workspace sync started"
        };
    if ("sync_google" === t.type)
        return t.full && clearGoogleCalendarSyncToken(),
        await syncTaskFlowToGoogleCalendar({
            full: t.full,
            reason: "ai",
            enableAuto: !0,
            forcePrompt: !googleCalendarAccessToken && !googleCalendarConnected()
        }),
        {
            handled: !0,
            message: t.full ? "Google Calendar repair sync started" : "Google Calendar sync started"
        };
    if ("switch_view" === t.type)
        return {
            handled: !0,
            message: switchViewFromAssist(t.view)
        };
    if ("open_settings" === t.type)
        return openAccountSettings(),
        {
            handled: !0,
            message: "Settings opened"
        };
    if ("open_appearance" === t.type)
        return openAppearanceDialog(),
        {
            handled: !0,
            message: "Customize UI opened"
        };
    if ("open_ai_help" === t.type)
        return openAiAssistHelp(),
        {
            handled: !0,
            message: "AI Assist help opened"
        };
    if ("export_backup" === t.type)
        return exportTasks(),
        {
            handled: !0,
            message: "Backup exported"
        };
    if ("restore_point" === t.type)
        return {
            handled: !0,
            message: createRestorePoint("AI Assist restore point", {
                force: !0
            }) ? "Restore point created" : "Nothing needed a restore point yet"
        };
    if ("delete_done_tasks" === t.type)
        return {
            handled: !0,
            message: deleteDoneTasksFromAssist()
        };
    if ("focus_task" === t.type)
        return {
            handled: !0,
            message: focusTaskFromAssist(t.target || e)
        };
    if ("complete_task" === t.type || "reopen_task" === t.type || "status_task" === t.type) {
        const n = findAssistTaskMatches(t.target || e, {
            includeDone: "reopen_task" === t.type,
            bulk: t.bulk
        });
        if (!n.length)
            return {
                handled: !0,
                message: "I could not find matching tasks to update."
            };
        const a = "complete_task" === t.type ? "done" : "reopen_task" === t.type ? "progress" : t.status
          , s = (new Date).toISOString()
          , i = [];
        return n.forEach(e => {
            e.status !== a && (e.status = a,
            e.completedAt = "done" === a ? s : null,
            "done" === a && (e.subtasks = e.subtasks.map(e => ({
                ...e,
                done: !0
            }))),
            e.updatedAt = s,
            i.push(e.id))
        }
        ),
        markTasksPending(i),
        persist(),
        renderAll(),
        {
            handled: !0,
            message: 1 === n.length ? `${n[0].title} changed to ${statusLabel(a)}` : `${n.length} tasks changed to ${statusLabel(a)}`
        }
    }
    if ("delete_task" === t.type) {
        const n = findAssistTaskMatches(t.target || e, {
            includeDone: !0,
            bulk: t.bulk
        });
        if (!n.length)
            return {
                handled: !0,
                message: "I could not find matching tasks to delete."
            };
        const a = n.map(e => e.id)
          , s = new Set(a);
        return state.tasks = state.tasks.filter(e => !s.has(e.id)),
        a.forEach(e => {
            selectedTasks.delete(e),
            state.pendingSyncIds.delete(e)
        }
        ),
        savePendingSyncs(),
        persist(),
        deleteCloudTasks(a).catch(e => console.warn("Cloud delete failed", e)),
        renderAll(),
        {
            handled: !0,
            message: 1 === n.length ? `${n[0].title} deleted` : `${n.length} tasks deleted`
        }
    }
    if ("duplicate_task" === t.type) {
        const n = findBestTaskMatch(t.target || e, {
            includeDone: !0
        });
        if (!n)
            return {
                handled: !0,
                message: "I could not find a matching task to duplicate."
            };
        const a = duplicateTaskForAssist(n);
        return allowWorkspaceChange({
            tasks: [a, ...state.tasks]
        }) ? (state.tasks.unshift(a),
        persist(),
        renderAll(),
        {
            handled: !0,
            message: `${n.title} duplicated`
        }) : {
            handled: !0,
            message: "That duplicate would exceed your current workspace limit."
        }
    }
    if ("edit_task" === t.type) {
        const n = findAssistTaskMatches(t.target || e, {
            includeDone: !0,
            bulk: t.bulk
        });
        if (!n.length)
            return {
                handled: !0,
                message: "I could not find matching tasks to edit."
            };
        if (n.length > 1 && (t.patch.title || t.patch.notesAppend || t.patch.subtasksAppend?.length))
            return {
                handled: !0,
                message: "I found multiple tasks. For safety, bulk edits can change status, project, priority, tags, due dates, planned times, estimates, energy, or recurrence."
            };
        const a = n.map(e => updateTaskFromAssist(e, t.patch));
        return markTasksPending(n.map(e => e.id)),
        persist(),
        renderAll(),
        {
            handled: !0,
            message: 1 === n.length ? a[0] : `${n.length} tasks updated`
        }
    }
    if ("task_from_event" === t.type) {
        const n = findBestMeetingMatch(t.target || e);
        return n ? (createTaskFromMeeting(n.id, {
            open: !1,
            quiet: !0
        }),
        {
            handled: !0,
            message: `Follow-up task created from ${n.title}`
        }) : {
            handled: !0,
            message: "I could not find a matching event."
        }
    }
    if ("event_status" === t.type) {
        const n = findAssistMeetingMatches(t.target || e, {
            bulk: t.bulk
        });
        if (!n.length)
            return {
                handled: !0,
                message: "I could not find matching events."
            };
        const a = (new Date).toISOString()
          , s = new Set(n.map(e => e.id));
        return state.meetings = state.meetings.map(e => s.has(e.id) ? normalizeMeeting({
            ...e,
            status: t.status,
            updatedAt: a
        }) : e),
        markMeetingsPending([...s]),
        persist(),
        renderAll(),
        {
            handled: !0,
            message: 1 === n.length ? `${n[0].title} changed to ${t.status}` : `${n.length} events changed to ${t.status}`
        }
    }
    if ("delete_event" === t.type) {
        const n = findAssistMeetingMatches(t.target || e, {
            includeCancelled: !0,
            bulk: t.bulk
        });
        if (!n.length)
            return {
                handled: !0,
                message: "I could not find matching events to delete."
            };
        const a = n.map(e => e.id)
          , s = new Set(a);
        return state.meetings = state.meetings.filter(e => !s.has(e.id)),
        a.forEach(e => state.pendingMeetingSyncIds.delete(e)),
        savePendingSyncs(),
        persist(),
        deleteCloudMeetings(a).catch(e => console.warn("Cloud event delete failed", e)),
        renderAll(),
        {
            handled: !0,
            message: 1 === n.length ? `${n[0].title} deleted` : `${n.length} events deleted`
        }
    }
    if ("edit_event" === t.type) {
        const n = findAssistMeetingMatches(t.target || e, {
            sourceWeekday: t.sourceWeekday,
            includeCancelled: !0,
            bulk: t.bulk
        });
        if (!n.length)
            return {
                handled: !0,
                message: "I could not find matching events to edit."
            };
        if (n.length > 1 && (t.patch.title || t.patch.notesAppend))
            return {
                handled: !0,
                message: "I found multiple events. For safety, bulk event edits can reschedule, change location, category, or status."
            };
        const a = n.map(e => updateMeetingFromAssist(e, t.patch));
        return persist(),
        renderAll(),
        {
            handled: !0,
            message: 1 === n.length ? a[0] : `${n.length} events updated`
        }
    }
    if ("create_event" === t.type) {
        const t = buildMeetingFromAssist(e);
        return allowWorkspaceChange({
            meetings: [t, ...state.meetings]
        }) ? (state.meetings = sortMeetings([...state.meetings, t].map(normalizeMeeting)),
        markMeetingsPending([t.id]),
        persist(),
        renderAll(),
        {
            handled: !0,
            message: `${t.title} scheduled for ${formatMeetingDateTime(t)}`
        }) : {
            handled: !0,
            message: "That event would exceed your current workspace limit."
        }
    }
    return {
        handled: !1
    }
}
function switchViewFromAssist(e) {
    const t = {
        workspace: "unified",
        events: "meetings",
        event: "meetings"
    }[e] || e;
    return ["unified", "board", "list", "calendar", "meetings", "analytics", "focus"].includes(t) ? (state.view = t,
    renderWorkspaceTitle(),
    renderWorkspaceToolbar(),
    renderNudgePanel(),
    updateViewVisibility(),
    renderActiveView(),
    isMobileViewport() && setMobilePage(mobilePageForView(state.view), {
        quiet: !0,
        preserveView: !0
    }),
    refreshIcons(),
    `${viewLabel(t)} opened`) : "I could not find that view."
}
function normalizeAssistViewName(e) {
    const t = String(e || "").toLowerCase();
    return "events" === t || "event" === t ? "events" : t
}
function viewLabel(e) {
    return "unified" === e ? "Workspace" : "meetings" === e ? "Events" : e.charAt(0).toUpperCase() + e.slice(1)
}
function normalizeAssistRecurrence(e) {
    const t = String(e || "").toLowerCase();
    return /every day|daily/.test(t) ? "daily" : /every week|weekly/.test(t) ? "weekly" : /every month|monthly/.test(t) ? "monthly" : "none"
}
function deleteDoneTasksFromAssist() {
    const e = state.tasks.filter(e => "done" === e.status);
    if (!e.length)
        return "No done tasks to delete";
    createRestorePoint("Before AI Assist deleted done tasks", {
        force: !0
    });
    const t = e.map(e => e.id);
    return state.tasks = state.tasks.filter(e => "done" !== e.status),
    t.forEach(e => {
        selectedTasks.delete(e),
        state.pendingSyncIds.delete(e)
    }
    ),
    savePendingSyncs(),
    persist(),
    deleteCloudTasks(t).catch(e => console.warn("Cloud delete failed", e)),
    renderAll(),
    recordSyncActivity("sync", "warning", "Done tasks deleted", {
        tasks: t.length
    }),
    `${t.length} done ${1 === t.length ? "task" : "tasks"} deleted`
}
function focusTaskFromAssist(e) {
    const t = findBestTaskMatch(e, {
        includeDone: !1
    });
    return state.view = "unified",
    updateUnifiedWindowLayout("focus", {
        ...bringUnifiedWindowForward("focus") || getUnifiedLayoutItem("focus"),
        hidden: !1
    }),
    t && (state.focusTaskId = t.id),
    renderAll(),
    t ? `Focus opened for ${t.title}` : "Focus opened"
}
function detectAssistIntent(e) {
    const t = e.toLowerCase()
      , n = e.match(/\b(?:open|show|go to|switch to|take me to)\s+(?:the\s+)?(workspace|unified|board|list|calendar|events?|analytics|focus)\b/i);
    if (n && ("focus" !== n[1].toLowerCase() || !/\bfocus\s+(?:on|for)\b/i.test(e)))
        return {
            type: "switch_view",
            view: normalizeAssistViewName(n[1])
        };
    if (/\b(?:open|show|go to)\s+(?:account\s+)?settings\b/i.test(e))
        return {
            type: "open_settings"
        };
    if (/\b(?:open|show|customi[sz]e|change)\s+(?:the\s+)?(?:ui|appearance|theme|design)\b/i.test(e))
        return {
            type: "open_appearance"
        };
    if (/\b(?:open|show|explain)\s+(?:ai\s+assist|assistant|ai)\s+(?:help|guide|instructions|examples)?\b/i.test(e))
        return {
            type: "open_ai_help"
        };
    if (/\b(?:export|download|create|make)\s+(?:a\s+)?(?:workspace\s+)?backup\b/i.test(e))
        return {
            type: "export_backup"
        };
    if (/\b(?:create|make|save)\s+(?:a\s+)?restore\s+point\b/i.test(e))
        return {
            type: "restore_point"
        };
    if (/\b(?:delete|clear|remove)\s+(?:all\s+)?(?:done|completed)\s+tasks\b/i.test(e))
        return {
            type: "delete_done_tasks"
        };
    const a = e.match(/\b(?:start|open|begin|launch)\s+focus(?:\s+(?:on|for)\s+(.+))?$/i);
    if (a)
        return {
            type: "focus_task",
            target: cleanAssistTarget(a[1] || "")
        };
    if (/\b(?:repair|resync|full sync|fix)\b.*\bgoogle\b/i.test(e) || /\bgoogle\b.*\b(?:repair|resync|full sync|fix)\b/i.test(e))
        return {
            type: "sync_google",
            full: !0
        };
    if (/\b(?:sync|save)\b.*\b(?:google|calendar)\b/i.test(e) || /\b(?:google|calendar)\b.*\bsync\b/i.test(e))
        return {
            type: "sync_google",
            full: !1
        };
    if (/\b(?:sync now|save now|sync workspace|save workspace|sync taskflow|sync account|cloud sync)\b/i.test(e))
        return {
            type: "sync_workspace"
        };
    const s = e.match(/\b(?:reschedule|move|change)\s+(.+?)\s+\b(?:to|for|on)\b\s+(.+)$/i);
    if (s) {
        const t = eventPatchFromAssistPhrase(s[2])
          , n = weekdayNameFromText(s[1]);
        if (Object.keys(t).length && (n || t.date || t.dateWeekday || /\b(event|meeting|appointment|class|lesson|session)\b/i.test(e)))
            return {
                type: "edit_event",
                target: cleanAssistTarget(s[1]),
                sourceWeekday: n,
                patch: t
            }
    }
    const i = e.match(/\b(?:delete|remove|trash|cancel)\s+(?:the\s+)?(.+?)\s+(?:event|meeting|appointment|class)\b/i) || e.match(/\b(?:delete|remove|trash|cancel)\s+(?:event|meeting|appointment|class)\s+(.+)$/i);
    if (i)
        return {
            type: "delete_event",
            target: cleanAssistTarget(i[1] || i[2] || e)
        };
    const o = e.match(/\b(?:mark|set|change)\s+(.+?)\s+(?:event|meeting|appointment|class)?\s*(?:to|as)\s+\b(done|cancelled|canceled|scheduled)\b/i);
    if (o && /\b(event|meeting|appointment|class)\b/i.test(e))
        return {
            type: "event_status",
            target: cleanAssistTarget(o[1]),
            status: o[2].toLowerCase().startsWith("cancel") ? "cancelled" : o[2].toLowerCase()
        };
    const r = e.match(/\b(?:add|append)\s+(?:a\s+)?note\s+(?:to|for|on)\s+(.+?)\s+(?:event|meeting|appointment|class)?\s*(?:that|saying|:|-)\s+(.+)$/i);
    if (r && /\b(event|meeting|appointment|class)\b/i.test(e))
        return {
            type: "edit_event",
            target: cleanAssistTarget(r[1]),
            patch: {
                notesAppend: cleanTitle(r[2])
            }
        };
    const l = e.match(/\b(?:set|change|update)\s+(.+?)\s+(?:event|meeting|appointment|class)?\s*(?:location|room|place|link)\s+(?:to|as)\s+(.+)$/i);
    if (l && /\b(event|meeting|appointment|class|location|room|place|link)\b/i.test(e))
        return {
            type: "edit_event",
            target: cleanAssistTarget(l[1]),
            patch: {
                location: cleanTitle(l[2])
            }
        };
    const c = e.match(/\brename\s+(.+?)\s+(?:event|meeting|appointment|class)\s+\bto\b\s+(.+)$/i);
    if (c)
        return {
            type: "edit_event",
            target: cleanAssistTarget(c[1]),
            patch: {
                title: cleanTitle(c[2])
            }
        };
    const d = e.match(/\b(?:create|add|make)\s+(?:a\s+)?(?:follow[- ]?up\s+)?task\s+(?:from|for)\s+(?:the\s+)?(?:event|meeting|appointment|class)?\s*(.+)$/i);
    if (d)
        return {
            type: "task_from_event",
            target: cleanAssistTarget(d[1])
        };
    const u = e.match(/\b(?:remove|clear|delete)\s+(?:tags?\s+)?(.+?)\s+(?:tags?\s+)?(?:from|on)\s+(.+)$/i);
    if (u)
        return {
            type: "edit_task",
            target: cleanAssistTarget(u[2]),
            patch: {
                tagsRemove: parseTags(u[1])
            }
        };
    const g = e.match(/\b(?:delete|remove|trash)\s+(?:the\s+)?(?:task\s+)?(.+)$/i);
    if (g && !/\b(event|meeting|appointment|class)\b/i.test(e))
        return {
            type: "delete_task",
            target: cleanAssistTarget(g[1])
        };
    const p = e.match(/\b(?:duplicate|copy|clone)\s+(?:the\s+)?(?:task\s+)?(.+)$/i);
    if (p)
        return {
            type: "duplicate_task",
            target: cleanAssistTarget(p[1])
        };
    const m = e.match(/\b(?:add|append)\s+(?:a\s+)?note\s+(?:to|for|on)\s+(.+?)\s*(?:that|saying|:|-)\s+(.+)$/i);
    if (m)
        return {
            type: "edit_task",
            target: cleanAssistTarget(m[1]),
            patch: {
                notesAppend: cleanTitle(m[2])
            }
        };
    const f = e.match(/\b(?:add|append)\s+(?:steps?|subtasks?|sub steps?)\s+(?:to|for|on)\s+(.+?)\s*(?:that|:|-)\s+(.+)$/i);
    if (f)
        return {
            type: "edit_task",
            target: cleanAssistTarget(f[1]),
            patch: {
                subtasksAppend: splitSubtasks(f[2])
            }
        };
    const y = e.match(/\b(?:clear|remove|delete)\s+(?:the\s+)?(due date|deadline|planned time|planned work|schedule|plan)\s+(?:for|from|on)\s+(.+)$/i);
    if (y)
        return {
            type: "edit_task",
            target: cleanAssistTarget(y[2]),
            patch: /due|deadline/i.test(y[1]) ? {
                clearDue: !0
            } : {
                clearPlan: !0
            }
        };
    const h = e.match(/\b(?:move|set|change)\s+(.+?)\s+(?:to|into|under)\s+project\s+(.+)$/i) || e.match(/\b(?:set|change)\s+project\s+(?:for|on)\s+(.+?)\s+(?:to|as)\s+(.+)$/i);
    if (h)
        return {
            type: "edit_task",
            target: cleanAssistTarget(h[1]),
            patch: {
                project: cleanTitle(h[2])
            }
        };
    const k = e.match(/\b(?:tag)\s+(.+?)\s+(?:with|as)\s+(.+)$/i) || e.match(/\b(?:add)\s+tags?\s+(?:to|for|on)\s+(.+?)\s*(?:that|:|-|with)?\s+(.+)$/i);
    if (k)
        return {
            type: "edit_task",
            target: cleanAssistTarget(k[1]),
            patch: {
                tagsAppend: parseTags(k[2])
            }
        };
    const S = e.match(/\b(?:set|change|make)\s+(.+?)\s+(?:estimate|duration|time estimate)\s+(?:to|as)?\s*(\d+)\s*(m|min|mins|h|hr|hrs)?\b/i);
    if (S) {
        const e = String(S[3] || "min").toLowerCase()
          , t = Number(S[2]);
        return {
            type: "edit_task",
            target: cleanAssistTarget(S[1]),
            patch: {
                estimate: e.startsWith("h") ? 60 * t : t
            }
        }
    }
    const w = e.match(/\b(?:set|change|make)\s+(.+?)\s+(?:to|as)?\s*(low|medium|high)\s+energy\b/i);
    if (w)
        return {
            type: "edit_task",
            target: cleanAssistTarget(w[1]),
            patch: {
                energy: w[2].toLowerCase()
            }
        };
    const b = e.match(/\b(?:make|set|change)\s+(.+?)\s+(?:to|as)?\s*(daily|weekly|monthly|every day|every week|every month|not recurring|no recurrence|one off|one-off)\b/i);
    if (b)
        return {
            type: "edit_task",
            target: cleanAssistTarget(b[1]),
            patch: {
                recurrence: normalizeAssistRecurrence(b[2])
            }
        };
    const T = e.match(/\b(?:plan|schedule)\s+(?:work\s+)?(?:on\s+)?(.+?)\s+\b(?:for|on|at)\b\s+(.+)$/i);
    if (T && !/\b(event|meeting|appointment|class)\b/i.test(e)) {
        const e = plannedPatchFromAssistPhrase(T[2]);
        if (Object.keys(e).length)
            return {
                type: "edit_task",
                target: cleanAssistTarget(T[1]),
                patch: e
            }
    }
    const v = t.match(/\b(?:i\s+)?(?:finished|completed|did|done with|mark(?:ed)?(?: as)? done|tick off|check off)\b\s*(.+)?/i);
    if (v)
        return {
            type: "complete_task",
            target: cleanAssistTarget(v[1] || e)
        };
    const A = t.match(/\b(?:reopen|undo done|not done|mark(?:ed)?(?: as)?(?: not done| progress| in progress))\b\s*(.+)?/i);
    if (A)
        return {
            type: "reopen_task",
            target: cleanAssistTarget(A[1] || e)
        };
    const E = t.match(/\b(?:move|change|set|mark)\b\s+(.+?)\s+\b(?:to|as)\s+\b(backlog|planned|in progress|progress|waiting|done)\b/i);
    if (E)
        return {
            type: "status_task",
            target: cleanAssistTarget(E[1]),
            status: normalizeStatusPhrase(E[2])
        };
    const C = e.match(/\brename\s+(.+?)\s+\bto\b\s+(.+)$/i);
    if (C)
        return {
            type: "edit_task",
            target: cleanAssistTarget(C[1]),
            patch: {
                title: cleanTitle(C[2])
            }
        };
    const I = e.match(/\b(?:make|change|set)\s+(.+?)\s+(?:to|as)?\s*(urgent|high|medium|low)(?:\s+priority)?\b/i);
    if (I)
        return {
            type: "edit_task",
            target: cleanAssistTarget(I[1]),
            patch: {
                priority: I[2].toLowerCase()
            }
        };
    const D = e.match(/\b(?:make|set|change)\s+(.+?)\s+\b(?:due|deadline|by)\b\s+(.+)$/i);
    if (D) {
        const e = parseQuickTask(`task by ${D[2]}`)
          , t = {};
        if (e.dueDate && (t.dueDate = e.dueDate),
        e.dueTime && (t.dueTime = e.dueTime),
        Object.keys(t).length)
            return {
                type: "edit_task",
                target: cleanAssistTarget(D[1]),
                patch: t
            }
    }
    const L = e.match(/\b(?:move|change|set|reschedule)\s+(.+?)\s+\b(?:to|for|due|by)\b\s+(.+)$/i);
    if (L) {
        const e = parseQuickTask(`task by ${L[2]}`)
          , t = {};
        if (e.dueDate && (t.dueDate = e.dueDate),
        e.dueTime && (t.dueTime = e.dueTime),
        e.plannedDate && (t.plannedDate = e.plannedDate),
        e.plannedStart && (t.plannedStart = e.plannedStart),
        Object.keys(t).length)
            return {
                type: "edit_task",
                target: cleanAssistTarget(L[1]),
                patch: t
            }
    }
    return /\b(add|create|schedule|book|put)\b.*\b(event|meeting|class|appointment|lesson|session)\b/i.test(e) || /\b(event|meeting|class|appointment|lesson)\b.*\b(at|from|on|tomorrow|today|tonight|next)\b/i.test(e) ? {
        type: "create_event"
    } : {
        type: "create_task"
    }
}
function cleanAssistTarget(e) {
    return cleanTitle(String(e || "").replace(/\b(sundays?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?)(?:'s)?\b/gi, " ").replace(/\b(that|the|task)\b/gi, " ").replace(/\b(?:due|by|for)\b.+$/i, " "))
}
function normalizeStatusPhrase(e) {
    const t = String(e || "").toLowerCase();
    return t.includes("progress") ? "progress" : t.includes("planned") ? "planned" : t.includes("waiting") ? "waiting" : t.includes("done") ? "done" : "backlog"
}
function statusLabel(e) {
    return statuses.find(t => t.id === e)?.label.toLowerCase() || e
}
function updateTaskFromAssist(e, t={}) {
    const n = e.title;
    if (t.title && (e.title = cleanTitle(t.title).slice(0, 120) || e.title),
    t.project && (e.project = cleanTitle(t.project).slice(0, 80) || e.project),
    t.priority && priorityOrder[t.priority] && (e.priority = t.priority),
    void 0 !== t.dueDate && (e.dueDate = t.dueDate),
    void 0 !== t.dueTime && (e.dueTime = normalizeClockValue(t.dueTime)),
    t.clearDue && (e.dueDate = "",
    e.dueTime = ""),
    void 0 !== t.plannedDate && (e.plannedDate = t.plannedDate),
    void 0 !== t.plannedStart && (e.plannedStart = normalizeClockValue(t.plannedStart)),
    void 0 !== t.plannedEnd && (e.plannedEnd = normalizeClockValue(t.plannedEnd)),
    t.clearPlan && (e.plannedDate = "",
    e.plannedStart = "",
    e.plannedEnd = ""),
    void 0 !== t.estimate && (e.estimate = Math.max(0, Math.min(1440, Math.round(Number(t.estimate) || 0)))),
    t.energy && ["low", "medium", "high"].includes(t.energy) && (e.energy = t.energy),
    t.recurrence && ["none", "daily", "weekly", "monthly"].includes(t.recurrence) && (e.recurrence = t.recurrence),
    t.tagsAppend?.length && (e.tags = unique([...e.tags, ...t.tagsAppend.map(cleanToken).filter(Boolean)]).slice(0, 16)),
    t.tagsRemove?.length) {
        const n = new Set(t.tagsRemove.map(cleanToken).filter(Boolean));
        e.tags = e.tags.filter(e => !n.has(cleanToken(e)))
    }
    if (t.subtasksAppend?.length) {
        const n = new Set(e.subtasks.map(e => e.text.toLowerCase()))
          , a = t.subtasksAppend.map(cleanTitle).filter(Boolean).filter(e => !n.has(e.toLowerCase())).slice(0, 12 - e.subtasks.length).map(e => ({
            id: uid(),
            text: e,
            done: !1
        }));
        e.subtasks = [...e.subtasks, ...a]
    }
    return t.notesAppend && (e.notes = appendTextBlock(e.notes, t.notesAppend)),
    t.status && statuses.some(e => e.id === t.status) && (e.status = t.status),
    e.updatedAt = (new Date).toISOString(),
    `${n} ${[t.title ? `renamed to ${e.title}` : "", t.project ? `moved to ${e.project}` : "", t.priority ? `priority changed to ${priorityLabels[e.priority].toLowerCase()}` : "", t.dueDate ? `due date changed to ${formatDueLabel(e)}` : "", t.clearDue ? "due date cleared" : "", t.plannedDate ? `planned time changed to ${formatPlannedWorkLabel(e)}` : "", t.clearPlan ? "planned time cleared" : "", void 0 !== t.estimate ? `estimate changed to ${e.estimate} minutes` : "", t.energy ? `energy changed to ${e.energy}` : "", t.recurrence ? `recurrence changed to ${e.recurrence}` : "", t.tagsAppend?.length ? "tags updated" : "", t.tagsRemove?.length ? "tags removed" : "", t.subtasksAppend?.length ? "steps added" : "", t.notesAppend ? "note added" : ""].filter(Boolean)[0] || "updated"}`
}
function duplicateTaskForAssist(e) {
    return normalizeTask({
        ...e,
        id: uid(),
        title: `${e.title} copy`,
        status: "done" === e.status ? "backlog" : e.status,
        createdAt: (new Date).toISOString(),
        updatedAt: (new Date).toISOString(),
        completedAt: null,
        subtasks: e.subtasks.map(e => ({
            ...e,
            id: uid()
        }))
    })
}
function appendTextBlock(e, t) {
    const n = cleanTitle(t);
    if (!n)
        return e || "";
    const a = String(e || "").trim();
    return a ? `${a}\n${n}` : n
}
function plannedPatchFromAssistPhrase(e) {
    const t = parseQuickTask(`task ${e}`)
      , n = extractAssistTimeRange(e)
      , a = {}
      , s = t.dueDate || (/\btoday|tonight|later today|this afternoon|this evening\b/i.test(e) ? todayISO() : "")
      , i = n.start || t.dueTime;
    s && (a.plannedDate = s),
    i && (a.plannedStart = i),
    n.end && (a.plannedEnd = n.end);
    const o = e.match(/\b(?:for|give it)\s+(\d+)\s*(m|min|mins|h|hr|hrs)\b/i);
    if (i && o) {
        const e = Number(o[1])
          , t = o[2].toLowerCase().startsWith("h") ? 60 * e : e;
        a.plannedEnd = addMinutesToTime(i, t)
    }
    return a
}
function extractAssistTimeRange(e) {
    const t = String(e || "")
      , n = t.match(/\bfrom\s+(.+?)\s+(?:to|until|-)\s+(.+?)(?:\s|$)/i);
    if (n) {
        const e = t;
        return {
            start: parseAssistTimeValue(n[1], e),
            end: parseAssistTimeValue(n[2], e)
        }
    }
    const a = t.match(/\b(\d{1,2}(?::[0-5]\d)?\s*(?:a\.?m\.?|p\.?m\.?)?)\s*[-–]\s*(\d{1,2}(?::[0-5]\d)?\s*(?:a\.?m\.?|p\.?m\.?)?)\b/i);
    return a ? {
        start: parseAssistTimeValue(a[1], t),
        end: parseAssistTimeValue(a[2], t)
    } : {
        start: "",
        end: ""
    }
}
function parseAssistTimeValue(e, t="") {
    const n = extractDueTime(`at ${e}${/\b(p\.?m\.?|tonight|evening|afternoon|after school)\b/i.test(`${e} ${t}`) ? " tonight" : ""}`);
    return n?.dueTime || ""
}
function eventPatchFromAssistPhrase(e) {
    const t = String(e || "")
      , n = parseQuickTask(`event ${t}`)
      , a = extractAssistTimeRange(t)
      , s = {}
      , i = weekdayNameFromText(t)
      , o = /\b(next|this)\s+(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday)|\b(today|tomorrow|tonight|day after tomorrow|in \d+ days?|\d{4}-\d{2}-\d{2})\b/i.test(t);
    if (!n.dueDate || i && !o ? i && (s.dateWeekday = i) : s.date = n.dueDate,
    !/\bsame\s+time\b/i.test(t)) {
        const e = a.start || n.dueTime;
        e && (s.startTime = e),
        a.end && (s.endTime = a.end)
    }
    return s
}
function weekdayNameFromText(e) {
    const t = String(e || "").toLowerCase().match(/\b(?:this|next)?\s*(sundays?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?)(?:'s)?\b/i);
    return t ? normalizeWeekdayName(t[1]) : ""
}
function normalizeWeekdayName(e) {
    return String(e || "").toLowerCase().replace(/'s$/i, "").replace(/s$/i, "")
}
function dateForWeekdayInMeetingWeek(e, t) {
    const n = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(normalizeWeekdayName(t));
    if (n < 0)
        return "";
    const a = parseISODate(e || todayISO())
      , s = n - a.getDay();
    return toISODate(addDays(a, s))
}
function isBulkAssistText(e) {
    return /\b(all|every|each|selected|multiple|overdue|completed|done|today|tomorrow|this week|this month|this year)\b/i.test(String(e || ""))
}
function assistDateScope(e) {
    const t = String(e || "").toLowerCase();
    if (/\btomorrow\b/.test(t))
        return {
            type: "day",
            date: addDaysISO(1)
        };
    if (/\btoday|tonight\b/.test(t))
        return {
            type: "day",
            date: todayISO()
        };
    if (/\bthis week\b/.test(t))
        return {
            type: "range",
            start: todayISO(),
            end: addDaysISO(7)
        };
    if (/\bthis month\b/.test(t)) {
        const e = new Date;
        return {
            type: "range",
            start: todayISO(),
            end: toISODate(new Date(e.getFullYear(),e.getMonth() + 1,0))
        }
    }
    if (/\bthis year\b/.test(t)) {
        const e = new Date;
        return {
            type: "range",
            start: todayISO(),
            end: `${e.getFullYear()}-12-31`
        }
    }
    return null
}
function dateMatchesAssistScope(e, t) {
    return !(!e || !t) && ("day" === t.type ? e === t.date : e >= t.start && e <= t.end)
}
function findAssistTaskMatches(e, t={}) {
    const n = String(e || "");
    if (n.toLowerCase(),
    !t.bulk && !isBulkAssistText(n)) {
        const e = findBestTaskMatch(n, t);
        return e ? [e] : []
    }
    if (/\bselected\b/i.test(n) && selectedTasks.size)
        return state.tasks.filter(e => selectedTasks.has(e.id) && (t.includeDone || "done" !== e.status));
    let a = state.tasks.filter(e => t.includeDone || "done" !== e.status)
      , s = !1;
    const i = assistDateScope(n);
    i && (a = a.filter(e => dateMatchesAssistScope(e.dueDate, i) || dateMatchesAssistScope(e.plannedDate, i)),
    s = !0),
    /\boverdue\b/i.test(n) && (a = a.filter(isOverdue),
    s = !0);
    const o = assistStatusScope(n);
    o && (a = a.filter(e => e.status === o),
    s = !0);
    const r = findNamedScopeMatch(n, getProjects());
    r && (a = a.filter(e => normalizeMatchPhrase(e.project) === normalizeMatchPhrase(r)),
    s = !0);
    const l = findNamedScopeMatch(n.replace(/#/g, " "), getTags());
    l && (a = a.filter(e => e.tags.some(e => normalizeMatchPhrase(e) === normalizeMatchPhrase(l))),
    s = !0);
    const c = /\b(all|every|each|selected)\b/i.test(n) || /\btasks?\b/i.test(n)
      , d = n.replace(/\b(all|every|each|selected|tasks?|overdue|completed|done|today|tomorrow|tonight|this week|this month|this year)\b/gi, " ").replace(/\b(project|tagged|tag|status|with|in|from|on|due|planned)\b/gi, " ");
    return !tokenizeForMatch(d).length || s && c || (a = a.map(e => ({
        task: e,
        score: scoreTaskForAssist(e, d)
    })).filter(e => e.score > 0).sort( (e, t) => t.score - e.score || dueSortValue(e.task) - dueSortValue(t.task)).map(e => e.task),
    s = !0),
    s || c ? uniqueById(a).slice(0, 200) : []
}
function findAssistMeetingMatches(e, t={}) {
    const n = String(e || "");
    if (!(t.bulk || isBulkAssistText(n) || Boolean(t.sourceWeekday && /\b(sundays?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?)\b/i.test(n)))) {
        const e = findBestMeetingMatch(n, t);
        return e ? [e] : []
    }
    let a = state.meetings.filter(e => t.includeCancelled || "cancelled" !== e.status)
      , s = !1;
    const i = assistDateScope(n);
    i && (a = a.filter(e => dateMatchesAssistScope(e.date, i)),
    s = !0);
    const o = normalizeWeekdayName(t.sourceWeekday || weekdayNameFromText(n));
    o && (a = a.filter(e => normalizeWeekdayName(meetingStartDateTime(e).toLocaleDateString(userLocale(), {
        weekday: "long"
    })) === o),
    s = !0);
    const r = assistEventStatusScope(n);
    r && (a = a.filter(e => e.status === r),
    s = !0);
    const l = findNamedScopeMatch(n, unique(state.meetings.map(e => e.subject).filter(Boolean)));
    l && (a = a.filter(e => normalizeMatchPhrase(e.subject) === normalizeMatchPhrase(l)),
    s = !0);
    const c = /\b(all|every|each|events?|meetings?|appointments?|classes?|lessons?)\b/i.test(n)
      , d = n.replace(/\b(all|every|each|events?|meetings?|appointments?|classes?|lessons?|today|tomorrow|tonight|this week|this month|this year|scheduled|cancelled|canceled|done)\b/gi, " ").replace(/\b(on|for|from|at|to|same time)\b/gi, " ");
    return !tokenizeForMatch(d).length || s && c || (a = a.map(e => ({
        meeting: e,
        score: scoreMeetingForAssist(e, d, {
            sourceWeekday: o
        })
    })).filter(e => e.score > 0).sort( (e, t) => t.score - e.score || meetingStartDateTime(e.meeting) - meetingStartDateTime(t.meeting)).map(e => e.meeting),
    s = !0),
    s || c ? uniqueById(a).slice(0, 200) : []
}
function assistStatusScope(e) {
    const t = String(e || "").toLowerCase();
    return /\bin progress|progress\b/.test(t) ? "progress" : /\bplanned\b/.test(t) ? "planned" : /\bwaiting\b/.test(t) ? "waiting" : /\bdone|completed\b/.test(t) ? "done" : /\bbacklog\b/.test(t) ? "backlog" : ""
}
function assistEventStatusScope(e) {
    const t = String(e || "").toLowerCase();
    return /\bcancelled|canceled\b/.test(t) ? "cancelled" : /\bdone|completed\b/.test(t) ? "done" : /\bscheduled\b/.test(t) ? "scheduled" : ""
}
function findNamedScopeMatch(e, t=[]) {
    const n = normalizeMatchPhrase(e);
    return t.filter(Boolean).sort( (e, t) => String(t).length - String(e).length).find(e => {
        const t = normalizeMatchPhrase(e);
        return t && n.includes(t)
    }
    )
}
function scoreTaskForAssist(e, t) {
    const n = tokenizeForMatch(t);
    if (!n.length)
        return 0;
    const a = tokenizeForMatch([e.title, e.project, e.notes, e.dueDate ? formatDueLabel(e) : "", e.plannedDate ? formatPlannedWorkLabel(e) : "", ...e.tags].join(" "))
      , s = tokenizeForMatch(e.title);
    return n.filter(e => a.includes(e)).length + n.filter(e => a.some(t => e.length > 3 && t.startsWith(e))).length + 2 * n.filter(e => s.includes(e)).length
}
function scoreMeetingForAssist(e, t, n={}) {
    const a = tokenizeForMatch(t);
    if (!a.length)
        return 0;
    const s = e.date ? meetingStartDateTime(e).toLocaleDateString(userLocale(), {
        weekday: "long"
    }) : ""
      , i = tokenizeForMatch([e.title, e.subject, e.topic, e.teacher, e.location, e.notes, formatMeetingDateTime(e), s].join(" "))
      , o = tokenizeForMatch(`${e.title} ${e.subject}`);
    return a.filter(e => i.includes(e)).length + a.filter(e => i.some(t => e.length > 3 && t.startsWith(e))).length + 2 * a.filter(e => o.includes(e)).length + (n.sourceWeekday && normalizeWeekdayName(s) === normalizeWeekdayName(n.sourceWeekday) ? 2 : 0)
}
function uniqueById(e) {
    const t = new Set;
    return e.filter(e => !(!e?.id || t.has(e.id) || (t.add(e.id),
    0)))
}
function findBestTaskMatch(e, t={}) {
    const n = tokenizeForMatch(e);
    if (!n.length)
        return null;
    const a = normalizeMatchPhrase(e)
      , s = state.tasks.filter(e => t.includeDone || "done" !== e.status).map(e => {
        const t = [e.title, e.project, e.notes, e.dueDate ? formatDueLabel(e) : "", ...e.tags].join(" ")
          , s = tokenizeForMatch(t)
          , i = tokenizeForMatch(e.title);
        return {
            task: e,
            score: n.filter(e => s.includes(e)).length + n.filter(e => s.some(t => e.length > 3 && t.startsWith(e))).length + 2 * n.filter(e => i.includes(e)).length + (a && normalizeMatchPhrase(t).includes(a) ? 5 : 0) + .05 * (e.dueDate ? Math.max(0, 3 - Math.floor((dueSortValue(e) - Date.now()) / 864e5)) : 0)
        }
    }
    ).filter(e => e.score > 0).sort( (e, t) => t.score - e.score || dueSortValue(e.task) - dueSortValue(t.task));
    return s[0]?.task || null
}
function findBestMeetingMatch(e, t={}) {
    const n = tokenizeForMatch(e);
    if (!n.length)
        return null;
    const a = normalizeMatchPhrase(e)
      , s = normalizeWeekdayName(t.sourceWeekday || weekdayNameFromText(e))
      , i = state.meetings.filter(e => t.includeCancelled || "cancelled" !== e.status).map(e => {
        const t = e.date ? formatMeetingDateTime(e) : ""
          , i = e.date ? meetingStartDateTime(e).toLocaleDateString(userLocale(), {
            weekday: "long"
        }) : ""
          , o = normalizeWeekdayName(i)
          , r = tokenizeForMatch([e.title, e.subject, e.topic, e.teacher, e.location, e.notes, t, i].join(" "))
          , l = tokenizeForMatch(`${e.title} ${e.subject}`);
        return {
            meeting: e,
            score: n.filter(e => r.includes(e)).length + n.filter(e => r.some(t => e.length > 3 && t.startsWith(e))).length + 2 * n.filter(e => l.includes(e)).length + (a && normalizeMatchPhrase(`${e.title} ${e.subject} ${e.topic} ${e.location}`).includes(a) ? 5 : 0) + (s && o === s ? 4 : s ? -2 : 0) + (meetingStartDateTime(e) >= new Date ? .2 : 0)
        }
    }
    ).filter(e => e.score > 0).sort( (e, t) => t.score - e.score || meetingStartDateTime(e.meeting) - meetingStartDateTime(t.meeting));
    return i[0]?.meeting || null
}
function updateMeetingFromAssist(e, t={}) {
    const n = e.title
      , a = t.date || (t.dateWeekday ? dateForWeekdayInMeetingWeek(e.date, t.dateWeekday) : e.date)
      , s = normalizeMeeting({
        ...e,
        title: t.title ? cleanTitle(t.title).slice(0, 120) : e.title,
        subject: t.subject ? cleanTitle(t.subject).slice(0, 80) : e.subject,
        location: t.location ? cleanTitle(t.location).slice(0, 160) : e.location,
        notes: t.notesAppend ? appendTextBlock(e.notes, t.notesAppend) : e.notes,
        date: a,
        startTime: t.startTime || e.startTime,
        endTime: void 0 !== t.endTime ? t.endTime : e.endTime,
        status: t.status || e.status,
        updatedAt: (new Date).toISOString()
    });
    return state.meetings = state.meetings.map(t => t.id === e.id ? s : t),
    markMeetingsPending([e.id]),
    `${n} ${[t.title ? `renamed to ${s.title}` : "", t.subject ? `category changed to ${s.subject}` : "", t.location ? `location changed to ${s.location}` : "", t.date || t.dateWeekday || t.startTime ? `moved to ${formatMeetingDateTime(s)}` : "", t.notesAppend ? "note added" : "", t.status ? `changed to ${s.status}` : ""].filter(Boolean)[0] || "updated"}`
}
function tokenizeForMatch(e) {
    return unique(String(e || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).map(e => e.trim()).flatMap(expandMatchToken).filter(e => e.length > 2).filter(e => !matchStopWords.has(e)))
}
document.addEventListener("DOMContentLoaded", () => {
    verifyAuthorizedOrigin() && (bindElements(),
    applyMobileStabilityMode(),
    loadTheme(),
    loadUiStyle(),
    loadUiPresets(),
    loadDensity(),
    loadNotificationSettings(),
    loadAutoDeleteDoneSetting(),
    loadUnifiedLayout(),
    loadUnifiedPresets(),
    loadMeetingTimezone(),
    bindEvents(),
    setupLandingMotion(),
    setupLiquidGlassRuntime(),
    setMobilePage(state.mobilePage, {
        quiet: !0
    }),
    rotateQuickPlaceholder(),
    registerServiceWorker(),
    startNotificationScheduler(),
    startAutoDeleteDoneScheduler(),
    initAuth())
}
),
window.addEventListener("error", e => {
    trackClientError(e.error || e.message || "Window error")
}
),
window.addEventListener("unhandledrejection", e => {
    trackClientError(e.reason || "Unhandled promise rejection")
}
);
const matchStopWords = new Set(["the", "and", "that", "this", "with", "from", "tomorrow", "today", "tonight", "task", "event", "meeting", "done", "due", "please", "can", "you", "for", "about", "all", "every", "each", "selected"]);
function expandMatchToken(e) {
    const t = normalizeMatchToken(e);
    return unique([t, ...{
        assess: ["assessment"],
        assignment: ["assessment", "homework"],
        assignments: ["assignment", "assessment", "homework"],
        comp: ["computing", "computer"],
        computing: ["comp", "computer", "technology"],
        hmwk: ["homework"],
        hw: ["homework"],
        maths: ["math", "mathematics"],
        math: ["maths", "mathematics"],
        pdh: ["pdhpe"],
        pdhpe: ["health", "sport"],
        tech: ["technology"],
        tennis: ["tabletennis"]
    }[t] || []].filter(Boolean))
}
function normalizeMatchToken(e) {
    const t = String(e || "").toLowerCase().replace(/^-+|-+$/g, "");
    return t ? t.endsWith("ies") && t.length > 4 ? `${t.slice(0, -3)}y` : t.endsWith("es") && t.length > 4 ? t.slice(0, -2) : t.endsWith("s") && t.length > 4 && !/(ss|is|us)$/.test(t) ? t.slice(0, -1) : t : ""
}
function normalizeMatchPhrase(e) {
    return tokenizeForMatch(e).join(" ")
}
function buildMeetingFromAssist(e) {
    const t = parseQuickTask(e)
      , n = cleanTitle(t.title.replace(/\b(add|create|schedule|book|put|event|meeting|class|appointment|lesson|session)\b/gi, " ")) || "Event"
      , a = t.dueTime || t.plannedStart || "09:00"
      , s = t.dueDate || t.plannedDate || todayISO();
    return normalizeMeeting({
        id: uid(),
        seriesId: uid(),
        title: n,
        subject: t.project || inferSubject(n) || "Events",
        date: s,
        startTime: a,
        endTime: t.plannedEnd || addMinutesToTime(a, 60),
        recurrence: "none",
        notes: t.notes || "",
        status: "scheduled",
        linkedTaskIds: [],
        createdAt: (new Date).toISOString(),
        updatedAt: (new Date).toISOString()
    })
}
function addMinutesToTime(e, t) {
    const [n,a] = isValidTime(e) ? e.split(":").map(Number) : [9, 0]
      , s = new Date(2e3,0,1,n,a + t,0,0);
    return `${String(s.getHours()).padStart(2, "0")}:${String(s.getMinutes()).padStart(2, "0")}`
}
async function parseAiTask(e) {
    const t = getAiConfig();
    if (!t.endpoint)
        throw codedError("TF-AI-001", "TaskFlow will still create the task without AI.");
    if (!state.isOnline)
        throw codedError("TF-NET-001", "TaskFlow will still create the task without AI.");
    const n = new AbortController
      , a = window.setTimeout( () => n.abort(), t.timeoutMs);
    try {
        const a = await fetch(t.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: e,
                today: todayISO(),
                timezone: state.meetingTimezone,
                projects: getProjects().slice(0, 40),
                tags: getTags().slice(0, 80),
                statuses: statuses.map(e => e.id),
                priorities: Object.keys(priorityLabels),
                capabilities: ["create_task", "create_event", "complete_task", "bulk_complete_tasks", "reopen_task", "change_task_status", "bulk_change_task_status", "edit_task_title", "edit_task_project", "edit_task_tags", "edit_task_notes", "edit_task_steps", "plan_task_time", "delete_task", "bulk_delete_tasks", "duplicate_task", "edit_event", "bulk_edit_events", "delete_event", "bulk_delete_events", "create_follow_up_task", "sync_workspace", "sync_google_calendar"]
            }),
            signal: n.signal
        })
          , s = await a.json().catch( () => null);
        if (!a.ok)
            throw codedError("TF-AI-001", "TaskFlow will still create the task without AI.");
        return normalizeAiParsedCapture(s?.task || s, e)
    } finally {
        window.clearTimeout(a)
    }
}
function getAiConfig() {
    const e = window.TASKFLOW_AI || DEFAULT_AI_CONFIG;
    return {
        endpoint: String(e.endpoint || "").trim(),
        timeoutMs: Math.min(3e4, Math.max(5e3, Number(e.timeoutMs) || DEFAULT_AI_CONFIG.timeoutMs))
    }
}
function normalizeAiParsedCapture(e, t) {
    const n = parseQuickTask(t)
      , a = Array.isArray(e?.tags) ? e.tags.map(cleanToken).filter(Boolean) : n.tags
      , s = Array.isArray(e?.subtasks) ? e.subtasks.map(e => "string" == typeof e ? e : e?.text).map(cleanTitle).filter(Boolean).slice(0, 12) : n.subtasks
      , i = String(e?.priority || n.priority || "medium").toLowerCase()
      , o = String(e?.status || n.status || "").toLowerCase()
      , r = String(e?.recurrence || n.recurrence || "none").toLowerCase()
      , l = String(e?.energy || n.energy || "medium").toLowerCase()
      , c = Number(e?.estimate || e?.estimateMinutes || n.estimate || 0);
    return {
        title: cleanTitle(e?.title || n.title || t),
        project: cleanTitle(e?.project || n.project || defaultProject()),
        priority: ["urgent", "high", "medium", "low"].includes(i) ? i : "medium",
        status: statuses.some(e => e.id === o) ? o : "",
        dueDate: normalizeAiDate(e?.dueDate || e?.due_date || n.dueDate),
        dueTime: normalizeClockValue(e?.dueTime || e?.due_time || n.dueTime),
        plannedDate: normalizeAiDate(e?.plannedDate || e?.planned_date || n.plannedDate),
        plannedStart: normalizeClockValue(e?.plannedStart || e?.planned_start || n.plannedStart),
        plannedEnd: normalizeClockValue(e?.plannedEnd || e?.planned_end || n.plannedEnd),
        tags: unique(a).slice(0, 10),
        estimate: Number.isFinite(c) ? Math.max(0, Math.min(1440, Math.round(c))) : 0,
        energy: ["low", "medium", "high"].includes(l) ? l : "medium",
        recurrence: ["none", "daily", "weekly", "monthly"].includes(r) ? r : "none",
        notes: cleanTitle(e?.notes || n.notes || ""),
        subtasks: s
    }
}
function normalizeAiDate(e) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(e || "")) ? String(e) : ""
}
function buildTaskFromParsedCapture(e, t) {
    const n = e.dueDate || e.due_date || ""
      , a = isValidTime(e.dueTime) ? e.dueTime : ""
      , s = normalizeAiDate(e.plannedDate || e.planned_date)
      , i = normalizeClockValue(e.plannedStart || e.planned_start)
      , o = normalizeClockValue(e.plannedEnd || e.planned_end);
    return normalizeTask({
        id: uid(),
        title: e.title || t,
        project: e.project || defaultProject(),
        priority: e.priority || "medium",
        status: e.status || (n ? "planned" : "backlog"),
        dueDate: n,
        dueTime: a,
        plannedDate: s,
        plannedStart: i,
        plannedEnd: o,
        tags: e.tags || [],
        estimate: e.estimate || 0,
        energy: e.energy || "medium",
        recurrence: e.recurrence || "none",
        notes: withPlanningNote(withDueTimeNote(e.notes || "", a), {
            plannedDate: s,
            plannedStart: i,
            plannedEnd: o
        }),
        subtasks: (e.subtasks || []).map(e => ({
            id: uid(),
            text: "string" == typeof e ? e : e.text,
            done: Boolean("object" == typeof e && e.done)
        })),
        createdAt: (new Date).toISOString(),
        completedAt: null
    })
}
function autosizeQuickInput() {
    els.quickInput.style.height = "auto",
    els.quickInput.value.trim() ? els.quickInput.style.height = `${Math.min(116, Math.max(34, els.quickInput.scrollHeight))}px` : els.quickInput.style.height = "34px"
}
function parseQuickTask(e) {
    const t = e.split(/\r?\n/).map(cleanTitle).filter(Boolean)
      , n = e
      , a = t.slice(1);
    e = t[0] || e;
    const s = [];
    let i = ""
      , o = ""
      , r = ""
      , l = ""
      , c = 0
      , d = "medium"
      , u = "none"
      , g = e
      , p = [...a];
    g = g.replace(/#([\w-]+)/g, (e, t) => (s.push(cleanToken(t)),
    "")),
    g = g.replace(/@([\w-]+)/g, (e, t) => (i = cleanTitle(t.replace(/-/g, " ")),
    "")),
    g = g.replace(/!(urgent|high|medium|low)/gi, (e, t) => (o = t.toLowerCase(),
    "")),
    g = g.replace(/\b(urgent|high|medium|low)\s+priority\b/gi, (e, t) => (o = t.toLowerCase(),
    "")),
    g = g.replace(/\b(urgent|important|asap)\b/gi, e => (o || (o = "urgent" === e.toLowerCase() ? "urgent" : "high"),
    "")),
    g = g.replace(/(?:^|\s)(\d+)\s?(m|min|mins|h|hr|hrs)(?=\s|$)/i, (e, t, n) => {
        const a = Number(t);
        return c = n.toLowerCase().startsWith("h") ? 60 * a : a,
        " "
    }
    ),
    g = g.replace(/\b(low|medium|high)\s+energy\b/i, (e, t) => (d = t.toLowerCase(),
    "")),
    g = g.replace(/\b(every day|daily)\b/i, () => (u = "daily",
    "")),
    g = g.replace(/\b(every week|weekly)\b/i, () => (u = "weekly",
    "")),
    g = g.replace(/\b(every month|monthly)\b/i, () => (u = "monthly",
    ""));
    const m = extractDueTime(g);
    m && (l = m.dueTime,
    g = m.text);
    const f = g.match(/\b\d{4}-\d{2}-\d{2}\b/);
    f && (r = f[0],
    g = g.replace(f[0], ""));
    const y = extractRelativeDueDate(g);
    !r && y && (r = y.dueDate),
    y && (g = y.text);
    const h = g.match(/\b(?:(next|this)\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
    !r && h && (r = nextWeekdayISO(h[2], "next" === h[1]?.toLowerCase()),
    g = g.replace(h[0], "")),
    g = g.replace(/\b(?:by|due|on|for|before|at|around|about|remind me to|i need to|need to|i have to|have to|got to|gotta|please|maybe)\b/gi, " ");
    const k = g.match(/\b(?:make|add|with|include)?\s*(?:steps|subtasks|sub steps|breakdown)\s+(?:for|to|of|:)?\s*(.+)$/i);
    k && (p.push(...splitSubtasks(k[1])),
    g = g.replace(k[0], ""));
    const S = g.split(/\.\s+/).map(cleanTitle).filter(Boolean);
    return S.length > 1 && (g = S.shift(),
    p.push(...S.flatMap(splitSubtasks))),
    p = unique(p.flatMap(splitSubtasks).map(e => e.replace(/^(and|then|also)\s+/i, "")).map(cleanTitle).filter(Boolean).filter(e => e.length > 2)).slice(0, 12),
    {
        title: cleanTitle(g),
        tags: unique(s),
        project: i,
        priority: o,
        dueDate: r,
        dueTime: l,
        estimate: c,
        energy: d,
        recurrence: u,
        notes: [p.length || n.length > e.length + 20 ? `Captured from: ${n}` : ""].filter(Boolean).join("\n"),
        subtasks: p
    }
}
function extractDueTime(e) {
    const t = [/\b(?:at|by|before|around|about)?\s*(noon|midday|midnight)\b/i, /\b(?:at|by|before|around|about)?\s*(\d{1,2})(?::([0-5]\d))?\s*(a\.?m\.?|p\.?m\.?)\b/i, /\b(?:at|by|before|around|about)?\s*([01]?\d|2[0-3]):([0-5]\d)\b/i, /\b(?:at|by|before|around|about)?\s*(\d{1,2})\s*o'?clock\b/i];
    for (const n of t) {
        const t = e.match(n);
        if (!t)
            continue;
        const a = normalizeTimeMatch(t, /\b(tonight|evening|night|tonite)\b/i.test(e));
        if (a)
            return {
                dueTime: a,
                text: e.replace(t[0], " ")
            }
    }
    return null
}
function normalizeTimeMatch(e, t=!1) {
    const n = e[1]?.toLowerCase();
    if ("noon" === n || "midday" === n)
        return "12:00";
    if ("midnight" === n)
        return "00:00";
    if (e[3] && /a|p/i.test(e[3])) {
        let t = Number(e[1]);
        const n = Number(e[2] || 0)
          , a = e[3].toLowerCase().replace(/\./g, "");
        return t < 1 || t > 12 ? "" : ("pm" === a && 12 !== t && (t += 12),
        "am" === a && 12 === t && (t = 0),
        `${String(t).padStart(2, "0")}:${String(n).padStart(2, "0")}`)
    }
    if (e[2] && !e[3])
        return `${String(Number(e[1])).padStart(2, "0")}:${String(Number(e[2])).padStart(2, "0")}`;
    const a = Number(e[1]);
    return a < 1 || a > 12 ? "" : `${String(t && a < 12 ? a + 12 : a).padStart(2, "0")}:00`
}
function extractRelativeDueDate(e) {
    const t = [[/\b(later today|this morning|this afternoon|this arvo|this avo|this evening|this night|end of day|tonight|tonite|today|eod)\b/i, 0], [/\b(day after tomorrow)\b/i, 2], [/\b(tomorrow morning|tomorrow afternoon|tomorrow evening|tomorrow night|tomorrow|tmrw)\b/i, 1], [/\b(next week|in a week)\b/i, 7]];
    for (const [s,i] of t) {
        const t = e.match(s);
        if (t)
            return {
                dueDate: addDaysISO(i),
                text: e.replace(t[0], " ")
            }
    }
    const n = e.match(/\bin\s+(\d+)\s+(day|days|week|weeks)\b/i);
    if (n)
        return {
            dueDate: addDaysISO(Number(n[1]) * (n[2].toLowerCase().startsWith("week") ? 7 : 1)),
            text: e.replace(n[0], " ")
        };
    const a = e.match(/\b(this weekend|weekend|next weekend)\b/i);
    return a ? {
        dueDate: nextWeekdayISO("saturday", a[1].toLowerCase().startsWith("next")),
        text: e.replace(a[0], " ")
    } : null
}
function splitSubtasks(e) {
    return String(e || "").split(/,|;|\s+-\s+|\s+and\s+|\s+then\s+/i).map(cleanTitle).filter(Boolean)
}
function nextWeekdayISO(e, t=!1) {
    const n = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(e.toLowerCase())
      , a = new Date;
    let s = n - a.getDay();
    return (s < 0 || t || 0 === s) && (s += 7),
    toISODate(addDays(a, s))
}
function openTaskDialog(e=null) {
    hydrateDialogOptions();
    const t = state.tasks.find(t => t.id === e);
    els.taskId.value = t?.id || "",
    els.dialogTitle.textContent = t ? "Edit task" : "New task",
    els.titleInput.value = t?.title || "",
    els.projectInput.value = t?.project || defaultProject(),
    els.statusInput.value = t?.status || "backlog",
    els.priorityInput.value = t?.priority || "medium",
    els.dueInput.value = t?.dueDate || "",
    els.dueTimeInput.value = t?.dueTime || "",
    els.plannedDateInput.value = t?.plannedDate || "",
    els.plannedStartInput.value = t?.plannedStart || "",
    els.plannedEndInput.value = t?.plannedEnd || "",
    els.estimateInput.value = t?.estimate || "",
    els.energyInput.value = t?.energy || "medium",
    els.recurrenceInput.value = t?.recurrence || "none",
    els.tagsInput.value = t?.tags.join(", ") || "",
    els.notesInput.value = displayNotes(t || {}),
    els.deleteTaskBtn.style.visibility = t ? "visible" : "hidden",
    els.duplicateTaskBtn.disabled = !t,
    els.subtaskList.innerHTML = "",
    (t?.subtasks || []).forEach(e => addSubtaskRow(e)),
    (t?.subtasks || []).length || addSubtaskRow(),
    els.taskDialog.showModal(),
    els.titleInput.focus(),
    refreshIcons()
}
function hydrateDialogOptions() {
    els.statusInput.innerHTML = statuses.map(e => `<option value="${e.id}">${e.label}</option>`).join(""),
    els.projectSuggestions.innerHTML = getProjects().map(e => `<option value="${escapeAttr(e)}"></option>`).join("")
}
function addSubtaskRow(e=null) {
    const t = document.createElement("div");
    t.className = "subtask-row",
    t.dataset.subtaskId = e?.id || uid(),
    t.innerHTML = `\n    <input type="checkbox" ${e?.done ? "checked" : ""} aria-label="Complete subtask" />\n    <input type="text" value="${escapeAttr(e?.text || "")}" placeholder="Add a step" maxlength="120" />\n    <button class="chip-button" type="button" aria-label="Remove subtask"><i data-lucide="x"></i></button>\n  `,
    t.querySelector("button").addEventListener("click", () => t.remove()),
    els.subtaskList.appendChild(t),
    refreshIcons()
}
function saveTaskFromDialog(e) {
    e.preventDefault();
    const t = els.taskId.value || uid()
      , n = state.tasks.find(e => e.id === t)
      , a = els.statusInput.value
      , s = normalizeTask({
        id: t,
        title: cleanTitle(els.titleInput.value),
        project: cleanTitle(els.projectInput.value) || defaultProject(),
        status: a,
        priority: els.priorityInput.value,
        dueDate: els.dueInput.value,
        dueTime: els.dueTimeInput.value,
        plannedDate: els.plannedDateInput.value,
        plannedStart: els.plannedStartInput.value,
        plannedEnd: els.plannedEndInput.value,
        estimate: Number(els.estimateInput.value || 0),
        energy: els.energyInput.value,
        recurrence: els.recurrenceInput.value,
        tags: parseTags(els.tagsInput.value),
        notes: withPlanningNote(withDueTimeNote(els.notesInput.value.trim(), els.dueTimeInput.value), {
            plannedDate: els.plannedDateInput.value,
            plannedStart: els.plannedStartInput.value,
            plannedEnd: els.plannedEndInput.value
        }),
        subtasks: collectSubtasks(),
        createdAt: n?.createdAt || (new Date).toISOString(),
        completedAt: "done" === a ? n?.completedAt || (new Date).toISOString() : null,
        updatedAt: (new Date).toISOString()
    });
    if (n) {
        if (!allowWorkspaceChange({
            tasks: state.tasks.map(e => e.id === t ? s : e)
        }))
            return;
        state.tasks = state.tasks.map(e => e.id === t ? s : e)
    } else {
        if (!allowWorkspaceChange({
            tasks: [s, ...state.tasks]
        }))
            return;
        state.tasks.unshift(s)
    }
    persist(),
    els.taskDialog.close(),
    renderAll(),
    toast(n ? "Task updated" : "Task created")
}
function collectSubtasks() {
    return [...els.subtaskList.querySelectorAll(".subtask-row")].map(e => ({
        id: e.dataset.subtaskId || uid(),
        text: cleanTitle(e.querySelector("input[type='text']").value),
        done: e.querySelector("input[type='checkbox']").checked
    })).filter(e => e.text)
}
function handleDeleteFromDialog() {
    const e = els.taskId.value;
    e && confirmAction("Delete task?", "This removes the task and all subtasks from your synced account.", () => {
        createRestorePoint("Before deleting a task", {
            force: !0
        }),
        state.tasks = state.tasks.filter(t => t.id !== e),
        selectedTasks.delete(e),
        persist(),
        deleteCloudTasks([e]).catch(e => console.warn("Cloud delete failed", e)),
        els.taskDialog.close(),
        renderAll(),
        toast("Task deleted")
    }
    )
}
function handleDuplicateFromDialog() {
    const e = els.taskId.value
      , t = state.tasks.find(t => t.id === e);
    if (!t)
        return;
    const n = normalizeTask({
        ...t,
        id: uid(),
        title: `${t.title} copy`,
        status: "done" === t.status ? "backlog" : t.status,
        createdAt: (new Date).toISOString(),
        completedAt: null,
        subtasks: t.subtasks.map(e => ({
            ...e,
            id: uid()
        }))
    });
    allowWorkspaceChange({
        tasks: [n, ...state.tasks]
    }) && (state.tasks.unshift(n),
    persist(),
    els.taskDialog.close(),
    renderAll(),
    toast("Task duplicated"))
}
function openMeetingDialog(e=null) {
    const t = state.meetings.find(t => t.id === e);
    state.activeMeetingId = t?.id || null,
    els.meetingId.value = t?.id || "",
    els.meetingDialogTitle.textContent = t ? "Edit event" : "New event",
    els.meetingTitleInput.value = t?.title || "",
    els.meetingSubjectInput.value = t?.subject || "",
    els.meetingStatusInput.value = t?.status || "scheduled",
    els.meetingDateInput.value = t?.date || todayISO(),
    els.meetingStartInput.value = t?.startTime || "09:00",
    els.meetingEndInput.value = t?.endTime || "",
    els.meetingRecurrenceInput.value = t?.recurrence || "fortnightly",
    els.meetingRepeatUntilInput.value = t?.recurrenceEndDate || "",
    els.meetingTeacherInput.value = t?.teacher || "",
    els.meetingLocationInput.value = t?.location || "",
    els.meetingTopicInput.value = t?.topic || "",
    els.meetingNotesInput.value = t?.notes || "",
    els.deleteMeetingBtn.style.visibility = t ? "visible" : "hidden",
    els.meetingCreateTaskBtn.disabled = !t,
    els.meetingDialog.showModal(),
    els.meetingTitleInput.focus(),
    refreshIcons()
}
function saveMeetingFromDialog(e) {
    e.preventDefault();
    const t = state.meetings.find(e => e.id === els.meetingId.value)
      , n = normalizeMeeting({
        id: t?.id || uid(),
        seriesId: t?.seriesId || uid(),
        title: els.meetingTitleInput.value,
        subject: els.meetingSubjectInput.value || inferSubject(els.meetingTitleInput.value),
        status: els.meetingStatusInput.value,
        date: els.meetingDateInput.value,
        startTime: els.meetingStartInput.value,
        endTime: els.meetingEndInput.value,
        recurrence: els.meetingRecurrenceInput.value,
        recurrenceEndDate: els.meetingRepeatUntilInput.value,
        teacher: els.meetingTeacherInput.value,
        location: els.meetingLocationInput.value,
        topic: els.meetingTopicInput.value,
        notes: els.meetingNotesInput.value,
        linkedTaskIds: t?.linkedTaskIds || [],
        importedUid: t?.importedUid || "",
        createdAt: t?.createdAt || (new Date).toISOString(),
        updatedAt: (new Date).toISOString()
    });
    if (t) {
        if (!allowWorkspaceChange({
            meetings: state.meetings.map(e => e.id === t.id ? n : e)
        }))
            return;
        state.meetings = state.meetings.map(e => e.id === t.id ? n : e),
        markMeetingsPending([n.id])
    } else {
        const e = generateMeetingOccurrences(n)
          , t = new Set(state.meetings.map(meetingOccurrenceKey))
          , a = e.filter(e => !t.has(meetingOccurrenceKey(e)));
        if (!allowWorkspaceChange({
            meetings: [...state.meetings, ...a]
        }))
            return;
        state.meetings.push(...a),
        markMeetingsPending(a.map(e => e.id))
    }
    state.meetings = sortMeetings(state.meetings.map(normalizeMeeting)),
    persist(),
    els.meetingDialog.close(),
    renderAll(),
    toast(t ? "Event updated" : "Events scheduled")
}
function handleDeleteMeetingFromDialog() {
    const e = els.meetingId.value;
    e && confirmAction("Delete event?", "This removes this event occurrence from your synced account.", () => {
        createRestorePoint("Before deleting an event", {
            force: !0
        }),
        state.meetings = state.meetings.filter(t => t.id !== e),
        persist(),
        deleteCloudMeetings([e]).catch(e => console.warn("Cloud meeting delete failed", e)),
        els.meetingDialog.close(),
        renderAll(),
        toast("Event deleted")
    }
    )
}
function handleDeleteMeetingsScope(e) {
    e.preventDefault();
    const t = els.deleteMeetingsScope.value
      , n = meetingsInDeleteScope(t);
    els.deleteMeetingsDialog.close(),
    n.length ? confirmAction(`Delete ${deleteScopeLabel(t)} events?`, `${n.length} ${1 === n.length ? "event" : "events"} will be removed from your synced account.`, () => {
        createRestorePoint(`Before deleting ${deleteScopeLabel(t).toLowerCase()} events`, {
            force: !0
        });
        const e = n.map(e => e.id);
        state.meetings = state.meetings.filter(t => !e.includes(t.id)),
        persist(),
        deleteCloudMeetings(e).catch(e => console.warn("Cloud meeting delete failed", e)),
        renderAll(),
        toast(`${n.length} ${1 === n.length ? "event" : "events"} deleted`)
    }
    ) : toast(`No events found for ${deleteScopeLabel(t).toLowerCase()}`)
}
function meetingsInDeleteScope(e) {
    const t = todayISO()
      , n = addDaysISO(1)
      , a = addDaysISO(6 - parseISODate(t).getDay(), t)
      , s = t.slice(0, 7)
      , i = t.slice(0, 4);
    return state.meetings.filter(o => "today" === e ? o.date === t : "tomorrow" === e ? o.date === n : "week" === e ? o.date >= t && o.date <= a : "month" === e ? o.date.startsWith(s) : "year" !== e || o.date.startsWith(i))
}
function deleteScopeLabel(e) {
    return {
        today: "Today",
        tomorrow: "Tomorrow",
        week: "This week",
        month: "This month",
        year: "This year",
        all: "All"
    }[e] || "Selected"
}
function updateMeetingStatus(e, t) {
    state.meetings = state.meetings.map(n => n.id === e ? normalizeMeeting({
        ...n,
        status: t,
        updatedAt: (new Date).toISOString()
    }) : n),
    markMeetingsPending([e]),
    persist(),
    renderAll(),
    toast("done" === t ? "Event marked done" : "Event updated")
}
function createTaskFromMeetingDialog() {
    const e = state.meetings.find(e => e.id === els.meetingId.value);
    e && createTaskFromMeeting(e.id)
}
function createTaskFromMeeting(e, t={}) {
    const n = state.meetings.find(t => t.id === e);
    if (!n)
        return;
    const a = normalizeTask({
        id: uid(),
        title: `${n.subject}: follow up from ${n.title}`,
        project: n.subject || "Events",
        status: "backlog",
        priority: "medium",
        dueDate: nextMeetingDate(n.date, "none" === n.recurrence ? "weekly" : n.recurrence),
        dueTime: n.startTime,
        estimate: 30,
        energy: "medium",
        recurrence: "none",
        tags: ["event", cleanToken(n.subject)].filter(Boolean),
        notes: `From event: ${n.title} on ${formatMeetingDateTime(n)}`,
        subtasks: [],
        createdAt: (new Date).toISOString(),
        completedAt: null
    });
    if (state.tasks.unshift(a),
    allowWorkspaceChange({
        tasks: state.tasks
    }))
        return state.meetings = state.meetings.map(e => e.id === n.id ? normalizeMeeting({
            ...e,
            linkedTaskIds: unique([...e.linkedTaskIds, a.id]),
            updatedAt: (new Date).toISOString()
        }) : e),
        markMeetingsPending([n.id]),
        persist(),
        renderAll(),
        !1 !== t.open && openTaskDialog(a.id),
        t.quiet || toast("Follow-up task created"),
        a;
    state.tasks = state.tasks.filter(e => e.id !== a.id)
}
function updateTaskStatus(e, t, n={}) {
    const a = state.tasks.find(t => t.id === e);
    a && a.status !== t && (a.status = t,
    a.completedAt = "done" === t ? (new Date).toISOString() : null,
    "done" === t && (a.subtasks = a.subtasks.map(e => ({
        ...e,
        done: !0
    }))),
    a.updatedAt = (new Date).toISOString(),
    persist(),
    renderAll(),
    n.quiet || toast(`${a.title} changed to ${statusLabel(t)}`))
}
function toggleComplete(e) {
    const t = state.tasks.find(t => t.id === e);
    if (t) {
        if ("done" === t.status)
            t.status = "progress",
            t.completedAt = null,
            t.updatedAt = (new Date).toISOString(),
            toast("Task reopened");
        else if (t.status = "done",
        t.completedAt = (new Date).toISOString(),
        t.subtasks = t.subtasks.map(e => ({
            ...e,
            done: !0
        })),
        t.updatedAt = (new Date).toISOString(),
        "none" !== t.recurrence) {
            const e = createRecurringCopy(t);
            allowWorkspaceChange({
                tasks: [e, ...state.tasks]
            }) ? (state.tasks.unshift(e),
            toast("Task completed and next recurrence scheduled")) : toast("Task completed")
        } else
            toast("Task completed");
        persist(),
        renderAll()
    }
}
function createRecurringCopy(e) {
    const t = e.dueDate || todayISO()
      , n = "daily" === e.recurrence ? addDaysISO(1, t) : "weekly" === e.recurrence ? addDaysISO(7, t) : toISODate(addMonths(parseISODate(t), 1));
    return normalizeTask({
        ...e,
        id: uid(),
        status: "planned",
        dueDate: n,
        createdAt: (new Date).toISOString(),
        completedAt: null,
        subtasks: e.subtasks.map(e => ({
            ...e,
            id: uid(),
            done: !1
        }))
    })
}
function bulkStatus(e) {
    const t = (new Date).toISOString();
    state.tasks = state.tasks.map(n => selectedTasks.has(n.id) ? {
        ...n,
        status: e,
        completedAt: "done" === e ? (new Date).toISOString() : null,
        updatedAt: t
    } : n),
    selectedTasks.clear(),
    persist(),
    renderAll(),
    toast("Bulk action applied")
}
function bulkDelete() {
    selectedTasks.size && confirmAction("Delete selected tasks?", `${selectedTasks.size} selected tasks will be removed from your synced account.`, () => {
        createRestorePoint("Before deleting selected tasks", {
            force: !0
        });
        const e = [...selectedTasks];
        state.tasks = state.tasks.filter(e => !selectedTasks.has(e.id)),
        selectedTasks.clear(),
        persist(),
        deleteCloudTasks(e).catch(e => console.warn("Cloud delete failed", e)),
        renderAll(),
        toast("Selected tasks deleted")
    }
    )
}
function deleteDoneTasks() {
    const e = state.tasks.filter(e => "done" === e.status);
    e.length ? confirmAction("Delete all done tasks?", `${e.length} completed ${1 === e.length ? "task" : "tasks"} will be removed from your synced account.`, () => {
        createRestorePoint("Before deleting done tasks", {
            force: !0
        });
        const t = e.map(e => e.id);
        state.tasks = state.tasks.filter(e => "done" !== e.status),
        t.forEach(e => {
            selectedTasks.delete(e),
            state.pendingSyncIds.delete(e)
        }
        ),
        savePendingSyncs(),
        persist(),
        deleteCloudTasks(t).catch(e => console.warn("Cloud delete failed", e)),
        renderAll(),
        recordSyncActivity("sync", "warning", "Done tasks deleted", {
            tasks: t.length
        }),
        toast(`${t.length} done ${1 === t.length ? "task" : "tasks"} deleted`)
    }
    ) : toast("No done tasks to delete")
}
function autoDeleteExpiredDoneTasks(e={}) {
    const t = normalizeAutoDeleteDoneDays(state.autoDeleteDoneDays);
    if (!t)
        return 0;
    const n = Date.now() - 24 * t * 60 * 60 * 1e3
      , a = state.tasks.filter(e => {
        if ("done" !== e.status || !e.completedAt)
            return !1;
        const t = new Date(e.completedAt).getTime();
        return Number.isFinite(t) && t <= n
    }
    );
    if (!a.length)
        return 0;
    const s = a.map(e => e.id);
    return state.tasks = state.tasks.filter(e => !s.includes(e.id)),
    s.forEach(e => {
        selectedTasks.delete(e),
        state.pendingSyncIds.delete(e)
    }
    ),
    savePendingSyncs(),
    saveWorkspaceLocal(new Date),
    deleteCloudTasks(s).catch(e => console.warn("Auto delete sync failed", e)),
    recordSyncActivity("sync", "info", "Completed tasks auto-deleted", {
        tasks: s.length
    }, {
        dedupeMs: 3e5
    }),
    e.quiet || toast(`${s.length} completed ${1 === s.length ? "task" : "tasks"} auto-deleted`),
    s.length
}
function confirmAction(e, t, n) {
    els.confirmTitle.textContent = e,
    els.confirmMessage.textContent = t;
    const a = new AbortController;
    els.confirmDialog.addEventListener("close", () => {
        "confirm" === els.confirmDialog.returnValue && n(),
        a.abort()
    }
    , {
        signal: a.signal
    }),
    els.confirmDialog.showModal()
}
function clearFilters() {
    state.filters = {
        search: "",
        project: "all",
        tag: "all",
        priority: "all",
        due: "all",
        sort: "due"
    },
    renderAll()
}
function exportTasks() {
    const e = workspaceBackupPayload(new Date);
    downloadJson(e, `taskflow-backup-${todayISO()}.json`),
    recordSyncActivity("export", "success", "Backup exported", restorePointCounts(e)),
    toast("Backup exported")
}
function downloadJson(e, t) {
    const n = new Blob([JSON.stringify(e, null, 2)],{
        type: "application/json"
    })
      , a = URL.createObjectURL(n)
      , s = document.createElement("a");
    s.href = a,
    s.download = t,
    document.body.appendChild(s),
    s.click(),
    s.remove(),
    URL.revokeObjectURL(a)
}
function importTasks(e) {
    const t = e.target.files?.[0];
    if (!t)
        return;
    const n = new FileReader;
    n.onload = () => {
        try {
            const t = JSON.parse(String(n.result))
              , a = Array.isArray(t) ? t : t.tasks
              , s = Array.isArray(t?.meetings) ? t.meetings : []
              , i = normalizeGeneralNotes(t?.generalNotes)
              , o = normalizeUnifiedLayout(t?.unifiedLayout || state.unifiedLayout)
              , r = normalizeUnifiedPresets(t?.unifiedPresets || state.unifiedPresets);
            if (!Array.isArray(a))
                throw new Error("Missing tasks array");
            const l = state.tasks.map(e => e.id)
              , c = state.meetings.map(e => e.id)
              , d = a.map(normalizeTask)
              , u = s.map(normalizeMeeting);
            if (!allowWorkspaceChange({
                tasks: d,
                meetings: u,
                generalNotes: i,
                unifiedLayout: o,
                unifiedPresets: r
            }))
                return void (e.target.value = "");
            createRestorePoint("Before import", {
                force: !0
            }),
            state.tasks = d,
            state.meetings = u,
            state.generalNotes = i,
            state.unifiedLayout = o,
            state.unifiedPresets = r,
            saveUnifiedLayout(),
            saveUnifiedPresetsLocal(),
            topUpRecurringMeetings(),
            markMeetingsPending(state.meetings.map(e => e.id)),
            selectedTasks.clear();
            const g = new Set(state.tasks.map(e => e.id))
              , p = new Set(state.meetings.map(e => e.id));
            clearTaskTombstones([...g]),
            clearMeetingTombstones([...p]),
            persist();
            const m = l.filter(e => !g.has(e))
              , f = c.filter(e => !p.has(e));
            deleteCloudTasks(m).catch(e => console.warn("Cloud delete failed", e)),
            deleteCloudMeetings(f).catch(e => console.warn("Cloud meeting delete failed", e)),
            renderAll(),
            recordSyncActivity("import", "success", "Workspace imported", {
                tasks: state.tasks.length,
                events: state.meetings.length,
                notes: normalizeGeneralNotes(state.generalNotes).tabs.filter(e => e.content.trim()).length
            }),
            toast("Workspace imported and syncing")
        } catch (t) {
            recordSyncActivity("import", "error", "Backup import failed", {
                detail: String(t?.message || t || "").slice(0, 160)
            }),
            toast("Import failed: choose a TaskFlow JSON backup")
        } finally {
            e.target.value = ""
        }
    }
    ,
    n.readAsText(t)
}
async function importIcsMeetings(e) {
    const t = [...e.target.files || []];
    if (!t.length)
        return;
    let n = 0
      , a = 0
      , s = 0;
    const i = new Set(state.meetings.map(meetingOccurrenceKey))
      , o = []
      , r = [];
    for (const c of t)
        try {
            const e = parseIcsMeetings(await c.text());
            e.length || (s += 1),
            e.forEach(e => {
                const t = meetingOccurrenceKey(e);
                if (i.has(t))
                    return void (a += 1);
                i.add(t);
                const s = normalizeMeeting(e);
                r.push(s),
                o.push(s.id),
                n += 1
            }
            )
        } catch (l) {
            console.warn("ICS import failed", l),
            s += 1
        }
    allowWorkspaceChange({
        meetings: [...state.meetings, ...r]
    }) ? (state.meetings = sortMeetings([...state.meetings, ...r].map(normalizeMeeting)),
    markMeetingsPending(o),
    persist(),
    renderAll(),
    recordSyncActivity("import", "success", "ICS events imported", {
        imported: n,
        skipped: a,
        unsupported: s
    }),
    toast(`ICS import: ${n} added, ${a} skipped, ${s} unsupported`),
    e.target.value = "") : e.target.value = ""
}
function parseIcsMeetings(e) {
    return parseIcsEvents(e).flatMap(eventToMeetings)
}
function parseIcsEvents(e) {
    return (String(e || "").replace(/\r?\n[ \t]/g, "").match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || []).map(e => {
        const t = {};
        return e.split(/\r?\n/).forEach(e => {
            const n = e.indexOf(":");
            if (-1 === n)
                return;
            const a = e.slice(0, n)
              , s = decodeIcsText(e.slice(n + 1))
              , i = a.split(";")[0].toUpperCase()
              , o = a.split(";").slice(1).reduce( (e, t) => {
                const [n,a] = t.split("=");
                return e[n?.toUpperCase()] = a,
                e
            }
            , {});
            t[i] = {
                value: s,
                params: o
            }
        }
        ),
        t
    }
    )
}
function eventToMeetings(e) {
    const t = parseIcsDate(e.DTSTART, state.meetingTimezone);
    if (!t)
        return [];
    const n = parseIcsDate(e.DTEND, state.meetingTimezone)
      , a = cleanTitle(e.SUMMARY?.value || "Imported event")
      , s = inferSubject(a)
      , i = uuidFromString(e.UID?.value || `${a}-${t.date}-${t.time}`)
      , o = recurrenceFromRRule(e.RRULE?.value || "")
      , r = o.until || ""
      , l = normalizeMeeting({
        id: stableMeetingId(i, t.date, t.time),
        seriesId: i,
        title: a,
        subject: s,
        date: t.date,
        startTime: t.time,
        endTime: n?.time || "",
        recurrence: o.type,
        recurrenceEndDate: r,
        notes: e.DESCRIPTION?.value || "",
        location: e.LOCATION?.value || "",
        importedUid: e.UID?.value || i
    })
      , c = "none" === o.type ? [l] : generateMeetingOccurrences(l);
    return o.count ? c.slice(0, o.count) : c
}
function parseIcsDate(e) {
    const t = e?.value;
    if (!t)
        return null;
    if (/^\d{8}$/.test(t))
        return {
            date: `${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}`,
            time: "09:00"
        };
    const n = t.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
    if (!n)
        return null;
    const [,a,s,i,o,r] = n;
    return t.endsWith("Z") ? datePartsInTimezone(new Date(Date.UTC(Number(a), Number(s) - 1, Number(i), Number(o), Number(r))), state.meetingTimezone) : e?.params?.TZID && e.params.TZID !== state.meetingTimezone ? datePartsInTimezone(zonedTimeToDate({
        year: a,
        month: s,
        day: i,
        hour: o,
        minute: r
    }, e.params.TZID), state.meetingTimezone) : {
        date: `${a}-${s}-${i}`,
        time: `${o}:${r}`
    }
}
function datePartsInTimezone(e, t) {
    const n = new Intl.DateTimeFormat("en-CA",{
        timeZone: t,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
    }).formatToParts(e).reduce( (e, t) => ("literal" !== t.type && (e[t.type] = t.value),
    e), {});
    return {
        date: `${n.year}-${n.month}-${n.day}`,
        time: `${"24" === n.hour ? "00" : n.hour}:${n.minute}`
    }
}
function zonedTimeToDate(e, t) {
    const n = {
        year: Number(e.year),
        month: Number(e.month),
        day: Number(e.day),
        hour: Number(e.hour),
        minute: Number(e.minute)
    };
    let a = new Date(Date.UTC(n.year, n.month - 1, n.day, n.hour, n.minute));
    for (let s = 0; s < 2; s += 1) {
        const e = datePartsInTimezone(a, t)
          , s = Date.UTC(Number(e.date.slice(0, 4)), Number(e.date.slice(5, 7)) - 1, Number(e.date.slice(8, 10)), Number(e.time.slice(0, 2)), Number(e.time.slice(3, 5)))
          , i = Date.UTC(n.year, n.month - 1, n.day, n.hour, n.minute);
        a = new Date(a.getTime() + (i - s))
    }
    return a
}
function recurrenceFromRRule(e) {
    if (!e)
        return {
            type: "none",
            count: 0,
            until: ""
        };
    const t = Object.fromEntries(e.split(";").map(e => {
        const [t,n] = e.split("=");
        return [t?.toUpperCase(), n]
    }
    ));
    let n = "none";
    return "WEEKLY" === t.FREQ && (n = 2 === Number(t.INTERVAL || 1) ? "fortnightly" : "weekly"),
    "MONTHLY" === t.FREQ && (n = "monthly"),
    {
        type: n,
        count: Number(t.COUNT || 0),
        until: t.UNTIL && parseIcsDate({
            value: t.UNTIL
        }, state.meetingTimezone)?.date || ""
    }
}
function decodeIcsText(e) {
    return String(e || "").replace(/\\n/gi, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\")
}
function toggleTimer() {
    if (timer.running)
        return stopTimer(),
        renderActiveView(),
        void refreshIcons();
    timer.running = !0,
    timer.intervalId = window.setInterval( () => {
        timer.remaining = Math.max(0, timer.remaining - 1),
        document.querySelectorAll("#timerText, #unifiedTimerText").forEach(e => {
            e.textContent = formatTimer(timer.remaining)
        }
        ),
        0 === timer.remaining && (stopTimer(),
        showActivityPulse("Focus session complete", {
            kind: "notification"
        }),
        renderActiveView(),
        refreshIcons())
    }
    , 1e3),
    renderActiveView(),
    refreshIcons()
}
function stopTimer() {
    timer.running = !1,
    timer.intervalId && (window.clearInterval(timer.intervalId),
    timer.intervalId = null)
}
function resetTimer(e) {
    stopTimer(),
    timer.remaining = e,
    renderActiveView(),
    refreshIcons()
}
function getFocusMinutes() {
    const e = state.tasks.find(e => e.id === state.focusTaskId);
    return e?.estimate ? Math.min(90, Math.max(5, e.estimate)) : 25
}
function normalizeTask(e) {
    const t = String(e.notes || "")
      , n = isValidTime(e.dueTime) ? e.dueTime : dueTimeFromNotes(t)
      , a = plannedFieldsFromNotes(t)
      , s = /^\d{4}-\d{2}-\d{2}$/.test(e.plannedDate || "") ? e.plannedDate : a.plannedDate
      , i = isValidTime(e.plannedStart) ? e.plannedStart : a.plannedStart
      , o = isValidTime(e.plannedEnd) ? e.plannedEnd : a.plannedEnd;
    return {
        id: e.id || uid(),
        title: cleanTitle(e.title || "Untitled task"),
        project: cleanTitle(e.project || "Inbox"),
        status: statuses.some(t => t.id === e.status) ? e.status : "backlog",
        priority: priorityOrder[e.priority] ? e.priority : "medium",
        dueDate: e.dueDate || "",
        dueTime: n,
        plannedDate: s,
        plannedStart: i,
        plannedEnd: o,
        estimate: Number(e.estimate || 0),
        energy: ["low", "medium", "high"].includes(e.energy) ? e.energy : "medium",
        recurrence: ["none", "daily", "weekly", "monthly"].includes(e.recurrence) ? e.recurrence : "none",
        tags: unique((e.tags || []).map(cleanToken).filter(Boolean)),
        notes: t,
        subtasks: Array.isArray(e.subtasks) ? e.subtasks.map(e => ({
            id: e.id || uid(),
            text: cleanTitle(e.text || ""),
            done: Boolean(e.done)
        })).filter(e => e.text) : [],
        createdAt: e.createdAt || (new Date).toISOString(),
        completedAt: e.completedAt || null,
        updatedAt: e.updatedAt || e.updated_at || (new Date).toISOString(),
        encryptedLocked: Boolean(e.encryptedLocked)
    }
}
function normalizeMeeting(e) {
    const t = /^\d{4}-\d{2}-\d{2}$/.test(e?.date || "") ? e.date : todayISO()
      , n = normalizeClockValue(e?.startTime) || "09:00";
    return {
        id: coerceUuid(e?.id, `meeting-${e?.title || "event"}-${t}-${n}`),
        seriesId: coerceUuid(e?.seriesId || e?.id, `series-${e?.title || "event"}-${t}-${n}`),
        title: cleanTitle(e?.title || "Event"),
        subject: cleanTitle(e?.subject || inferSubject(e?.title || "") || "Events"),
        topic: cleanTitle(e?.topic || ""),
        teacher: cleanTitle(e?.teacher || ""),
        location: cleanTitle(e?.location || ""),
        date: t,
        startTime: n,
        endTime: normalizeClockValue(e?.endTime),
        recurrence: ["none", "weekly", "fortnightly", "monthly"].includes(e?.recurrence) ? e.recurrence : "none",
        recurrenceEndDate: /^\d{4}-\d{2}-\d{2}$/.test(e?.recurrenceEndDate || "") ? e.recurrenceEndDate : "",
        notes: String(e?.notes || ""),
        status: ["scheduled", "done", "cancelled"].includes(e?.status) ? e.status : "scheduled",
        linkedTaskIds: Array.isArray(e?.linkedTaskIds) ? e.linkedTaskIds.filter(Boolean) : [],
        importedUid: cleanTitle(e?.importedUid || ""),
        createdAt: e?.createdAt || (new Date).toISOString(),
        updatedAt: e?.updatedAt || (new Date).toISOString(),
        encryptedLocked: Boolean(e?.encryptedLocked)
    }
}
function normalizeGeneralNotes(e={}) {
    const t = parseGeneralNotesContent(e?.content)
      , n = Array.isArray(e?.tabs) ? e.tabs : t?.tabs
      , a = t?.content ?? e?.content ?? ""
      , s = (Array.isArray(n) && n.length ? n : [{
        id: "general",
        title: "General",
        content: a
    }]).map( (e, t) => ({
        id: cleanNoteTabId(e?.id || (0 === t ? "general" : uid())),
        title: cleanTitle(e?.title || (0 === t ? "General" : `Note ${t + 1}`)).slice(0, 28) || "Note",
        content: String(e?.content || "").slice(0, 5e3)
    })).filter( (e, t, n) => e.id && n.findIndex(t => t.id === e.id) === t);
    s.length || s.push({
        id: "general",
        title: "General",
        content: ""
    });
    const i = e?.activeTabId || t?.activeTabId
      , o = s.some(e => e.id === i) ? i : s[0].id
      , r = s.find(e => e.id === o)?.content || s[0].content || ""
      , l = s.some(e => e.content);
    return {
        content: r,
        tabs: s,
        activeTabId: o,
        updatedAt: e?.updatedAt || e?.updated_at || t?.updatedAt || (l ? (new Date).toISOString() : null)
    }
}
function parseGeneralNotesContent(e) {
    const t = String(e || "");
    if (!t.trim().startsWith("{"))
        return {
            content: t
        };
    try {
        const e = JSON.parse(t);
        if ("TaskFlow" === e?.app && "general-notes" === e?.type)
            return e
    } catch {
        return {
            content: t
        }
    }
    return {
        content: t
    }
}
function serializeGeneralNotesForCloud(e) {
    const t = normalizeGeneralNotes(e);
    return JSON.stringify({
        app: "TaskFlow",
        type: "general-notes",
        version: 2,
        updatedAt: t.updatedAt,
        activeTabId: t.activeTabId,
        tabs: t.tabs,
        customWallpaper: loadCustomWallpaper()
    })
}
function cleanNoteTabId(e) {
    return String(e || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || uid()
}
function sortMeetings(e) {
    return e.sort( (e, t) => e.date.localeCompare(t.date) || e.startTime.localeCompare(t.startTime))
}
function topUpRecurringMeetings() {
    const e = new Map;
    state.meetings.forEach(t => {
        if ("none" === t.recurrence)
            return;
        const n = t.seriesId || t.id
          , a = e.get(n);
        (!a || t.date < a.date) && e.set(n, t)
    }
    );
    const t = new Set(state.meetings.map(meetingOccurrenceKey))
      , n = [];
    return e.forEach(e => {
        generateMeetingOccurrences(e).forEach(e => {
            const a = meetingOccurrenceKey(e);
            t.has(a) || (t.add(a),
            n.push(e))
        }
        )
    }
    ),
    n.length && workspaceLimitStatus({
        meetings: [...state.meetings, ...n]
    }).allowed ? (state.meetings = sortMeetings([...state.meetings, ...n].map(normalizeMeeting)),
    n.map(e => e.id)) : []
}
function generateMeetingOccurrences(e) {
    const t = normalizeMeeting(e);
    if ("none" === t.recurrence)
        return [t];
    const n = toISODate(addMonths(new Date, 6))
      , a = t.recurrenceEndDate && t.recurrenceEndDate < n ? t.recurrenceEndDate : n
      , s = [];
    let i = t.date
      , o = 0;
    for (; i <= a && o < 80; )
        s.push(normalizeMeeting({
            ...t,
            id: 0 === o ? t.id : stableMeetingId(t.seriesId, i, t.startTime),
            date: i,
            notes: 0 === o ? t.notes : "",
            status: 0 === o ? t.status : "scheduled",
            linkedTaskIds: 0 === o ? t.linkedTaskIds : [],
            createdAt: t.createdAt,
            updatedAt: (new Date).toISOString()
        })),
        i = nextMeetingDate(i, t.recurrence),
        o += 1;
    return s
}
function nextMeetingDate(e, t) {
    return "weekly" === t ? addDaysISO(7, e) : "fortnightly" === t ? addDaysISO(14, e) : "monthly" === t ? toISODate(addMonths(parseISODate(e), 1)) : e
}
function meetingOccurrenceKey(e) {
    return `${e.importedUid || e.seriesId || e.id}|${e.date}|${e.startTime}`
}
function stableMeetingId(e, t, n) {
    return uuidFromString(`${e}-${t}-${n}`)
}
function uuidFromString(e) {
    let t = 0;
    const n = String(e || "");
    for (let s = 0; s < n.length; s += 1)
        t = 31 * t + n.charCodeAt(s) >>> 0;
    const a = `${t.toString(16).padStart(8, "0")}${Math.abs(2654435761 * n.length).toString(16).padStart(8, "0")}`.slice(0, 16);
    return `${a.slice(0, 8)}-${a.slice(8, 12)}-4${a.slice(13, 16)}-8${a.slice(3, 6)}-${a}${a}`.slice(0, 36)
}
function inferSubject(e) {
    const t = cleanTitle(e);
    return t ? t.split(/[-:|]/)[0].replace(/\b(class|meeting|lesson|event)\b/gi, "").trim() || t.split(" ")[0] : ""
}
function seedTasks() {
    const e = (new Date).toISOString();
    return [{
        title: "Plan the product launch",
        project: "Launch",
        status: "progress",
        priority: "urgent",
        dueDate: todayISO(),
        estimate: 90,
        energy: "high",
        recurrence: "none",
        tags: ["launch", "review"],
        notes: "Polish the first screen, check the mobile layout, and prepare a clear launch message.",
        subtasks: [{
            text: "Review first impression",
            done: !0
        }, {
            text: "Check mobile layout",
            done: !1
        }, {
            text: "Draft launch message",
            done: !1
        }],
        createdAt: e,
        completedAt: null
    }, {
        title: "Prepare weekly planning ritual",
        project: "Operations",
        status: "planned",
        priority: "high",
        dueDate: addDaysISO(2),
        estimate: 45,
        energy: "medium",
        recurrence: "weekly",
        tags: ["planning"],
        notes: "Review overdue work, pull in commitments, and choose three outcomes for the week.",
        subtasks: [{
            text: "Archive stale tasks",
            done: !1
        }, {
            text: "Choose weekly outcomes",
            done: !1
        }],
        createdAt: e,
        completedAt: null
    }, {
        title: "Collect receipts for finance review",
        project: "Admin",
        status: "waiting",
        priority: "medium",
        dueDate: addDaysISO(5),
        estimate: 30,
        energy: "low",
        recurrence: "monthly",
        tags: ["finance"],
        notes: "Waiting on invoices before closing the month.",
        subtasks: [],
        createdAt: e,
        completedAt: null
    }, {
        title: "Draft product notes for stakeholder review",
        project: "Launch",
        status: "backlog",
        priority: "medium",
        dueDate: addDaysISO(8),
        estimate: 60,
        energy: "high",
        recurrence: "none",
        tags: ["writing", "product"],
        notes: "Summarize decisions, open questions, and rollout risks.",
        subtasks: [],
        createdAt: e,
        completedAt: null
    }, {
        title: "Clean up completed demo data",
        project: "Admin",
        status: "done",
        priority: "low",
        dueDate: addDaysISO(-1),
        estimate: 15,
        energy: "low",
        recurrence: "none",
        tags: ["maintenance"],
        notes: "Keep the workspace readable.",
        subtasks: [{
            text: "Remove old labels",
            done: !0
        }],
        createdAt: e,
        completedAt: e
    }].map(e => normalizeTask({
        ...e,
        id: uid()
    }))
}
function getProjects() {
    return unique([...state.tasks.map(e => e.project || "Inbox"), ...state.meetings.map(e => e.subject || "Events")]).sort( (e, t) => e.localeCompare(t))
}
function getTags() {
    return unique(state.tasks.flatMap(e => e.tags)).sort( (e, t) => e.localeCompare(t))
}
function defaultProject() {
    return getProjects()[0] || "Inbox"
}
function countBy(e, t) {
    return e.reduce( (e, n) => {
        const a = n[t] || "None";
        return e[a] = (e[a] || 0) + 1,
        e
    }
    , {})
}
function groupTasksByDueDate(e) {
    return e.reduce( (e, t) => {
        const n = t.plannedDate || t.dueDate;
        return n ? (e.has(n) || e.set(n, []),
        e.get(n).push(t),
        e.get(n).sort( (e, t) => (e.plannedStart || e.dueTime || "99:99").localeCompare(t.plannedStart || t.dueTime || "99:99")),
        e) : e
    }
    , new Map)
}
function groupMeetingsByDate(e) {
    return e.reduce( (e, t) => t.date ? (e.has(t.date) || e.set(t.date, []),
    e.get(t.date).push(t),
    e.get(t.date).sort( (e, t) => e.startTime.localeCompare(t.startTime)),
    e) : e, new Map)
}
function filteredMeetingsForCalendar() {
    const {project: e, search: t} = state.filters;
    return sortMeetings(state.meetings.filter(n => ("all" === e || n.subject === e) && !(t && ![n.title, n.subject, n.topic, n.teacher, n.location].join(" ").toLowerCase().includes(t))))
}
function getDueClass(e) {
    return isOverdue(e) ? "due-overdue" : isToday(e.dueDate) ? "due-today" : ""
}
function isOverdue(e) {
    return Boolean(e.dueDate && "done" !== e.status && e.dueDate < todayISO())
}
function isToday(e) {
    return Boolean(e && e === todayISO())
}
function isUpcoming(e) {
    if (!e)
        return !1;
    const t = todayISO()
      , n = addDaysISO(7);
    return e > t && e <= n
}
function isWithinDays(e, t) {
    if (!e)
        return !1;
    const n = new Date(e).getTime();
    return Date.now() - n <= 24 * t * 60 * 60 * 1e3
}
function todayISO() {
    return toISODate(new Date)
}
function toISODate(e) {
    return new Date(e.getTime() - 6e4 * e.getTimezoneOffset()).toISOString().slice(0, 10)
}
function parseISODate(e) {
    const [t,n,a] = e.split("-").map(Number);
    return new Date(t,n - 1,a)
}
function addDaysISO(e, t=todayISO()) {
    const n = parseISODate(t);
    return n.setDate(n.getDate() + Number(e)),
    toISODate(n)
}
function addDays(e, t) {
    const n = new Date(e);
    return n.setDate(n.getDate() + t),
    n
}
function addMonths(e, t) {
    const n = new Date(e);
    return n.setMonth(n.getMonth() + t),
    n
}
function startOfMonth(e) {
    return new Date(e.getFullYear(),e.getMonth(),1)
}
function startOfWeek(e) {
    const t = new Date(e);
    return t.setDate(t.getDate() - t.getDay()),
    t
}
function formatDate(e) {
    return parseISODate(e).toLocaleDateString(userLocale(), {
        month: "short",
        day: "numeric"
    })
}
function formatFullDate(e) {
    return parseISODate(e).toLocaleDateString(userLocale(), {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}
function formatMeetingDateTime(e) {
    return `${formatDate(e.date)} ${formatMeetingTime(e)}`
}
function formatMeetingTime(e) {
    const t = formatClockTime(e.startTime)
      , n = e.endTime ? formatClockTime(e.endTime) : "";
    return n ? `${t}-${n}` : t
}
function formatDueLabel(e) {
    const t = formatDate(e.dueDate);
    return e.dueTime ? `${t} ${formatClockTime(e.dueTime)}` : t
}
function formatPlannedWorkLabel(e) {
    if (!e?.plannedDate)
        return "";
    const t = formatDate(e.plannedDate);
    return e.plannedStart ? `${t} ${formatClockTime(e.plannedStart)}${e.plannedEnd ? `-${formatClockTime(e.plannedEnd)}` : ""}` : t
}
function formatTaskCalendarLabel(e, t="") {
    if (e.plannedDate && e.plannedDate === t) {
        const t = e.plannedStart ? formatClockTime(e.plannedStart) : ""
          , n = e.plannedEnd ? `-${formatClockTime(e.plannedEnd)}` : "";
        return `${t ? `${t}${n} ` : ""}${e.title}`
    }
    return e.dueTime && e.dueDate === t ? `${formatClockTime(e.dueTime)} due ${e.title}` : e.title
}
function formatClockTime(e) {
    if (!isValidTime(e))
        return "";
    const [t,n] = e.split(":").map(Number);
    return new Date(2e3,0,1,t,n).toLocaleTimeString(userLocale(), {
        hour: "numeric",
        minute: "2-digit",
        hour12: !0
    })
}
function isValidTime(e) {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(e || ""))
}
function normalizeClockValue(e) {
    const t = String(e || "").trim().match(/^([01]?\d|2[0-3]):([0-5]\d)(?::\d{2})?$/);
    return t ? `${String(Number(t[1])).padStart(2, "0")}:${t[2]}` : ""
}
function dueTimeFromNotes(e) {
    const t = String(e || "").match(/^Due time:\s*(([01]\d|2[0-3]):[0-5]\d)\s*$/im);
    return t && isValidTime(t[1]) ? t[1] : ""
}
function stripDueTimeNote(e) {
    return String(e || "").split(/\r?\n/).filter(e => !/^Due time:\s*([01]\d|2[0-3]):[0-5]\d\s*$/i.test(e.trim())).join("\n").trim()
}
function withDueTimeNote(e, t) {
    const n = stripDueTimeNote(e);
    return isValidTime(t) ? [`Due time: ${t}`, n].filter(Boolean).join("\n") : n
}
function plannedFieldsFromNotes(e) {
    const t = String(e || "").match(/^Planned work:\s*(\d{4}-\d{2}-\d{2})(?:\s+(([01]\d|2[0-3]):[0-5]\d)(?:\s*-\s*(([01]\d|2[0-3]):[0-5]\d))?)?\s*$/im);
    return {
        plannedDate: t?.[1] || "",
        plannedStart: t?.[2] || "",
        plannedEnd: t?.[4] || ""
    }
}
function stripPlanningNote(e) {
    return String(e || "").split(/\r?\n/).filter(e => !/^Planned work:\s*\d{4}-\d{2}-\d{2}(?:\s+([01]\d|2[0-3]):[0-5]\d(?:\s*-\s*([01]\d|2[0-3]):[0-5]\d)?)?\s*$/i.test(e.trim())).join("\n").trim()
}
function withPlanningNote(e, t) {
    const n = stripPlanningNote(e)
      , a = /^\d{4}-\d{2}-\d{2}$/.test(t?.plannedDate || "") ? t.plannedDate : ""
      , s = isValidTime(t?.plannedStart) ? t.plannedStart : ""
      , i = isValidTime(t?.plannedEnd) ? t.plannedEnd : "";
    return a ? [`Planned work: ${a}${s ? ` ${s}${i ? `-${i}` : ""}` : ""}`, n].filter(Boolean).join("\n") : n
}
function displayNotes(e) {
    return stripPlanningNote(stripDueTimeNote(e.notes || ""))
}
function formatTimer(e) {
    const t = Math.floor(e / 60)
      , n = e % 60;
    return `${String(t).padStart(2, "0")}:${String(n).padStart(2, "0")}`
}
function parseTags(e) {
    return unique(String(e || "").split(/[,;#\s]+/).map(cleanToken).filter(Boolean))
}
function cleanTitle(e) {
    return String(e || "").replace(/\s+/g, " ").trim()
}
function cleanToken(e) {
    return String(e || "").toLowerCase().replace(/[^\w-]+/g, "").trim()
}
function unique(e) {
    return [...new Set(e.filter(Boolean))]
}
function uid() {
    return window.crypto?.randomUUID ? window.crypto.randomUUID() : uuidFromString(`task-${Date.now()}-${Math.random().toString(16).slice(2)}`)
}
function isUuid(e) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(e || ""))
}
function coerceUuid(e, t="") {
    return isUuid(e) ? String(e) : e ? uuidFromString(`${t}-${e}`) : uid()
}
function escapeHtml(e) {
    return String(e).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;")
}
function escapeAttr(e) {
    return escapeHtml(e).replaceAll("`", "&#096;")
}
function showActivityPulse(e, t={}) {
    const n = els.activityPulse;
    if (!n)
        return void toast(e);
    const a = "notification" === t.kind ? "notification" : "ai"
      , s = "ai" === a ? "wand-sparkles" : "bell";
    n.dataset.kind = a,
    n.innerHTML = `<i data-lucide="${s}"></i><span>${escapeHtml(e)}</span>`,
    n.classList.remove("is-hidden", "is-hiding", "is-active"),
    n.offsetWidth,
    n.classList.add("is-active"),
    window.clearTimeout(n._idleTimer),
    n._idleTimer = window.setTimeout( () => hideActivityPulse(), Number(t.duration || 3600)),
    refreshIcons()
}
function hideActivityPulse() {
    const e = els.activityPulse;
    if (e) {
        if (window.clearTimeout(e._idleTimer),
        !e.classList.contains("is-active"))
            return e.classList.add("is-hidden"),
            e.innerHTML = "",
            void e.removeAttribute("data-kind");
        e.classList.remove("is-active"),
        e.classList.add("is-hiding"),
        window.setTimeout( () => {
            e.classList.remove("is-hiding"),
            e.classList.add("is-hidden"),
            e.innerHTML = "",
            e.removeAttribute("data-kind")
        }
        , 280)
    }
}
function toast(e, t={}) {
    if ("ai" === t.kind || "notification" === t.kind || "activity" === t.surface)
        return void showActivityPulse(e, t);
    const n = document.createElement("div");
    n.className = "toast",
    n.textContent = e,
    els.toastContainer?.appendChild(n),
    window.setTimeout( () => {
        n.style.opacity = "0",
        n.style.transform = "translateY(8px)"
    }
    , 2600),
    window.setTimeout( () => n.remove(), 3200)
}
