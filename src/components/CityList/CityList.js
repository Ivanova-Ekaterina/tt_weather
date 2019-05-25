import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";

class CityList extends Component {
    render() {
        let cities = [];
        if (this.props.cityList !== undefined)
            this.props.cityList.forEach(function(city){
                cities.push(city);
                }
            );
      return(
          <div>
              <div  className={styles.addCity}>
                  <label className={styles.addCityLabel}>Add city</label>
                  <input type="text" className={styles.addCityInput} value={this.props.value} onChange = {(event) => this.props.input(event.target.value)}/>
                  <input type="button" className={styles.addCityButton} value="Add" onClick={() => this.props.addCity(this.props.city)}/>
              </div>
            <div>
                <ul className={styles.citiesUl}>
                {cities.map((em, iid,) =>
                    <li className={styles.City} key={iid}>
                        <Link to={`/${em}`}>
                            {em}
                        </Link>
                    </li>)
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
        input: (city) => dispatch({type: actionTypes.INPUT, text: city})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
