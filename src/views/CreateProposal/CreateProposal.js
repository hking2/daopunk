import { Button, Form, Row, Container, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateProposal = (props) => {
  const form = React.createRef();
  const { currentDao, userAddress } = props;
  console.log(currentDao, 'currentDao');
  console.log(userAddress, 'userAddress');

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    form.current.addEventListener('submit', async(ev) => {
      if (!isLoading) {
        setLoading(true);
        console.log('creating prop');
        ev.preventDefault();
        const targets = document.getElementById('targets').value;
        const values = document.getElementById('values').value;
        const callcontracts = document.getElementById('callcontracts').value;
        const calldatas = document.getElementById('calldatas').value;
        const description = document.getElementById('description').value;
        const userAddress = document.getElementById('description').value;

        const res = await axios.post('/api/create-prop', {
          targets,
          values,
          callcontracts,
          calldatas,
          description,
          userAddress,
          contractAddress: currentDao.contractAddress,
          contractName: currentDao.name,
          tokenAddress: currentDao.tokenAddress,
          tokenName: currentDao.tokenName
        });

        if (res.status === 200) {
          alert('Prop created');
          setLoading(false);
          location.pathname = '/dao/'.currentDao.contractAddress;
        }
      }
    });
  }, [isLoading]);

  return (
    <div>
      <h1>Create Proposal</h1>
      <Form method="post" ref={form}>
        <Container fluid>
          <Row>
            <Col>
              <Form.Group controlId="targets">
                <Form.Label>Call Contract Target</Form.Label>
                <Form.Control type="text" placeholder="0x1234" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="callcontracts">
                <Form.Label>Call Contract Name</Form.Label>
                <Form.Control type="text" placeholder='Example' />
              </Form.Group>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <Form.Group controlId="values">
                <Form.Label>Value</Form.Label>
                <Form.Control type="text" placeholder="0" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="calldatas">
                <Form.Label>Call Data</Form.Label>
                <Form.Control type="text" placeholder='"changeMsg", ["Anarchy!"]' />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Prop desc..." />
              </Form.Group>
            </Col>
          </Row>
          <br />

          <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
          </Button>
        </Container>
      </Form>

      <Outlet />
    </div>
  );
};

export default CreateProposal;
