const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatPrompt = document.getElementById("chatPrompt");
const startChat = document.getElementById("startChat");
const quickTopicsEl = document.getElementById("quickTopics");

const knowledgeBase = [
  {
    id: "attendance-tracking",
    category: "Attendance",
    audience: "student",
    question: "Why is my attendance not recorded?",
    answer:
      "Attendance is captured only when you watch the live or recorded session inside the Newton School portal at playback speeds of 1x or 1.5x. Downloaded videos or playback beyond 2x never count.",
    nextSteps: [
      "Open the session through the NS portal instead of a local download.",
      "Complete the entire video. Partial viewing will not unlock attendance.",
    ],
    escalation:
      "Still missing? Share a screen recording with support@newtonschool.co for deeper troubleshooting.",
    tags: ["attendance", "recorded attendance", "live attendance", "playback"],
  },
  {
    id: "attendance-types",
    category: "Attendance",
    audience: "student",
    question: "What are the attendance types?",
    answer:
      "Newton School tracks attendance in three buckets — Recorded Attendance (watching recordings), Live Attendance (attending live), and Overall Attendance (the metric used for eligibility).",
    nextSteps: [
      "You can improve your overall attendance through either live sessions or recordings.",
    ],
    tags: ["overall attendance", "recorded", "live"],
  },
  {
    id: "attendance-view",
    category: "Attendance",
    question: "Where can I see my attendance?",
    answer:
      "Head to the \"My Timeline\" section on the NS portal. Each module displays live, recorded, and overall attendance, plus shortcuts on the right to watch pending lectures.",
    tags: ["timeline", "view attendance"],
  },
  {
    id: "assignment-visibility",
    category: "Assignments",
    question: "Why is my assignment not visible?",
    answer:
      "Assignments are always tied to the module you are currently viewing. Switch to the correct module or learning unit inside My Timeline and re-open the Assignments filter.",
    tags: ["assignments", "timeline", "visibility"],
  },
  {
    id: "assignment-access",
    category: "Assignments",
    question:
      "I only have view access to the spreadsheet assignment. What should I do?",
    answer:
      "Spreadsheet assignments grant edit access exclusively to the registered email ID. Sign in using the email that is registered with Newton School and refresh the assignment.",
    tags: ["assignment access", "spreadsheet"],
  },
  {
    id: "assignment-sql-version",
    category: "Assignments",
    question: "Facing version issues in my SQL assignment?",
    answer:
      "For SQL assignment version issues, loop in Vicky for assistance so the right template can be shared.",
    escalation: "Tag Vicky in the relevant Slack channel for a quick fix.",
    tags: ["sql", "assignment version", "vicky"],
  },
  {
    id: "project-visibility",
    category: "Projects",
    question: "Why is my project not visible?",
    answer:
      "Projects live under \"My Timeline\". Select the relevant Learning Unit (LU), then apply the Assignments filter to view projects linked to that LU.",
    tags: ["project", "timeline", "visibility", "learning unit"],
  },
  {
    id: "project-review",
    category: "Projects",
    question: "How can I request a project review?",
    answer:
      "If you still have PI access, ping your PI and they will push the project for evaluation. Otherwise email support@newtonschool.co and the support team will push it for review within 2–3 days.",
    tags: ["project review", "pi", "evaluation"],
    escalation:
      "Legacy students should tag Vicky for prioritised review once the project is moved.",
  },
  {
    id: "project-submission-zip",
    category: "Projects",
    question: "How do I submit the project as a single file?",
    answer:
      "Merge every project artifact into one compressed zip before uploading. This keeps file structures intact for evaluators.",
    tags: ["project submission", "zip file"],
  },
  {
    id: "project-file-size",
    category: "Projects",
    question: "What if my submission size exceeds 10 MB?",
    answer:
      "Upload the zip to Google Drive and share a view-only link inside the submission box so evaluators can open it without downloading limits.",
    tags: ["project submission", "file size", "drive link"],
  },
  {
    id: "project-score-improve",
    category: "Projects",
    question: "I scored below 8/10 on my project. What next?",
    answer:
      "You may reattempt the project and resubmit to improve your score. Aim for 8/10 or above, especially for grooming eligibility.",
    tags: ["project score", "reattempt", "grooming"],
  },
  {
    id: "contest-not-visible",
    category: "Contests",
    question: "Why is my contest not visible anymore?",
    answer:
      "Contests stay open only during their scheduled timeline. Once the window closes, they expire and no longer appear on the portal.",
    tags: ["contest", "timeline", "visibility"],
  },
  {
    id: "contest-missed",
    category: "Contests",
    question: "What if I miss my contest?",
    answer:
      "Focus on completing assignments and aim for ≥8/10 in core projects (SQL and Spreadsheet). Strong project scores can still unlock grooming support.",
    tags: ["contest missed", "grooming eligibility"],
  },
  {
    id: "grooming-definition",
    category: "Grooming",
    question: "What is a grooming session?",
    answer:
      "Grooming covers Newton School’s mock interviews and prep sessions aligned with company expectations. Each phase runs its own grooming plan with ~4 sessions on average.",
    tags: ["grooming", "mock interviews", "sessions"],
  },
  {
    id: "grooming-move",
    category: "Grooming",
    question: "How can I qualify for grooming?",
    answer:
      "Default path: Clear the contest plus keep at least two core projects (SQL + Spreadsheet) at 8/10 or higher. If you miss a contest, two high-scoring projects can still qualify you.",
    tags: ["grooming eligibility", "contest", "project score"],
  },
  {
    id: "pi-extension",
    category: "Mentorship",
    question: "Can I extend PI support?",
    answer:
      "PI support ends once your course is complete. In special situations, Newton School may extend it up to one month. Request via support@newtonschool.co.",
    tags: ["pi support", "extension"],
  },
  {
    id: "certificates",
    category: "Certificates",
    question: "Where can I find my certificates?",
    answer:
      "There are 3 certificate types:\n• Course completion – emailed after course end.\n• Module completion – live inside the portal feed.\n• Phase completion – request via support and receive via email once processed.",
    tags: ["certificate", "completion", "phase"],
  },
  {
    id: "support-poc",
    category: "Support",
    question: "Who is my point of contact after the course?",
    answer:
      "The support team is your single point of contact. Email support@newtonschool.co for every post-course query.",
    tags: ["support", "poc", "contact"],
  },
  {
    id: "placements-eligibility",
    category: "Placements",
    question: "How do I sit for placements or referrals?",
    answer:
      "Meet the placement eligibility criteria (attendance, assessments, project benchmarks) and then reach out to support@newtonschool.co. They will connect you to the placement team.",
    tags: ["placements", "referrals", "eligibility"],
  },
  {
    id: "placements-poc",
    category: "Placements",
    question: "Who is the placement POC?",
    answer:
      "Reach out to the support team; they escalate to the placement team. If you are already in grooming, your groomer becomes your placement POC.",
    tags: ["placement poc", "groomer"],
  },
  {
    id: "pi-not-responding",
    category: "Support",
    question: "My PI is not responding anymore. What should I do?",
    answer:
      "Once the course is complete, PI access closes. Raise a ticket with the support team (support@newtonschool.co) for any further help.",
    tags: ["pi", "support ticket"],
  },
  {
    id: "course-visibility",
    category: "Tech",
    question: "Why is my course not visible?",
    answer:
      "After the course period ends it shifts to the \"Past Courses\" tab. Switch to Past Courses to review content.",
    tags: ["course visibility", "past courses"],
  },
  {
    id: "recordings-access",
    category: "Tech",
    question: "I cannot see lecture recordings.",
    answer:
      "From your dashboard, open \"My Timeline\", pick the relevant module, then use the Lectures filter. All recordings sit there.",
    tags: ["recordings", "lectures"],
  },
  {
    id: "resume-update",
    category: "Tech",
    question: "How do I create or update my resume on NS?",
    answer:
      "Head to your NS dashboard profile. Updating your profile automatically refreshes the resume template.",
    tags: ["resume", "profile update"],
  },
  {
    id: "catch-up",
    category: "Support",
    question: "How can I catch up after being inactive?",
    answer:
      "Use the dashboard’s \"Your Performance\" → Lectures view. Filter by session attended, watched, module, or topic to find what you skipped.",
    tags: ["catch up", "backlog", "lectures"],
  },
  {
    id: "batch-cancellation-policy",
    category: "Policy",
    question: "Can I cancel my course?",
    answer:
      "Cancellations are only allowed within the first 15 days of enrollment, following the policy on your dashboard. Submit the refunds/cancellations form and post it in #cd-data-science so Progression & Retention teams can act.",
    tags: ["cancellation", "refund", "policy"],
    escalation: "All finance and EMI issues go to the retention team.",
  },
  {
    id: "batch-change",
    category: "Policy",
    question: "How do I change or defer my batch?",
    answer:
      "You can defer twice within 3 months of your start date. First deferral is free, second costs ₹15,000. Beyond 3 months, deferrals are not accepted.",
    tags: ["batch change", "deferral", "policy"],
  },
  {
    id: "referrals-process",
    category: "Referrals",
    question: "How can I refer someone to Newton School?",
    answer:
      "Either use the \"Refer Now\" button on your dashboard or fill out the official Google Form (link in FAQs). Both paths capture the candidate details for bonus eligibility.",
    tags: ["referral", "refer now", "form"],
  },
  {
    id: "referral-bonus",
    category: "Referrals",
    question: "When do I get my referral bonus?",
    answer:
      "Referral bonuses are released only if the referred candidate stays enrolled for at least 3 months and completes 3 successful payments. Raise related queries via support@newtonschool.co.",
    tags: ["referral bonus", "payments"],
  },
  {
    id: "finance-routing",
    category: "Finance",
    question: "Who handles cancellations, EMI, or other finance queries?",
    answer:
      "Submit cancellations via the refunds form and post it in #cd-data-science so Progression & Retention teams join the loop. Any other finance or EMI issues should go straight to the retention team.",
    tags: ["finance", "emi", "retention"],
  },
  {
    id: "referral-bonuses-support",
    category: "Support",
    question: "Who owns referral bonus questions?",
    answer: "Route referral bonus queries to the Growth team.",
    tags: ["growth team", "referral"],
  },
  {
    id: "placement-reschedule",
    category: "Placements",
    question: "Who manages interview reschedules or certificate requests?",
    answer:
      "All interview reschedule/postponement requests and certificate requests should be sent to the placement team via support@newtonschool.co.",
    tags: ["interview reschedule", "certificate request", "placement"],
  },
  {
    id: "concessions",
    category: "Policy",
    question: "Can students get fee concessions?",
    answer: "Policies are fixed; concessions are not offered.",
    tags: ["concession", "fees"],
  },
  {
    id: "tech-support-tickets",
    category: "Tech",
    question: "What should I collect before logging a tech bug?",
    answer:
      "Record screenshots or screen captures of the issue plus a short description. Raise a support ticket. If the issue persists, support can escalate it in #bugs-and-updates with student details.",
    tags: ["tech support", "ticket", "bug"],
  },
  {
    id: "ta-sessions",
    category: "Support",
    question: "How do I clear backlogs?",
    answer:
      "Book a TA session (available up to 1 month after course closure) for doubt resolution. After that window, proceed self-paced and request grooming once you meet the criteria.",
    tags: ["ta session", "backlog"],
  },
  {
    id: "mentor-access",
    category: "Mentorship",
    question: "How long do mentor sessions stay open?",
    answer:
      "Mentor sessions remain available for 1 month after the course closure (last lecture date).",
    tags: ["mentor session", "availability"],
  },
  {
    id: "portal-access-revoked",
    category: "Finance",
    question: "My portal access got revoked. Why?",
    answer:
      "Access is usually revoked because of pending fees or outstanding EMIs.",
    nextSteps: [
      "Clear the due fee or EMI. Access is restored automatically afterwards.",
    ],
    tags: ["portal access", "emi", "fees"],
  },
  {
    id: "portal-access-restore",
    category: "Finance",
    question: "I paid my dues but still cannot access the portal. What now?",
    answer:
      "If payments are complete yet access is blocked, send a screen recording of the issue to support@newtonschool.co so the team can investigate and restore access.",
    tags: ["portal restore", "support email"],
  },
];

const quickTopics = [
  {
    title: "Attendance basics",
    description: "Tracking types & where to view them.",
    prompt:
      "Explain the different attendance types and how to see my attendance on the portal.",
  },
  {
    title: "Project visibility",
    description: "Find projects and request reviews.",
    prompt:
      "My project is not visible and I need a review. What should I do step by step?",
  },
  {
    title: "Grooming eligibility",
    description: "Contest vs project score paths.",
    prompt:
      "How can I become eligible for grooming if I missed the contest?",
  },
  {
    title: "Finance & deferrals",
    description: "Deferral, EMI, cancellations.",
    prompt:
      "Summarize the deferral rules and who handles cancellations or EMI issues.",
  },
  {
    title: "Placements & POCs",
    description: "Contacts for placements, PI, certificates.",
    prompt:
      "Who helps with placements, PI queries, and certificate requests after the course?",
  },
];

const normalize = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");

const tokenize = (text) => normalize(text).split(/\s+/).filter(Boolean);

const weightEntry = (entry, query) => {
  const tokens = tokenize(query);
  if (!tokens.length) return 0;

  let score = 0;
  const haystack = `${entry.question} ${entry.answer} ${entry.category} ${
    entry.tags?.join(" ") ?? ""
  }`;
  const haystackNorm = normalize(haystack);

  tokens.forEach((token) => {
    if (haystackNorm.includes(token)) {
      score += 2;
    }
  });

  entry.tags?.forEach((tag) => {
    if (query.toLowerCase().includes(tag.toLowerCase())) {
      score += 3;
    }
  });

  if (query.toLowerCase().includes(entry.category.toLowerCase())) {
    score += 2;
  }

  if (query.length > 20 && haystackNorm.includes(normalize(query))) {
    score += 4;
  }

  return score;
};

function findBestEntry(query) {
  let best = null;
  let bestScore = 0;

  knowledgeBase.forEach((entry) => {
    const score = weightEntry(entry, query);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  });

  return bestScore >= 3 ? best : null;
}

function bulletList(items = []) {
  return items.map((item) => `• ${item}`).join("\n");
}

function formatAnswer(entry) {
  let response = entry.answer;
  if (entry.nextSteps?.length) {
    response += `\n\nNext steps:\n${bulletList(entry.nextSteps)}`;
  }
  if (entry.escalation) {
    response += `\n\nEscalate to: ${entry.escalation}`;
  }
  return response;
}

function addMessage(content, role = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.textContent = content;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleBotResponse(query) {
  const entry = findBestEntry(query);

  if (!entry) {
    addMessage(
      "I couldn’t match that to the Newton School handbook. Try rephrasing with keywords like attendance, project, finance, or email support@newtonschool.co for human help."
    );
    return;
  }

  const answer = formatAnswer(entry);
  addMessage(answer, "bot");
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = chatPrompt.value.trim();
  if (!prompt) return;

  addMessage(prompt, "user");
  chatPrompt.value = "";

  setTimeout(() => handleBotResponse(prompt), 400);
});

startChat.addEventListener("click", () => {
  chatPrompt.focus();
  chatPrompt.scrollIntoView({ behavior: "smooth", block: "center" });
});

quickTopicsEl.addEventListener("click", (event) => {
  const target = event.target.closest("[data-prompt]");
  if (!target) return;
  const prompt = target.dataset.prompt;
  chatPrompt.value = prompt;
  chatPrompt.focus();
});

function renderQuickTopics() {
  quickTopicsEl.innerHTML = "";
  quickTopics.forEach((topic) => {
    const card = document.createElement("article");
    card.className = "topic-card";
    card.setAttribute("data-prompt", topic.prompt);
    card.innerHTML = `<h3>${topic.title}</h3><p>${topic.description}</p>`;
    quickTopicsEl.appendChild(card);
  });
}

function initChat() {
  addMessage(
    "Hi! I’m Calki, your Newton School assistant. Ask me about attendance, assignments, projects, grooming, placements, finance, or tech support."
  );
  renderQuickTopics();
}

initChat();

