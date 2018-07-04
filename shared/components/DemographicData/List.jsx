import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';


const DemographicDataList = (props) => {
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
                <Table.Cell>{patient.demographicData ? patient.demographicData.apartmentType.name : '' }</Table.Cell>
                <Table.Cell>{patient.demographicData ? patient.demographicData.heatingType.name : '' }</Table.Cell>
                <Table.Cell>{patient.demographicData ? patient.demographicData.waterType.name : '' }</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {props.patients && props.patients.length === 0 && <Message info>
          <Message.Header>No hay pacientes con datos demográficos que mostrar</Message.Header>
        </Message>}
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
