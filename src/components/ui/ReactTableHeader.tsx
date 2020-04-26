import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

interface ReactTableProps {
    onClick(arg: string): void;
    urlCreate: string
}

const ReactTableHeader : React.FunctionComponent<ReactTableProps> = (props) => {

    const { onClick,urlCreate } = props;

    const [searchQuery, setSearchQuery] = useState("");

    return <div className="form-group">
                <div className="controls">
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Link to={{pathname: urlCreate}} className="btn btn-success">
                        <i className="fa fa-plus"></i>
                        {' '} Create 
                    </Link>
                </InputGroupAddon>
                <Input placeholder="Search..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <InputGroupAddon addonType="append">
                    <button className="btn btn-secondary" type="button" onClick={() => onClick(searchQuery)}>
                    <i className="fa fa-search"></i>
                    {' '} Search
                    </button>
                </InputGroupAddon>
                </InputGroup>
                </div>
            </div>
}

export default ReactTableHeader;