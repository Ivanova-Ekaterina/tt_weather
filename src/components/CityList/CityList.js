import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";
import {checkCity} from "../../store/actions/WheatherService";

class CityList extends Component {
    render() {
      return(
          <div>
              <div  className={styles.addCity}>
                  <label className={styles.addCityLabel}>Add city</label>
                  <input type="text" className={styles.addCityInput} value={this.props.city} onChange = {(event) => this.props.input(event.target.value)}/>
                  <input type="button" className={styles.addCityButton} value="Add" onClick={() => {(this.props.city !== '')&&(!this.props.cityList.includes(this.props.city)) ? this.props.addCity(this.props.city ): console.log('empty city')}}/>
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
        addCity: (city) => dispatch(checkCity(city)),
        input: (city) => dispatch({type: actionTypes.INPUT, text: city}),
        chooseCity: (city) => dispatch({type:actionTypes.CHOOSE_CITY, name:city, temperature:0, pressure: 0})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
