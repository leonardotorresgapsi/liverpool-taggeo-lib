/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integraci�n {GAPSI} - CDMX - 2020
 */

/**
 * @author: Leonardo Ivan Torres Ochoa [30/03/2020]
 * @updated: Oscar Longino [31/03/2020]
 * @description: test file of lib
 * @since-version: 1.0
 */

console.log("========================================================================================");
console.log(" ");

const AnalyticsTagging = require('./index.js');
const API_KEY = 'bf6c0c4a-7693-4b1b-9f3f-c7d7cc3b38d2';
const analyticsTagging = new AnalyticsTagging.Analytics(API_KEY);

    let listProducts = [];
    let product = {
      name: 'Chamarra Puma roja',
      id: '1084082111',
      category: 'El',
      variant: 'N/A',
      price: '2379.15',
      brand: 'PUMA',
      quantity: 1,
      size: 'CH',
      color: 'ROJO',
      vendor: 'liverpool',
      skuSpecific: '1084082127',
      material: 'Poliester',
      texture: '',
      packBelongs: 'N',
      discount: '2799.0',
      originalPrice: '2379.15'
    };
    listProducts.push(product);
    let liverpoolLayer = {
      event: 'addToCart',
      products: listProducts
    };
setTimeout(
    function (){
        analyticsTagging.publish(liverpoolLayer);
    }, 2000
)


console.log(" ");
console.log(" ");
console.log("========================================================================================");
