import * as actions from './actionTypes';

export const getCityWeather = (city) => {
    return dispatch => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b41984b8b5135f1695c5faac30990138`)
            .then(response => response.json())
            .then((data) => dispatch({
                type: actions.CHOOSE_CITY,
                name: data.city.name,
                pressure: data.list[0].main.pressure,
                temperature: data.list[0].main.temp,
                error: false
            }))
            .catch(err => dispatch({
                type: actions.CHOOSE_CITY,
                error: false
            }))
    }
};

export const checkCity = (city) => {
    return dispatch => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b41984b8b5135f1695c5faac30990138`)
            .then(response => response.json())
            .then((data) => {
                if (data.cod !== "404")
                {
                    dispatch({
                    type: actions.ADD_CITY,
                    city: city
                    })
                }
                else
                {
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
};