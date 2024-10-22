const axios = require('axios');

// Credentials are from https://developer.edamam.com/admin/applications
const apiBaseUrl = 'https://api.edamam.com';
const apiPathV2 = '/api/recipes/v2';
const apiUrl = apiBaseUrl + apiPathV2;
const apiId = '2bb5540e';
const apiAppKey = 'ae5f39e076976feeede8020af1287163';

/**
 * @route   GET /
 * @desc    Get recipe information based on query as parameters
 * @param   {object} request - The concatenated ingredients list (e.g. "Apple Milk Orange Banana")
 * @param   {object} res - Express response object
 * @returns {object} JSON object containing recipe data
 * @throws  {500} If there is unexpected server error. Other than that, will throw what the API error is
 */
const getRecipeList = async (request, res)=>{
    const type = 'public'; // This can be public, any, or user. Check API docs for more information.
    // Validate required query parameters
    if (!type || !apiId || !apiAppKey) {
        return res.status(400).json({ error: 'Missing required query parameters.' });
    }
    try {
        const response = await axios.get(apiUrl, {
            params: {
                app_id: apiId,
                app_key: apiAppKey,
                type: type,
                q: request.query.ingredients,
            }
        });
        if (response.status === 200) {
            const hits = response.data.hits || [];
            if (hits.length === 0) {
                // No data case (status is 200 but no hits)
                return res.status(200).json({ message: 'No recipes found!' });
            }
            // Map the data if hits exist
            const recipesData = hits.map((hit, index) => {
                const recipeData = hit.recipe;
                console.log('BE data: ', recipeData)
                return {
                    recipe_id: index + 1,
                    name: recipeData.label,
                    image: recipeData.image,
                    total_time: recipeData.totalTime,
                    meal_type: recipeData.mealType,
                    ingredient_lines: recipeData.ingredientLines,
                    url: recipeData.url,
                    dish_type: recipeData.dishType,
                    cuisine_type: recipeData.cuisineType,
                    calorie: Math.round(parseFloat(recipeData.calories))
                };
            });
            return res.json(recipesData);
        }
    } catch (error) {
        // Handle errors from the external API
        console.error('Error calling external API:', error);
        res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching data from external API.' });
    }
};
module.exports = {
    getRecipeList,
};