import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {getCityWeather} from "../../store/actions/WheatherService";

class City extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
            this.props.onSelectCity(this.props.city.name);
    }
    render() {
        const city = this.props.city;
        if (!city.error) {
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
        onSelectCity: (city) => dispatch(getCityWeather(city)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(City);