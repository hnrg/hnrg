import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import config from './config/server';

import SSRRoutes from '../shared/routes';
import store from '../shared/store';

const render = html => `
    <!DOCTYPE html>
    <html>
        <head>
          <base href="${config.url}">
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="theme-color" content="#62a8eb">
          <meta name="keywords" content="Hospital Ricardo Gutiérrez">
          <meta name="description" content="Plataforma web para el Hospital Gutiérrez">
          <meta name="robots" content="index,follow">
          <meta property="og:url" content="https://grupo5.proyecto2017.linti.unlp.edu.ar/"/>
          <meta property="og:title" content="Hospital Dr. Ricardo Gutiérrez"/>
          <meta property="og:site_name" content="Hospital Gutiérrez"/>
          <meta property="og:description" content="Plataforma web para el Hospital Gutiérrez"/>
          <meta property="og:image" content="https://grupo5.proyecto2017.linti.unlp.edu.ar/web/assets/images/icon.png"/>
          <title>Hospital de Niños Ricardo Gutiérrez</title>
        </head>
        <body>
            <div id="app">${html}</div>
            <script src="js/vendor.js"></script>
            <script src="js/app.js"></script>
        </body>
    </html>
`;

const serverSideRenderer = (request, response) => {
  const context = {};

  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter location={request.url} context={context}>
        <SSRRoutes />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    response.redirect(context.url);
    return;
  }

  const html = ReactDOMServer.renderToString(appWithRouter);

  response.status(200).send(render(html));
};

export default serverSideRenderer;
