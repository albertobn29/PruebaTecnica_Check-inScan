'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('productos', [{
            titulo: 'pan',
            descripcion: 'Alimento que consiste en una masa de harina, por lo común de trigo, levadura y agua, cocida en un horno.',
            estado: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            titulo: 'baguette',
            descripcion: 'Barra de pan estrecha y alargada.',
            estado: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('productos', null, {});
    }
};
