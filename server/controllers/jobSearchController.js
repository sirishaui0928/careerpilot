
const axios =
    require("axios");

const searchJobs =
    async (req, res) => {

        try {

            const keyword =
                req.query.keyword ||
                "React Developer";

            const response =
                await axios.get(

                    "https://jsearch.p.rapidapi.com/search",

                    {
                        params: {

                            query: keyword,

                            page: "1",

                            num_pages: "1",
                        },

                        headers: {

                            "X-RapidAPI-Key":
                                process.env.RAPID_API_KEY,

                            "X-RapidAPI-Host":
                                "jsearch.p.rapidapi.com",
                        },
                    }
                );

            res.json(
                response.data.data
            );

        } catch (error) {

            console.log(
                error.response?.data ||
                error.message
            );

            res.status(500).json({

                message:
                    "Failed to fetch jobs",
            });
        }
    };

module.exports = {
    searchJobs,
};

