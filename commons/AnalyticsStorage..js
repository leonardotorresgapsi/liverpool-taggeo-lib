'use strict';
/**
 * Copyright (c) 2020 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2020
 */

/**
 * @author: Oscar Longino [05/04/2020]
 * @updated: 
 * @description: library for Access to LocalStorage
 * @since-version: 1.0
 */

const LocalStorage = require('node-localstorage').LocalStorage;


module.exports = class AnalyticsStorage{

    // eslint-disable-next-line class-methods-use-this
    constructor(){
        this.localStorage;
        if (typeof localStorage === "undefined" || localStorage === null) {
            this.localStorage = new LocalStorage('./scratch');
        }
    }

    /** put key and value into LocalStorage */
    put(key, value){
        this.localStorage.setItem(key, value); 
    }

    /** get value of key from LocalStorage */
    get(key){
        return this.localStorage.getItem(key);
    }

    /** remove key from LocalStorage */
    remove(key){
        return this.localStorage.removeItem(key);
    }

}