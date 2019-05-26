import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "../../store/actions/actionTypes";

class City extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, eventId: null };
    }
    componentDidMount() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.city.name}&appid=b41984b8b5135f1695c5faac30990138`)
            .then(response => response.json())
            .then(data => {
                this.props.loadCity(data.city.name, data.list[0].main.pressure, data.list[0].main.temp);
                this.setState({error: false});
            })
            .catch(error => {
                console.log(error.toString());
                this.setState({error: true});

            });
    }
    render() {
        const city = this.props.city;
        if (!this.state.error) {
            return (
                <div>
                    <div className="City">
                        <label>
                            City:
                        </label>
                        {city.name}
                    </div>
                    <div className="City">
                        <label>
                            Temperature:
                        </label>
                        {city.temperature}
                    </div>
                    <div className="City">
                        <label>
                            Pressure:
                        </label>
                        {city.pressure}
                    </div>
                    <div>
                        <Link to='/'><input type="button" value="Back to list"/></Link>
                    </div>
                </div>);
        }
        else {
            return(
                <div>
                    No such city :(
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        city: state.city
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadCity: (city, pressure, temperature) => dispatch({type: actionTypes.CHOOSE_CITY, name: city, pressure: pressure, temperature: temperature}),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(City);