import { Sequelize } from "sequelize";
import { userModel } from "../models/user.js";
import { userRoleModel } from "../models/userRole.js";
import { userPermissionModel } from "../models/userPermission.js";
import { modulePermissionModel } from "../models/modulePermission.js";
import { userGroupModel } from "../models/userGroup.js";

export const connection = async () => {
  const sequelize = new Sequelize('testDB', 'postgres', 'Inthiyaz9293', {
    host: 'localhost',
    dialect: 'postgres',
  });

  let User, UserRole, UserPermission, ModulePermission, UserGroup;

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Define models
    User = userModel(sequelize);
    UserRole = userRoleModel(sequelize);
    UserPermission = userPermissionModel(sequelize);
    ModulePermission = modulePermissionModel(sequelize);
    UserGroup = userGroupModel(sequelize);

    // Sync models with the database
    await sequelize.sync();
    console.log('Tables created successfully.');
    
    return sequelize; // Return sequelize instance if needed
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Rethrow error to handle it in server startup
  }
};
