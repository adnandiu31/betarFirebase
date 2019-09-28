{/* <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.state.manufactures).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>   
                                            <th scope="col">Repair Id </th>
                                            <th scope="col">Date </th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Fault Location</th>
                                            <th scope="col">Fault Location Image</th>
                                            <th scope="col">Fault Identified</th>
                                            <th scope="col">Symptom</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    :''
                                }
                                    <tbody>{Object.keys(this.state.manufactures).map(key => (
                                        <tr 
                                            key={key} 
                                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                        >
                                            <td>{key}</td>
                                            <td>{key}</td>
                                            <td>{key}</td>
                                            <td>{key}</td>
                                            <td>{key}</td>
                                            <td>
                                                <ContentEditable
                                                    html={this.state.manufactures[key].Country}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateManufactureCountry(key, event.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <ContentEditable
                                                    html={this.state.manufactures[key].Address}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateManufactureAddress(key, event.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Icon
                                                    style={{color: 'red'}} 
                                                    type="delete" 
                                                    key="delete" 
                                                    onClick={()=>this.deleteManufacture(key)}
                                                />
                                            </td>
                                        </tr>           
                                    ))}</tbody>
                                </table> */}
