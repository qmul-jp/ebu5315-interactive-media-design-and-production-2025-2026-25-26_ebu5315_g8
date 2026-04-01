document.addEventListener("DOMContentLoaded", () => {
    const pageMode = document.body.dataset.page;
    if (!["topic-practice", "comprehensive-practice"].includes(pageMode)) {
        return;
    }

    const isTopicMode = pageMode === "topic-practice";
    const modeLabel = isTopicMode ? "专题练习" : "综合练习";

    const topicLabels = {
        "circle-basics": "圆的基础概念",
        angles: "圆周角与圆心角",
        tangent: "切线与性质",
        chord: "弦、弧与关系",
    };

    const difficultyLabels = {
        basic: "基础",
        intermediate: "进阶",
        advanced: "挑战",
    };

    const questionBank = [
        {
            id: "cb-1",
            topic: "circle-basics",
            difficulty: "basic",
            question: "已知点 O 为圆心，下列说法正确的是哪一项？",
            options: ["圆心到圆上任意一点的距离相等", "圆的直径一定小于半径", "半径是圆外两点之间的线段", "圆心角一定等于 90°"],
            answer: "A",
            explanation: "圆的定义决定了圆心到圆上任意一点的距离都相等，这个固定距离就是半径。",
        },
        {
            id: "cb-2",
            topic: "circle-basics",
            difficulty: "basic",
            question: "一个圆的半径为 5，则它的直径为多少？",
            options: ["2", "5", "10", "25"],
            answer: "C",
            explanation: "直径等于半径的 2 倍，因此是 10。",
        },
        {
            id: "cb-3",
            topic: "circle-basics",
            difficulty: "intermediate",
            question: "如果两个圆的半径相等，那么这两个圆一定满足什么关系？",
            options: ["面积不同", "周长不同", "全等", "圆心相同"],
            answer: "C",
            explanation: "半径决定圆的大小，半径相同的两个圆大小完全一致，因此全等，但圆心未必相同。",
        },
        {
            id: "cb-4",
            topic: "circle-basics",
            difficulty: "advanced",
            question: "若弦 AB 经过圆心 O，则弦 AB 与该圆的关系是？",
            options: ["AB 一定是半径", "AB 一定是直径", "AB 一定是切线", "AB 与圆无特殊关系"],
            answer: "B",
            explanation: "经过圆心的弦是直径，这是圆中弦与圆心的基本性质。",
        },
        {
            id: "ang-1",
            topic: "angles",
            difficulty: "basic",
            question: "同弧所对的圆周角之间有什么关系？",
            options: ["互补", "相等", "和为 180°", "大小不定"],
            answer: "B",
            explanation: "同弧所对的圆周角相等，是圆周角定理的直接结论。",
        },
        {
            id: "ang-2",
            topic: "angles",
            difficulty: "intermediate",
            question: "同弧所对圆心角为 100°，对应的圆周角为多少？",
            options: ["25°", "50°", "100°", "200°"],
            answer: "B",
            explanation: "同弧所对的圆周角等于圆心角的一半，因此为 50°。",
        },
        {
            id: "ang-3",
            topic: "angles",
            difficulty: "advanced",
            question: "半圆所对的圆周角通常是多少？",
            options: ["30°", "60°", "90°", "120°"],
            answer: "C",
            explanation: "半圆所对圆心角是 180°，所以圆周角是其一半，即 90°。",
        },
        {
            id: "tan-1",
            topic: "tangent",
            difficulty: "basic",
            question: "切线与经过切点的半径之间有什么关系？",
            options: ["平行", "重合", "垂直", "夹角不定"],
            answer: "C",
            explanation: "切线性质：切线与过切点的半径垂直。",
        },
        {
            id: "tan-2",
            topic: "tangent",
            difficulty: "intermediate",
            question: "圆外一点向圆引两条切线，这两条切线段长度如何？",
            options: ["一定相等", "一长一短", "和半径相等", "无法判断"],
            answer: "A",
            explanation: "从圆外一点引圆的两条切线，其切线段相等。",
        },
        {
            id: "tan-3",
            topic: "tangent",
            difficulty: "advanced",
            question: "若直线 l 与圆只有一个公共点，则直线 l 最可能是？",
            options: ["割线", "切线", "弦", "半径"],
            answer: "B",
            explanation: "与圆只有一个公共点的直线是切线。",
        },
        {
            id: "ch-1",
            topic: "chord",
            difficulty: "basic",
            question: "在同圆中，相等的弦所对的弧有什么关系？",
            options: ["互补", "相等", "无关系", "一长一短"],
            answer: "B",
            explanation: "同圆或等圆中，相等的弦所对的弧相等。",
        },
        {
            id: "ch-2",
            topic: "chord",
            difficulty: "intermediate",
            question: "圆心到弦的垂线会如何作用于该弦？",
            options: ["平分该弦", "延长该弦", "与该弦平行", "无法确定"],
            answer: "A",
            explanation: "圆心到弦的垂线平分弦，这是常见性质之一。",
        },
        {
            id: "ch-3",
            topic: "chord",
            difficulty: "advanced",
            question: "在同圆中，距离圆心更近的弦通常怎样？",
            options: ["更短", "更长", "长度相同", "不一定"],
            answer: "B",
            explanation: "在同圆中，弦离圆心越近，弦越长。",
        },
    ];

    const state = {
        selections: {
            topic: "circle-basics",
            difficulty: "basic",
            amount: 5,
        },
        questions: [],
        currentIndex: 0,
        selectedOption: null,
        tempSelections: {},
        answers: {},
        judged: {},
        wrongQuestionIds: [],
        autoNextTimer: null,
    };

    const configShell = document.getElementById("topicConfigShell");
    const sessionShell = document.getElementById("topicSessionShell");
    const resultShell = document.getElementById("topicResultShell");
    const amountInput = document.getElementById("amountInput");
    const configFeedback = document.getElementById("configFeedback");

    const summaryTopic = document.getElementById("summaryTopic");
    const summaryDifficulty = document.getElementById("summaryDifficulty");
    const summaryAmount = document.getElementById("summaryAmount");

    const sessionTitle = document.getElementById("sessionTitle");
    const progressText = document.getElementById("progressText");
    const progressPercent = document.getElementById("progressPercent");
    const progressBar = document.getElementById("progressBar");

    const questionPagination = document.getElementById("questionPagination");
    const questionBadge = document.getElementById("questionBadge");
    const questionTopicTag = document.getElementById("questionTopicTag");
    const questionTitle = document.getElementById("questionTitle");
    const questionOptions = document.getElementById("questionOptions");
    const metaTopic = document.getElementById("metaTopic");
    const metaDifficulty = document.getElementById("metaDifficulty");
    const feedbackPanel = document.getElementById("feedbackPanel");
    const feedbackState = document.getElementById("feedbackState");
    const feedbackAnswer = document.getElementById("feedbackAnswer");

    const submitAnswerBtn = document.getElementById("submitAnswerBtn");
    const redoQuestionBtn = document.getElementById("redoQuestionBtn");
    const showAiExplainBtn = document.getElementById("showAiExplainBtn");
    const viewWrongBtn = document.getElementById("viewWrongBtn");

    const aiModal = document.getElementById("aiModal");
    const aiAnswerText = document.getElementById("aiAnswerText");
    const aiExplanationText = document.getElementById("aiExplanationText");

    const wrongDrawer = document.getElementById("wrongDrawer");
    const wrongList = document.getElementById("wrongList");

    const resultSubtitle = document.getElementById("resultSubtitle");
    const finalScore = document.getElementById("finalScore");
    const accuracyRate = document.getElementById("accuracyRate");
    const correctCount = document.getElementById("correctCount");
    const wrongCount = document.getElementById("wrongCount");
    const resultWrongList = document.getElementById("resultWrongList");
    const aiSummaryText = document.getElementById("aiSummaryText");

    function sanitizeAmount(value) {
        const numeric = Number(value);
        if (Number.isNaN(numeric)) return 1;
        return Math.max(1, Math.min(40, numeric));
    }

    function clearAutoNextTimer() {
        if (state.autoNextTimer) {
            clearTimeout(state.autoNextTimer);
            state.autoNextTimer = null;
        }
    }

    function getTopicDisplay(topicKey) {
        return topicLabels[topicKey] || modeLabel;
    }

    function getQuestionById(id) {
        return state.questions.find((item) => item.id === id);
    }

    function updateSummary() {
        summaryTopic.textContent = isTopicMode ? getTopicDisplay(state.selections.topic) : modeLabel;
        summaryDifficulty.textContent = difficultyLabels[state.selections.difficulty];
        summaryAmount.textContent = `${state.selections.amount}题`;
        amountInput.value = state.selections.amount;
    }

    function updateSessionHeader() {
        sessionTitle.textContent = `${summaryTopic.textContent} - ${summaryDifficulty.textContent}难度 - ${state.questions.length}题`;
    }

    function updateProgress() {
        const total = state.questions.length || 1;
        const answeredCount = Object.keys(state.judged).length;
        const currentDisplay = Math.min(state.currentIndex + 1, total);
        const percent = Math.round((answeredCount / total) * 100);

        progressText.textContent = `第 ${currentDisplay}/${total} 题`;
        progressPercent.textContent = `${percent}%`;
        progressBar.style.width = `${percent}%`;
    }

    function renderPagination() {
        questionPagination.innerHTML = "";
        state.questions.forEach((item, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "page-btn";
            button.textContent = String(index + 1);
            if (index === state.currentIndex) button.classList.add("active", "current");
            if (state.wrongQuestionIds.includes(item.id)) button.classList.add("wrong-flag");
            button.addEventListener("click", () => {
                clearAutoNextTimer();
                state.currentIndex = index;
                renderCurrentQuestion();
            });
            questionPagination.appendChild(button);
        });
    }

    function renderFeedback() {
        const currentQuestion = state.questions[state.currentIndex];
        const judgedRecord = currentQuestion ? state.judged[currentQuestion.id] : null;

        if (!judgedRecord) {
            feedbackPanel.className = "feedback-panel hidden";
            feedbackState.textContent = "";
            feedbackAnswer.textContent = "";
            return;
        }

        feedbackPanel.className = `feedback-panel ${judgedRecord.isCorrect ? "correct" : "wrong"}`;
        feedbackState.textContent = judgedRecord.isCorrect ? "回答正确，做得很好。" : "回答错误，请关注正确答案。";
        feedbackAnswer.textContent = `正确答案：${currentQuestion.answer}`;
    }

    function renderOptions(currentQuestion) {
        questionOptions.innerHTML = "";
        const locked = Boolean(state.judged[currentQuestion.id]);
        const selectedAnswer = state.answers[currentQuestion.id] || state.tempSelections[currentQuestion.id] || state.selectedOption;

        currentQuestion.options.forEach((option, optionIndex) => {
            const optionLetter = String.fromCharCode(65 + optionIndex);
            const label = document.createElement("label");
            label.className = "option-item";
            if (locked) label.classList.add("locked");

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "practice-answer";
            input.value = optionLetter;
            input.disabled = locked;

            if (selectedAnswer === optionLetter) {
                input.checked = true;
                label.classList.add("active");
            }
            if (locked && optionLetter === currentQuestion.answer) label.classList.add("correct-lock");
            if (locked && selectedAnswer === optionLetter && optionLetter !== currentQuestion.answer) label.classList.add("wrong-lock");

            const selectOption = () => {
                if (locked) return;
                state.selectedOption = optionLetter;
                state.tempSelections[currentQuestion.id] = optionLetter;
                renderCurrentQuestion();
            };

            input.addEventListener("change", selectOption);
            label.addEventListener("click", (event) => {
                if (event.target !== input) event.preventDefault();
                selectOption();
            });

            const text = document.createElement("span");
            text.textContent = `${optionLetter}. ${option}`;

            label.appendChild(input);
            label.appendChild(text);
            questionOptions.appendChild(label);
        });
    }

    function renderCurrentQuestion() {
        const currentQuestion = state.questions[state.currentIndex];
        if (!currentQuestion) return;

        clearAutoNextTimer();
        questionBadge.textContent = `第 ${state.currentIndex + 1} 题`;
        questionTopicTag.textContent = getTopicDisplay(currentQuestion.topic);
        questionTitle.textContent = currentQuestion.question;
        metaTopic.textContent = getTopicDisplay(currentQuestion.topic);
        metaDifficulty.textContent = difficultyLabels[currentQuestion.difficulty];

        if (!state.judged[currentQuestion.id]) {
            state.selectedOption = state.tempSelections[currentQuestion.id] || state.answers[currentQuestion.id] || null;
        }

        renderOptions(currentQuestion);
        renderPagination();
        renderFeedback();
        updateProgress();
    }

    function buildPracticeQuestions() {
        let filtered = [];
        if (isTopicMode) {
            filtered = questionBank.filter((item) => item.topic === state.selections.topic && item.difficulty === state.selections.difficulty);
        } else {
            filtered = questionBank.filter((item) => item.difficulty === state.selections.difficulty);
        }

        if (!filtered.length) return [];

        const result = [];
        for (let i = 0; i < state.selections.amount; i += 1) {
            const base = filtered[i % filtered.length];
            result.push({ ...base, id: `session-${i + 1}-${base.id}` });
        }
        return result;
    }

    function syncAmountPreset() {
        const value = String(state.selections.amount);
        document.querySelectorAll('.choice-chip[data-group="amount"]').forEach((chip) => {
            chip.classList.toggle("active", chip.dataset.value === value);
        });
    }

    function selectChoice(button) {
        const { group, value } = button.dataset;
        if (group === "amount") {
            state.selections.amount = sanitizeAmount(value);
            syncAmountPreset();
        } else {
            document.querySelectorAll(`.choice-chip[data-group="${group}"]`).forEach((chip) => chip.classList.remove("active"));
            button.classList.add("active");
            state.selections[group] = value;
        }
        configFeedback.textContent = "";
        updateSummary();
    }

    function getResultStats() {
        const total = state.questions.length;
        const correct = Object.values(state.judged).filter((item) => item.isCorrect).length;
        const wrong = total - correct;
        const accuracy = total ? Math.round((correct / total) * 100) : 0;
        return { total, correct, wrong, accuracy, score: accuracy };
    }

    function buildAiSummary(stats) {
        const prefix = isTopicMode ? "本次专题练习" : "本次综合练习";
        if (stats.accuracy === 100) return `${prefix}表现非常稳定，知识点掌握扎实，答题准确率达到满分。后续可以继续提高覆盖范围或进入更高难度训练。`;
        if (stats.accuracy >= 80) return `${prefix}整体表现较好，基础理解已经比较稳定。建议重点回看错题，强化个别易混淆知识点。`;
        if (stats.accuracy >= 60) return `${prefix}已经具备一定基础，但在部分知识点上还不够稳定。建议优先重做错题，再回到基础内容继续巩固。`;
        return `${prefix}暴露出较多薄弱点，建议先回顾基础概念，再针对错题进行小批量重复训练，逐步提升正确率。`;
    }

    function openQuestionById(id) {
        const targetIndex = state.questions.findIndex((item) => item.id === id);
        if (targetIndex < 0) return;
        clearAutoNextTimer();
        state.currentIndex = targetIndex;
        state.selectedOption = state.tempSelections[id] || state.answers[id] || null;
        wrongDrawer.classList.add("hidden");
        resultShell.classList.add("hidden");
        sessionShell.classList.remove("hidden");
        renderCurrentQuestion();
    }

    function renderWrongDrawer() {
        wrongList.innerHTML = "";
        if (!state.wrongQuestionIds.length) {
            const empty = document.createElement("p");
            empty.className = "empty-wrong";
            empty.textContent = "当前练习还没有错题记录。";
            wrongList.appendChild(empty);
            return;
        }

        state.wrongQuestionIds.forEach((id) => {
            const question = getQuestionById(id);
            if (!question) return;

            const card = document.createElement("article");
            card.className = "wrong-item";

            const title = document.createElement("h4");
            title.textContent = question.question;

            const info = document.createElement("p");
            info.textContent = `${getTopicDisplay(question.topic)} · ${difficultyLabels[question.difficulty]} · 正确答案 ${question.answer}`;

            const jump = document.createElement("button");
            jump.type = "button";
            jump.textContent = "跳转到该题";
            jump.addEventListener("click", () => openQuestionById(id));

            card.appendChild(title);
            card.appendChild(info);
            card.appendChild(jump);
            wrongList.appendChild(card);
        });
    }

    function renderResultPage() {
        const stats = getResultStats();
        resultSubtitle.textContent = `${summaryTopic.textContent} - ${summaryDifficulty.textContent}难度 - ${stats.total}题`;
        finalScore.textContent = `${stats.score} 分`;
        accuracyRate.textContent = `${stats.accuracy}%`;
        correctCount.textContent = String(stats.correct);
        wrongCount.textContent = String(stats.wrong);
        aiSummaryText.textContent = buildAiSummary(stats);

        resultWrongList.innerHTML = "";
        if (!state.wrongQuestionIds.length) {
            const empty = document.createElement("p");
            empty.className = "empty-wrong";
            empty.textContent = "本次练习没有错题，继续保持。";
            resultWrongList.appendChild(empty);
        } else {
            state.wrongQuestionIds.forEach((id) => {
                const question = getQuestionById(id);
                if (!question) return;

                const card = document.createElement("article");
                card.className = "result-wrong-item";

                const title = document.createElement("h4");
                title.textContent = question.question;

                const info = document.createElement("p");
                info.textContent = `所属专题：${getTopicDisplay(question.topic)} · 正确答案：${question.answer}`;

                const button = document.createElement("button");
                button.type = "button";
                button.textContent = "查看该题";
                button.addEventListener("click", () => openQuestionById(id));

                card.appendChild(title);
                card.appendChild(info);
                card.appendChild(button);
                resultWrongList.appendChild(card);
            });
        }

        sessionShell.classList.add("hidden");
        resultShell.classList.remove("hidden");
        resultShell.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.querySelectorAll(".choice-chip[data-group]").forEach((button) => {
        button.addEventListener("click", () => selectChoice(button));
    });

    amountInput.addEventListener("input", () => {
        state.selections.amount = sanitizeAmount(amountInput.value);
        syncAmountPreset();
        updateSummary();
    });

    amountInput.addEventListener("blur", () => {
        state.selections.amount = sanitizeAmount(amountInput.value);
        updateSummary();
    });

    document.getElementById("startPracticeBtn").addEventListener("click", () => {
        state.selections.amount = sanitizeAmount(amountInput.value);
        updateSummary();

        const generatedQuestions = buildPracticeQuestions();
        if (!generatedQuestions.length) {
            configFeedback.textContent = "当前条件下暂时没有可用题目，请调整筛选条件后再试。";
            return;
        }

        configFeedback.textContent = "";
        state.questions = generatedQuestions;
        state.currentIndex = 0;
        state.selectedOption = null;
        state.tempSelections = {};
        state.answers = {};
        state.judged = {};
        state.wrongQuestionIds = [];

        updateSessionHeader();
        renderCurrentQuestion();

        configShell.classList.add("hidden");
        resultShell.classList.add("hidden");
        sessionShell.classList.remove("hidden");
        sessionShell.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("backConfigBtn").addEventListener("click", () => {
        clearAutoNextTimer();
        sessionShell.classList.add("hidden");
        resultShell.classList.add("hidden");
        configShell.classList.remove("hidden");
        configShell.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("resetPracticeBtn").addEventListener("click", () => {
        clearAutoNextTimer();
        if (!state.questions.length) return;
        state.currentIndex = 0;
        state.selectedOption = null;
        state.tempSelections = {};
        state.answers = {};
        state.judged = {};
        state.wrongQuestionIds = [];
        resultShell.classList.add("hidden");
        sessionShell.classList.remove("hidden");
        renderCurrentQuestion();
    });

    submitAnswerBtn.addEventListener("click", () => {
        const currentQuestion = state.questions[state.currentIndex];
        if (!currentQuestion || state.judged[currentQuestion.id]) return;

        if (!state.selectedOption) {
            feedbackPanel.className = "feedback-panel wrong";
            feedbackState.textContent = "请先选择一个答案后再提交。";
            feedbackAnswer.textContent = "";
            return;
        }

        const isCorrect = state.selectedOption === currentQuestion.answer;
        state.answers[currentQuestion.id] = state.selectedOption;
        state.tempSelections[currentQuestion.id] = state.selectedOption;
        state.judged[currentQuestion.id] = { selected: state.selectedOption, isCorrect };

        if (!isCorrect && !state.wrongQuestionIds.includes(currentQuestion.id)) {
            state.wrongQuestionIds.push(currentQuestion.id);
        }

        renderCurrentQuestion();

        state.autoNextTimer = setTimeout(() => {
            if (state.currentIndex < state.questions.length - 1) {
                state.currentIndex += 1;
                state.selectedOption = state.tempSelections[state.questions[state.currentIndex]?.id] || null;
                renderCurrentQuestion();
            } else {
                renderResultPage();
            }
        }, 1200);
    });

    redoQuestionBtn.addEventListener("click", () => {
        const currentQuestion = state.questions[state.currentIndex];
        if (!currentQuestion) return;
        clearAutoNextTimer();
        delete state.answers[currentQuestion.id];
        delete state.judged[currentQuestion.id];
        delete state.tempSelections[currentQuestion.id];
        state.wrongQuestionIds = state.wrongQuestionIds.filter((id) => id !== currentQuestion.id);
        state.selectedOption = null;
        renderCurrentQuestion();
    });

    showAiExplainBtn.addEventListener("click", () => {
        const currentQuestion = state.questions[state.currentIndex];
        if (!currentQuestion) return;
        aiAnswerText.textContent = `正确答案：${currentQuestion.answer}`;
        aiExplanationText.textContent = `解析：${currentQuestion.explanation}`;
        aiModal.classList.remove("hidden");
    });

    document.getElementById("closeAiModalBtn").addEventListener("click", () => {
        aiModal.classList.add("hidden");
    });

    aiModal.addEventListener("click", (event) => {
        if (event.target === aiModal) aiModal.classList.add("hidden");
    });

    viewWrongBtn.addEventListener("click", () => {
        renderWrongDrawer();
        wrongDrawer.classList.remove("hidden");
    });

    document.getElementById("closeWrongDrawerBtn").addEventListener("click", () => {
        wrongDrawer.classList.add("hidden");
    });

    wrongDrawer.addEventListener("click", (event) => {
        if (event.target === wrongDrawer) wrongDrawer.classList.add("hidden");
    });

    document.getElementById("redoWrongBtn").addEventListener("click", () => {
        if (!state.wrongQuestionIds.length) {
            resultShell.classList.add("hidden");
            configShell.classList.remove("hidden");
            return;
        }

        const wrongSet = new Set(state.wrongQuestionIds);
        state.questions = state.questions.filter((item) => wrongSet.has(item.id));
        state.currentIndex = 0;
        state.selectedOption = null;
        state.tempSelections = {};
        state.answers = {};
        state.judged = {};
        state.wrongQuestionIds = [];
        updateSessionHeader();
        renderCurrentQuestion();
        resultShell.classList.add("hidden");
        sessionShell.classList.remove("hidden");
    });

    document.getElementById("backTopicHomeBtn").addEventListener("click", () => {
        clearAutoNextTimer();
        resultShell.classList.add("hidden");
        sessionShell.classList.add("hidden");
        configShell.classList.remove("hidden");
        configShell.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    updateSummary();
});
