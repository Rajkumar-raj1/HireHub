
const jobs = [
    { title: "Frontend Developer", company: "ABC Tech", location: "Remote", experience: "1-3 Years", salary: "₹6-10 LPA", description: "HTML, CSS, JavaScript required" },
    { title: "Backend Developer", company: "XYZ Solutions", location: "Bangalore", experience: "3-5 Years", salary: "₹8-14 LPA", description: "Node.js / PHP backend developer" },
    { title: "HR Recruiter", company: "HireHub", location: "Delhi", experience: "Fresher", salary: "₹4-6 LPA", description: "Hiring & interview handling" },
    { title: "UI/UX Designer", company: "Creative Studio", location: "Mumbai", experience: "1-3 Years", salary: "₹5-8 LPA", description: "Figma, Adobe XD skills required" }
];

const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) { alert("Login required"); window.location.href = "login.html"; }

const params = new URLSearchParams(window.location.search);
const jobIndex = parseInt(params.get("jobIndex"));
if (isNaN(jobIndex) || !jobs[jobIndex]) {
    alert("Invalid job selection");
    window.location.href = "index.html";
}
const job = jobs[jobIndex];

document.getElementById("jobTitle").innerText = job.title;
document.getElementById("jobCompany").innerText = job.company;

const applyForm = document.getElementById("applyForm");
applyForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const resumeInput = document.getElementById("resume");

    if(!name || !email || !phone || resumeInput.files.length === 0) {
        alert("Please fill all fields and upload your resume");
        return;
    }

    const storageKey = `appliedJobs_${user.email}`;
    const appliedJobs = JSON.parse(localStorage.getItem(storageKey)) || [];

    if(appliedJobs.some(j => j.title === job.title && j.company === job.company)) {
        alert("You already applied for this job");
        window.location.href = "applications.html";
        return;
    }

    appliedJobs.push({
        title: job.title,
        company: job.company,
        location: job.location,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        name,
        email,
        phone,
        resume: resumeInput.files[0].name,
        appliedAt: new Date().toLocaleString(),
        status: "Applied"
    });

    localStorage.setItem(storageKey, JSON.stringify(appliedJobs));
    alert("Application submitted successfully!");
    window.location.href = "applications.html";
});
