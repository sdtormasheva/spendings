import React, {ReactNode} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import dataService, {Record} from "../../DataService";
import RecordForm from '../../components/record';


import "./styles.css";

// мы используем react-router и хотим иметь доступ к параметрам пути
// поэтому наследуемся от RouteComponentProps

interface IncomePageProps extends RouteComponentProps {
     

}

interface IncomePageState {
    record_list: Record[]; 

}

class IncomePage extends React.Component<IncomePageProps, IncomePageState> {


    constructor(props: Readonly<IncomePageProps>) {
        super(props);
        this.state = {
            record_list: []};
    }

    async componentDidMount() {
        let record_list: Record[] = await dataService.getRecords('spending');

        this.setState({
            record_list
        });
    }

    onAdd = (record: Record) => {
        this.setState({
            record_list: [...this.state.record_list, record],
        });
    }


    render(): ReactNode {
        const { record_list } = this.state;

        return (
            <div className="App">
                <nav className="navbar navbar-expand-lg sticky-top navbar-dark bd-navbar">
                    <a className="navbar-brand" href="#">TotalPage</a>
                    <div id="navbarNavDropdown" className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item text-nowrap">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.props.history.push('/total')}
                                            type="button">Total
                                </button>
                            </li>

                            <li className="nav-item text-nowrap">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.props.history.push('/spendings')}
                                            type="button">Расходы
                                </button>
                            </li>

                            <li className="nav-item text-nowrap">
                                <button className="btn btn-outline-secondary"
                                        onClick={() => this.props.history.push('/income')}
                                            type="button">Доходы
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            
                <RecordForm type="income" onAdd={this.onAdd} />
                
                {record_list.map((record: Record, index: number) => (
                     <div key={index} className="card card-body">
                         <div className="row__date">
                             {record.record_date}   
                         </div>                  
                         <div className="row__text">
                             {record.text}
                         </div>         
                         <div className="row__value">
                             {record.record_value}
                         </div> 
                     </div>
                 ))}
            </div>
        )
    }

};

export default withRouter(IncomePage);