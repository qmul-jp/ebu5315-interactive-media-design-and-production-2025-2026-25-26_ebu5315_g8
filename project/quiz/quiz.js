document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page !== "daily-quiz") {
        return;
    }

    const sessionKey = "g8-daily-quiz-session";
    const historyKey = "g8-daily-checkin-history";
    const statusKey = "g8-daily-checkin-status";
    const wrongBookKey = "g8-wrong-book";

    const sessionCard = document.getElementById("quizSessionCard");
    const resultCard = document.getElementById("quizResultCard");
    const questionTitle = document.getElementById("quizQuestionTitle");
    const quizTopic = document.getElementById("quizTopic");
    const quizDifficulty = document.getElementById("quizDifficulty");
    const quizMetaTopic = document.getElementById("quizMetaTopic");
    const quizOptions = document.getElementById("quizOptions");
    const submitQuizBtn = document.getElementById("submitQuizBtn");
    const showQuizAiBtn = document.getElementById("showQuizAiBtn");
    const quizFeedback = document.getElementById("quizFeedback");
    const quizFeedbackState = document.getElementById("quizFeedbackState");
    const quizFeedbackText = document.getElementById("quizFeedbackText");

    const resultOutcome = document.getElementById("resultOutcome");
    const resultCorrectAnswer = document.getElementById("resultCorrectAnswer");
    const resultWrongSaved = document.getElementById("resultWrongSaved");
    const resultStreakDays = document.getElementById("resultStreakDays");
    const resultAiExplanation = document.getElementById("resultAiExplanation");
    const resultStatusText = document.getElementById("resultStatusText");
    const viewWrongBookBtn = document.getElementById("viewWrongBookBtn");

    const quizAiModal = document.getElementById("quizAiModal");
    const closeQuizAiModalBtn = document.getElementById("closeQuizAiModalBtn");
    const quizAiAnswer = document.getElementById("quizAiAnswer");
    const quizAiExplanation = document.getElementById("quizAiExplanation");

    const wrongBookModal = document.getElementById("wrongBookModal");
    const closeWrongBookModalBtn = document.getElementById("closeWrongBookModalBtn");
    const wrongBookList = document.getElementById("wrongBookList");

    const session = JSON.parse(localStorage.getItem(sessionKey) || "null");
    if (!session || !session.question || !session.date) {
        window.location.href = "daily.html";
        return;
    }

    const state = {
        selectedOption: null,
        locked: false,
        submitted: false,
        isCorrect: false,
        wrongSaved: false,
    };

    function getHistory() {
        return JSON.parse(localStorage.getItem(historyKey) || "[]");
    }

    function getStatusMap() {
        return JSON.parse(localStorage.getItem(statusKey) || "{}");
    }

    function getWrongBook() {
        return JSON.parse(localStorage.getItem(wrongBookKey) || "[]");
    }

    function setHistory(history) {
        localStorage.setItem(historyKey, JSON.stringify(history));
    }

    function setStatusMap(statusMap) {
        localStorage.setItem(statusKey, JSON.stringify(statusMap));
    }

    function setWrongBook(wrongBook) {
        localStorage.setItem(wrongBookKey, JSON.stringify(wrongBook));
    }

    function getStreakDays() {
        const history = getHistory();
        if (!history.length) {
            return 0;
        }

        const uniqueDays = [...new Set(history)].sort().reverse();
        let streak = 0;
        const current = new Date(`${session.date}T00:00:00`);

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

    function renderOptions() {
        quizOptions.innerHTML = "";
        session.question.options.forEach((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            const label = document.createElement("label");
            label.className = "option-item";
            if (state.locked) {
                label.classList.add("locked");
            }

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "daily-answer";
            input.value = optionLetter;
            input.disabled = state.locked;

            if (state.selectedOption === optionLetter) {
                input.checked = true;
                label.classList.add("active");
            }

            if (state.locked && optionLetter === session.question.answer) {
                label.classList.add("correct-lock");
            }

            if (state.locked && state.selectedOption === optionLetter && optionLetter !== session.question.answer) {
                label.classList.add("wrong-lock");
            }

            const applySelection = () => {
                if (state.locked) {
                    return;
                }
                state.selectedOption = optionLetter;
                renderOptions();
            };

            input.addEventListener("change", applySelection);
            label.addEventListener("click", (event) => {
                if (event.target !== input) {
                    event.preventDefault();
                }
                applySelection();
            });

            const text = document.createElement("span");
            text.textContent = `${optionLetter}. ${option}`;

            label.appendChild(input);
            label.appendChild(text);
            quizOptions.appendChild(label);
        });
    }

    function openAiModal() {
        quizAiAnswer.textContent = `正确答案：${session.question.answer}`;
        quizAiExplanation.textContent = session.question.explanation;
        quizAiModal.classList.remove("hidden");
    }

    function saveWrongQuestion() {
        const wrongBook = getWrongBook();
        const exists = wrongBook.some((item) => item.id === session.question.id);

        if (!exists) {
            wrongBook.unshift({
                id: session.question.id,
                question: session.question.question,
                answer: session.question.answer,
                topic: session.question.topicLabel,
                difficulty: session.question.difficultyLabel,
                explanation: session.question.explanation,
                date: session.date,
            });
            setWrongBook(wrongBook);
        }

        state.wrongSaved = true;
    }

    function markDailyCheckin() {
        const history = getHistory();
        const statusMap = getStatusMap();

        if (!history.includes(session.date)) {
            history.push(session.date);
            history.sort();
            setHistory(history);
        }

        statusMap[session.date] = true;
        setStatusMap(statusMap);
    }

    function renderFeedback() {
        quizFeedback.classList.remove("hidden", "correct", "wrong");

        if (state.isCorrect) {
            quizFeedback.classList.add("correct");
            quizFeedbackState.textContent = "✅ 回答正确";
            quizFeedbackText.textContent = "本题回答正确，今日打卡已完成。";
            return;
        }

        quizFeedback.classList.add("wrong");
        quizFeedbackState.textContent = "❌ 回答错误";
        quizFeedbackText.textContent = `正确答案：${session.question.answer}`;
    }

    function renderResult() {
        const streakDays = getStreakDays();

        resultOutcome.textContent = state.isCorrect ? "回答正确" : "回答错误";
        resultCorrectAnswer.textContent = session.question.answer;
        resultWrongSaved.textContent = state.isCorrect ? "否" : "是";
        resultStreakDays.textContent = `${streakDays} 天`;
        resultAiExplanation.textContent = session.question.explanation;
        resultStatusText.textContent = state.isCorrect
            ? "你已经完成今日打卡，状态很好，继续保持。"
            : "今日虽然答错了，但已经完成打卡，建议接着去专题练习强化薄弱点。";

        sessionCard.classList.add("hidden");
        resultCard.classList.remove("hidden");
        resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderWrongBook() {
        const wrongBook = getWrongBook();
        wrongBookList.innerHTML = "";

        if (!wrongBook.length) {
            const empty = document.createElement("p");
            empty.className = "wrong-empty";
            empty.textContent = "当前还没有错题记录。";
            wrongBookList.appendChild(empty);
            return;
        }

        wrongBook.forEach((item) => {
            const article = document.createElement("article");
            article.className = "wrong-book-item";

            const title = document.createElement("h4");
            title.textContent = item.question;

            const info = document.createElement("p");
            info.textContent = `${item.topic} · ${item.difficulty} · 正确答案 ${item.answer}`;

            article.appendChild(title);
            article.appendChild(info);
            wrongBookList.appendChild(article);
        });
    }

    function submitAnswer() {
        if (state.submitted) {
            return;
        }

        if (!state.selectedOption) {
            quizFeedback.classList.remove("hidden", "correct");
            quizFeedback.classList.add("wrong");
            quizFeedbackState.textContent = "请先选择一个答案";
            quizFeedbackText.textContent = "选择 A/B/C/D 中的一个选项后再提交。";
            return;
        }

        state.submitted = true;
        state.locked = true;
        state.isCorrect = state.selectedOption === session.question.answer;

        if (!state.isCorrect) {
            saveWrongQuestion();
        }

        markDailyCheckin();
        renderOptions();
        renderFeedback();

        window.setTimeout(() => {
            renderResult();
        }, 900);
    }

    function closeModalOnBackdrop(event, modal) {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    }

    questionTitle.textContent = session.question.question;
    quizTopic.textContent = session.question.topicLabel;
    quizDifficulty.textContent = session.question.difficultyLabel;
    quizMetaTopic.textContent = session.question.topicLabel;
    renderOptions();

    submitQuizBtn.addEventListener("click", submitAnswer);
    showQuizAiBtn.addEventListener("click", openAiModal);
    closeQuizAiModalBtn.addEventListener("click", () => {
        quizAiModal.classList.add("hidden");
    });
    quizAiModal.addEventListener("click", (event) => closeModalOnBackdrop(event, quizAiModal));

    viewWrongBookBtn.addEventListener("click", () => {
        renderWrongBook();
        wrongBookModal.classList.remove("hidden");
    });
    closeWrongBookModalBtn.addEventListener("click", () => {
        wrongBookModal.classList.add("hidden");
    });
    wrongBookModal.addEventListener("click", (event) => closeModalOnBackdrop(event, wrongBookModal));
});
