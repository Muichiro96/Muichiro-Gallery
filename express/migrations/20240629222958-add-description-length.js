'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */await queryInterface.changeColumn('publications', 'description', {
      type: Sequelize.STRING(600)
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.**/
     await queryInterface.changeColumn('publications', 'description', {
      type: Sequelize.STRING
    });/*
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
