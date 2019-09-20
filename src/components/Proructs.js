import React, {Component, createRef} from 'react';
import {base} from '../firebase/firebase';
import { Card, Icon } from 'antd';
import ContentEditable from 'react-contenteditable'

  class Products extends Component {
    constructor(props) {
      super(props);

      this.state={
          products: null,
          instrumnet: null,
          parts: null,
          manufactures: null,
          createProductFormVisible: false,
          manufacturerSelectOptionVisiable: false,
      }

      this.productManufacturerRef = createRef();
      this.productModelRef = createRef();
      this.productNameRef = createRef();
      this.productSrNoRef = createRef();
      this.productSymbolNoRef = createRef();
      this.productTypeRef = createRef()
    }
    
    componentDidMount() {
        this.ref = base.syncState(`products`, {
            context: this,
            state: "products"
        });

        this.ref = base.syncState(`manufactures`, {
            context: this,
            state: "manufactures"
        });
    }

    addProduct = (
        id,
        manufacturer, 
        model, 
        name, 
        srNo,
        symbolNo,
        type
    ) => {
      const products = { ...this.state.products };
      products[`${id}`]={
          Manufacturer : manufacturer, 
          Model :  model,
          Name : name,
          SrNo : srNo,
          SymbolNo: symbolNo,
          Type: type
        };
      this.setState({ products });
    };

    deleteProduct = id => {
      const products = {...this.state.products}
      products[`${id}`] = null;
      this.setState({products})
    }

    updateProductManufacturer = (id, manufacturer) => {
      const products = {...this.state.products}
      products[`${id}`].Manufacturer = manufacturer;
      this.setState({products})
    }

    updateProductModel = (id, model) => {
        const products = {...this.state.products}
        products[`${id}`].Model = model;
        this.setState({products})
    }


    updateProductName = (id, name) => {
        const products = {...this.state.products}
        products[`${id}`].Name = name;
        this.setState({products})
    }

    updateProductSrNo = (id, srNo) => {
        const products = {...this.state.products}
        products[`${id}`].SrNo = srNo;
        this.setState({products})
    }

    updateProductSymbolNo = (id, symbolNo) => {
        const products = {...this.state.products}
        products[`${id}`].SymbolNo = symbolNo;
        this.setState({products})
    }

    createProductFormShow = () => this.setState({createProductFormVisible: !this.state.createProductFormVisible})
    manufacturerSelectOptionShow = () => this.setState({manufacturerSelectOptionVisiable: !this.state.manufacturerSelectOptionVisiable})

    dropDown = (key, manufacturer) => 
        <select 
            className="form-control form-control-sm" 
            onChange={(event)=>{
                event.persist()
                this.updateProductManufacturer(key, event.target.value)
            }}
        >{Object.keys(this.state.manufactures)?
        Object.keys(this.state.manufactures).map((item, index)=>
        item === manufacturer? 
            <option selected key={index} value={item} className="dropdown-item" >
                {item}
            </option>
            :<option key={index} value={item} className="dropdown-item" >
                {item}
            </option>)
            :''
        }</select>
    render() {
        return  (
            <>{this.state.products?
                <div 
                    id="products" 
                    style={{width: '100%', padding: "25px"}} 
                >        
                    <Card
                        style={{margin: '2px'}} 
                        title={
                            <span style={{color:'rgb(0, 75, 222)'}}>
                                Products
                            </span>
                        }
                        extra={
                            <Icon 
                                style={{color: 'green'}}
                                type="edit" 
                                key="edit" 
                                onClick={this.createProductFormShow}
                            />
                        }
                    >
                    
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>
                                <span style={{color:'rgba(0, 75, 222, 0.5)'}}>Parts</span>
                                <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.state.products).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                            <th scope="col">Manufacturer</th>
                                            <th scope="col">Model</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">SrNo</th>
                                            <th scope="col">SymbolNo</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    :''}
                                    <tbody>{Object.keys(this.state.products).map(key => (
                                        this.state.products[key].Type === 'Parts'?
                                        <tr 
                                            key={key} 
                                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                        >
                                            <td onClick={()=>this.manufacturerSelectOptionShow()}>{
                                                this.state.manufacturerSelectOptionVisiable===true? 
                                                this.dropDown(key, this.state.products[key].Manufacturer)
                                                :this.state.products[key].Manufacturer
                                            }</td>
                                                
                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].Model}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductModel(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].Name}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductName(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].SrNo}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductSrNo(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].SymbolNo}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductSymbolNo(key, event.target.value)}
                                                />
                                            </td>
                                            
                                            <td>
                                                <Icon
                                                    style={{color: 'red'}} 
                                                    type="delete" 
                                                    key="delete" 
                                                    onClick={()=>this.deleteProduct(key)}
                                                />
                                            </td>
                                        </tr>
                                        :null           
                                    ))}</tbody>
                                </table>


                                <span style={{color:'rgba(0, 75, 222, 0.5)'}}>Instrument</span>
                                <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.state.products).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                            <th scope="col">Manufacturer</th>
                                            <th scope="col">Model</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">SrNo</th>
                                            <th scope="col">SymbolNo</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    :''}
                                    <tbody>{Object.keys(this.state.products).map(key => (
                                        this.state.products[key].Type === 'Instrument'?
                                        <tr 
                                            key={key} 
                                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                        >
                                            <td onClick={()=>this.manufacturerSelectOptionShow()}>{
                                                this.state.manufacturerSelectOptionVisiable===true? 
                                                    this.dropDown(key, this.state.products[key].Manufacturer)
                                                    :this.state.products[key].Manufacturer
                                            }</td>
                                        
                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].Model}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductModel(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].Name}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductName(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].SrNo}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductSrNo(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.state.products[key].SymbolNo}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateProductSymbolNo(key, event.target.value)}
                                                />
                                            </td>
                                    
                                            <td>
                                                <Icon
                                                    style={{color: 'red'}} 
                                                    type="delete" 
                                                    key="delete" 
                                                    onClick={()=>this.deleteProduct(key)}
                                                />
                                            </td>
                                        </tr>
                                        :null           
                                    ))}</tbody>
                                </table>
                            </div>

                            <div className='col-lg-6 col-md-12 col-sm-12'>{this.state.createProductFormVisible === true?
                                <form onSubmit={(event)=>{
                                    event.preventDefault()

                                    this.addProduct(
                                        parseInt(Object.keys(this.state.products)[Object.keys(this.state.products).length-1])+1,
                                        this.productManufacturerRef.current.value, 
                                        this.productModelRef.current.value, 
                                        this.productNameRef.current.value,
                                        this.productSrNoRef.current.value,
                                        this.productSymbolNoRef.current.value,
                                        this.productTypeRef.current.value
                                    )

                                    event.currentTarget.reset();
                                }}>
                                    <div className="form-group">
                                        <select 
                                            className="form-control" 
                                            ref={this.productManufacturerRef}
                                        >{Object.keys(this.state.manufactures)?
                                        Object.keys(this.state.manufactures).map((item, index)=>
                                            <option 
                                                key={index} 
                                                value={item} 
                                                className="dropdown-item" 
                                            >
                                                {item}
                                            </option>)
                                            :''
                                        }</select>                  
                                    </div>
                                
                                    <div className="form-group">
                                        <input
                                            name="productModel"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.productModelRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            name="productName"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.productNameRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            name="productSrNo"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.productSrNoRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            name="productSymbolNo"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.productSymbolNoRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <select 
                                            className="form-control" 
                                            ref={this.productTypeRef}
                                        >
                                            <option 
                                                key='1' 
                                                value='Parts'
                                                className="dropdown-item" 
                                            >
                                                Parts
                                            </option>

                                            <option 
                                                key='2' 
                                                value='Instrument' 
                                                className="dropdown-item" 
                                            >
                                                Instrument
                                            </option>
                                        </select> 
                                    </div>
                                
                                    <button 
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </form>
                                :''
                            }</div>
                        </div>
                    </Card>
                </div>
                :''
            }</>
        )
    }
}


export default Products