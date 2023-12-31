import axios from 'axios';

const host = window.location.hostname;
const port = 4000;

const api = axios.create({
    baseURL: `http://${host}:${port}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axios api

//check if 


export const register = (username, firstname, lastname, email, mobilenumber, password) =>
    api.post('/register', { username, firstname, lastname, email, mobilenumber, password });

export const login = (username, password) => api.post('/login', { username, password });

export const getUserInfo = (id, setUser) => {
    api.get(`/users/${id}`)
        .then(res => {setUser(res.data);})
        .catch(err => {console.log(err)});
};

export const updateUserInfo = (id, formData) => api.put(`/users/${id}`, formData);

export const addRecipe = (name, ingredients, instruction, type, typeId, thumb) =>
    api.post('/recipes', { name, ingredients, instruction, type, typeId, thumb });

export const updateRecipe = (id, name, ingredients, instruction) => api.put(`/recipes/${id}`, { name, ingredients, instruction });

export const getRecipe = (id) => api.get(`/recipes/${id}`);

export const deleteRecipe = (id) => api.delete(`/recipes/${id}`)

export const getAllFavorites = (userId) => api.get(`/users/${userId}/favorites`);

export const fetchRecipeByType = (type, typeId, setRecipeByType) => {
    api.get(`/recipes/${type}/${typeId}`)
        .then(res => {setRecipeByType(res.data);})
        .catch(err => {console.log(err)});
};

export const fetchFavorite = (userId, recipeId, setFavorite) => {
    api.get(`/users/${userId}/favorites/${recipeId}`)
        .then(res => {setFavorite(res.data ? true : false);})
        .catch(err => {console.log(err)});
};

export const addFavorite = (userId, recipeId) => api.post(`/users/${userId}/favorites`, { recipeId });

export const deleteFavorite = (userId, recipeId) => api.delete(`/users/${userId}/favorites/${recipeId}`);

// themealdb api
export const searchRecipe = (searchTerm, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

export const fetchRecipe = async (id, setRecipe) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    setRecipe(data.meals[0]);
};

export const fetchRandom = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    window.location.replace(`/recipe/${data.meals[0].idMeal}`);
};

export const fetchAreas = async (setAreas) => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await res.json();
    setAreas(data.meals);
};

export const fetchCategories = async (setCategories) => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await res.json();
    setCategories(data.meals);
};

export const searchByArea = (area, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(res => res.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

export const searchByCategory = (category, setSearchResults) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => {setSearchResults(data.meals);})
        .catch(error => console.error(error));
};

