(function () {
  const LANG_KEY = "g8-language";
  const FONT_KEY = "g8-font-scale";
  const THEME_KEY = "g8-theme";
  const MIN_FONT_SCALE = 0.9;
  const MAX_FONT_SCALE = 1.2;

  const shared = {
    zh: {
      home: "首页",
      game: "游戏",
      test: "测试",
      guide: "使用教程",
      topic: "专题练习",
      comprehensive: "综合练习",
      daily: "每日一题",
      footer: "圆几何互动学习网站 © 2026 EBU5315 Coursework",
      languageZh: "简体中文",
      languageEn: "English",
      font: "字体",
      theme: "模式",
      eyeCare: "护眼",
      night: "夜间",
      homeTitle: "测试首页 | 圆几何测试学习中心",
      guideTitle: "使用教程 | 圆几何测试学习中心",
      topicTitle: "专题练习 | 圆几何测试学习中心",
      comprehensiveTitle: "综合练习 | 圆几何测试学习中心",
      dailyTitle: "每日一题 | 圆几何测试学习中心",
      quizTitle: "每日一题作答 | 圆几何测试学习中心"
    },
    en: {
      home: "Home",
      game: "Game",
      test: "Test",
      guide: "Guide",
      topic: "Topic Practice",
      comprehensive: "Comprehensive Practice",
      daily: "Daily Quiz",
      footer: "Circle Geometry Learning Site © 2026 EBU5315 Coursework",
      languageZh: "简体中文",
      languageEn: "English",
      font: "Font",
      theme: "Mode",
      eyeCare: "Eye Care",
      night: "Night",
      homeTitle: "Home | Circle Geometry Learning Center",
      guideTitle: "Guide | Circle Geometry Learning Center",
      topicTitle: "Topic Practice | Circle Geometry Learning Center",
      comprehensiveTitle: "Comprehensive Practice | Circle Geometry Learning Center",
      dailyTitle: "Daily Quiz | Circle Geometry Learning Center",
      quizTitle: "Daily Quiz | Circle Geometry Learning Center"
    }
  };

  const homeText = {
    zh: {
      eyebrow: "圆几何学习中心",
      title: "圆几何测试学习中心",
      desc: "通过专题练习、综合训练与每日一题巩固圆几何知识，用更清晰的视觉分区、卡片化结构和重点强调提升使用体验。",
      visualMain: "几何图形",
      visualTop: "解题思路",
      visualBottom: "训练反馈",
      sidebarTitle: "测试中心",
      sidebarDesc: "选择你想进入的学习模式"
    },
    en: {
      eyebrow: "Circle Geometry Learning Hub",
      title: "Circle Geometry Learning Center",
      desc: "Build your circle geometry skills through topic practice, comprehensive review, and a daily quiz with a clearer structure and stronger visual guidance.",
      visualMain: "Geometry",
      visualTop: "Ideas",
      visualBottom: "Feedback",
      sidebarTitle: "Test Center",
      sidebarDesc: "Choose the learning mode you want to enter"
    }
  };

  const guideText = {
    zh: {
      eyebrow: "使用教程",
      title: "使用教程",
      summary: "这个页面会带你快速了解目前已经完成的三个核心模块：专题练习、综合练习、每日一题。你可以先逐个查看使用流程，确认后再从对应教程底部进入目标页面。",
      h1Title: "先看流程再进入",
      h1Text: "先理解页面结构和基本操作，再进入对应模块，会更容易上手。",
      h2Title: "按目标选择模块",
      h2Text: "补薄弱点适合专题练习，做复盘适合综合练习，保持节奏适合每日一题。",
      stat1: "当前模块",
      stat1Value: "3 个",
      stat2: "练习形式",
      stat2Value: "专题 / 综合 / 打卡",
      stat3: "核心能力",
      stat3Value: "筛题、作答、结果反馈",
      overview1: "专题练习",
      overview1Text: "围绕单一知识点组织训练入口，便于针对性练习。",
      overview2: "综合练习",
      overview2Text: "按难度混合抽题，适合完成阶段性回顾与整体检测。",
      overview3: "每日一题",
      overview3Text: "每天仅限 1 题，答完即可完成打卡并查看解析。",
      tab1: "专题练习怎么用",
      tab2: "综合练习怎么用",
      tab3: "每日一题怎么用",
      tab4: "使用建议",
      p1eyebrow: "TOPIC PRACTICE",
      p1title: "专题练习使用流程",
      p1featureTitle: "你会看到的功能",
      p1featureText: "固定进度栏、即时反馈、自动记录错题、结果统计、重做错题、AI 解释。",
      p1btn: "进入专题练习",
      p2eyebrow: "COMPREHENSIVE PRACTICE",
      p2title: "综合练习使用流程",
      p2featureTitle: "适合什么时候用",
      p2featureText: "当你想在多个知识点之间切换、做阶段性复盘时，综合练习更适合。",
      p2btn: "进入综合练习",
      p3eyebrow: "DAILY QUIZ",
      p3title: "每日一题使用流程",
      p3featureTitle: "适合什么时候用",
      p3featureText: "每日一题适合保持练习节奏，即使时间不多，也能每天维持题感。",
      p3btn: "进入每日一题",
      p4eyebrow: "SUGGESTIONS",
      p4title: "使用建议",
      p4featureTitle: "推荐路径",
      p4featureText: "使用教程 → 专题练习 → 综合练习 → 每日一题，逐步建立稳定的圆几何解题能力。"
    },
    en: {
      eyebrow: "USAGE GUIDE",
      title: "User Guide",
      summary: "This page gives you a quick overview of the three completed modules: topic practice, comprehensive practice, and the daily quiz. Review the workflow first, then enter the target page you want.",
      h1Title: "See the flow first",
      h1Text: "Understand the page structure and basic actions before entering a module.",
      h2Title: "Choose by goal",
      h2Text: "Topic practice helps with weak points, comprehensive practice supports review, and the daily quiz keeps your rhythm.",
      stat1: "Modules",
      stat1Value: "3",
      stat2: "Modes",
      stat2Value: "Topic / Mixed / Daily",
      stat3: "Core Skills",
      stat3Value: "Filtering, Answering, Feedback",
      overview1: "Topic Practice",
      overview1Text: "Focus on a single knowledge point for targeted reinforcement.",
      overview2: "Comprehensive Practice",
      overview2Text: "Mix questions by difficulty for stage review and overall checking.",
      overview3: "Daily Quiz",
      overview3Text: "One question per day to keep a stable learning rhythm.",
      tab1: "How to use topic practice",
      tab2: "How to use comprehensive practice",
      tab3: "How to use daily quiz",
      tab4: "Suggestions",
      p1eyebrow: "TOPIC PRACTICE",
      p1title: "Topic Practice Workflow",
      p1featureTitle: "What you will see",
      p1featureText: "Fixed progress bar, instant feedback, automatic wrong-question records, results, redo wrong questions, and AI explanation.",
      p1btn: "Enter Topic Practice",
      p2eyebrow: "COMPREHENSIVE PRACTICE",
      p2title: "Comprehensive Practice Workflow",
      p2featureTitle: "When to use it",
      p2featureText: "Comprehensive practice works well when you want to switch across knowledge points and run a review round.",
      p2btn: "Enter Comprehensive Practice",
      p3eyebrow: "DAILY QUIZ",
      p3title: "Daily Quiz Workflow",
      p3featureTitle: "When to use it",
      p3featureText: "The daily quiz helps you keep a rhythm even when you do not have much time.",
      p3btn: "Enter Daily Quiz",
      p4eyebrow: "SUGGESTIONS",
      p4title: "Suggestions",
      p4featureTitle: "Recommended Path",
      p4featureText: "Guide → Topic Practice → Comprehensive Practice → Daily Quiz, building a steadier geometry-solving routine step by step."
    }
  };

  const practiceText = {
    zh: {
      sidebar: ["使用教程", "专题练习", "综合练习", "每日一题"],
      topicSetupEyebrow: "专题练习配置",
      topicSetupTitle: "专题练习配置页",
      topicSetupDesc: "先选择专题，再设置难度和题量。系统会按你的条件从题库中筛选题目，并进入做题页面。",
      comprehensiveSetupEyebrow: "综合练习配置",
      comprehensiveSetupTitle: "综合练习配置页",
      comprehensiveSetupDesc: "综合练习会按难度从共享题库中混合抽题，适合完成阶段性回顾与整体检测。",
      card1Topic: "选择专题",
      card1TopicText: "按知识点进入更有针对性的训练模式。",
      card1Comprehensive: "练习范围",
      card1ComprehensiveText: "综合练习默认覆盖当前共享题库中的多个专题。",
      card2: "选择难度",
      card2TopicText: "从基础到提高，按当前掌握程度安排练习。",
      card2ComprehensiveText: "从基础到提高，按当前复习阶段安排练习。",
      card3: "选择题量",
      card3Text: "当前题量上限为 40 题。",
      customAmount: "自定义题量",
      summaryTopic: "当前专题",
      summaryRange: "当前范围",
      summaryDifficulty: "当前难度",
      summaryAmount: "当前题量",
      start: "开始练习",
      progressEyebrow: "练习进行中",
      backConfig: "返回配置",
      reset: "重置练习",
      questionMetaTopic: "所属专题",
      questionMetaRange: "所属范围",
      questionMetaDifficulty: "本题难度",
      submit: "提交答案",
      redo: "重做本题",
      ai: "AI 解释",
      wrong: "查看错题",
      resultEyebrow: "练习结果",
      topicResultTitle: "专题练习结果页",
      comprehensiveResultTitle: "综合练习结果页",
      score: "最终得分",
      accuracy: "正确率",
      correct: "做对题数",
      wrongCount: "错题数量",
      wrongList: "错题列表",
      aiSummary: "AI 评估总结",
      redoWrong: "重做错题",
      backTopicHome: "返回专题首页",
      backComprehensiveHome: "返回综合首页",
      aiModal: "AI 解释",
      close: "关闭",
      wrongTopicTitle: "本专题错题",
      wrongComprehensiveTitle: "本轮错题",
      topicLabels: {
        "circle-basics": "圆基础",
        angles: "圆心角与圆周角",
        tangent: "切线性质",
        chord: "弦与弧"
      },
      difficultyLabels: {
        basic: "基础",
        intermediate: "进阶",
        advanced: "提高"
      },
      resultSubtitle: "系统会根据本次作答生成成绩、错题列表和 AI 评估总结。"
    },
    en: {
      sidebar: ["Guide", "Topic Practice", "Comprehensive Practice", "Daily Quiz"],
      topicSetupEyebrow: "Topic Setup",
      topicSetupTitle: "Topic Practice Setup",
      topicSetupDesc: "Choose a topic, difficulty, and amount first. The system will filter questions from the bank and then enter the practice session.",
      comprehensiveSetupEyebrow: "Comprehensive Setup",
      comprehensiveSetupTitle: "Comprehensive Practice Setup",
      comprehensiveSetupDesc: "Comprehensive practice mixes questions from the shared bank by difficulty and is suitable for review and overall checking.",
      card1Topic: "Choose a Topic",
      card1TopicText: "Enter a more focused practice mode by knowledge point.",
      card1Comprehensive: "Practice Scope",
      card1ComprehensiveText: "Comprehensive practice covers multiple topics from the current shared bank.",
      card2: "Choose Difficulty",
      card2TopicText: "Move from basic to advanced based on your current level.",
      card2ComprehensiveText: "Choose a level that matches your current review stage.",
      card3: "Choose Amount",
      card3Text: "The current upper limit is 40 questions.",
      customAmount: "Custom amount",
      summaryTopic: "Current topic",
      summaryRange: "Current scope",
      summaryDifficulty: "Current difficulty",
      summaryAmount: "Current amount",
      start: "Start Practice",
      progressEyebrow: "Practice in Progress",
      backConfig: "Back to Setup",
      reset: "Reset Practice",
      questionMetaTopic: "Topic",
      questionMetaRange: "Scope",
      questionMetaDifficulty: "Difficulty",
      submit: "Submit Answer",
      redo: "Redo This Question",
      ai: "AI Explanation",
      wrong: "View Wrong Questions",
      resultEyebrow: "Practice Result",
      topicResultTitle: "Topic Practice Result",
      comprehensiveResultTitle: "Comprehensive Practice Result",
      score: "Final Score",
      accuracy: "Accuracy",
      correct: "Correct",
      wrongCount: "Wrong",
      wrongList: "Wrong Question List",
      aiSummary: "AI Summary",
      redoWrong: "Redo Wrong Questions",
      backTopicHome: "Back to Topic Home",
      backComprehensiveHome: "Back to Comprehensive Home",
      aiModal: "AI Explanation",
      close: "Close",
      wrongTopicTitle: "Wrong Questions in This Topic",
      wrongComprehensiveTitle: "Wrong Questions in This Round",
      topicLabels: {
        "circle-basics": "Circle Basics",
        angles: "Central and Inscribed Angles",
        tangent: "Tangent Properties",
        chord: "Chords and Arcs"
      },
      difficultyLabels: {
        basic: "Basic",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      resultSubtitle: "The system generates your score, wrong-question list, and AI summary from this session."
    }
  };
  const dailyText = {
    zh: {
      eyebrow: "每日打卡",
      title: "每日一题打卡页",
      description: "每天仅限 1 题，完成后即可更新打卡状态，并查看答案、AI 解释和错题记录。",
      date: "今日日期",
      status: "打卡状态",
      streak: "连续打卡天数",
      statusPending: "未打卡",
      statusDone: "已打卡",
      streakSuffix: "天",
      rulesTitle: "规则说明",
      rules: ["每天仅限 1 题", "题目随机来自全专题题库", "答完即完成今日打卡", "答错自动存入错题本", "可查看 AI 详细解释"],
      start: "开始今日答题",
      startTip: "系统会从题库中随机抽取 1 题，并直接进入今日作答页。"
    },
    en: {
      eyebrow: "DAILY CHECK-IN",
      title: "Daily Quiz Check-in",
      description: "Only one question is given each day. Once you finish it, the check-in status updates and you can review the answer, AI explanation, and wrong-question record.",
      date: "Today",
      status: "Status",
      streak: "Streak",
      statusPending: "Not Checked In",
      statusDone: "Checked In",
      streakSuffix: "days",
      rulesTitle: "Rules",
      rules: ["Only 1 question per day", "The question is randomly selected from the shared bank", "Finishing the question completes the daily check-in", "Wrong answers are stored automatically", "AI explanation is available"],
      start: "Start Today's Quiz",
      startTip: "The system will randomly pick one question from the bank and enter the daily quiz page directly."
    }
  };

  const quizText = {
    zh: {
      eyebrow: "每日一题",
      title: "每日一题",
      tag: "今日题目",
      difficulty: "本题难度",
      topic: "所属专题",
      submit: "提交答案",
      ai: "AI 解释",
      resultEyebrow: "今日结果",
      resultTitle: "今日结果",
      resultText: "今日打卡成功后，可以查看答案、AI 解释和错题收录情况。",
      outcome: "作答结果",
      correctAnswer: "正确答案",
      wrongSaved: "错题是否收录",
      streak: "连续打卡天数",
      aiTitle: "AI 详细解释",
      success: "今日打卡成功",
      backHome: "返回首页",
      wrongBook: "查看错题本",
      goTopic: "前往专题练习",
      aiModal: "AI 解释",
      wrongBookTitle: "错题本",
      close: "关闭"
    },
    en: {
      eyebrow: "DAILY QUIZ",
      title: "Daily Quiz",
      tag: "Today's Question",
      difficulty: "Difficulty",
      topic: "Topic",
      submit: "Submit Answer",
      ai: "AI Explanation",
      resultEyebrow: "TODAY'S RESULT",
      resultTitle: "Today's Result",
      resultText: "After today's check-in is completed, you can review the answer, AI explanation, and wrong-question status.",
      outcome: "Outcome",
      correctAnswer: "Correct Answer",
      wrongSaved: "Saved to Wrong Book",
      streak: "Streak",
      aiTitle: "AI Detailed Explanation",
      success: "Today's Check-in Complete",
      backHome: "Back Home",
      wrongBook: "View Wrong Book",
      goTopic: "Go to Topic Practice",
      aiModal: "AI Explanation",
      wrongBookTitle: "Wrong Question Book",
      close: "Close"
    }
  };

  function getLang() { return localStorage.getItem(LANG_KEY) || "zh"; }
  function getFontScale() {
    const value = Number(localStorage.getItem(FONT_KEY) || "1");
    if (Number.isNaN(value)) return 1;
    return Math.max(MIN_FONT_SCALE, Math.min(MAX_FONT_SCALE, value));
  }
  function getTheme() {
    const theme = localStorage.getItem(THEME_KEY) || "eye-care";
    return ["eye-care", "night"].includes(theme) ? theme : "eye-care";
  }
  function pageKey() { return document.body.dataset.page || "home"; }
  function qs(selector) { return document.querySelector(selector); }
  function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }
  function setText(selector, text) {
    const node = typeof selector === "string" ? qs(selector) : selector;
    if (node && typeof text === "string") node.textContent = text;
  }
  function setMany(selector, values) {
    qsa(selector).forEach((node, index) => {
      if (typeof values[index] === "string") node.textContent = values[index];
    });
  }

  function buildToolbar() {
    qsa(".lang-switcher, .ui-toolbar").forEach((node) => node.remove());
    const lang = getLang();
    const scale = getFontScale();
    const theme = getTheme();
    const t = shared[lang];
    const toolbar = document.createElement("div");
    toolbar.className = "ui-toolbar";
    toolbar.innerHTML = `
      <div class="lang-switcher">
        <button type="button" class="lang-btn ${lang === "zh" ? "active" : ""}" data-lang="zh">${t.languageZh}</button>
        <span>/</span>
        <button type="button" class="lang-btn ${lang === "en" ? "active" : ""}" data-lang="en">${t.languageEn}</button>
      </div>
      <div class="theme-switcher" role="group" aria-label="${t.theme}">
        <span class="theme-switcher-label">${t.theme}</span>
        <button type="button" class="theme-btn ${theme === "eye-care" ? "active" : ""}" data-theme="eye-care">${t.eyeCare}</button>
        <button type="button" class="theme-btn ${theme === "night" ? "active" : ""}" data-theme="night">${t.night}</button>
      </div>
      <label class="font-size-control" for="fontScaleRange">
        <span class="font-size-label">${t.font}</span>
        <input id="fontScaleRange" type="range" min="${MIN_FONT_SCALE}" max="${MAX_FONT_SCALE}" step="0.02" value="${scale}">
        <span class="font-size-value">${Math.round(scale * 100)}%</span>
      </label>
    `;
    toolbar.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => setLang(button.dataset.lang));
    });
    toolbar.querySelectorAll(".theme-btn").forEach((button) => {
      button.addEventListener("click", () => setTheme(button.dataset.theme));
    });
    toolbar.querySelector("#fontScaleRange").addEventListener("input", (event) => {
      localStorage.setItem(FONT_KEY, event.target.value);
      applyFontScale();
    });
    document.body.prepend(toolbar);
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    buildToolbar();
    applyLanguage();
    window.dispatchEvent(new CustomEvent("g8-language-change", { detail: { lang } }));
  }

  function applyTheme() {
    const theme = getTheme();
    document.body.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "night" ? "dark" : "light";
    qsa(".theme-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.theme === theme);
    });
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme();
    buildToolbar();
    window.dispatchEvent(new CustomEvent("g8-theme-change", { detail: { theme } }));
  }

  function applyFontScale() {
    const scale = getFontScale();
    document.documentElement.style.fontSize = `${scale * 100}%`;
    setText(".font-size-value", `${Math.round(scale * 100)}%`);
    const input = qs("#fontScaleRange");
    if (input) input.value = String(scale);
  }

  function applyTopNav(t) { setMany(".top-nav a, .guide-nav a", [t.home, t.game, t.test]); }
  function applySidebar(labels) {
    setMany(".sidebar-menu li span", labels);
    setMany(".menu-list li a", labels);
  }
  function applyFooter(t) { setMany(".footer p, .guide-footer p, .page-footer p", [t.footer, t.footer, t.footer]); }

  function applyHome(lang) {
    const t = shared[lang];
    const h = homeText[lang];
    document.title = t.homeTitle;
    setText(".brand-text strong", h.title);
    setText(".brand-text small", lang === "zh" ? "圆几何学习实验室" : "Geometry Learning Lab");
    setMany(".nav-link span", [t.home, t.game, t.test]);
    setText(".hero-copy .eyebrow", h.eyebrow);
    setText(".hero-copy h1", h.title);
    setText(".hero-description", h.desc);
    setText(".visual-card.main span", h.visualMain);
    setText(".visual-card-top span", h.visualTop);
    setText(".visual-card-bottom span", h.visualBottom);
    setText(".sidebar-header h2", h.sidebarTitle);
    setText(".sidebar-header p", h.sidebarDesc);
    applySidebar([t.guide, t.topic, t.comprehensive, t.daily]);
    applyFooter(t);
  }

  function applyGuide(lang) {
    const t = shared[lang];
    const g = guideText[lang];
    document.title = t.guideTitle;
    applyTopNav(t);
    setText(".guide-hero .guide-eyebrow", g.eyebrow);
    setText(".guide-hero h1", g.title);
    setText(".guide-summary", g.summary);
    setText(".hero-highlight:nth-of-type(1) h3", g.h1Title);
    setText(".hero-highlight:nth-of-type(1) p", g.h1Text);
    setText(".hero-highlight:nth-of-type(2) h3", g.h2Title);
    setText(".hero-highlight:nth-of-type(2) p", g.h2Text);
    setText(".mini-stat:nth-of-type(1) span", g.stat1);
    setText(".mini-stat:nth-of-type(1) strong", g.stat1Value);
    setText(".mini-stat:nth-of-type(2) span", g.stat2);
    setText(".mini-stat:nth-of-type(2) strong", g.stat2Value);
    setText(".mini-stat:nth-of-type(3) span", g.stat3);
    setText(".mini-stat:nth-of-type(3) strong", g.stat3Value);
    setText(".overview-card:nth-of-type(1) h2", g.overview1);
    setText(".overview-card:nth-of-type(1) p", g.overview1Text);
    setText(".overview-card:nth-of-type(2) h2", g.overview2);
    setText(".overview-card:nth-of-type(2) p", g.overview2Text);
    setText(".overview-card:nth-of-type(3) h2", g.overview3);
    setText(".overview-card:nth-of-type(3) p", g.overview3Text);
    setMany(".guide-tab", [g.tab1, g.tab2, g.tab3, g.tab4]);
    setText("#topic-guide .guide-eyebrow", g.p1eyebrow);
    setText("#topic-guide h2", g.p1title);
    setText("#topic-guide .feature-box h3", g.p1featureTitle);
    setText("#topic-guide .feature-box p", g.p1featureText);
    setText("#topic-guide .guide-btn", g.p1btn);
    setText("#comprehensive-guide .guide-eyebrow", g.p2eyebrow);
    setText("#comprehensive-guide h2", g.p2title);
    setText("#comprehensive-guide .feature-box h3", g.p2featureTitle);
    setText("#comprehensive-guide .feature-box p", g.p2featureText);
    setText("#comprehensive-guide .guide-btn", g.p2btn);
    setText("#daily-guide .guide-eyebrow", g.p3eyebrow);
    setText("#daily-guide h2", g.p3title);
    setText("#daily-guide .feature-box h3", g.p3featureTitle);
    setText("#daily-guide .feature-box p", g.p3featureText);
    setText("#daily-guide .guide-btn", g.p3btn);
    setText("#tips-guide .guide-eyebrow", g.p4eyebrow);
    setText("#tips-guide h2", g.p4title);
    setText("#tips-guide .feature-box h3", g.p4featureTitle);
    setText("#tips-guide .feature-box p", g.p4featureText);
    applyFooter(t);
  }
  function parsePracticeTitle(value, lang) {
    const match = String(value || "").match(/^(.*) - (.*) - (\d+)/);
    if (!match) return value;
    if (lang === "zh") return `${match[1]} - ${match[2]} - ${match[3]} 题`;
    return `${match[1]} - ${match[2]} - ${match[3]} Questions`;
  }

  function applyPractice(lang, mode) {
    const t = shared[lang];
    const p = practiceText[lang];
    document.title = mode === "topic-practice" ? t.topicTitle : t.comprehensiveTitle;
    applyTopNav(t);
    applySidebar(p.sidebar);
    setText("#topicConfigShell .eyebrow", mode === "topic-practice" ? p.topicSetupEyebrow : p.comprehensiveSetupEyebrow);
    setText("#topicConfigShell h1", mode === "topic-practice" ? p.topicSetupTitle : p.comprehensiveSetupTitle);
    setText("#topicConfigShell .page-intro > p:last-of-type", mode === "topic-practice" ? p.topicSetupDesc : p.comprehensiveSetupDesc);
    setText(".config-card:nth-of-type(1) h2", mode === "topic-practice" ? p.card1Topic : p.card1Comprehensive);
    setText(".config-card:nth-of-type(1) .config-card-header p", mode === "topic-practice" ? p.card1TopicText : p.card1ComprehensiveText);
    setText(".config-card:nth-of-type(2) h2", p.card2);
    setText(".config-card:nth-of-type(2) .config-card-header p", mode === "topic-practice" ? p.card2TopicText : p.card2ComprehensiveText);
    setText(".config-card:nth-of-type(3) h2", p.card3);
    setText(".config-card:nth-of-type(3) .config-card-header p", p.card3Text);
    setText(".amount-input-wrap span", p.customAmount);
    setText(".summary-item:nth-of-type(1) .summary-label", mode === "topic-practice" ? p.summaryTopic : p.summaryRange);
    setText(".summary-item:nth-of-type(2) .summary-label", p.summaryDifficulty);
    setText(".summary-item:nth-of-type(3) .summary-label", p.summaryAmount);
    setText("#startPracticeBtn span", p.start);
    setText(".session-title-group .eyebrow", p.progressEyebrow);
    setText("#backConfigBtn span", p.backConfig);
    setText("#resetPracticeBtn span", p.reset);
    setText(".question-footer .meta-item:nth-of-type(1) .meta-label", mode === "topic-practice" ? p.questionMetaTopic : p.questionMetaRange);
    setText(".question-footer .meta-item:nth-of-type(2) .meta-label", p.questionMetaDifficulty);
    setText("#submitAnswerBtn", p.submit);
    setText("#redoQuestionBtn", p.redo);
    setText("#showAiExplainBtn", p.ai);
    setText("#viewWrongBtn", p.wrong);
    setText(".result-intro .eyebrow", p.resultEyebrow);
    setText(".result-intro h1", mode === "topic-practice" ? p.topicResultTitle : p.comprehensiveResultTitle);
    setText("#resultSubtitle", p.resultSubtitle);
    setText(".result-card:nth-of-type(1) .result-label", p.score);
    setText(".result-card:nth-of-type(2) .result-label", p.accuracy);
    setText(".result-card:nth-of-type(3) .result-label", p.correct);
    setText(".result-card:nth-of-type(4) .result-label", p.wrongCount);
    setText(".result-panel:nth-of-type(1) h3", p.wrongList);
    setText(".result-panel:nth-of-type(2) h3", p.aiSummary);
    setText("#redoWrongBtn", p.redoWrong);
    setText("#backTopicHomeBtn", mode === "topic-practice" ? p.backTopicHome : p.backComprehensiveHome);
    setText("#aiModal h3", p.aiModal);
    setText("#closeAiModalBtn", p.close);
    setText("#closeWrongDrawerBtn", p.close);
    setText("#wrongDrawer h3", mode === "topic-practice" ? p.wrongTopicTitle : p.wrongComprehensiveTitle);
    applyFooter(t);

    Object.entries(p.topicLabels).forEach(([value, label]) => {
      qsa(`[data-value="${value}"]`).forEach((node) => {
        if (node.closest("#topicChoices") || node.dataset.group === "topic") node.textContent = label;
      });
    });

    Object.entries(p.difficultyLabels).forEach(([value, label]) => {
      const node = qs(`#difficultyChoices [data-value="${value}"]`);
      if (node) node.textContent = label;
    });

    const sessionTitle = qs("#sessionTitle");
    if (sessionTitle) sessionTitle.textContent = parsePracticeTitle(sessionTitle.textContent, lang);
    const progressText = qs("#progressText");
    if (progressText) {
      const match = progressText.textContent.match(/(\d+)\/(\d+)/);
      if (match) progressText.textContent = lang === "zh" ? `第 ${match[1]}/${match[2]} 题` : `${match[1]}/${match[2]}`;
    }
    const questionBadge = qs("#questionBadge");
    if (questionBadge) {
      const match = questionBadge.textContent.match(/(\d+)/);
      if (match) questionBadge.textContent = lang === "zh" ? `第 ${match[1]} 题` : `Question ${match[1]}`;
    }

    const topicMap = {
      "圆基础": p.topicLabels["circle-basics"],
      "圆心角与圆周角": p.topicLabels.angles,
      "切线性质": p.topicLabels.tangent,
      "弦与弧": p.topicLabels.chord,
      "Circle Basics": p.topicLabels["circle-basics"],
      "Central & Inscribed Angles": p.topicLabels.angles,
      "Central and Inscribed Angles": p.topicLabels.angles,
      "Tangents": p.topicLabels.tangent,
      "Tangent Properties": p.topicLabels.tangent,
      "Chords and Arcs": p.topicLabels.chord
    };
    [qs("#summaryTopic"), qs("#questionTopicTag"), qs("#metaTopic")].forEach((node) => {
      if (!node) return;
      const key = node.textContent.trim();
      if (topicMap[key]) node.textContent = topicMap[key];
    });

    const difficultyMap = {
      "基础": p.difficultyLabels.basic,
      "进阶": p.difficultyLabels.intermediate,
      "提高": p.difficultyLabels.advanced,
      "Basic": p.difficultyLabels.basic,
      "Intermediate": p.difficultyLabels.intermediate,
      "Advanced": p.difficultyLabels.advanced
    };
    const metaDifficulty = qs("#metaDifficulty");
    if (metaDifficulty && difficultyMap[metaDifficulty.textContent.trim()]) {
      metaDifficulty.textContent = difficultyMap[metaDifficulty.textContent.trim()];
    }
  }

  function applyDaily(lang) {
    const t = shared[lang];
    const d = dailyText[lang];
    document.title = t.dailyTitle;
    applyTopNav(t);
    setText(".daily-hero .eyebrow", d.eyebrow);
    setText(".daily-hero h1", d.title);
    setText(".daily-hero p:last-of-type", d.description);
    setText(".checkin-grid .info-card:nth-of-type(1) .info-label", d.date);
    setText(".checkin-grid .info-card:nth-of-type(2) .info-label", d.status);
    setText(".checkin-grid .info-card:nth-of-type(3) .info-label", d.streak);
    const status = qs("#checkinStatus");
    if (status) {
      const done = /已|Checked/.test(status.textContent);
      status.textContent = done ? d.statusDone : d.statusPending;
    }
    const streak = qs("#streakDays");
    if (streak) {
      const num = streak.textContent.match(/\d+/)?.[0] || "0";
      streak.textContent = `${num} ${d.streakSuffix}`;
    }
    setText(".rules-card h2", d.rulesTitle);
    setMany(".rules-list li", d.rules);
    setText("#startDailyBtn span", d.start);
    setText(".start-tip", d.startTip);
    applyFooter(t);
  }

  function applyQuiz(lang) {
    const t = shared[lang];
    const q = quizText[lang];
    document.title = t.quizTitle;
    applyTopNav(t);
    setText(".session-title-group .eyebrow", q.eyebrow);
    setText(".session-title-group h1", q.title);
    setText(".question-tag", q.tag);
    setText(".quiz-meta .meta-item:nth-of-type(1) .meta-label", q.difficulty);
    setText(".quiz-meta .meta-item:nth-of-type(2) .meta-label", q.topic);
    setText("#submitQuizBtn", q.submit);
    setText("#showQuizAiBtn", q.ai);
    setText(".result-header .eyebrow", q.resultEyebrow);
    setText(".result-header h1", q.resultTitle);
    setText("#resultStatusText", q.resultText);
    setText(".result-grid .result-item:nth-of-type(1) .result-label", q.outcome);
    setText(".result-grid .result-item:nth-of-type(2) .result-label", q.correctAnswer);
    setText(".result-grid .result-item:nth-of-type(3) .result-label", q.wrongSaved);
    setText(".result-grid .result-item:nth-of-type(4) .result-label", q.streak);
    setText(".result-detail h2", q.aiTitle);
    setText(".result-success span", q.success);
    setText(".result-actions .action-btn:nth-of-type(1)", q.backHome);
    setText("#viewWrongBookBtn", q.wrongBook);
    setText(".result-actions .action-btn:nth-of-type(3)", q.goTopic);
    setText("#quizAiModal h3", q.aiModal);
    setText("#wrongBookModal h3", q.wrongBookTitle);
    setText("#closeQuizAiModalBtn", q.close);
    setText("#closeWrongBookModalBtn", q.close);
    applyFooter(t);
  }
  const commonMap = {
    zh: {
      "Topic Practice": "专题练习",
      "Comprehensive Practice": "综合练习",
      "Practice in Progress": "练习进行中",
      "Submit Answer": "提交答案",
      "Redo This Question": "重做本题",
      "AI Explanation": "AI 解释",
      "View Wrong Questions": "查看错题",
      "Final Score": "最终得分",
      "Accuracy": "正确率",
      "Correct": "做对题数",
      "Wrong": "错题数量",
      "Wrong Question List": "错题列表",
      "AI Summary": "AI 评估总结",
      "Redo Wrong Questions": "重做错题",
      "Back to Topic Home": "返回专题首页",
      "Back to Comprehensive Home": "返回综合首页",
      "Back to Setup": "返回配置",
      "Reset Practice": "重置练习",
      "Close": "关闭",
      "Daily Quiz": "每日一题",
      "Daily Quiz Check-in": "每日一题打卡页",
      "Start Today's Quiz": "开始今日答题",
      "Today's Result": "今日结果",
      "Correct Answer": "正确答案",
      "Saved to Wrong Book": "错题是否收录",
      "Streak": "连续打卡天数",
      "AI Detailed Explanation": "AI 详细解释",
      "Today's Check-in Complete": "今日打卡成功",
      "Back Home": "返回首页",
      "View Wrong Book": "查看错题本",
      "Go to Topic Practice": "前往专题练习",
      "Not Checked In": "未打卡",
      "Checked In": "已打卡"
    },
    en: {
      "专题练习": "Topic Practice",
      "综合练习": "Comprehensive Practice",
      "练习进行中": "Practice in Progress",
      "提交答案": "Submit Answer",
      "重做本题": "Redo This Question",
      "AI 解释": "AI Explanation",
      "查看错题": "View Wrong Questions",
      "最终得分": "Final Score",
      "正确率": "Accuracy",
      "做对题数": "Correct",
      "错题数量": "Wrong",
      "错题列表": "Wrong Question List",
      "AI 评估总结": "AI Summary",
      "重做错题": "Redo Wrong Questions",
      "返回专题首页": "Back to Topic Home",
      "返回综合首页": "Back to Comprehensive Home",
      "返回配置": "Back to Setup",
      "重置练习": "Reset Practice",
      "关闭": "Close",
      "每日一题": "Daily Quiz",
      "每日一题打卡页": "Daily Quiz Check-in",
      "开始今日答题": "Start Today's Quiz",
      "今日结果": "Today's Result",
      "正确答案": "Correct Answer",
      "错题是否收录": "Saved to Wrong Book",
      "连续打卡天数": "Streak",
      "AI 详细解释": "AI Detailed Explanation",
      "今日打卡成功": "Today's Check-in Complete",
      "返回首页": "Back Home",
      "查看错题本": "View Wrong Book",
      "前往专题练习": "Go to Topic Practice",
      "未打卡": "Not Checked In",
      "已打卡": "Checked In"
    }
  };

  function replaceCommonText(lang) {
    const map = commonMap[lang];
    qsa("button, a, span, strong, h1, h2, h3, p, label, li").forEach((node) => {
      const text = node.textContent.trim();
      if (map[text]) node.textContent = map[text];
    });
  }

  let applying = false;
  let observer;

  function applyLanguage() {
    if (applying) return;
    applying = true;
    const lang = getLang();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    const page = pageKey();
    if (page === "usage-guide") applyGuide(lang);
    else if (page === "topic-practice") applyPractice(lang, "topic-practice");
    else if (page === "comprehensive-practice") applyPractice(lang, "comprehensive-practice");
    else if (page === "daily-checkin") applyDaily(lang);
    else if (page === "daily-quiz") applyQuiz(lang);
    else applyHome(lang);
    replaceCommonText(lang);
    buildToolbar();
    applyFontScale();
    applying = false;
  }

  function setupObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(() => {
      if (!applying) window.requestAnimationFrame(applyLanguage);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildToolbar();
    applyTheme();
    applyFontScale();
    applyLanguage();
    setupObserver();
  });

  window.G8I18n = { getLang, setLang, applyLanguage, getFontScale, applyFontScale, getTheme, setTheme, applyTheme };
})();
