import React from "react";
import axios from "axios";

export default class AccountInfo extends React.Component {
    constructor() {
      super();
      this.state = {
        email: '',
        addresses: [],
      };
    }

    async componentDidMount() {
      const token = window.localStorage.getItem("token");
      const sendData = {
        headers: {
          authorization: token,
        },
      };
      const { data: user } = await axios.get(`/api/users/`, sendData);
      this.setState({ email: user.email });
      const { data: addresses } = await axios.get(`/api/address/`, sendData);
      this.setState({ addresses: addresses });
    }

    render() {
      if (!this.state.email) {
        return <div>Loading</div>;
      }
      return (
        <div id='account-page'>
            <h2>Account Info</h2>
            <div>
                <h3>Email: {this.state.email}</h3>
            </div>
            {(!this.state.addresses[0]) ? <h3>No address on file!</h3> : <h3>Addresses:</h3>}
            {this.state.addresses.map(address => (
                <div key={address.id}>
                <div className="address">
                    <h5>Address {address.id}</h5>
                    <div>{address.streetAddress}</div>
                    <div>{address.city}, {address.state}</div>
                    <div>{address.zipCode}</div>
                </div>
                </div>
            ))}
        </div>
      );
    }
  };
