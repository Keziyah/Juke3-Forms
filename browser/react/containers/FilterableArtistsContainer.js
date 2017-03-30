import React, { Component } from 'react';
import Artists from '../components/Artists';
import FilterInput from '../components/FilterInput';

export default class FilterableArtistsContainer extends Component {
    constructor(props) {
        super(props); 

        this.state = {inputVal: ''}
        this.getInputVal = this.getInputVal.bind(this);
    }

    getInputVal(e) {
        let val = e.target.value;
        this.setState({inputVal: val})
    }

    /*methods are usually called handleChange/handleSubmit, but can be named anything
    But event handlers must be named onChange/onSubmit
     */

    render() {
        const inputVal = this.state.inputVal;
        const filtered = this.props.artists.filter(artist =>
            artist.name.toLowerCase().match(inputVal.toLowerCase()));  //match returns the ones that are true
        /*here, make sure we get back the entire object and not just a string.  */
        //with includes: 
        // this.props.artists.filter(
        //     artistObj => artistObj.name.toLowerCase().includes(this.state.inputVal.toLowerCase());
        // )

        return (
            <div>
                <FilterInput getInputVal={this.getInputVal} />
                <Artists artists={filtered}/>
            </div>
        )
    }
}