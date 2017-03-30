import React, {Component} from 'react'; 
import NewPlaylist from '../components/NewPlaylist';
import axios from 'axios'; 

export default class PlaylistContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputVal: '', 
            buttonBool: true, 
            initialVal: false, 
            shouldHide: true
        }
        this.getInputVal = this.getInputVal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    getInputVal(e) {
        this.setState({inputVal: e.target.value}) 
            let len = e.target.value.length; 

            if(len && len <= 16) {
                this.setState({buttonBool: false})
                this.setState({initialVal: true})

            } else {
                this.setState({buttonBool: true})
            } 
            //console.log(this.state.buttonBool, this.state.initialVal); 

            //This determines whether the warning div should be visible
             if ((this.state.initialVal && len > 16) || (this.state.initialVal && len < 1)) {
            this.state.shouldHide = false; 
             } else {
           this.state.shouldHide = true; 
       }
    } 
        

    handleSubmit(e) {
        console.log("PLAYLIST NAME", this.state.inputVal, "LENGTH", this.state.inputVal.length); 
        let len = this.state.inputVal.length; 
        len > 0 && len <= 16 ? this.setState({inputVal: ''}) : console.log("INPUTS ARE REQUIRED and must be less than 17 chars");
/*in the review video, joe put this post request in the AppContainer. */
         axios.post('/api/playlists', {name: this.state.inputVal})
            .then(res => res.data)
            .then(result => {
            console.log(result) // response json from the server!
        })
        .catch(error => console.error.bind(console))
    }

   
    render() {
        return (
            <NewPlaylist handleSubmit={this.handleSubmit} getFormInput={this.getInputVal} inputVal={this.state.inputVal} disableButton={this.state.buttonBool} shouldHide={this.state.shouldHide} />
            
        )
    }

}