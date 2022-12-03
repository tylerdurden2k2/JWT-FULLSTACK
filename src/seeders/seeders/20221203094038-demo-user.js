"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "example1@gm.com",
                    password: "123",
                    username: "fake1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: "example2@gm.com",
                    password: "223",
                    username: "fake2",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: "example3@gm.com",
                    password: "323",
                    username: "fake3",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
