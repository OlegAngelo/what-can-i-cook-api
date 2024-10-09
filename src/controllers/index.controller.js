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
 * @param   {object} ingredients - The concatenated ingredient (e.g. "Apple Milk Orange Banana")
 * @param   {object} res - Express response object
 * @returns {object} JSON object containing recipe data
 * @throws  {500} If there is unexpected server error. Other than that, will throw what the API error is
 */
const getRecipeList = async (ingredients, res)=>{
    const type = 'public'; // This can be public, any, or user. Check API docs for more information.

    // Validate required query parameters
    if (!type || !apiId || !apiAppKey) {
        return res.status(400).json({ error: 'Missing required query parameters.' });
    }

    // Comment below if there is validation/ingredients passed
    ingredients = 'salad';

    /** 
    * Comment code below if there is still no other validation/ingredients passed
    * 
    * TODO: Need to add validation
    *   - REQUIRED if no other parameter is specified. 
    *   - NOT REQUIRED if any other parameter (other than application credentials) is specified.
    *
    * if (!ingredients || typeof ingredients !== 'string' || ingredients.trim() === '') {
    *     return res.status(400).json({ error: 'Invalid or missing ingredients' });
    * }
    */

    try {
        const response = await axios.get(apiUrl, {
            params: {
                app_id: apiId,
                app_key: apiAppKey,
                type: type,
                q: ingredients 
            }
        });

        if (response.status == 200) {
            const recipes = response.data.hits;

            recipes.map((recipe, index) => { 
                if (recipe.recipe != null) {
                    console.log(`${index}`, recipe.recipe.image);
                    console.log(`${index} Recipe for: `, recipe.recipe.label);
                
                    recipe.recipe.ingredients.forEach((ingredient, index) => {
                        // console.log(`Ingredient ${index + 1}:`);
                        console.log(`Text: ${ingredient.text}`);
                        console.log(`Quantity: ${ingredient.quantity ?? 'N/A'}`);
                        console.log(`Measure: ${ingredient.measure ?? 'N/A'}`);
                        console.log(`Food: ${ingredient.food ?? 'N/A'}`);
                        console.log(`Weight: ${Math.round(ingredient?.weight * 100) / 100 ?? 'N/A'}`);
                        console.log(`Food Category: ${ingredient.foodCategory ?? 'N/A'}`);
                        // console.log(`Food ID: ${ingredient.foodId}`);
                        // console.log(`Image URL: ${ingredient.image}`);
                        console.log('-----------------------');
                    });
                }
                else {
                    throw error;
                }
            });
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