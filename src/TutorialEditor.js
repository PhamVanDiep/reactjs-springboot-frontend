import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import './App.css';
import configData from "./config.json"

const TutorialEditor = () => {
    const tutorialState = {
        name: '',
        price: 0.00,
        description: '',
        published: 1
    };
    const [tutorial, setTutorial] = useState(tutorialState);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if(id !== 'new') {
            fetch(configData.API_BASE + `/tutorials/${id}`)
            .then(response => response.json())
            .then(data => setTutorial(data));
        }
    }, [id, setTutorial]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setTutorial({...tutorial, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(configData.API_BASE + '/tutorials' + (tutorial.id ? '/' + tutorial.id : '/'), {
            method: (tutorial.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutorial)
        });
        setTutorial(tutorialState);
        navigate('/tutorials');
    }

    const title = <h2>{tutorial.id ? 'Edit Tutorial' : 'Add Tutorial'}</h2>
    return (
        <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={tutorial.name || ''}  onChange={handleChange} autoComplete="name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="number" step={0.01} name="price" id="price" value={tutorial.price || 0.00} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <textarea type="text" name="description" id="description" value={tutorial.description || ''} onChange={handleChange}></textarea>
                    </FormGroup>
                    <FormGroup>
                        <div>
                            <input type="radio" value="1" name="published" className="radio-published" checked={tutorial.published.toString() === '1'} onChange={handleChange}/>Published
                            <input type="radio" value="0" name="published" style={{marginLeft:'20px'}} className="radio-published" checked={tutorial.published.toString() === '0'} onChange={handleChange}/>Not publised
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" style={{marginRight:'20px'}}>Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/tutorials">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

export default TutorialEditor;