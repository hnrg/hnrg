import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Confirm,
  Divider,
  Form,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';


const DemographicDataList = (props) => {
    console.log(props);
    const totalPages = !props.count ? 0 : props.totalCount / props.count;
    return(
      <Segment>
        <Header as='h2' content='Listado de Datos demográficos' />
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre del paciente</Table.HeaderCell>
              <Table.HeaderCell>Heladera</Table.HeaderCell>
              <Table.HeaderCell>Electricidad</Table.HeaderCell>
              <Table.HeaderCell>Mascotas</Table.HeaderCell>
              <Table.HeaderCell>Tipo de vivienda</Table.HeaderCell>
              <Table.HeaderCell>Tipo de calefacción</Table.HeaderCell>
              <Table.HeaderCell>Tipo de agua</Table.HeaderCell>
              <Table.HeaderCell>Editar</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.patients && props.patients.map((patient, id) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Header as='h5' content={<Link to={`patients/${patient._id}`}>{patient.firstName} {patient.lastName}</Link>} />
                </Table.Cell>
                <Table.Cell>{patient.demographicData && patient.demographicData.refrigerator ? "Si" : "No" }</Table.Cell>
                <Table.Cell>{patient.demographicData && patient.demographicData.electricity ? "Si" : "No" }</Table.Cell>
                <Table.Cell>{patient.demographicData && patient.demographicData.pet ? "Si" : "No" }</Table.Cell>
                <Table.Cell>{patient.demographicData.apartmentType ? patient.demographicData.apartmentType.name : '' }</Table.Cell>
                <Table.Cell>{patient.demographicData.heatingType ? patient.demographicData.heatingType.name : '' }</Table.Cell>
                <Table.Cell>{patient.demographicData.waterType ? patient.demographicData.waterType.name : '' }</Table.Cell>
                <Table.Cell>
                  <Button
                    circular
                    size='tiny'
                    color='teal'
                    as={Link}
                    to={`${props.url}/${patient._id}`}
                    icon='heartbeat'
                    title={'Ver paciente'} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Divider hidden />
        <Container textAlign='center'>
          <Pagination
            defaultActivePage={props.pageNumber + 1}
            ellipsisItem={undefined}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => {
              props.onSearchFieldChange(e, { name: 'pageNumber', value: activePage - 1 });
            }} />
        </Container>
      </Segment>
    );
  };

export default DemographicDataList;
