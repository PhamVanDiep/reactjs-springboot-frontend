import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import configData from "./config.json"

const ListTutorial = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(configData.API_BASE + `/tutorials/`)
        .then(response => response.json())
        .then(data => {
            setTutorials(data);
            setLoading(false);
        })
    }, []);

    const remove = async (id) => {
        await fetch(configData.API_BASE + `/tutorials/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }).then(() => {
            let updateTutorials = [...tutorials].filter(i => i.id !== id);
            setTutorials(updateTutorials);
        });
    }

    if (loading) {
        return <p>Loading...</p>
    }

    const tutorialList = tutorials.map(tutorial => {
        return (
            <tr key={tutorial.id}>
                <td style={{whiteSpace: 'nowrap'}}>{tutorial.name}</td>
                <td>{tutorial.price}</td>
                <td>{tutorial.description}</td>
                <td>{tutorial.published}</td>
                <td style={{textAlign:'center'}}>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/tutorials/" + tutorial.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => remove(tutorial.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    })

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/tutorials/new">Add Tutorial</Button>
                </div>
            </Container>
            <h3>List of Tutorials</h3>
            <Table className="mt-4">
                <thead>
                    <tr>
                        <th width="30%">Tutorial Name</th>
                        <th width="10%">Price</th>
                        <th width="40%">Description</th>
                        <th width="10%">Published</th>
                        <th width="10%" style={{textAlign:'center'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tutorialList}
                </tbody>
            </Table>
        </div>
    );
}

export default ListTutorial;