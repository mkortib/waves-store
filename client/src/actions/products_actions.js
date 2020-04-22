import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_WOOD,
} from './types';

import { USER_SERVER } from '../components/utils/misc';
import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductsByArrival() {
    const request = axios
        .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then((response) => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request,
    };
}

export function getProductsBySell() {
    const request = axios
        .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then((response) => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request,
    };
}

export function getProductsToShop(
    skip,
    limit,
    filters = [],
    previousState = []
) {
    const data = {
        limit,
        skip,
        filters,
    };

    const request = axios
        .post(`${PRODUCT_SERVER}/shop`, data)
        .then((response) => {
            let newState = [...previousState, ...response.data.articles];

            return {
                size: response.data.size,
                articles: newState,
            };
        });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request,
    };
}

export function addProduct(dataToSubmit) {
    const request = axios
        .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
        .then((response) => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request,
    };
}

export const clearProduct = () => {
    return {
        type: CLEAR_PRODUCT,
        payload: '',
    };
};

/**
 * CATEGORIES
 */

export function getWoods() {
    const request = axios
        .get(`${PRODUCT_SERVER}/woods`)
        .then((response) => response.data);

    return {
        type: GET_WOODS,
        payload: request,
    };
}

export function getBrands() {
    const request = axios
        .get(`${PRODUCT_SERVER}/brands`)
        .then((response) => response.data);

    return {
        type: GET_BRANDS,
        payload: request,
    };
}

export function addBrand(dataToSubmit, existingBrands) {
    const request = axios
        .post(`/api/user/brand`, dataToSubmit)
        .then((response) => {
            let brands = [...existingBrands, response.data.brand];

            return {
                success: response.data.success,
                brands,
            };
        });

    return {
        type: ADD_BRAND,
        payload: request,
    };
}

export function addWood(dataToSubmit, existingWoods) {
    const request = axios
        .post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
        .then((response) => {
            let woods = [...existingWoods, response.data.wood];

            return {
                success: response.data.success,
                woods,
            };
        });

    return {
        type: ADD_WOOD,
        payload: request,
    };
}
