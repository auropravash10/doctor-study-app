document.addEventListener("DOMContentLoaded", function () {

    // ================= DARK MODE =================
    const toggle = document.getElementById("darkToggle");

    if (toggle) {
        toggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                toggle.innerText = "☀️";
                localStorage.setItem("darkMode", "enabled");
            } else {
                toggle.innerText = "🌙";
                localStorage.setItem("darkMode", "disabled");
            }
        });

        // Remember dark mode
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            toggle.innerText = "☀️";
        }
    }

    // ================= TIMER =================
    let time = 1500;
    let timerRunning = false;
    let interval;

    window.startTimer = function () {
        if (!timerRunning) {
            timerRunning = true;
            interval = setInterval(function () {
                if (time > 0) {
                    time--;
                    updateTimerDisplay();
                } else {
                    clearInterval(interval);
                    timerRunning = false;
                    alert("Focus session complete 🩺");
                }
            }, 1000);
        }
    };

    window.resetTimer = function () {
        clearInterval(interval);
        time = 1500;
        timerRunning = false;
        updateTimerDisplay();
    };

    function updateTimerDisplay() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        document.getElementById("timer").innerText =
            minutes + ":" + seconds;
    }

    // ================= SUBJECT SWITCH =================
    const subjects = ["Anatomy 🧠", "Physiology ❤️", "Biochemistry 🧬"];
    let currentSubject = 0;

    window.nextSubject = function () {
        currentSubject = (currentSubject + 1) % subjects.length;
        document.getElementById("subject").innerText =
            subjects[currentSubject];
    };

    // ================= STUDY SYSTEM =================
    let today = new Date().toLocaleDateString();
    let savedDate = localStorage.getItem("studyDate");
    let totalHours = parseFloat(localStorage.getItem("studyHours")) || 0;
    let dailyTarget = parseFloat(localStorage.getItem("dailyTarget")) || 6;
    let weeklyData = JSON.parse(localStorage.getItem("weeklyData")) || {};
    let streakCount = parseInt(localStorage.getItem("streakCount")) || 0;

    // DAILY RESET CHECK
    if (savedDate !== today) {

        if (savedDate) {
            weeklyData[savedDate] = totalHours;

            if (totalHours >= dailyTarget) {
                streakCount++;
            } else {
                streakCount = 0;
            }

            localStorage.setItem("weeklyData", JSON.stringify(weeklyData));
            localStorage.setItem("streakCount", streakCount);
        }

        totalHours = 0;
        localStorage.setItem("studyDate", today);
        localStorage.setItem("studyHours", totalHours);
    }

    document.getElementById("totalHours").innerText = totalHours;
    document.getElementById("targetInput").value = dailyTarget;
    document.getElementById("streakCount").innerText = streakCount;

    updateProgress();
    updateWeeklyTotal();
    checkBadge();

    // ADD HOURS
    window.addStudyHours = function () {
        let input = parseFloat(document.getElementById("studyInput").value);

        if (!isNaN(input) && input > 0) {
            totalHours += input;
            localStorage.setItem("studyHours", totalHours);

            document.getElementById("totalHours").innerText =
                totalHours.toFixed(1);

            document.getElementById("studyInput").value = "";

            updateProgress();
            updateWeeklyTotal();
        }
    };

    // RESET TODAY
    window.resetStudyHours = function () {
        totalHours = 0;
        localStorage.setItem("studyHours", totalHours);
        document.getElementById("totalHours").innerText = totalHours;
        updateProgress();
    };

    // UPDATE TARGET
    window.updateTarget = function () {
        let newTarget = parseFloat(document.getElementById("targetInput").value);

        if (!isNaN(newTarget) && newTarget > 0) {
            dailyTarget = newTarget;
            localStorage.setItem("dailyTarget", dailyTarget);
            updateProgress();
        }
    };

    // PROGRESS
    function updateProgress() {
        if (!dailyTarget || dailyTarget === 0) return;

        let percent = (totalHours / dailyTarget) * 100;
        if (percent > 100) percent = 100;

        document.getElementById("progressFill").style.width =
            percent + "%";

        document.getElementById("progressPercent").innerText =
            Math.floor(percent);
    }

    // WEEKLY TOTAL
    function updateWeeklyTotal() {
        let total = 0;
        for (let day in weeklyData) {
            total += weeklyData[day];
        }
        total += totalHours;

        document.getElementById("weeklyTotal").innerText =
            total.toFixed(1);
    }

    // ================= BADGE SYSTEM =================
    function checkBadge() {
        if (streakCount >= 7) {
            let badge = document.getElementById("badge");
            if (badge) {
                badge.classList.remove("hidden");
            }
        }
    }

// ================= MOTIVATION SYSTEM =================

const motivations = [

"Dr. Sarmistha, every page you study today saves a life tomorrow.",
"Consistency is building your white coat one day at a time.",
"Future doctors don't quit — they adapt.",
"Small disciplined hours become medical excellence.",
"You are training for responsibility, not just exams.",
"The struggle now becomes someone's survival later.",
"Medicine rewards persistence.",
"Every revision strengthens your confidence.",
"Anatomy today, mastery tomorrow.",
"Focus creates brilliance.",

"Your dream degree is earned daily.",
"Stay patient — healing takes time.",
"Doctors are built in silent study rooms.",
"Progress > perfection.",
"You’re becoming stronger than your excuses.",
"One focused session at a time.",
"Late nights build bright futures.",
"You are closer than you think.",
"Your dedication is your advantage.",
"Future Dr. energy activated.",

"Trust the process.",
"Discipline is your superpower.",
"You don’t need motivation. You need commitment.",
"Every hour compounds.",
"Excellence is repetition.",
"Keep showing up.",
"You’re building something rare.",
"Stay sharp.",
"Growth feels uncomfortable.",
"Doctors never stop learning.",

"Your effort is visible.",
"Your journey matters.",
"Focus beats talent.",
"You are capable.",
"Hard days create strong doctors.",
"Your ambition is powerful.",
"You were made for this.",
"Keep moving forward.",
"One more hour.",
"Stay unstoppable.",

"Your dream career is watching you.",
"You are becoming elite.",
"Discipline over distraction.",
"You chose medicine for a reason.",
"Stay committed.",
"Your consistency is impressive.",
"You are evolving.",
"Study like a future surgeon.",
"Build your legacy.",
"Your focus is attractive.",

"Be proud of your effort.",
"Today’s sacrifice, tomorrow’s pride.",
"You’re not behind.",
"Keep rising.",
"Your grind is meaningful.",
"Push gently, but push daily.",
"Success is silent.",
"Stay steady.",
"You are disciplined.",
"Trust your strength.",

"Stay curious.",
"Stay focused.",
"You’re stronger than stress.",
"Study with purpose.",
"Medicine needs you prepared.",
"Clarity comes with repetition.",
"Progress daily.",
"Build resilience.",
"Stay calm. Stay sharp.",
"You are improving.",

"Excellence is daily.",
"Keep stacking wins.",
"Strong mind, steady heart.",
"Stay consistent.",
"Confidence comes from preparation.",
"Be proud quietly.",
"Keep grinding.",
"Don’t break the streak.",
"Future doctor energy.",
"Stay relentless.",

"You’re building your dream.",
"Stay patient with yourself.",
"Small progress is still progress.",
"Commitment creates confidence.",
"You are unstoppable.",
"Keep your standard high.",
"Show up again tomorrow.",
"Doctors are forged in discipline.",
"Stay focused, Dr. Sarmistha.",
"You are capable of greatness.",

"The white coat is earned.",
"Consistency creates credibility.",
"You are becoming exceptional.",
"Stay locked in.",
"Future patients depend on this effort.",
"Build the habit.",
"Stay sharp and steady.",
"You are closer every day.",
"Hard work compounds.",
"Keep becoming."
];

function getRandomMotivation() {
    const randomIndex = Math.floor(Math.random() * motivations.length);
    return motivations[randomIndex];
}

window.showMotivation = function () {
    document.getElementById("motivation").innerText =
        getRandomMotivation();
};

// Show random one on page load
document.getElementById("motivation").innerText =
    getRandomMotivation();

    // ================= PARTICLE BACKGROUND =================
    const canvas = document.getElementById("particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = "rgba(0,212,255,0.6)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < 80; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

});
// ================= HIDDEN COMPLIMENTS =================

const compliments = [

"Discipline looks powerful on you.",
"You carry future doctor energy effortlessly.",
"Smart is attractive.",
"You look confident when you focus.",
"Your ambition is impressive.",
"Consistency suits you.",
"You don’t even realize how capable you are.",
"Focused you = unstoppable.",
"You’re building something rare.",
"Strength and softness — that’s powerful.",

// Slightly cute + playful
"Future Dr. energy is kind of adorable.",
"Even your focus face is cute.",
"Saving lives and stealing hearts? Multitasking.",
"Anatomy isn’t the only thing with structure — look at your discipline.",
"You study like a champion. Very Barça of you.",
"Brains + dedication = unfair advantage.",
"If ambition had a face… it would look like this.",
"You glow differently when you're working toward your dream.",
"Some people chase dreams. You’re building yours.",
"Low-key impressive. High-key inspiring."

];

// Rare special compliment (5% chance)
const rareCompliment = 
"Not going to lie… the world is lucky you chose medicine. ❤️";

window.revealCompliment = function () {

    const complimentEl = document.getElementById("compliment");
    const complimentText = document.getElementById("complimentText");
    const heart = document.getElementById("heart");

    let text;

    // 5% rare chance
    if (Math.random() < 0.05) {
        text = rareCompliment;
    } else {
        text = compliments[Math.floor(Math.random() * compliments.length)];
    }

    complimentText.innerText = text;

    complimentEl.classList.remove("hidden");
    complimentEl.classList.add("show");

    heart.classList.remove("pulse");
    void heart.offsetWidth;
    heart.classList.add("pulse");

    setTimeout(() => {
        heart.classList.remove("pulse");
    }, 3000);
};