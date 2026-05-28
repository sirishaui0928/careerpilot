
const generateCoverLetter =
    async (req, res) => {

        try {

            const {

                company,

                role,

                skills,

            } = req.body;

            const coverLetter = `

Dear Hiring Manager at ${company},

I am excited to apply for the ${role} position.

I have experience in ${skills} and I am passionate about building high-quality applications and solving real-world problems.

I believe my technical skills, problem-solving ability, and passion for learning make me a strong candidate for this role.

Thank you for considering my application.

Sincerely,
CareerPilot User
`;

            res.json({
                coverLetter,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Failed to generate cover letter",
            });
        }
    };

module.exports = {
    generateCoverLetter,
};
