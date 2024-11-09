interface ResumeData {
    fullName: string;
    email: string;
    phoneNum: string;
    username: string;
    school: string;
    degree: string;
    graduationYear: string;
    skills: string;
    company: string;
    profilePicture: File | null;
}

const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumePreview = document.getElementById('resumePreview') as HTMLDivElement;
const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
const downloadButton = document.getElementById('downloadResume') as HTMLButtonElement;

function generateResumePreview(data: ResumeData) {
    const resumeHTML = `
        <h2>${data.fullName}'s Resume</h2>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phoneNum}</p>
        <h3>Education</h3>
        <p><strong>School:</strong> ${data.school}</p>
        <p><strong>Degree:</strong> ${data.degree}</p>
        <p><strong>Graduation Year:</strong> ${data.graduationYear}</p>
        <h3>Experience</h3>
        <p><strong>Skill:</strong> ${data.skills}</p>
        <p><strong>Company:</strong> ${data.company}</p>
    `;

    resumePreview.innerHTML = resumeHTML;

    if (data.profilePicture) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.createElement('img');
            img.src = reader.result as string;
            img.alt = "Profile Picture";
            img.style.width = "150px";
            img.style.height = "150px";
            img.style.borderRadius = "50%";
            img.style.border = "3px solid aqua";
            img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.9)";
            img.style.marginLeft = "200px";
            resumePreview.prepend(img);
        };
        reader.readAsDataURL(data.profilePicture);
    }
}

resumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const formData: ResumeData = {
        fullName: (document.getElementById('fullName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phoneNum: (document.getElementById('phoneNum') as HTMLInputElement).value,
        username: (document.getElementById('username') as HTMLInputElement).value,
        school: (document.getElementById('school') as HTMLInputElement).value,
        degree: (document.getElementById('degree') as HTMLInputElement).value,
        graduationYear: (document.getElementById('graduationYear') as HTMLInputElement).value,
        skills: (document.getElementById('skills') as HTMLInputElement).value,
        company: (document.getElementById('company') as HTMLInputElement).value,
        profilePicture: profilePictureInput.files ? profilePictureInput.files[0] : null,
    };

    generateResumePreview(formData);
});

downloadButton.addEventListener('click', () => {
    const resumeContent = resumePreview.innerHTML;

    const win = window.open("", "_blank");
    if (win) {
        win.document.write(`
            <html>
            <head>
                <title>Download Resume</title>
            </head>
            <body>
                ${resumeContent}
            </body>
            </html>
        `);
        win.document.close();
        win.print();
    }
});