'use strict'

import {request} from './request';

export default function(token = null) {
  request.initialize(token);
  return request;
}
