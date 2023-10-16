import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import UsersListScreen from './screens/UsersListScreen';
import EditUserScreen from './screens/users/EditUserScreen';
import CreateUserScreen from './screens/users/CreateUserScreen';
import CompanyListScreen from './screens/CompanyListScreen';
import CreateCompanyScreen from './screens/company/CreateCompanyScreen';
import EditCompanyScreen from './screens/company/EditCompanyScreen';

const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/' component={LoginScreen}  exact/>
          <Route path='/home' component={HomeScreen}  exact/>
          <Route path='/home/users' component={UsersListScreen}  exact/>
          <Route path='/home/users/edit/:id' component={EditUserScreen} />
          <Route path='/home/users/create/' component={CreateUserScreen} />
          <Route path='/home/companies' component={CompanyListScreen} exact/>
          <Route path='/home/companies/create' component={CreateCompanyScreen}/>
          <Route path='/home/companies/edit/:id' component={EditCompanyScreen} />
          <Route path='/register' component={RegisterScreen} />

        </Container>
      </main>
    </Router>
  )
}

export default App