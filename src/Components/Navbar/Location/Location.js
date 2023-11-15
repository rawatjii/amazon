import { Component } from "react";
import { Link } from "react-router-dom";
import Image from "../../Image/Image";
import ModalComponent from '../../Modal/ModalComponent';
import { Button } from "@mui/material";
import {DottedLoader_sm} from "../../Loader/DottedRoundLoader/DottedRoundLoader";
import locationIcon from '../../../assets/icons/location.svg';

const customLoadingCss = {
    display: "block",
    margin: "0",
    border:'none',
    width:'5px',
    height:'8px',
  };

class Location extends Component {
    state = {
        openModal: false,
        address:null,
        loading:false,
    }

    componentDidMount(){
        this.getCurrentLocation();
    }

    getCurrentLocation = async()=>{
        try{
            this.setState(prevState=>({
                loading:true,
            }))
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

                const {latitude,longitude} = pos.coords;
                console.log(latitude,longitude)
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                const response = await fetch(url);
                const data = await response.json();

                this.setState(prevState=>({
                    loading:false,
                    address: {
                        locationState:data.address.state,
                        pin:data.address.postcode,
                    }
                }))
                // .then(res=>res.json())
                // .then(data=>{
                //     this.setState(prevState=>{
                //         prevState.address = {
                //             locationState:data.address.state,
                //             pin:data.address.postcode,
                //         }
                //     })
                //     console.log('data',data)
                // })
            }catch(err){
                this.setState(prevState=>({
                    loading:false,
                    address: null
                }))
                console.log(err);
            }
            
    }

    showModal = () => {
        this.setState({
            openModal: true
        })
    }

    hideModal = () => {
      this.setState({
        openModal:false
      })
    }

    render() {

        var locationData = <DottedLoader_sm /> ;
        if(!this.state.loading){
            locationData = 'Delivering to '+ this.state.address?.locationState + ' ' + this.state.address?.pin;
        }

        return (
            <>
                <div className='header_item location' onClick={this.showModal}>
                    <div className='icon'>
                        <Image src={locationIcon} />
                    </div>
                    <div className='text'>
                        <small>{!this.state.loading && !this.state.address ? 'Hello' : locationData }</small>
                        <p>{this.state.address ? 'Update location' : 'Select your address'}</p>
                    </div>
                    
                </div>

                <ModalComponent modalStatus={this.state.openModal} hideModal={this.hideModal} width="375" className="location_modal">
                    <div className='modal-header'>
                        <h6 className='title'>Choose your location</h6>
                    </div>
                    <div className='modal-body'>
                        <p>Select a delivery location to see product availability and delivery options</p>
                        {/* <button onClick={this.getCurrentLocation}>Set Current Location</button> */}
                        <Link to='signin'>Sign in to see your addresses</Link>
                        {/* <small>or enter an indian pincode</small>
                        <div className="form-group">
                            <form>
                                <input type="number" />
                                <button type="submit">Apply</button>
                            </form>
                            
                        </div> */}
                        {/* <Button variant="contained" className='btn btn_fill' color="secondary">Sign in to update your location</Button> */}
                        {/* <button className='btn btn_fill'>Sign in to update your location</button> */}
                    </div>
                </ModalComponent>
            </>
        )
    }
}

export default Location;