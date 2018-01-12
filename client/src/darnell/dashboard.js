
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import placeholder from './placeholder.png';




export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="back-dash">
                <nav className="navbar navbar-default headman">
                    <img src={placeholder} width="10%" height="10%"className="logo" />
                    <h2 className="title"><strong>Parkify</strong> </h2>
                    <img src={placeholder} width="10%" height="10%"className="profile" />
                    <a href="/"><button type="submit" className="btn btn-primary login"> Logout </button></a>
                </nav>
                <div className="container-fluid">
                    <div className="modal  fade" id="creating" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h3 className="createTitle">Create Parking Space</h3>
                                    <form>
                                        <input name="createStreet" className="form-control normal" placeholder=" Street Name" />
                                        <input name="createStreet2" className="form-control normal" placeholder=" Street #2" />
                                        <input name="createCity" className="form-control small" placeholder=" City" />
                                        <input name="createState" className="form-control small" placeholder=" State" />
                                        <input name="createZip" className="form-control small" placeholder=" Zip" style={{ marginBottom: '5%' }} />
                                        <label>Rate: (per hour)
                      <select className="form-control normal" name="createRate" style={{ paddingTop: '5%' }}>
                                                <option>$1</option>
                                                <option>$2</option>
                                                <option>$3</option>
                                                <option>$4</option>
                                                <option>$5</option>
                                                <option>$6</option>
                                                <option>$7</option>
                                                <option>$8</option>
                                                <option>$9</option>
                                                <option>$10</option>
                                            </select>
                                        </label>
                                        <h4 className="message">Message:</h4>
                                        <input className="editDescription" name="description" placeholder=" Enter description of parking space and other details" />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal  fade" id="editing" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header" style={{ marginLeft: '90%' }}>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h3 className="editTitle">Edit Parking Spot</h3>
                                    <form method="POST">
                                        <input className="form-control normal" name="editTitle" defaultValue=" Airport Parking" />
                                        <input className="form-control normal" name="editStreet" defaultValue=" 123 Street" />
                                        <input className="form-control normal" name="editStreet2" />
                                        <input className="form-control small" name="editCity" defaultValue=" Phoenix" />
                                        <input className="form-control small" name="editState" defaultValue=" AZ" />
                                        <input className="form-control small" name="editZip" defaultValue={87363} style={{ marginBottom: '5%' }} />
                                        <br />
                                        <br />
                                        <label>
                                            Rate(per hour):
                      <select name="editRate" className="form-control normal" id="question01">
                                                <option>$1</option>
                                                <option>$2</option>
                                                <option>$3</option>
                                                <option>$4</option>
                                                <option>$5</option>
                                                <option>$6</option>
                                                <option>$7</option>
                                                <option>$8</option>
                                                <option>$9</option>
                                                <option>$10</option>
                                            </select>
                                        </label>
                                    </form></div>
                                <h4 className="message">Message:</h4>
                                <input className="editDescription" defaultValue="Location 10 blocks from airport, thrid house from the corner on zappy avennue and 16th street" name="description" placeholder=" Enter description of parking space and other details" />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal  fade" id="enlarging" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h3>John Doe requested this spot</h3>
                                    <div className="ownerside enlargeAddress">
                                        <h3 className="parkingspotname">Parking Spot Name</h3>
                                        <h3 className="street">Street Name:</h3>
                                        <h3 className="street">City,State,Zip</h3>
                                    </div>
                                    <div className="ownerside enlargeTime">
                                        <h3 className="rateEnlarge">Rate:</h3>
                                        <h3 className="startTime">Start Time:</h3>
                                        <h3 className="endTime">End Time:</h3>
                                        <h3 className="totalTime">Total Time:</h3>
                                    </div>
                                    <div className="driverside enlargeRenter">
                                        <h2 className="renterTitle">Renter</h2>
                                        <h3 className="renterName">Name</h3>
                                        <h3 className="phoneNumber">Phone Number</h3>
                                    </div>
                                    <div className="driverside enlargeCar">
                                        <h2>Vehicle</h2>
                                        <h3 className="carInfo">2000 Nissan Maxima Silver</h3>
                                        <h3 class="lisenceinfo">Lisence Plate: ER45JN</h3>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal  fade" id="alerting" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h3 className="bookTitle"><strong>Booking Request:</strong> 555 Yum Ave, AZ,98474</h3>
                                    <div className="ownerside">
                                        <h3><strong>Renter</strong></h3>
                                        <h3 className="renterName">John Doe:</h3>
                                        <h3 className="renterPhone">123-333-4443</h3>
                                    </div>
                                    <div className="ownerside">
                                        <h2><strong>Vehicle</strong></h2>
                                        <h3 className="renterCar">2000 Nissan Maxima Silver</h3>
                                        <h3 className="renterLiscence">Lisence Plate: ER45JN</h3>
                                    </div>
                                    <hr />
                                    <div className="ownerside">
                                        <h2 className="rateTitle"><strong>Rate:</strong></h2>
                                        <h3 className="rateHour">$5/hour</h3>
                                        <h3 className="rateTotal">$10 total</h3>
                                    </div>
                                    <div className="ownerside">
                                        <h2><strong>Duration</strong></h2>
                                        <h3 className="startTime">Start Time:</h3>
                                        <h3 className="endTime">End Time:</h3>
                                        <h3 className="totalTime">2 hours</h3>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Reject</button>
                                    <button type="button" className="btn btn-primary">Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="mySpot">My Parking Spots</h2>
                    <div className="row garageSale">
                        <div className="col-xs-3 space creator" data-toggle="modal" data-target="#creating">
                            <br />
                            <h4 className="create">Create a new parking spot</h4>
                            <img src={placeholder} width="10%" height="10%" className="plus" />
                        </div>
                        <div className="col-xs-3 space occupied" data-toggle="modal" data-target="#enlarging">
                            <div className="bubble enlarger">
                                <img src={placeholder} className="enlarge icons" />
                            </div>
                            <h4 className="spaceName">Name of Parking Space</h4>
                            <div className="rate info">
                                <h5 className="dollar detail">Rate:7$/hour</h5></div>
                            <div className="location info">
                                <h5 className="detail street">Moonway ave</h5>
                                <h5 className="address">Phoenix,AZ,85230</h5>
                            </div>
                            <div className="status info">
                                <h5 className="stat detail">Occupied</h5>
                            </div>
                        </div>
                        <div className="col-xs-3 space empty">
                            <div className="bubble editor">
                                <img src={placeholder} width="10%" height="10%"className="pensil icons" data-toggle="modal" data-target="#editing" />
                            </div>
                            <h4 className="spaceName">Name of Parking Space</h4>
                            <div className="rate info">
                                <h5 className="dollar detail">Rate:7$/hour</h5></div>
                            <div className="location info">
                                <h5 className="detail street">Moonway ave</h5>
                                <h5 className="address">Phoenix,AZ,85230</h5>
                            </div>
                            <div className="status info">
                                <h5 className="stat detail">Vacant</h5>
                            </div>
                        </div>
                        <div className="col-xs-3 space alerts">
                            <div className="bubble alerter notif" data-toggle="modal" data-target="#alerting">
                                <img src={placeholder} width="10%" height="10%"className="bell icons" />
                            </div>
                            <h4 className="spaceName">Name of Parking Space</h4>
                            <div className="rate info">
                                <h5 className="dollar detail">Rate:7$/hour</h5></div>
                            <div className="location info">
                                <h5 className="detail street">Moonway ave</h5>
                                <h5 className="address">Phoenix,AZ,85230</h5>
                            </div>
                            <div className="status info">
                                <h5 className="stat detail">John Doe sent a request</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}