import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchRandom } from "../api";

const Home = ({ user }) => {
    const [searchResults, setSearchResults] = useState([]);

    const goAdvancedSearch = () => {
        window.location.replace('/search');
    };

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
            <h1 className="pb-2 mt-4 mb-2 border-bottom">Home</h1>
            <p className="lead">Welcome, {user.firstname}. ({user.username})</p>
        </div>
        </div>

        <SearchBar setSearchResults={setSearchResults} />
        <div className="row my-5 primarycolor">
            {searchResults && searchResults.map((meal) => (
                <div className="col-sm-3">
                <a href={`/recipe/${meal.idMeal}`}>
                <h5 className="primarycolor" style={{'textAlign':'center'}}>{meal.strMeal}</h5>
                <div key={meal.idMeal} className="fakeimg">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="shadow" />
                    <div className="overlay">
                        <div className="text"></div>
                    </div>
                </div>
                </a>
                </div>
            ))}
        </div>

        <div className="row mb-5">
        <div className="col-sm-12">
            <button type="button" className="btn btn-outline-light btn-block" onClick={goAdvancedSearch}>Advanced Search</button>
            <button type="button" className="btn btn-outline-light btn-block" onClick={fetchRandom}>Random Recipe</button>
        </div>
        </div>

        </>
    );
};

export default Home;
