const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) { alert("Login required"); window.location.href = "login.html"; }

const storageKey = `appliedJobs_${user.email}`;
let appliedJobs = JSON.parse(localStorage.getItem(storageKey)) || [];
const container = document.getElementById("applicationsContainer");
document.getElementById("userEmail").innerText = user.email;

function renderApplications() {
    container.innerHTML = "";
    if(appliedJobs.length === 0){
        container.innerHTML = "<p class='empty-msg'>No applications yet.</p>";
        return;
    }

    appliedJobs.forEach((job, index) => {
        const div = document.createElement("div");
        div.className = "application-card";
        div.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company">${job.company} | ${job.location}</p>
            <p class="meta">Experience: ${job.experience} | Salary: ${job.salary}</p>
            <p>Name: ${job.name}</p>
            <p>Email: ${job.email}</p>
            <p>Phone: ${job.phone}</p>
            <p>Resume: ${job.resume || "Not uploaded"}</p>
            <p>Applied on: ${job.appliedAt}</p>
            
            <button onclick="withdraw(${index})" class="withdraw-btn">Withdraw</button>
        `;
        container.appendChild(div);
    });
}

window.withdraw = function(index) {
    if(confirm("Are you sure you want to withdraw this application?")){
        appliedJobs.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(appliedJobs));
        renderApplications();
    }
};

renderApplications();

window.logout = function(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
};
