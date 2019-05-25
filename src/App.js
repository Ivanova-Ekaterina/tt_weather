import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import CityList from "./components/CityList/CityList";
import City from "./components/city/city";
import connect from "react-redux/es/connect/connect";

class App extends Component {
    render() {
        const props = this.props;
        return <Router>
            <div>
                <Route exact path='/' component={CityList}/>
                {props.cities !== undefined ?  (props.cities.map((el, id) =>
                        <Route exact  key={id+5000} path={`/${el}`} render={() =><City key={id} city={props.city.name} temperature={props.city.temperature} pressure={props.city.pressure}/>} />))
                    : ''}
            </div>
        </Router>
    }
}

const mapStateToProps = state => {
    return {
        cities: state.cityList.cityList,
        city: state.city
    }
};


export default connect(mapStateToProps)(App);

