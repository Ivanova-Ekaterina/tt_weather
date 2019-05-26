import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";

class CityList extends Component {//todo clear input
    AddCity(city, Add){
        if ((city !== '')&&(!this.props.cityList.includes(city)))
        {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b41984b8b5135f1695c5faac30990138`)
                .then(response => response.json())
                .then(data => {
                    if (data.cod !== "404") {
                        Add(city);
                    }
                    else
                        console.log(data.message)
                })
                .catch(error => {
                    console.log(error.toString());
                });
        }

    }
    render() {
      return(
          <div>
              <div  className={styles.addCity}>
                  <label className={styles.addCityLabel}>Add city</label>
                  <input type="text" className={styles.addCityInput} value={this.props.city} onChange = {(event) => this.props.input(event.target.value)}/>
                  <input type="button" className={styles.addCityButton} value="Add" onClick={() => {this.AddCity(this.props.city, this.props.addCity)}}/>
              </div>
            <div>
                <ul className={styles.citiesUl}>
                {(!this.props.cityList || this.props.cityList.length > 0) ? this.props.cityList.map((em, iid,) =>
                    <li className={styles.City} key={iid} onClick={() => this.props.chooseCity(em)}>
                        <Link to={`/${em}`} >
                            {em}
                        </Link>
                    </li>) : ''
                }
                </ul>
            </div>
          </div>
      );
    }
}
const mapStateToProps = state => {
    return {
        cityList: state.cityList.cityList,
        city: state.cityList.cityInput
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addCity: (city) => dispatch({type: actionTypes.ADD_CITY, city: city}),
        input: (city) => dispatch({type: actionTypes.INPUT, text: city}),
        chooseCity: (city) => dispatch({type:actionTypes.CHOOSE_CITY, name:city, temperature:0, pressure: 0})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
