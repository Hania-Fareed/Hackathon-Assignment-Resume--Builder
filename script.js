var resumeForm = document.getElementById('resumeForm');
var resumePreview = document.getElementById('resumePreview');
var profilePictureInput = document.getElementById('profilePicture');
var downloadButton = document.getElementById('downloadResume');
function generateResumePreview(data) {
    var resumeHTML = "\n        <h2>".concat(data.fullName, "'s Resume</h2>\n        <p><strong>Username:</strong> ").concat(data.username, "</p>\n        <p><strong>Email:</strong> ").concat(data.email, "</p>\n        <p><strong>Phone:</strong> ").concat(data.phoneNum, "</p>\n        <h3>Education</h3>\n        <p><strong>School:</strong> ").concat(data.school, "</p>\n        <p><strong>Degree:</strong> ").concat(data.degree, "</p>\n        <p><strong>Graduation Year:</strong> ").concat(data.graduationYear, "</p>\n        <h3>Experience</h3>\n        <p><strong>Skill:</strong> ").concat(data.skills, "</p>\n        <p><strong>Company:</strong> ").concat(data.company, "</p>\n    ");
    resumePreview.innerHTML = resumeHTML;
    if (data.profilePicture) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            var img = document.createElement('img');
            img.src = reader_1.result;
            img.alt = "Profile Picture";
            img.style.width = "150px";
            img.style.height = "150px";
            img.style.borderRadius = "50%";
            img.style.border = "3px solid aqua";
            img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.9)";
            img.style.marginLeft = "200px";
            resumePreview.prepend(img);
        };
        reader_1.readAsDataURL(data.profilePicture);
    }
}
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phoneNum: document.getElementById('phoneNum').value,
        username: document.getElementById('username').value,
        school: document.getElementById('school').value,
        degree: document.getElementById('degree').value,
        graduationYear: document.getElementById('graduationYear').value,
        skills: document.getElementById('skills').value,
        company: document.getElementById('company').value,
        profilePicture: profilePictureInput.files ? profilePictureInput.files[0] : null,
    };
    generateResumePreview(formData);
});
downloadButton.addEventListener('click', function () {
    var resumeContent = resumePreview.innerHTML;
    var win = window.open("", "_blank");
    if (win) {
        win.document.write("\n            <html>\n            <head>\n                <title>Download Resume</title>\n            </head>\n            <body>\n                ".concat(resumeContent, "\n            </body>\n            </html>\n        "));
        win.document.close();
        win.print();
    }
});
