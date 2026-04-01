document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page !== "daily-checkin") {
        return;
    }

    const questionBank = [
        {
            id: "daily-cb-1",
            topic: "circle-basics",
            topicLabel: "圆的基础概念",
            difficulty: "basic",
            difficultyLabel: "基础",
            question: "下列关于圆的说法中，正确的是哪一项？",
            options: [
                "圆心到圆上任意一点的距离相等",
                "圆的直径一定小于半径",
                "半径是圆外两点之间的线段",
                "任意圆心角都等于 90°"
            ],
            answer: "A",
            explanation: "圆的定义决定了圆上各点到圆心的距离都相等，这个固定距离就是半径。",
        },
        {
            id: "daily-ang-1",
            topic: "angles",
            topicLabel: "圆心角与圆周角",
            difficulty: "intermediate",
            difficultyLabel: "提高",
            question: "同弧所对的圆心角是 100°，那么对应的圆周角是多少？",
            options: ["25°", "50°", "100°", "200°"],
            answer: "B",
            explanation: "同弧所对的圆周角等于圆心角的一半，所以 100° 对应的圆周角是 50°。",
        },
        {
            id: "daily-tan-1",
            topic: "tangent",
            topicLabel: "切线性质",
            difficulty: "basic",
            difficultyLabel: "基础",
            question: "圆的切线与经过切点的半径之间的位置关系是？",
            options: ["平行", "重合", "垂直", "没有固定关系"],
            answer: "C",
            explanation: "切线性质的核心结论是：圆的切线垂直于经过切点的半径。",
        },
        {
            id: "daily-ch-1",
            topic: "chord",
            topicLabel: "弦与弧",
            difficulty: "advanced",
            difficultyLabel: "进阶",
            question: "在同圆中，相等的弦所对应的弧有什么关系？",
            options: ["互相垂直", "对应的弧相等", "一定平行", "与圆心无关"],
            answer: "B",
            explanation: "同圆或等圆中，相等的弦所对的弧相等，这是弦弧关系中的基础结论。",
        },
    ];

    const storageKey = "g8-daily-checkin-history";
    const statusKey = "g8-daily-checkin-status";
    const sessionKey = "g8-daily-quiz-session";
    const usedQuestionKey = "g8-daily-used-question-ids";
    const todayKey = new Date().toISOString().slice(0, 10);

    const history = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const statusMap = JSON.parse(localStorage.getItem(statusKey) || "{}");

    const todayDateEl = document.getElementById("todayDate");
    const checkinStatusEl = document.getElementById("checkinStatus");
    const streakDaysEl = document.getElementById("streakDays");
    const startDailyBtn = document.getElementById("startDailyBtn");

    function formatToday() {
        return new Intl.DateTimeFormat("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        }).format(new Date());
    }

    function getStreakDays() {
        if (!history.length) {
            return 0;
        }

        const uniqueDays = [...new Set(history)].sort().reverse();
        let streak = 0;
        const current = new Date(`${todayKey}T00:00:00`);

        for (let i = 0; i < uniqueDays.length; i += 1) {
            const compare = current.toISOString().slice(0, 10);
            if (uniqueDays[i] === compare) {
                streak += 1;
                current.setDate(current.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    function refreshHeader() {
        todayDateEl.textContent = formatToday();
        checkinStatusEl.textContent = statusMap[todayKey] ? "已打卡" : "未打卡";
        streakDaysEl.textContent = `${getStreakDays()} 天`;
    }

    function pickDailyQuestion() {
        const usedIds = JSON.parse(localStorage.getItem(usedQuestionKey) || "[]");
        const validUsedIds = usedIds.filter((id) => questionBank.some((item) => item.id === id));
        const unusedQuestions = questionBank.filter((item) => !validUsedIds.includes(item.id));

        const pool = unusedQuestions.length ? unusedQuestions : questionBank;
        const nextQuestion = pool[0];

        const nextUsedIds = unusedQuestions.length
            ? [...validUsedIds, nextQuestion.id]
            : [nextQuestion.id];

        localStorage.setItem(usedQuestionKey, JSON.stringify(nextUsedIds));
        return nextQuestion;
    }

    startDailyBtn.addEventListener("click", () => {
        const question = pickDailyQuestion();
        const session = {
            mode: "daily-quiz",
            date: todayKey,
            question,
        };

        localStorage.setItem(sessionKey, JSON.stringify(session));
        window.location.href = "quiz.html";
    });

    refreshHeader();
});
