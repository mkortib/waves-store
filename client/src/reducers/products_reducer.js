import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_WOOD,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    CLEAR_PRODUCT_DETAIL,
    GET_PRODUCT_DETAIL,
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_SELL:
            return { ...state, bySell: action.payload };
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload };
        case GET_BRANDS:
            return { ...state, brands: action.payload };
        case ADD_BRAND:
            return {
                ...state,
                brands: action.payload.brands,
                addBrand: action.payload.success,
            };
        case GET_WOODS:
            return { ...state, woods: action.payload };
        case ADD_WOOD:
            return {
                ...state,
                woods: action.payload.woods,
                addWood: action.payload.success,
            };
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size,
            };
        case ADD_PRODUCT:
            return { ...state, addProduct: action.payload };
        case CLEAR_PRODUCT:
            return { ...state, addProduct: action.payload };
        case GET_PRODUCT_DETAIL:
            return { ...state, productDetail: action.payload };
        case CLEAR_PRODUCT_DETAIL:
            return { ...state, productDetail: action.payload };
        default:
            return state;
    }
}
