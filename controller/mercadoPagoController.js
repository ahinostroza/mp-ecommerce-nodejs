const { Router } = require('express');
const mercadopago = require('mercadopago');

checkout = async(body) => {
    mercadopago.configure({
        integrator_id: 'dev_2e4ad5dd362f11eb809d0242ac130004',
        access_token: 'APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439'
    });

    let preference = {
        items: [{
            id: '1234',
            title: body.title,
            currency_id: 'PEN',
            picture_url: `https://ahinostroza-mp-commerce-nodejs.herokuapp.com${body.img}`,
            description: 'Dispositivo móvil de Tienda e-commerce',
            category_id: 'mobile',
            quantity: 1,
            unit_price: parseFloat(body.price)
        }],
        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_46542185@testuser.com',
            phone: {
                area_code: '52',
                number: 5549737300
            },
            identification: {
                type: 'DNI',
                number: '22334445'
            },
            address: {
                street_name: 'Insurgentes Sur',
                street_number: 1602,
                zip_code: '03940'
            }
        },
        back_urls: {
            success: 'https://ahinostroza-mp-commerce-nodejs.herokuapp.com/success',
            failure: 'https://ahinostroza-mp-commerce-nodejs.herokuapp.com/failure',
            pending: 'https://ahinostroza-mp-commerce-nodejs.herokuapp.com/pending'
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [{
                id: 'diners'
            }],
            excluded_payment_types: [{
                id: 'atm'
            }],
            installments: 6
        },
        notification_url: 'https://hookb.in/mZQkNKVwxNFeqq710noW',
        external_reference: 'tromepop@gmail.com',
        expires: false,
        expiration_date_from: '2020-01-01T12:00:00.000-04:00',
        expiration_date_to: '2021-01-01T12:00:00.000-04:00'
    }

    let url;

    await mercadopago.preferences.create(preference)
        .then(function(response) {
            console.log(response.body);
            global.init_point = response.body.init_point;
            url = global.init_point;
        }).catch(function(error) {
            console.log(error);
        });

    return url;
};

module.exports = {
    checkout
}