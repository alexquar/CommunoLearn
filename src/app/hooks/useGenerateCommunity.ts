import {model} from "../../config";

export default async function useGenerateCommunity(prompt: string) {
    let result= "";
    let error = null;

    try {
        prompt = `You are a helpful assistant walking a user through the process of creating a new community for an online productivity tool. Please help the user 
         generate a community based on the following idea they had: ${prompt}. Please be sure to include the following information in your response:
         1. A catchy name for the community
         2. A brief description of the community's purpose and goals
         3. A slogan or tagline for the community
         4. The community type from this list of options: (Class
                  High School Club
                  University Club
                  Workplace
                  Friend Group
                  Event Planning
                  Team
                  Commitee
                  Other)`;
        const response  = await model.generateContent(prompt);
        result = response.response.text()
        if (result) {
            console.log(result)
        }
    } catch (err) {
        error = err;
        console.error("Error generating community:", error);
    }

    return { result, error };
}