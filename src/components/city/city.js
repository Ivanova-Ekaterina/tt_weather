import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "../../store/actions/actionTypes";

class City extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, eventId: null };
    }
    componentWillMount() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${window.location.pathname.substring(1)}&appid=b41984b8b5135f1695c5faac30990138`)
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
        const props = this.props;
        if (!this.state.error) {
            return (
                <div onLoad={() => this.componentWillMount(props.city.name)}>
                    <div className="City">
                        <label>
                            City:
                        </label>
                        {props.city.name}
                    </div>
                    <div className="City">
                        <label>
                            Temperature:
                        </label>
                        {props.city.temperature}
                    </div>
                    <div className="City">
                        <label>
                            Pressure:
                        </label>
                        {props.city.pressure}
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