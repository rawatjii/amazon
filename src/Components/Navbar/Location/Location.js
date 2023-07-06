import { Component } from "react";
import Image from "../../Image/Image";
import ModalComponent from '../../Modal/ModalComponent';
import { Button } from "@mui/material";
import locationIcon from '../../../assets/icons/location.svg';

class Location extends Component {
    state = {
        openModal: false
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
        return (
            <>
                <div className='header_item location' onClick={this.showModal}>
                    <div className='icon'>
                        <Image src={locationIcon} />
                    </div>
                    <div className='text'>
                        <small>Hello</small>
                        <p>Select your address</p>
                    </div>
                </div>

                <ModalComponent modalStatus={this.state.openModal} hideModal={this.hideModal} width="375" className="location_modal">
                    <div className='modal-header'>
                        <h6 className='title'>Choose your location</h6>
                    </div>
                    <div className='modal-body'>
                        <p>Delivery options and delivery speeds may vary for different locations</p>
                        <Button variant="contained" className='btn btn_fill' color="secondary">Sign in to update your location</Button>
                        {/* <button className='btn btn_fill'>Sign in to update your location</button> */}
                    </div>
                </ModalComponent>
            </>
        )
    }
}

export default Location;