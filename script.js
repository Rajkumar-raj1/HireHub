const jobs = [
    { title: "Frontend Developer", company: "ABC Tech", location: "Remote", experience: "1-3 Years", salary: "₹6-10 LPA", description: "HTML, CSS, JavaScript required" },
    { title: "Backend Developer", company: "XYZ Solutions", location: "Bangalore", experience: "3-5 Years", salary: "₹8-14 LPA", description: "Node.js / PHP backend developer" },
    { title: "HR Recruiter", company: "HireHub", location: "Delhi", experience: "Fresher", salary: "₹4-6 LPA", description: "Hiring & interview handling" },
    { title: "UI/UX Designer", company: "Creative Studio", location: "Mumbai", experience: "1-3 Years", salary: "₹5-8 LPA", description: "Figma, Adobe XD skills required" }
];


const jobContainer = document.getElementById("jobContainer");
const titleInput = document.getElementById("searchTitle");
const locationInput = document.getElementById("searchLocation");
const experienceSelect = document.getElementById("searchExperience");
const loginBtn = document.getElementById("loginbtn");
const logoutBtn = document.getElementById("logoutBtn");
const applicationsLink = document.getElementById("applicationsLink");

let user = JSON.parse(localStorage.getItem("loggedInUser"));

// ===== LOGIN UI =====
function updateLoginUI() {
    user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline";
        applicationsLink.style.display = "inline";
    } else {
        loginBtn.style.display = "inline";
        logoutBtn.style.display = "none";
        applicationsLink.style.display = "none";
    }
}
updateLoginUI();

// ===== LOGOUT =====
logoutBtn.addEventListener("click", e => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    updateLoginUI();
    window.location.href = "index.html";
});

// ===== RENDER JOBS =====
function renderJobs(jobList) {
    jobContainer.innerHTML = "<h2>Latest Jobs</h2>";

    const appliedJobs = user ? JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [] : [];

    jobList.forEach((job, index) => {
        const isApplied = appliedJobs.some(j => j.title === job.title && j.company === job.company);

        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p class="job-meta">${job.company} | ${job.location}</p>
            <p class="job-meta">Experience: ${job.experience}</p>
            <p class="job-meta">Salary: ${job.salary}</p>
            <p>${job.description}</p>
            <button ${isApplied ? "disabled" : ""} onclick="applyJob(${index})">
                ${isApplied ? "Applied ✔" : "Apply Now"}
            </button>
        `;
        jobContainer.appendChild(card);
    });
}
renderJobs(jobs);

// ===== FILTER =====
function getExpValue(exp) {
    if (exp === "Fresher") return 0;
    if (exp === "1-3 Years") return 1;
    if (exp === "3-5 Years") return 3;
    if (exp === "5+ Years") return 5;
    return 0;
}

function filterJobs() {
    const title = titleInput.value.toLowerCase();
    const location = locationInput.value.toLowerCase();
    const expVal = experienceSelect.value;
    const userExp = getExpValue(expVal);

    const filtered = jobs.filter(job => {
        const matchTitle = job.title.toLowerCase().includes(title);
        const matchLocation = job.location.toLowerCase().includes(location);
        let matchExp = true;
        if (expVal !== "Experience") matchExp = userExp >= getExpValue(job.experience);
        return matchTitle && matchLocation && matchExp;
    });

    renderJobs(filtered);
}

titleInput.addEventListener("input", filterJobs);
locationInput.addEventListener("input", filterJobs);
experienceSelect.addEventListener("change", filterJobs);

// ===== APPLY JOB =====
window.applyJob = function(jobIndex) {
    if (!user) {
        alert("Please login to apply");
        window.location.href = "login.html";
        return;
    }
    window.location.href = `apply.html?jobIndex=${jobIndex}`;
};
