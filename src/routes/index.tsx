import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import OsRegisters from '../pages/Registers';
import NewOs from '../pages/NewOs';
import Admin from '../pages/Admin';
import NewRegister from '../pages/NewRegister';
import AdminRegisters from '../pages/AdminRegisters';
import Locals from '../pages/Locals';
import Equipamentos from '../pages/Equipamentos';
import Usuarios from '../pages/Usuarios';
import TipoOs from '../pages/TipoOs';
import EstadoOs from '../pages/EstadoOs';
import Historico from '../pages/Historico';
import NewEquipment from '../pages/NewEquipment';
import NewLocal from '../pages/NewLocal';
import UpdateLocal from '../pages/UpdateLocal';
import NewOsState from '../pages/NewOsState';
import NewOsType from '../pages/NewOsType';
import NewUser from '../pages/NewUser';
import UpdateEquipment from '../pages/UpdateEquipment';
import UpdateUser from '../pages/UpdateUser';
import UpdateOsType from '../pages/UpdateOsType';
import UpdateOsState from '../pages/UpdateOsState';
import ForgotPassword from '../pages/ForgotPassword';
import NewPassword from '../pages/NewPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/new-password" isPrivate exact component={NewPassword} />
    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/profile/os/new" exact component={NewOs} isPrivate />
    <Route path="/profile/os/:id" exact component={OsRegisters} isPrivate />
    <Route path="/admin/os/new" exact component={NewOs} isPrivate />
    <Route path="/admin/historico/new" exact component={NewOs} isPrivate />

    <Route path="/admin/locais/new" exact component={NewLocal} isPrivate />
    <Route
      path="/admin/locais/update"
      exact
      component={UpdateLocal}
      isPrivate
    />
    <Route
      path="/admin/equipamentos/new"
      exact
      component={NewEquipment}
      isPrivate
    />
    <Route
      path="/admin/equipamentos/update"
      exact
      component={UpdateEquipment}
      isPrivate
    />
    <Route path="/admin/usuarios/new" exact component={NewUser} isPrivate />
    <Route
      path="/admin/usuarios/update"
      exact
      component={UpdateUser}
      isPrivate
    />
    <Route path="/admin/tipo-os/new" exact component={NewOsType} isPrivate />
    <Route
      path="/admin/tipo-os/update"
      exact
      component={UpdateOsType}
      isPrivate
    />
    <Route path="/admin/estado-os/new" exact component={NewOsState} isPrivate />
    <Route
      path="/admin/estado-os/update"
      exact
      component={UpdateOsState}
      isPrivate
    />

    <Route path="/admin/home" exact component={Admin} isPrivate />
    <Route path="/admin/locais" exact component={Locals} isPrivate />
    <Route
      path="/admin/equipamentos"
      exact
      component={Equipamentos}
      isPrivate
    />
    <Route path="/admin/usuarios" exact component={Usuarios} isPrivate />
    <Route path="/admin/tipo-os" exact component={TipoOs} isPrivate />
    <Route path="/admin/estado-os" exact component={EstadoOs} isPrivate />
    <Route path="/admin/historico" exact component={Historico} isPrivate />
    <Route path="/admin/os/:id" exact component={AdminRegisters} isPrivate />
    <Route path="/admin/os/:id/new" exact component={NewRegister} isPrivate />
  </Switch>
);

export default Routes;
