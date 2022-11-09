const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate:{ //only text
      //   is:/^[A-Za-z]+$/i,
      // },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      // validate:{ //only text
      //   is:/^[a-z]+$/i
      // },
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // validate:{
      //   isNumeric:true,
      //   min: {
      //     args: 1, 
      //     msg: "The rating must be between 1 to 5"
      // },
      // max: {
      //     args: 5,
      //     msg: "The rating must be between 1 to 5"
      // },
      // },
    },
    
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    
    image:{
      type: DataTypes.STRING,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    },
  }, {timestamps:false}
  );
};
