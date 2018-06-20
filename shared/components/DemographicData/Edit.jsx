import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const DemographicDataEdit = (props) => {
  const { fields,
          handleChange,
          apartmentTypesOptions,
          heatingTypesOptions,
          waterTypesOptions,
        } = props;

  return (
    <div>
      <Form.Group>
        <Form.Select
          width={5}
          label={fields.apartmentTypeErrorMsg || 'Tipo de vivienda'}
          name='apartmentType'
          placeholder='Tipo de vivienda'
          onChange={handleChange}
          value={fields.apartmentType ? fields.apartmentType._id : fields.apartmentType}
          options={apartmentTypesOptions}
          error={fields.apartmentTypeHasError} />
        <Form.Select
          width={6}
          label={fields.heatingTypeErrorMsg || 'Tipo de calefacción'}
          name='heatingType'
          placeholder='Tipo de calefacción'
          onChange={handleChange}
          value={fields.heatingType ? fields.heatingType._id : fields.heatingType}
          options={heatingTypesOptions}
          error={fields.heatingTypeHasError} />
        <Form.Select
          width={5}
          label={fields.waterTypeErrorMsg || 'Tipo de agua'}
          name='waterType'
          placeholder='Tipo de agua'
          onChange={handleChange}
          value={fields.waterType ? fields.waterType._id : fields.waterType}
          options={waterTypesOptions}
          error={fields.waterTypeHasError} />
      </Form.Group>
      <Form.Group>
        <Form.Checkbox
          width={5}
          label={fields.refrigeratorErrorMsg || 'Refrigerador'}
          checked={fields.refrigerator}
          value={fields.refrigerator ? 'on' : 'off' }
          name='refrigerator'
          error={fields.refrigeratorHasError}
          onChange={handleChange} />
        <Form.Checkbox
          width={6}
          label={fields.refrigeratorErrorMsg || 'Electricidad'}
          checked={fields.electricity}
          value={fields.electricity ? 'on' : 'off' }
          name='electricity'
          error={fields.electricityHasError}
          onChange={handleChange} />
        <Form.Checkbox
          width={5}
          label={fields.petErrorMsg || 'Mascotas'}
          checked={fields.pet}
          value={fields.pet ? 'on' : 'off' }
          name='pet'
          error={fields.petHasError}
          onChange={handleChange} />
      </Form.Group>
    </div>
  );
}

export default DemographicDataEdit;
