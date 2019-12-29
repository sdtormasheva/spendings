import React, { useState } from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import dataService, { Record } from "../../DataService";

import "./styles.css";

// мы используем react-router и хотим иметь доступ к параметрам пути
// поэтому наследуемся от RouteComponentProps

interface RecordFormProps {
     type: string,
     onAdd: (record: Record) => void,
}

interface RecordFormState {
    record_date: string,
    record_descr: string,
    record_value: number,
}

class RecordForm extends React.Component<RecordFormProps, RecordFormState> {
    constructor(props: Readonly<RecordFormProps>) {
        super(props);
        this.state = {
            record_date: "",
            record_descr: "",
            record_value: 100,
        };
    }

    changeDate(newDate: string) {
        this.setState({
            record_date: newDate
        });
    }

    changeDescr(newDescr: string) {
        this.setState({
            record_descr: newDescr
        });
    }

    changeValue(newValue: number) {
        this.setState({
            record_value: newValue
        });
    }


    render(): React.ReactNode {
        return (
            <div>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInput">date</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            id="inlineFormInput"
                            placeholder="date"
                            value={this.state.record_date}
                            onChange={e => {
                                this.changeDate(e.target.value);
                            }}
                        />
                    </div>

                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInputGroup">description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputGroup"
                            placeholder="description"
                            value={this.state.record_descr}
                            onChange={e => {
                                this.changeDescr(e.target.value);
                            }}
                        />
                    </div>

                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInputGroup">sum</label>
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup"
                                placeholder="sum"
                                value={this.state.record_value}
                                onChange={e => {
                                    this.changeValue(Number(e.target.value));
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-auto">
                        <button
                            className="btn btn-primary mb-2"
                            onClick={async () => {
                                const record = await dataService.saveRecord({
                                    id: 6,
                                    type: this.props.type,
                                    record_date: this.state.record_date,
                                    text: this.state.record_descr,
                                    record_value: this.state.record_value,
                                    author: "",
                                });
                                this.props.onAdd(record);
                            }}
                        >Submit</button>
                    </div>
                </div>
            </div>
        );
    }

};

export default RecordForm